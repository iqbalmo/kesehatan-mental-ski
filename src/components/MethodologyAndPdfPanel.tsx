"use client";

import React, { useState } from "react";
import { BookOpen, ExternalLink, FileText, FlaskConical } from "lucide-react";
import { REPORT_METADATA, SUBCHAPTER_METHODOLOGY } from "@/data/ski2023-mental-health";

export default function MethodologyAndPdfPanel() {
  const [showEmbeddedPdf, setShowEmbeddedPdf] = useState(false);
  const [pdfPage, setPdfPage] = useState(181);

  const openPageInEmbed = (page: number) => {
    setPdfPage(page);
    setShowEmbeddedPdf(true);
  };

  return (
    <div className="space-y-6">
      {/* Official Report Attribution + Direct PDF Access */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Dokumen Sumber Resmi · {REPORT_METADATA.institution}
              </span>
            </div>
            <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              Metodologi, Instrumen &amp; Verifikasi Dokumen PDF Bab 5
            </h2>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              {REPORT_METADATA.title} — {REPORT_METADATA.chapter} ({REPORT_METADATA.reportPages} /{" "}
              {REPORT_METADATA.pdfPages})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowEmbeddedPdf((s) => !s)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-teal-300 bg-teal-50 px-3.5 py-2 text-xs font-semibold text-teal-800 transition hover:bg-teal-100 dark:border-teal-800 dark:bg-teal-950/60 dark:text-teal-200"
            >
              <BookOpen className="h-3.5 w-3.5" />
              {showEmbeddedPdf ? "Tutup Pratinjau PDF" : `Buka Pratinjau PDF (Hal. ${pdfPage})`}
            </button>
            <a
              href={`/api/pdf#page=${pdfPage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-teal-700"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Buka PDF Asli di Tab Baru
            </a>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
            <div className="font-semibold text-slate-500 dark:text-slate-400">Pengarah &amp; Penanggung Jawab</div>
            <div className="mt-1 font-bold text-slate-900 dark:text-white">
              {REPORT_METADATA.director}
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              Kepala BKPK Kemenkes RI
            </div>
            <div className="mt-2 font-semibold text-slate-800 dark:text-slate-200">
              {REPORT_METADATA.personInCharge}
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              Plt. Kepala Pusat Kebijakan Upaya Kesehatan
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
            <div className="font-semibold text-slate-500 dark:text-slate-400">
              Tim Teknis Blok Kesehatan Jiwa
            </div>
            <ul className="mt-1.5 space-y-1 font-medium text-slate-800 dark:text-slate-200">
              {REPORT_METADATA.mentalHealthTeam.map((member, idx) => (
                <li key={member}>
                  {idx + 1}. {member}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
            <div className="font-semibold text-slate-500 dark:text-slate-400">
              Cakupan Sampel Tertimbang Bab 5
            </div>
            <ul className="mt-1.5 space-y-1 text-slate-700 dark:text-slate-300">
              <li>• Kuesioner Rumah Tangga: <strong>315.621</strong> RT</li>
              <li>• Kuesioner Individu (≥15 Tahun): <strong>630.827</strong> orang</li>
              <li>• RT dengan ART Psikosis Terdiagnosis: <strong>844</strong> RT</li>
              <li>• Individu Depresi (≥15 Tahun): <strong>8.680</strong> orang</li>
            </ul>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        {showEmbeddedPdf && (
          <div className="mt-5 overflow-hidden rounded-xl border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-950">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                Menampilkan: {REPORT_METADATA.pdfFilename} — Halaman PDF #{pdfPage}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUBCHAPTER_METHODOLOGY.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setPdfPage(s.pdfPage)}
                    className={`rounded-lg px-2 py-1 text-[11px] font-semibold transition ${
                      pdfPage === s.pdfPage
                        ? "bg-teal-600 text-white"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {s.code} (p.{s.pdfPage})
                  </button>
                ))}
              </div>
            </div>
            <iframe
              key={pdfPage}
              src={`/api/pdf#page=${pdfPage}`}
              className="h-[680px] w-full"
              title="Dokumen PDF Resmi Laporan SKI 2023 Bab 5 Kesehatan Jiwa"
            />
          </div>
        )}
      </section>

      {/* Subchapter Formulas & Operational Definitions */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {SUBCHAPTER_METHODOLOGY.map((sub) => (
          <article
            key={sub.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:bg-teal-950/70 dark:text-teal-300">
                  <FlaskConical className="h-3 w-3" />
                  {sub.code} · {sub.reportPages}
                </span>
                <button
                  type="button"
                  onClick={() => openPageInEmbed(sub.pdfPage)}
                  className="text-xs font-semibold text-teal-600 hover:underline dark:text-teal-400"
                >
                  Lihat PDF Hal. {sub.pdfPage} →
                </button>
              </div>

              <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                {sub.title}
              </h3>

              <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Instrumen: {sub.instrument}
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Sasaran: {sub.targetPopulation}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {sub.summary}
              </p>

              <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {sub.definitions.map((def, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                    <span>{def}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Formula Perhitungan Resmi SKI 2023
              </div>
              {sub.formulas.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-slate-200/80 bg-slate-50 p-2.5 text-xs dark:border-slate-800 dark:bg-slate-950/70"
                >
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{f.label}</div>
                  <div className="mt-1 font-mono text-[11px] text-teal-700 dark:text-teal-300">
                    {f.expression}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
