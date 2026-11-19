"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Grid2X2,
  Map as MapIcon,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  INDONESIA_RECORD,
  PROVINCES_38,
  ProvinceMentalHealthRecord,
  REGION_ORDER,
  RegionName,
} from "@/data/ski2023-mental-health";
import { PROVINCE_SVG_PATHS } from "@/data/indonesia-38-map-paths";
import {
  PROVINCE_METRICS_CONFIG,
  PROVINCE_METRIC_LIST,
  ProvinceMetricKey,
  formatCI,
  formatIdNumber,
  formatIntegerId,
  getChoroplethFill,
  getProvinceMetric,
} from "@/lib/mental-health-helpers";

interface IndonesiaMap38Props {
  metricKey: ProvinceMetricKey;
  onMetricChange: (key: ProvinceMetricKey) => void;
  selectedProvinceCode: string;
  onSelectProvince: (code: string) => void;
  isDark: boolean;
}

export default function IndonesiaMap38({
  metricKey,
  onMetricChange,
  selectedProvinceCode,
  onSelectProvince,
  isDark,
}: IndonesiaMap38Props) {
  const [viewMode, setViewMode] = useState<"geo" | "grid">("geo");
  const [regionFilter, setRegionFilter] = useState<RegionName | "ALL">("ALL");
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [showNodes, setShowNodes] = useState<boolean>(true);

  const cfg = PROVINCE_METRICS_CONFIG[metricKey];
  const nationalMetric = getProvinceMetric(INDONESIA_RECORD, metricKey);

  const stats = useMemo(() => {
    const sorted = [...PROVINCES_38].sort(
      (a, b) => getProvinceMetric(b, metricKey).value - getProvinceMetric(a, metricKey).value
    );
    const ranks = new Map<string, number>();
    sorted.forEach((p, i) => ranks.set(p.code, i + 1));
    const vals = sorted.map((p) => getProvinceMetric(p, metricKey).value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    return {
      sorted,
      ranks,
      min,
      max,
      highest: sorted[0],
      lowest: sorted[sorted.length - 1],
    };
  }, [metricKey]);

  const activeProvince: ProvinceMentalHealthRecord = useMemo(() => {
    const code = hoveredCode || selectedProvinceCode;
    return PROVINCES_38.find((p) => p.code === code) || PROVINCES_38[11]; // Default Jawa Barat
  }, [hoveredCode, selectedProvinceCode]);

  const activeMetric = getProvinceMetric(activeProvince, metricKey);
  const activeRank = stats.ranks.get(activeProvince.code) ?? 1;
  const diffFromNat = activeMetric.value - nationalMetric.value;

  const gridCells = useMemo(() => {
    const map = new Map<string, ProvinceMentalHealthRecord>();
    for (const p of PROVINCES_38) {
      map.set(`${p.gridPos.row}-${p.gridPos.col}`, p);
    }
    return map;
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/90">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:bg-teal-950/70 dark:text-teal-300">
              {cfg.tableRef} · Subbab {cfg.subchapter}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              38 Provinsi (termasuk 4 DOB Papua) · Klik provinsi untuk inspeksi
            </span>
          </div>
          <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-xl">
            Peta Sebaran {cfg.label}
          </h2>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            {cfg.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800/80">
            <button
              type="button"
              onClick={() => setViewMode("geo")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                viewMode === "geo"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              <MapIcon className="h-3.5 w-3.5" />
              Peta Geografis
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                viewMode === "grid"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              <Grid2X2 className="h-3.5 w-3.5" />
              Cartogram 38 Grid
            </button>
          </div>

          {viewMode === "geo" && (
            <button
              type="button"
              onClick={() => setShowNodes((s) => !s)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                showNodes
                  ? "border-teal-300 bg-teal-50 text-teal-800 dark:border-teal-700 dark:bg-teal-950/60 dark:text-teal-200"
                  : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {showNodes ? "Sembunyikan Node Proporsional" : "Tampilkan Node Proporsional"}
            </button>
          )}
        </div>
      </div>

      {/* Metric Selector Pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {PROVINCE_METRIC_LIST.map((m) => {
          const active = m.key === metricKey;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => onMetricChange(m.key)}
              className={`rounded-xl border px-3 py-1.5 text-left text-xs font-medium transition ${
                active
                  ? "border-teal-600 bg-teal-600 text-white shadow-sm dark:border-teal-500 dark:bg-teal-600"
                  : "border-slate-200 bg-slate-50/70 text-slate-700 hover:border-teal-300 hover:bg-teal-50/50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-teal-700"
              }`}
            >
              <span className="font-semibold">{m.shortLabel}</span>
              <span
                className={`ml-1.5 text-[11px] ${
                  active ? "text-teal-100" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                ({m.unit})
              </span>
            </button>
          );
        })}
      </div>

      {/* Island Region Filter */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Wilayah:
        </span>
        <button
          type="button"
          onClick={() => setRegionFilter("ALL")}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
            regionFilter === "ALL"
              ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          Semua (38)
        </button>
        {REGION_ORDER.map((reg) => (
          <button
            key={reg}
            type="button"
            onClick={() => setRegionFilter(reg)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
              regionFilter === reg
                ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {reg}
          </button>
        ))}
      </div>

      {/* Map Canvas + Side Info Inspector */}
      <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-sky-50/60 to-slate-50/70 p-3 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900 xl:col-span-8">
          {viewMode === "geo" ? (
            <div className="w-full overflow-x-auto">
              <svg
                viewBox="0 0 1100 420"
                className="h-auto min-w-[720px] w-full select-none"
                role="img"
                aria-label={`Peta Choropleth ${cfg.label} 38 Provinsi Indonesia`}
              >
                {/* Subtle graticule lines */}
                <g stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeWidth="0.7" strokeDasharray="3 4">
                  <line x1="0" y1="149.5" x2="1100" y2="149.5" />
                  <line x1="0" y1="264.5" x2="1100" y2="264.5" />
                  <line x1="240" y1="0" x2="240" y2="420" />
                  <line x1="560" y1="0" x2="560" y2="420" />
                  <line x1="860" y1="0" x2="860" y2="420" />
                </g>
                <text
                  x="10"
                  y="144"
                  fontSize="9"
                  fill={isDark ? "#475569" : "#94a3b8"}
                  fontFamily="monospace"
                >
                  0° Khatulistiwa
                </text>

                {/* Province Polygons */}
                {PROVINCES_38.map((prov) => {
                  const geom = PROVINCE_SVG_PATHS[prov.code];
                  if (!geom) return null;
                  const metric = getProvinceMetric(prov, metricKey);
                  const isFilteredOut = regionFilter !== "ALL" && prov.region !== regionFilter;
                  const isSelected = prov.code === selectedProvinceCode;
                  const isHovered = prov.code === hoveredCode;
                  const fill = getChoroplethFill(
                    metric.value,
                    stats.min,
                    stats.max,
                    cfg.higherIsBetter,
                    isDark
                  );

                  return (
                    <g
                      key={prov.code}
                      className="cursor-pointer transition-opacity duration-150"
                      style={{ opacity: isFilteredOut ? 0.22 : 1 }}
                      onMouseEnter={() => setHoveredCode(prov.code)}
                      onMouseLeave={() => setHoveredCode(null)}
                      onClick={() => onSelectProvince(prov.code)}
                    >
                      <path
                        d={geom.d}
                        fill={fill}
                        stroke={
                          isSelected
                            ? isDark
                              ? "#f8fafc"
                              : "#0f172a"
                            : isHovered
                            ? "#0d9488"
                            : isDark
                            ? "#0f172a"
                            : "#ffffff"
                        }
                        strokeWidth={isSelected ? 2.4 : isHovered ? 2 : 1.1}
                        strokeLinejoin="round"
                      />
                    </g>
                  );
                })}

                {/* Proportional Nodes & Small-Province Targets (DKI, DIY, Bali) */}
                {showNodes &&
                  PROVINCES_38.map((prov) => {
                    const geom = PROVINCE_SVG_PATHS[prov.code];
                    if (!geom) return null;
                    const metric = getProvinceMetric(prov, metricKey);
                    const isFilteredOut = regionFilter !== "ALL" && prov.region !== regionFilter;
                    const isSelected = prov.code === selectedProvinceCode;
                    const isHovered = prov.code === hoveredCode;
                    const norm = (metric.value - stats.min) / (stats.max - stats.min || 1);
                    const r = 3.5 + norm * 8.5;

                    return (
                      <g
                        key={`node-${prov.code}`}
                        className="cursor-pointer"
                        style={{ opacity: isFilteredOut ? 0.15 : 1 }}
                        onMouseEnter={() => setHoveredCode(prov.code)}
                        onMouseLeave={() => setHoveredCode(null)}
                        onClick={() => onSelectProvince(prov.code)}
                      >
                        <circle
                          cx={geom.cx}
                          cy={geom.cy}
                          r={isSelected ? r + 2 : r}
                          fill={isDark ? "rgba(15, 23, 42, 0.55)" : "rgba(15, 23, 42, 0.22)"}
                          stroke={isSelected ? "#14b8a6" : isHovered ? "#ffffff" : "rgba(255,255,255,0.85)"}
                          strokeWidth={isSelected ? 2.2 : 1.2}
                        />
                        {(isSelected || isHovered || metric.value >= stats.max * 0.65 || ["JK", "YO", "JB", "PP", "PT"].includes(prov.code)) && (
                          <text
                            x={geom.cx}
                            y={geom.cy - r - 4}
                            textAnchor="middle"
                            fontSize="9.5"
                            fontWeight="700"
                            fill={isDark ? "#f1f5f9" : "#0f172a"}
                            className="pointer-events-none"
                            style={{
                              paintOrder: "stroke",
                              stroke: isDark ? "#020617" : "#ffffff",
                              strokeWidth: "3px",
                            }}
                          >
                            {prov.code} {formatIdNumber(metric.value, cfg.decimals)}
                            {metric.isLowSample ? "*" : ""}
                          </text>
                        )}
                      </g>
                    );
                  })}

                {/* Callout helpers for dense Java island (DKI Jakarta & DIY) */}
                <g className="pointer-events-none">
                  <text x="20" y="405" fontSize="10" fill={isDark ? "#94a3b8" : "#64748b"}>
                    Sumber: BKPK Kemenkes RI — Laporan SKI 2023 dalam Angka ({cfg.tableRef})
                  </text>
                </g>
              </svg>
            </div>
          ) : (
            /* 38-Province Tile Cartogram Grid */
            <div className="overflow-x-auto py-2">
              <div
                className="mx-auto grid min-w-[680px] max-w-4xl gap-1.5"
                style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
              >
                {Array.from({ length: 4 }).map((_, row) =>
                  Array.from({ length: 16 }).map((__, col) => {
                    const prov = gridCells.get(`${row}-${col}`);
                    if (!prov) {
                      return <div key={`empty-${row}-${col}`} className="h-14 rounded-lg" />;
                    }
                    const metric = getProvinceMetric(prov, metricKey);
                    const isFilteredOut = regionFilter !== "ALL" && prov.region !== regionFilter;
                    const isSelected = prov.code === selectedProvinceCode;
                    const fill = getChoroplethFill(
                      metric.value,
                      stats.min,
                      stats.max,
                      cfg.higherIsBetter,
                      isDark
                    );

                    return (
                      <button
                        key={prov.code}
                        type="button"
                        onMouseEnter={() => setHoveredCode(prov.code)}
                        onMouseLeave={() => setHoveredCode(null)}
                        onClick={() => onSelectProvince(prov.code)}
                        style={{ backgroundColor: fill, opacity: isFilteredOut ? 0.22 : 1 }}
                        title={`${prov.name}: ${formatIdNumber(metric.value, cfg.decimals)}${cfg.unit}`}
                        className={`flex h-14 flex-col items-center justify-center rounded-lg border px-1 text-center transition hover:scale-105 ${
                          isSelected
                            ? "border-slate-900 ring-2 ring-teal-500 dark:border-white"
                            : "border-white/60 dark:border-slate-900/60"
                        }`}
                      >
                        <span className="text-[10px] font-bold tracking-tight text-slate-950 dark:text-white">
                          {prov.code}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-900 dark:text-slate-100">
                          {formatIdNumber(metric.value, cfg.decimals)}
                          {metric.isLowSample ? "*" : ""}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
              <p className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
                Cartogram 38 Provinsi disusun berurutan Barat → Timur (Sumatera, Jawa-Bali, Nusa Tenggara, Kalimantan, Sulawesi, Maluku, hingga 6 Provinsi Papua).
              </p>
            </div>
          )}

          {/* Legend */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-3 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-medium">Rendah ({formatIdNumber(stats.min, cfg.decimals)}{cfg.unit})</span>
              <div className="flex h-3 w-36 overflow-hidden rounded-full border border-slate-300 dark:border-slate-700">
                {(cfg.higherIsBetter
                  ? isDark
                    ? ["#881337", "#78350f", "#115e59", "#0f766e", "#059669", "#10b981"]
                    : ["#fecdd3", "#fde68a", "#99f6e4", "#2dd4bf", "#0d9488", "#047857"]
                  : isDark
                  ? ["#134e4a", "#0f766e", "#854d0e", "#9a3412", "#be123c", "#e11d48"]
                  : ["#ccfbf1", "#5eead4", "#fde68a", "#fdba74", "#fb7185", "#be123c"]
                ).map((c) => (
                  <span key={c} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="font-medium">Tinggi ({formatIdNumber(stats.max, cfg.decimals)}{cfg.unit})</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Rata-rata INDONESIA:{" "}
              <strong className="text-slate-800 dark:text-slate-100">
                {formatIdNumber(nationalMetric.value, cfg.decimals)}
                {cfg.unit}
              </strong>{" "}
              (95% CI: {formatCI(nationalMetric.ciLow, nationalMetric.ciHigh, cfg.decimals, cfg.unit)})
            </div>
          </div>
        </div>

        {/* Province Detail Inspector Panel */}
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60 xl:col-span-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  {hoveredCode ? "Pratinjau Hover" : "Provinsi Terpilih"} · {activeProvince.region}
                </span>
                <h3 className="mt-0.5 text-xl font-bold text-slate-900 dark:text-white">
                  {activeProvince.name}
                </h3>
              </div>
              <span className="rounded-lg bg-slate-200/80 px-2.5 py-1 text-xs font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                Peringkat #{activeRank}/38
              </span>
            </div>

            {/* Big Metric Display */}
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {cfg.label}
              </div>
              <div className="mt-1 flex items-baseline gap-2.5">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {formatIdNumber(activeMetric.value, cfg.decimals)}
                  {cfg.unit}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    diffFromNat === 0
                      ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      : (cfg.higherIsBetter ? diffFromNat > 0 : diffFromNat < 0)
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300"
                  }`}
                >
                  {diffFromNat >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {diffFromNat >= 0 ? "+" : ""}
                  {formatIdNumber(diffFromNat, cfg.decimals)}
                  {cfg.unit} vs Nasional
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-2 text-xs dark:border-slate-800">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">95% CI:</span>{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatCI(activeMetric.ciLow, activeMetric.ciHigh, cfg.decimals, cfg.unit)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">N Tertimbang:</span>{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatIntegerId(activeMetric.nWeighted)}
                    {activeMetric.isLowSample ? "*" : ""}
                  </span>
                </div>
              </div>
            </div>

            {activeMetric.isLowSample && (
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-200">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>
                  <strong>Catatan *N tertimbang &lt; 50:</strong> Ukuran sampel subkelompok depresi pada provinsi ini kecil (N={activeMetric.nWeighted}), sehingga rentang 95% CI lebar dan estimasi perlu diinterpretasikan secara hati-hati.
                </span>
              </div>
            )}

            {/* Quick 6-Indicator Mini Profile for Active Province */}
            <div className="mt-4 space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Profil Lengkap 6 Indikator — {activeProvince.shortName}
              </div>
              {PROVINCE_METRIC_LIST.map((item) => {
                const m = getProvinceMetric(activeProvince, item.key);
                const nat = getProvinceMetric(INDONESIA_RECORD, item.key);
                return (
                  <div
                    key={item.key}
                    onClick={() => onMetricChange(item.key)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-1.5 text-xs transition ${
                      item.key === metricKey
                        ? "border-teal-300 bg-teal-50/80 dark:border-teal-700 dark:bg-teal-950/40"
                        : "border-slate-200/80 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
                    }`}
                  >
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {item.shortLabel}
                    </span>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {formatIdNumber(m.value, item.decimals)}
                        {item.unit}
                        {m.isLowSample ? "*" : ""}
                      </span>
                      <span className="ml-1.5 text-[10px] text-slate-400">
                        (ID: {formatIdNumber(nat.value, item.decimals)}
                        {item.unit})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Extremes Summary */}
          <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-3 text-xs dark:border-slate-800">
            <button
              type="button"
              onClick={() => onSelectProvince(stats.highest.code)}
              className="rounded-lg border border-slate-200 bg-white p-2 text-left transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-[10px] font-semibold uppercase text-slate-500">Tertinggi #1</div>
              <div className="truncate font-bold text-slate-900 dark:text-white">
                {stats.highest.shortName}
              </div>
              <div className="font-semibold text-rose-600 dark:text-rose-400">
                {formatIdNumber(getProvinceMetric(stats.highest, metricKey).value, cfg.decimals)}
                {cfg.unit}
              </div>
            </button>
            <button
              type="button"
              onClick={() => onSelectProvince(stats.lowest.code)}
              className="rounded-lg border border-slate-200 bg-white p-2 text-left transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-[10px] font-semibold uppercase text-slate-500">Terendah #38</div>
              <div className="truncate font-bold text-slate-900 dark:text-white">
                {stats.lowest.shortName}
              </div>
              <div className="font-semibold text-teal-600 dark:text-teal-400">
                {formatIdNumber(getProvinceMetric(stats.lowest, metricKey).value, cfg.decimals)}
                {cfg.unit}
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
