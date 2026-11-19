import fs from "node:fs";
import path from "node:path";
import { NextRequest } from "next/server";

const PDF_FILENAME = "LAPORAN SKI 2023 DALAM ANGKA_REVISI I_OK.pdf";

export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), PDF_FILENAME);

  if (!fs.existsSync(filePath)) {
    return new Response("Dokumen PDF SKI 2023 tidak ditemukan di direktori proyek.", {
      status: 404,
    });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = request.headers.get("range");

  const commonHeaders: Record<string, string> = {
    "Content-Type": "application/pdf",
    "Content-Disposition": `inline; filename="${PDF_FILENAME}"`,
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=3600",
  };

  if (range) {
    const match = range.match(/bytes=(\d+)-(\d*)/);
    if (match) {
      const start = parseInt(match[1], 10);
      const end = match[2] ? Math.min(parseInt(match[2], 10), fileSize - 1) : fileSize - 1;

      if (start >= fileSize || start > end) {
        return new Response(null, {
          status: 416,
          headers: { "Content-Range": `bytes */${fileSize}` },
        });
      }

      const chunkSize = end - start + 1;
      const nodeStream = fs.createReadStream(filePath, { start, end });
      const webStream = new ReadableStream({
        start(controller) {
          nodeStream.on("data", (chunk) => controller.enqueue(chunk));
          nodeStream.on("end", () => controller.close());
          nodeStream.on("error", (err) => controller.error(err));
        },
        cancel() {
          nodeStream.destroy();
        },
      });

      return new Response(webStream, {
        status: 206,
        headers: {
          ...commonHeaders,
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Content-Length": String(chunkSize),
        },
      });
    }
  }

  const nodeStream = fs.createReadStream(filePath);
  const webStream = new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk) => controller.enqueue(chunk));
      nodeStream.on("end", () => controller.close());
      nodeStream.on("error", (err) => controller.error(err));
    },
    cancel() {
      nodeStream.destroy();
    },
  });

  return new Response(webStream, {
    status: 200,
    headers: {
      ...commonHeaders,
      "Content-Length": String(fileSize),
    },
  });
}
