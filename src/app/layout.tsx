import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dasbor Kesehatan Jiwa — SKI 2023 dalam Angka (Bab 5)",
  description:
    "Dasbor analitik interaktif data Bab 5 Kesehatan Jiwa Laporan Survei Kesehatan Indonesia (SKI) 2023 oleh BKPK Kementerian Kesehatan RI: Psikosis/Skizofrenia, Pemasungan, Depresi (MINI), Masalah Kesehatan Jiwa (SRQ-20), Pikiran Mengakhiri Hidup, dan Kesenjangan Pengobatan di 38 Provinsi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-teal-200 selection:text-teal-950 dark:bg-slate-950 dark:text-slate-100 dark:selection:bg-teal-800 dark:selection:text-white">
        {children}
      </body>
    </html>
  );
}
