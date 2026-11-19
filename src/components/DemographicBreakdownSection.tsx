"use client";

import React, { useMemo, useState } from "react";
import { AlertCircle, Users } from "lucide-react";
import {
  DemographicDimension,
  INDIVIDUAL_DEMOGRAPHIC_RECORDS,
  IndividualDemographicRecord,
} from "@/data/ski2023-mental-health";
import { formatCI, formatIdNumber, formatIntegerId } from "@/lib/mental-health-helpers";

const DIMENSIONS: DemographicDimension[] = [
  "Kelompok Umur",
  "Jenis Kelamin",
  "Pendidikan",
  "Pekerjaan",
  "Tempat Tinggal",
  "Status Ekonomi",
];

type DemoMetricKey = "depresi" | "masalahJiwa" | "pikiranMengakhiriHidup" | "depresiBerobat";

const DEMO_METRICS: {
  key: DemoMetricKey;
  label: string;
  tableRef: string;
  decimals: number;
  color: string;
  barClass: string;
}[] = [
  {
    key: "depresi",
    label: "Depresi (MINI)",
    tableRef: "Tabel 5.5",
    decimals: 1,
    color: "#e11d48",
    barClass: "bg-rose-500",
  },
  {
    key: "masalahJiwa",
    label: "Masalah Jiwa (SRQ-20)",
    tableRef: "Tabel 5.7",
    decimals: 1,
    color: "#d97706",
    barClass: "bg-amber-500",
  },
  {
    key: "pikiranMengakhiriHidup",
    label: "Pikiran Mengakhiri Hidup",
    tableRef: "Tabel 5.9",
    decimals: 2,
    color: "#be123c",
    barClass: "bg-rose-700",
  },
  {
    key: "depresiBerobat",
    label: "Depresi Berobat",
    tableRef: "Tabel 5.14",
    decimals: 1,
    color: "#059669",
    barClass: "bg-emerald-600",
  },
];

const DIMENSION_INSIGHTS: Record<DemographicDimension, { title: string; body: string }> = {
  "Kelompok Umur": {
    title: "Pola Kurva-U (U-Shaped Risk Curve)",
    body: "Kerentanan psikologis tertinggi muncul pada usia muda 15–24 tahun (depresi 2,0%, pikiran mengakhiri hidup 0,39% — tertinggi di semua usia, namun tingkat berobat paling rendah hanya 10,4%) dan kembali meningkat tajam pada lansia 75+ tahun (depresi 1,9%, masalah jiwa SRQ-20 mencapai 3,1%).",
  },
  "Jenis Kelamin": {
    title: "Disparitas Beban pada Perempuan (~1,8× Lebih Tinggi)",
    body: "Perempuan mencatat prevalensi depresi 1,8% (vs laki-laki 1,0%), masalah jiwa SRQ-20 2,6% (vs 1,5%), dan pikiran mengakhiri hidup 0,33% (vs 0,17%), namun proporsi pengobatan hampir setara (12,9% vs 12,5%).",
  },
  Pendidikan: {
    title: "Gradien Protektif Pendidikan Tinggi",
    body: "Lulusan D1/D2/D3/PT memiliki prevalensi depresi terendah (0,7%) dan masalah jiwa terendah (1,2%) dibandingkan kelompok pendidikan SD/SLTP ke bawah (depresi 1,5%, SRQ-20 2,2–2,6%).",
  },
  Pekerjaan: {
    title: "Risiko Tinggi pada Tidak Bekerja & Pelajar/Mahasiswa",
    body: "Kelompok 'Tidak bekerja' dan 'Sekolah' mencatat depresi tertinggi (masing-masing 2,0%), masalah jiwa tertinggi (2,9%), serta pikiran mengakhiri hidup tertinggi (0,40% & 0,41%), jauh di atas PNS/TNI/POLRI/BUMN/BUMD (depresi 0,3%). Pelajar/mahasiswa ('Sekolah') juga memiliki proporsi berobat terendah kedua (9,3%).",
  },
  "Tempat Tinggal": {
    title: "Paradoks Urban-Rural: Beban Kota Lebih Tinggi, Akses Desa Sedikit Lebih Baik",
    body: "Penduduk perkotaan mengalami depresi hampir 2× lebih tinggi (1,7% vs 0,9%) dan SRQ-20 lebih tinggi (2,4% vs 1,6%), namun persentase individu depresi yang berobat di perdesaan justru lebih tinggi (15,3% vs 11,7%).",
  },
  "Status Ekonomi": {
    title: "Beban Kuintil Terbawah vs Meratanya Kesenjangan Pengobatan",
    body: "Kuintil ekonomi Terbawah memiliki prevalensi tertinggi untuk depresi (1,6%), SRQ-20 (2,5%), dan pikiran mengakhiri hidup (0,32%). Sementara akses berobat depresi tetap rendah (11,6%–15,3%) di seluruh lapisan ekonomi.",
  },
};

