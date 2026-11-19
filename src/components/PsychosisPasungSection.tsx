"use client";

import React, { useState } from "react";
import { Activity, Building2, Lock, Pill, ShieldAlert } from "lucide-react";
import {
  HOUSEHOLD_ART_COUNT_DISTRIBUTION,
  HOUSEHOLD_PSYCHOSIS_PASUNG,
  PASUNG_REASONS,
  PASUNG_RECENT_3MO_NOTE,
  PSYCHOSIS_FACILITY_UTILIZATION,
  PSYCHOSIS_MEDICATION_ADHERENCE,
  PSYCHOSIS_NON_ADHERENCE_REASONS,
} from "@/data/ski2023-mental-health";
import { formatCI, formatIdNumber, formatIntegerId } from "@/lib/mental-health-helpers";

export default function PsychosisPasungSection() {
  const [hhFilter, setHhFilter] = useState<"all" | "Tempat Tinggal" | "Status Ekonomi">("all");

  const psychosisRows = HOUSEHOLD_PSYCHOSIS_PASUNG.filter((r) =>
    hhFilter === "all" ? true : r.group === hhFilter || r.group === "Nasional"
  );

  const facilityRows = PSYCHOSIS_FACILITY_UTILIZATION.filter((r) =>
    hhFilter === "all" ? true : r.group === hhFilter || r.group === "Nasional"
  );

  const adherenceRows = PSYCHOSIS_MEDICATION_ADHERENCE.filter((r) =>
    hhFilter === "all" ? true : r.group === hhFilter || r.group === "Nasional"
  );

  return (
    <div className="space-y-6">
      {/* Top KPI Cards for Subbab 5.1 & 5.4 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-teal-700 dark:text-teal-400">
              Tabel 5.1 · Nasional
            </span>
            <Activity className="h-4 w-4 text-teal-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            4,0‰ <span className="text-sm font-medium text-slate-500">/ 3,0‰</span>
          </div>
          <div className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            RT dengan ART Psikosis (Gejala / Diagnosis)
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            N = 315.621 RT · Tertinggi: DI Yogyakarta (9,3‰)
          </div>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 shadow-sm dark:border-rose-900/60 dark:bg-rose-950/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-700 dark:text-rose-400">
              Tabel 5.3 · Pemasungan
            </span>
            <Lock className="h-4 w-4 text-rose-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-rose-700 dark:text-rose-300">
            6,6% <span className="text-sm font-medium">seumur hidup</span>
          </div>
          <div className="mt-0.5 text-xs text-rose-800/80 dark:text-rose-200/80">
            95% CI: 5,2–8,3% (N = 844 RT)
          </div>
          <div className="mt-2 text-[11px] font-medium text-rose-700 dark:text-rose-300">
            25,2% di antaranya dipasung dalam 3 bulan terakhir (N=55)
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Tabel 5.10 · Layanan
            </span>
            <Building2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            91,7%
          </div>
          <div className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            Pernah berobat ke Fasyankes (60,7% khusus + 31,0% kombinasi)
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            7,9% tidak pernah berobat sama sekali (Desa 11,5%)
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">
              Tabel 5.11 · Kepatuhan Obat
            </span>
            <Pill className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-amber-900 dark:text-amber-200">
            55,9% <span className="text-sm font-medium">/ 89,4%</span>
          </div>
          <div className="mt-0.5 text-xs text-amber-900/80 dark:text-amber-200/80">
            Minum/suntik obat 1 bln terakhir (N=774) · Rutin di antara yg berobat (N=486)
          </div>
          <div className="mt-2 text-[11px] text-amber-800 dark:text-amber-300">
            37,2% tidak minum obat 1 bln terakhir (Desa: 47,4%)
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Filter Karakteristik Rumah Tangga (Tabel 5.2, 5.3, 5.10, 5.11):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              ["all", "Semua Karakteristik + Nasional"],
              ["Tempat Tinggal", "Tempat Tinggal (Kota/Desa)"],
              ["Status Ekonomi", "Status Ekonomi (5 Kuintil)"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setHhFilter(val)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                hhFilter === val
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid 1: Economic Gradient for Psychosis & Pasung + Reasons for Pasung */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 lg:col-span-7">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Gradien Sosial-Ekonomi: Psikosis/Skizofrenia &amp; Pemasungan
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Tabel 5.2 &amp; Tabel 5.3 — Kuintil ekonomi Terbawah mengalami prevalensi psikosis{" "}
            <strong>5,9× lipat</strong> lebih tinggi dibanding Teratas (8,8‰ vs 1,5‰) dan pemasungan{" "}
            <strong>3,1× lipat</strong> lebih tinggi (9,9% vs 3,2%).
          </p>

          <div className="mt-4 space-y-3">
            {psychosisRows.map((row) => (
              <div
                key={row.label}
                className={`rounded-xl border p-3 ${
                  row.group === "Nasional"
                    ? "border-teal-300 bg-teal-50/50 dark:border-teal-800 dark:bg-teal-950/30"
                    : "border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{row.label}</span>
                    <span className="ml-2 text-[10px] text-slate-500">
                      ({row.group} · N RT: {formatIntegerId(row.psychosisRtN)})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    N Kasus Pasung Basis: {formatIntegerId(row.pasungLifetimeN)} RT
                  </div>
                </div>

                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {/* Gejala */}
                  <div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Gejala Psikosis</span>
                      <span className="font-bold text-teal-700 dark:text-teal-300">
                        {formatIdNumber(row.psychosisGejala.value, 1)}‰
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-teal-600"
                        style={{ width: `${(row.psychosisGejala.value / 10) * 100}%` }}
                      />
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-400">
                      CI: {formatCI(row.psychosisGejala.ciLow, row.psychosisGejala.ciHigh, 1, "‰")}
                    </div>
                  </div>

                  {/* Diagnosis */}
                  <div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Gejala + Diagnosis</span>
                      <span className="font-bold text-cyan-700 dark:text-cyan-300">
                        {formatIdNumber(row.psychosisDiagnosis.value, 1)}‰
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-cyan-600"
                        style={{ width: `${(row.psychosisDiagnosis.value / 10) * 100}%` }}
                      />
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-400">
                      CI: {formatCI(row.psychosisDiagnosis.ciLow, row.psychosisDiagnosis.ciHigh, 1, "‰")}
                    </div>
                  </div>

                  {/* Pasung */}
                  <div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Pernah Dipasung</span>
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        {formatIdNumber(row.pasungLifetime.value, 1)}%
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-rose-600"
                        style={{ width: `${(row.pasungLifetime.value / 12) * 100}%` }}
                      />
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-400">
                      CI: {formatCI(row.pasungLifetime.ciLow, row.pasungLifetime.ciHigh, 1, "%")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Catatan Tabel 5.2: Jumlah ART dalam 1 RT */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              Catatan Tabel 5.2 — Distribusi Jumlah ART Psikosis/Skizofrenia dalam Rumah Tangga (N = {HOUSEHOLD_ART_COUNT_DISTRIBUTION.nWeighted}):
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              {HOUSEHOLD_ART_COUNT_DISTRIBUTION.items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
                >
                  <span className="font-bold text-teal-700 dark:text-teal-300">
                    {formatIdNumber(item.percent, 1)}%
                  </span>{" "}
                  <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reasons for Pasung (Tabel 4.65) */}
        <section className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 lg:col-span-5">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Tabel 4.65 (Hal. 145) · Multiple Response*
              </span>
            </div>
            <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
              Alasan ART Psikosis/Skizofrenia Dipasung
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Basis: Rumah tangga dengan ART psikosis yang pernah dipasung (N tertimbang = 55). Responden dapat memilih lebih dari 1 alasan.
            </p>

            <div className="mt-4 space-y-3">
              {PASUNG_REASONS.map((item) => (
                <div key={item.reason}>
                  <div className="flex items-start justify-between gap-2 text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {item.reason}
                    </span>
                    <span className="shrink-0 font-bold text-rose-700 dark:text-rose-400">
                      {formatIdNumber(item.percent, 1)}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-700"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50/80 p-3.5 text-xs text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
            <strong>Catatan Pemasungan 3 Bulan Terakhir (Permenkes No. 54/2017):</strong>{" "}
            {PASUNG_RECENT_3MO_NOTE.description}
          </div>
        </section>
      </div>

      {/* Grid 2: Facility Utilization (Tabel 5.10) & Medication Adherence (Tabel 5.11 + 5.12) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 lg:col-span-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Pemanfaatan Fasilitas Kesehatan vs Non-Kesehatan (Tabel 5.10)
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Fasyankes (RS, Puskesmas, Klinik, Praktik Dokter) vs Non-Fasyankes (rehabilitasi keagamaan, pemuka agama, panti sosial), N = 844 RT.
          </p>

          {/* Stacked Legend */}
          <div className="mt-3 flex flex-wrap gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-teal-600" /> Hanya Fasyankes
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-cyan-500" /> Fasyankes + Non-Kesehatan
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" /> Hanya Non-Kesehatan
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-rose-500" /> Tidak Berobat
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {facilityRows.map((r) => (
              <div key={r.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {r.label}{" "}
                    <span className="font-normal text-slate-400">(N={r.nWeighted})</span>
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">
                    Fasyankes: <strong>{formatIdNumber(r.hanyaFasyankes.value, 1)}%</strong> · Ganda:{" "}
                    <strong>{formatIdNumber(r.keduanya.value, 1)}%</strong> · Tidak:{" "}
                    <strong className="text-rose-600 dark:text-rose-400">
                      {formatIdNumber(r.tidakBerobat.value, 1)}%
                    </strong>
                  </span>
                </div>
                <div className="flex h-4 w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                  <div
                    className="bg-teal-600"
                    style={{ width: `${r.hanyaFasyankes.value}%` }}
                    title={`Hanya Fasyankes: ${r.hanyaFasyankes.value}%`}
                  />
                  <div
                    className="bg-cyan-500"
                    style={{ width: `${r.keduanya.value}%` }}
                    title={`Keduanya: ${r.keduanya.value}%`}
                  />
                  <div
                    className="bg-amber-500"
                    style={{ width: `${r.hanyaNonFasyankes.value}%` }}
                    title={`Hanya Non-Fasyankes: ${r.hanyaNonFasyankes.value}%`}
                  />
                  <div
                    className="bg-rose-500"
                    style={{ width: `${r.tidakBerobat.value}%` }}
                    title={`Tidak Berobat: ${r.tidakBerobat.value}%`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Adherence & Reasons (Tabel 5.11 + Tabel 5.12) */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 lg:col-span-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Kepatuhan Minum/Suntik Obat 1 Bulan Terakhir (Tabel 5.11 &amp; 5.12)
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Pada perdesaan, 47,4% RT dengan psikosis tidak minum/suntik obat dalam 1 bulan terakhir (vs perkotaan 31,0%).
          </p>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300">
                  <th className="px-2.5 py-2 font-semibold">Karakteristik RT</th>
                  <th className="px-2.5 py-2 text-right font-semibold">Ya, Semua</th>
                  <th className="px-2.5 py-2 text-right font-semibold">Ya, Sebagian</th>
                  <th className="px-2.5 py-2 text-right font-semibold">Tidak Minum</th>
                  <th className="px-2.5 py-2 text-right font-semibold">Rutin (N=486)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {adherenceRows.map((r) => (
                  <tr
                    key={r.label}
                    className={
                      r.group === "Nasional" ? "bg-teal-50/50 font-semibold dark:bg-teal-950/30" : ""
                    }
                  >
                    <td className="px-2.5 py-2 text-slate-900 dark:text-white">
                      {r.label} <span className="text-[10px] text-slate-400">(N={r.nMinum1Bulan})</span>
                    </td>
                    <td className="px-2.5 py-2 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {formatIdNumber(r.minumSemua, 1)}%
                    </td>
                    <td className="px-2.5 py-2 text-right text-amber-600 dark:text-amber-400">
                      {formatIdNumber(r.minumTidakSemua, 1)}%
                    </td>
                    <td className="px-2.5 py-2 text-right font-semibold text-rose-600 dark:text-rose-400">
                      {formatIdNumber(r.tidakMinum, 1)}%
                    </td>
                    <td className="px-2.5 py-2 text-right font-bold text-teal-700 dark:text-teal-300">
                      {formatIdNumber(r.rutinSemua, 1)}%
                      <span className="ml-1 text-[10px] font-normal text-slate-400">
                        (N={r.nRutin1Bulan})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tabel 5.12 Reasons for Non-Adherence */}
          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Tabel 5.12 — Alasan Utama Ketidakpatuhan Minum Obat (N Tertimbang = 51)
            </h4>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PSYCHOSIS_NON_ADHERENCE_REASONS.map((item) => (
                <div
                  key={item.reason}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <span className="pr-2 text-slate-700 dark:text-slate-300">{item.reason}</span>
                  <span className="shrink-0 font-bold text-amber-700 dark:text-amber-400">
                    {formatIdNumber(item.percent, 1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
