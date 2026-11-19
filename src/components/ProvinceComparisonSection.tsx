"use client";

import React, { useMemo, useState } from "react";
import { ArrowLeftRight, BarChart3, Filter } from "lucide-react";
import {
  INDONESIA_RECORD,
  PROVINCES_38,
  REGION_ORDER,
  RegionName,
} from "@/data/ski2023-mental-health";
import {
  PROVINCE_METRICS_CONFIG,
  PROVINCE_METRIC_LIST,
  ProvinceMetricKey,
  formatCI,
  formatIdNumber,
  formatIntegerId,
  getProvinceMetric,
} from "@/lib/mental-health-helpers";

interface ProvinceComparisonSectionProps {
  metricKey: ProvinceMetricKey;
  onMetricChange: (key: ProvinceMetricKey) => void;
  selectedProvinceCode: string;
  onSelectProvince: (code: string) => void;
}

export default function ProvinceComparisonSection({
  metricKey,
  onMetricChange,
  selectedProvinceCode,
  onSelectProvince,
}: ProvinceComparisonSectionProps) {
  const [sliceMode, setSliceMode] = useState<"top12" | "bottom12" | "all">("top12");
  const [regionFilter, setRegionFilter] = useState<RegionName | "ALL">("ALL");
  const [compareCodeB, setCompareCodeB] = useState<string>("PP"); // Default Papua Pegunungan or DKI Jakarta

  const cfg = PROVINCE_METRICS_CONFIG[metricKey];
  const nationalMetric = getProvinceMetric(INDONESIA_RECORD, metricKey);

  const filteredSorted = useMemo(() => {
    const base =
      regionFilter === "ALL"
        ? PROVINCES_38
        : PROVINCES_38.filter((p) => p.region === regionFilter);

    const sortedDesc = [...base].sort(
      (a, b) => getProvinceMetric(b, metricKey).value - getProvinceMetric(a, metricKey).value
    );

    if (sliceMode === "top12") return sortedDesc.slice(0, 12);
    if (sliceMode === "bottom12") return [...sortedDesc].reverse().slice(0, 12);
    return sortedDesc;
  }, [metricKey, regionFilter, sliceMode]);

  const axisMax = useMemo(() => {
    const maxCi = Math.max(
      ...filteredSorted.map((p) => getProvinceMetric(p, metricKey).ciHigh),
      nationalMetric.ciHigh
    );
    return maxCi * 1.08 || 10;
  }, [filteredSorted, metricKey, nationalMetric.ciHigh]);

  const provA = useMemo(
    () => PROVINCES_38.find((p) => p.code === selectedProvinceCode) || PROVINCES_38[11],
    [selectedProvinceCode]
  );
  const provB = useMemo(
    () => PROVINCES_38.find((p) => p.code === compareCodeB) || PROVINCES_38[10],
    [compareCodeB]
  );

  const natLinePct = (nationalMetric.value / axisMax) * 100;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      {/* Left: Horizontal Bar Chart with 95% CI Error Bars */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 xl:col-span-7">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Peringkat & Interval Kepercayaan 95% CI
              </span>
            </div>
            <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
              Perbandingan Provinsi: {cfg.label}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                ["top12", "12 Tertinggi"],
                ["bottom12", "12 Terendah"],
                ["all", "Semua (38)"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setSliceMode(id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  sliceMode === id
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Region Filter & Metric Selector */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as RegionName | "ALL")}
              aria-label="Filter wilayah pulau"
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="ALL">Semua Wilayah Pulau (38)</option>
              {REGION_ORDER.map((r) => (
                <option key={r} value={r}>
                  Pulau/Wilayah {r}
                </option>
              ))}
            </select>
            <select
              value={metricKey}
              onChange={(e) => onMetricChange(e.target.value as ProvinceMetricKey)}
              aria-label="Pilih indikator perbandingan"
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {PROVINCE_METRIC_LIST.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.tableRef}: {m.label} ({m.unit})
                </option>
              ))}
            </select>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Garis putus-putus = Nasional{" "}
            <strong className="text-slate-800 dark:text-slate-200">
              {formatIdNumber(nationalMetric.value, cfg.decimals)}
              {cfg.unit}
            </strong>
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative mt-4 space-y-2">
          {filteredSorted.map((prov, index) => {
            const m = getProvinceMetric(prov, metricKey);
            const barPct = Math.min(100, (m.value / axisMax) * 100);
            const ciLowPct = Math.min(100, (m.ciLow / axisMax) * 100);
            const ciHighPct = Math.min(100, (m.ciHigh / axisMax) * 100);
            const isSelected = prov.code === selectedProvinceCode;
            const aboveNat = m.value > nationalMetric.value;

            return (
              <div
                key={prov.code}
                onClick={() => onSelectProvince(prov.code)}
                className={`group grid cursor-pointer grid-cols-12 items-center gap-2 rounded-lg px-2 py-1 transition ${
                  isSelected
                    ? "bg-teal-50/90 ring-1 ring-teal-300 dark:bg-teal-950/50 dark:ring-teal-700"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="col-span-4 flex items-center gap-1.5 truncate text-xs">
                  <span className="w-5 text-[10px] font-semibold text-slate-400">
                    {index + 1}.
                  </span>
                  <span
                    className={`truncate font-medium ${
                      isSelected
                        ? "font-bold text-teal-800 dark:text-teal-200"
                        : "text-slate-700 dark:text-slate-200"
                    }`}
                    title={`${prov.name} (N=${formatIntegerId(m.nWeighted)}${m.isLowSample ? "*" : ""})`}
                  >
                    {prov.name}
                  </span>
                </div>

                {/* Bar + CI Whisker Track */}
                <div className="relative col-span-5 h-5 rounded bg-slate-100 dark:bg-slate-800/90">
                  {/* National Reference Line */}
                  <div
                    className="pointer-events-none absolute top-0 bottom-0 z-10 border-l-2 border-dashed border-slate-500/70 dark:border-slate-400/70"
                    style={{ left: `${natLinePct}%` }}
                  />
                  {/* Value Bar */}
                  <div
                    className="h-full rounded-l transition-all duration-300"
                    style={{
                      width: `${barPct}%`,
                      backgroundColor: cfg.higherIsBetter
                        ? aboveNat
                          ? "#059669"
                          : "#d97706"
                        : aboveNat
                        ? "#e11d48"
                        : "#0d9488",
                      opacity: m.isLowSample ? 0.72 : 0.9,
                    }}
                  />
                  {/* 95% CI Range Whisker */}
                  <div
                    className="pointer-events-none absolute top-1/2 h-0.5 -translate-y-1/2 bg-slate-900/75 dark:bg-white/80"
                    style={{
                      left: `${ciLowPct}%`,
                      width: `${Math.max(0.5, ciHighPct - ciLowPct)}%`,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 bg-slate-900 dark:bg-white"
                    style={{ left: `${ciLowPct}%` }}
                  />
                  <div
                    className="pointer-events-none absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 bg-slate-900 dark:bg-white"
                    style={{ left: `${ciHighPct}%` }}
                  />
                </div>

                <div className="col-span-3 text-right text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatIdNumber(m.value, cfg.decimals)}
                    {cfg.unit}
                    {m.isLowSample ? "*" : ""}
                  </span>
                  <span className="ml-1 hidden text-[10px] text-slate-400 sm:inline">
                    ({formatIdNumber(m.ciLow, cfg.decimals)}–{formatIdNumber(m.ciHigh, cfg.decimals)})
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
          Garis hitam/putih horizontal pada setiap batang menunjukkan rentang kepercayaan <strong>95% CI</strong>. Tanda <strong>*</strong> menandakan N tertimbang &lt; 50.
        </p>
      </section>

      {/* Right: Head-to-Head Province Comparator */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 xl:col-span-5">
        <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Komparator Lintas Indikator
            </span>
          </div>
          <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            Head-to-Head Antar Provinsi &amp; Nasional
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Bandingkan profil 6 indikator Bab 5 antara dua provinsi terhadap tolok ukur Nasional (INDONESIA).
          </p>
        </div>

        {/* Selectors */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold uppercase text-teal-700 dark:text-teal-400">
              Provinsi A (Utama)
            </label>
            <select
              value={provA.code}
              onChange={(e) => onSelectProvince(e.target.value)}
              className="mt-1 w-full rounded-xl border border-teal-200 bg-teal-50/50 px-3 py-2 text-xs font-semibold text-slate-900 dark:border-teal-800 dark:bg-teal-950/40 dark:text-white"
            >
              {PROVINCES_38.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase text-indigo-700 dark:text-indigo-400">
              Provinsi B (Pembanding)
            </label>
            <select
              value={provB.code}
              onChange={(e) => setCompareCodeB(e.target.value)}
              className="mt-1 w-full rounded-xl border border-indigo-200 bg-indigo-50/50 px-3 py-2 text-xs font-semibold text-slate-900 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-white"
            >
              {PROVINCES_38.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sample Sizes */}
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-2.5 text-center text-[11px] dark:bg-slate-800/70">
          <div>
            <div className="font-semibold text-teal-700 dark:text-teal-300">{provA.shortName}</div>
            <div className="text-slate-500 dark:text-slate-400">
              RT: {formatIntegerId(provA.psychosisHouseholdsN)} · ≥15th: {formatIntegerId(provA.individuals15PlusN)}
            </div>
          </div>
          <div>
            <div className="font-semibold text-slate-700 dark:text-slate-300">INDONESIA</div>
            <div className="text-slate-500 dark:text-slate-400">
              RT: 315.621 · ≥15th: 630.827
            </div>
          </div>
          <div>
            <div className="font-semibold text-indigo-700 dark:text-indigo-300">{provB.shortName}</div>
            <div className="text-slate-500 dark:text-slate-400">
              RT: {formatIntegerId(provB.psychosisHouseholdsN)} · ≥15th: {formatIntegerId(provB.individuals15PlusN)}
            </div>
          </div>
        </div>

        {/* Comparison Rows */}
        <div className="mt-4 space-y-3.5">
          {PROVINCE_METRIC_LIST.map((item) => {
            const mA = getProvinceMetric(provA, item.key);
            const mB = getProvinceMetric(provB, item.key);
            const mNat = getProvinceMetric(INDONESIA_RECORD, item.key);
            const localMax = Math.max(mA.value, mB.value, mNat.value) * 1.15 || 1;

            return (
              <div
                key={item.key}
                className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-950/40"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {item.shortLabel}{" "}
                    <span className="text-[10px] font-normal text-slate-400">({item.tableRef})</span>
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ID:{" "}
                    <strong className="text-slate-700 dark:text-slate-200">
                      {formatIdNumber(mNat.value, item.decimals)}
                      {item.unit}
                    </strong>
                  </span>
                </div>

                {/* Bars */}
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-20 truncate font-medium text-teal-700 dark:text-teal-300">
                      {provA.shortName}
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-teal-600 dark:bg-teal-500"
                        style={{ width: `${(mA.value / localMax) * 100}%` }}
                      />
                    </div>
                    <span className="w-24 text-right font-bold text-slate-900 dark:text-white">
                      {formatIdNumber(mA.value, item.decimals)}
                      {item.unit}
                      {mA.isLowSample ? "*" : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-20 truncate font-medium text-slate-500 dark:text-slate-400">
                      Nasional
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-slate-400 dark:bg-slate-500"
                        style={{ width: `${(mNat.value / localMax) * 100}%` }}
                      />
                    </div>
                    <span className="w-24 text-right font-medium text-slate-600 dark:text-slate-300">
                      {formatIdNumber(mNat.value, item.decimals)}
                      {item.unit}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-20 truncate font-medium text-indigo-700 dark:text-indigo-300">
                      {provB.shortName}
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${(mB.value / localMax) * 100}%` }}
                      />
                    </div>
                    <span className="w-24 text-right font-bold text-slate-900 dark:text-white">
                      {formatIdNumber(mB.value, item.decimals)}
                      {item.unit}
                      {mB.isLowSample ? "*" : ""}
                    </span>
                  </div>
                </div>

                <div className="mt-1.5 flex justify-between text-[10px] text-slate-400">
                  <span>95% CI A: {formatCI(mA.ciLow, mA.ciHigh, item.decimals, item.unit)}</span>
                  <span>95% CI B: {formatCI(mB.ciLow, mB.ciHigh, item.decimals, item.unit)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