export default function DemographicBreakdownSection() {
  const [dimension, setDimension] = useState<DemographicDimension>("Kelompok Umur");
  const [focusedMetric, setFocusedMetric] = useState<DemoMetricKey>("depresi");

  const rows: IndividualDemographicRecord[] = useMemo(
    () => INDIVIDUAL_DEMOGRAPHIC_RECORDS.filter((r) => r.group === dimension),
    [dimension]
  );

  const activeMetricMeta = DEMO_METRICS.find((m) => m.key === focusedMetric)!;

  const axisMax = useMemo(() => {
    const vals = rows.map((r) => r[focusedMetric].ciHigh);
    return Math.max(...vals) * 1.08 || 5;
  }, [rows, focusedMetric]);

  return (
    <div className="space-y-6">
      {/* Dimension Tabs + Highlight Banner */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Tabel 5.5 · Tabel 5.7 · Tabel 5.9 · Tabel 5.14
              </span>
            </div>
            <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              Disparitas Kesehatan Jiwa Penduduk ≥ 15 Tahun Menurut Karakteristik
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {DIMENSIONS.map((dim) => (
              <button
                key={dim}
                type="button"
                onClick={() => setDimension(dim)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  dimension === dim
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {dim}
              </button>
            ))}
          </div>
        </div>

        {/* Auto Insight Card */}
        <div className="mt-4 rounded-xl border border-teal-200/80 bg-teal-50/70 p-3.5 dark:border-teal-900/70 dark:bg-teal-950/40">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-400" />
            <div>
              <h4 className="text-xs font-bold text-teal-900 dark:text-teal-200">
                Temuan Kunci ({dimension}): {DIMENSION_INSIGHTS[dimension].title}
              </h4>
              <p className="mt-0.5 text-xs leading-relaxed text-teal-800/90 dark:text-teal-300/90">
                {DIMENSION_INSIGHTS[dimension].body}
              </p>
            </div>
          </div>
        </div>

        {/* Metric Focus Bar Chart */}
        <div className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {DEMO_METRICS.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setFocusedMetric(m.key)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    focusedMetric === m.key
                      ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {m.label}{" "}
                  <span className="opacity-75">({m.tableRef})</span>
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Visualisasi nilai &amp; rentang 95% CI
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {rows.map((row) => {
              const point = row[focusedMetric];
              const pct = (point.value / axisMax) * 100;
              const ciLowPct = (point.ciLow / axisMax) * 100;
              const ciHighPct = (point.ciHigh / axisMax) * 100;

              return (
                <div
                  key={row.label}
                  className="grid grid-cols-12 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/40"
                >
                  <div className="col-span-12 sm:col-span-4">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                      {row.label}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      N Tertimbang: {formatIntegerId(point.nWeighted)}
                      {point.isLowSample ? "* (<50)" : ""}
                    </div>
                  </div>

                  <div className="relative col-span-8 h-5 rounded-md bg-slate-200/70 dark:bg-slate-800 sm:col-span-5">
                    <div
                      className={`h-full rounded-l-md transition-all duration-300 ${activeMetricMeta.barClass}`}
                      style={{
                        width: `${Math.min(100, pct)}%`,
                        opacity: point.isLowSample ? 0.65 : 0.9,
                      }}
                    />
                    {/* 95% CI Error Bar */}
                    <div
                      className="pointer-events-none absolute top-1/2 h-0.5 -translate-y-1/2 bg-slate-900 dark:bg-white"
                      style={{
                        left: `${Math.min(100, ciLowPct)}%`,
                        width: `${Math.max(0.5, Math.min(100, ciHighPct) - Math.min(100, ciLowPct))}%`,
                      }}
                    />
                    <div
                      className="pointer-events-none absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 bg-slate-900 dark:bg-white"
                      style={{ left: `${Math.min(100, ciLowPct)}%` }}
                    />
                    <div
                      className="pointer-events-none absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 bg-slate-900 dark:bg-white"
                      style={{ left: `${Math.min(100, ciHighPct)}%` }}
                    />
                  </div>

                  <div className="col-span-4 text-right sm:col-span-3">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {formatIdNumber(point.value, activeMetricMeta.decimals)}%
                      {point.isLowSample ? "*" : ""}
                    </span>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      CI: {formatCI(point.ciLow, point.ciHigh, activeMetricMeta.decimals, "%")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Multi-Metric Comparison Matrix Table across the selected dimension */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Matriks 4 Indikator Menurut {dimension} (SKI 2023)
        </h3>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Perbandingan berdampingan Depresi (MINI), Masalah Kesehatan Jiwa (SRQ-20), Pikiran Mengakhiri Hidup (C-29), dan Proporsi Depresi yang Berobat.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300">
                <th className="px-3 py-2.5 font-semibold">{dimension}</th>
                <th className="px-3 py-2.5 font-semibold text-right">N Penduduk ≥15 Th</th>
                <th className="px-3 py-2.5 font-semibold text-right">Depresi (T5.5)</th>
                <th className="px-3 py-2.5 font-semibold text-right">SRQ-20 (T5.7)</th>
                <th className="px-3 py-2.5 font-semibold text-right">Pikiran Mengakhiri Hidup (T5.9)</th>
                <th className="px-3 py-2.5 font-semibold text-right">Depresi Berobat (T5.14)</th>
                <th className="px-3 py-2.5 font-semibold text-right">N Depresi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map((r) => (
                <tr key={r.label} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="px-3 py-2.5 font-semibold text-slate-900 dark:text-white">
                    {r.label}
                  </td>
                  <td className="px-3 py-2.5 text-right text-slate-600 dark:text-slate-300">
                    {formatIntegerId(r.population15PlusN)}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="font-bold text-rose-600 dark:text-rose-400">
                      {formatIdNumber(r.depresi.value, 1)}%
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      ({formatCI(r.depresi.ciLow, r.depresi.ciHigh, 1, "")})
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {formatIdNumber(r.masalahJiwa.value, 1)}%
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      ({formatCI(r.masalahJiwa.ciLow, r.masalahJiwa.ciHigh, 1, "")})
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="font-bold text-rose-700 dark:text-rose-300">
                      {formatIdNumber(r.pikiranMengakhiriHidup.value, 2)}%
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      ({formatCI(r.pikiranMengakhiriHidup.ciLow, r.pikiranMengakhiriHidup.ciHigh, 2, "")})
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {formatIdNumber(r.depresiBerobat.value, 1)}%
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      ({formatCI(r.depresiBerobat.ciLow, r.depresiBerobat.ciHigh, 1, "")})
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right text-slate-600 dark:text-slate-300">
                    {formatIntegerId(r.depresiBerobat.nWeighted)}
                    {r.depresiBerobat.isLowSample ? "*" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
          *N tertimbang &lt; 50 (pada Tabel 5.14: PNS/TNI/POLRI/BUMN/BUMD N=49* dan Nelayan N=38*).
        </p>
      </section>
    </div>
  );
}
