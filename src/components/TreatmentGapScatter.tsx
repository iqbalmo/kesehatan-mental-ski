"use client";

import React, { useMemo, useState } from "react";
import { AlertTriangle, Crosshair, HeartHandshake } from "lucide-react";
import {
  INDONESIA_RECORD,
  PROVINCES_38,
  ProvinceMentalHealthRecord,
} from "@/data/ski2023-mental-health";
import { formatCI, formatIdNumber, formatIntegerId } from "@/lib/mental-health-helpers";

interface TreatmentGapScatterProps {
  selectedProvinceCode: string;
  onSelectProvince: (code: string) => void;
  isDark: boolean;
}

export default function TreatmentGapScatter({
  selectedProvinceCode,
  onSelectProvince,
  isDark,
}: TreatmentGapScatterProps) {
  const [hideLowSample, setHideLowSample] = useState(false);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [xAxisMode, setXAxisMode] = useState<"depresi" | "masalahJiwa" | "pikiran">("depresi");

  const visibleProvinces = useMemo(
    () => (hideLowSample ? PROVINCES_38.filter((p) => !p.depresiBerobat.isLowSample) : PROVINCES_38),
    [hideLowSample]
  );

  const xConfig = useMemo(() => {
    if (xAxisMode === "masalahJiwa") {
      return {
        label: "Masalah Kesehatan Jiwa SRQ-20 (%)",
        natVal: INDONESIA_RECORD.masalahJiwa.value,
        max: 4.8,
        decimals: 1,
        getVal: (p: ProvinceMentalHealthRecord) => p.masalahJiwa.value,
      };
    }
    if (xAxisMode === "pikiran") {
      return {
        label: "Pikiran Mengakhiri Hidup (%)",
        natVal: INDONESIA_RECORD.pikiranMengakhiriHidup.value,
        max: 1.8,
        decimals: 2,
        getVal: (p: ProvinceMentalHealthRecord) => p.pikiranMengakhiriHidup.value,
      };
    }
    return {
      label: "Prevalensi Depresi MINI (%)",
      natVal: INDONESIA_RECORD.depresi.value,
      max: 3.6,
      decimals: 1,
      getVal: (p: ProvinceMentalHealthRecord) => p.depresi.value,
    };
  }, [xAxisMode]);

  const yMax = 52;
  const natY = INDONESIA_RECORD.depresiBerobat.value; // 12.7%

  const W = 720;
  const H = 400;
  const pad = { top: 28, right: 28, bottom: 48, left: 54 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const toX = (v: number) => pad.left + (Math.min(xConfig.max, Math.max(0, v)) / xConfig.max) * plotW;
  const toY = (v: number) => pad.top + plotH - (Math.min(yMax, Math.max(0, v)) / yMax) * plotH;

  const natLineX = toX(xConfig.natVal);
  const natLineY = toY(natY);

  const activeProv = useMemo(() => {
    const code = hoveredCode || selectedProvinceCode;
    return PROVINCES_38.find((p) => p.code === code) || PROVINCES_38[11];
  }, [hoveredCode, selectedProvinceCode]);

  const treatmentGapPct = 100 - INDONESIA_RECORD.depresiBerobat.value; // 87.3%

  return (
    <div className="space-y-6">
      {/* Top 3 Mental Health Burden Cards (Subbab 5.2, 5.3, 5.5) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-rose-600 dark:text-rose-400">
            Subbab 5.2 · Instrumen MINI (Tabel 5.4)
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">1,4%</span>
            <span className="text-xs text-slate-500">(95% CI: 1,3–1,5%)</span>
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            Prevalensi depresi 2 minggu terakhir pada penduduk ≥15 tahun (N = 630.827). Tertinggi: Jawa Barat (3,3%) &amp; Kaltim (2,2%).
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            Subbab 5.3 · WHO SRQ-20 ≥ 6 (Tabel 5.6 &amp; 5.8)
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">2,0%</span>
            <span className="text-xs text-slate-500">&amp; 0,25% ide bunuh diri</span>
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            Masalah kesehatan jiwa 1 bulan terakhir (tertinggi: Jawa Barat 4,4%). Pikiran mengakhiri hidup tertinggi: Papua Tengah (1,64%) &amp; Kaltim (0,50%).
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Subbab 5.5 · Treatment Gap (Tabel 5.13)
            </span>
            <HeartHandshake className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">
              12,7%
            </span>
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
              ({formatIdNumber(treatmentGapPct, 1)}% belum berobat)
            </span>
          </div>
          <p className="mt-1 text-xs text-emerald-900/80 dark:text-emerald-200/80">
            Hanya ~1 dari 8 penduduk ≥15 tahun dengan depresi yang mendapat penanganan tenaga kesehatan di fasyankes (N = 8.680).
          </p>
        </div>
      </div>

      {/* Quadrant Scatter Plot */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Crosshair className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Analisis Kuadran Kebijakan · Beban vs Akses Pengobatan Depresi
              </span>
            </div>
            <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
              Pemetaan Treatment Gap 38 Provinsi (Tabel 5.4/5.6/5.8 vs Tabel 5.13)
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={xAxisMode}
              onChange={(e) => setXAxisMode(e.target.value as "depresi" | "masalahJiwa" | "pikiran")}
              aria-label="Pilih variabel sumbu X"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="depresi">Sumbu X: Prevalensi Depresi MINI (T5.4)</option>
              <option value="masalahJiwa">Sumbu X: Masalah Jiwa SRQ-20 (T5.6)</option>
              <option value="pikiran">Sumbu X: Pikiran Mengakhiri Hidup (T5.8)</option>
            </select>

            <button
              type="button"
              onClick={() => setHideLowSample((v) => !v)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                hideLowSample
                  ? "border-teal-600 bg-teal-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {hideLowSample ? "Menampilkan N ≥ 50 (19 Prov)" : "Sembunyikan *N < 50"}
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-12">
          <div className="overflow-x-auto xl:col-span-8">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="h-auto min-w-[600px] w-full select-none"
              role="img"
              aria-label="Scatter plot kuadran treatment gap 38 provinsi"
            >
              {/* Quadrant Shading */}
              {/* Bottom-Right: HIGH BURDEN, LOW TREATMENT -> Critical Priority */}
              <rect
                x={natLineX}
                y={natLineY}
                width={pad.left + plotW - natLineX}
                height={pad.top + plotH - natLineY}
                fill={isDark ? "rgba(225, 29, 72, 0.12)" : "rgba(255, 228, 230, 0.55)"}
              />
              {/* Top-Left: LOW BURDEN, HIGH TREATMENT */}
              <rect
                x={pad.left}
                y={pad.top}
                width={natLineX - pad.left}
                height={natLineY - pad.top}
                fill={isDark ? "rgba(16, 185, 129, 0.08)" : "rgba(209, 250, 229, 0.45)"}
              />

              {/* Grid lines */}
              {[0, 10, 20, 30, 40, 50].map((yv) => {
                const py = toY(yv);
                return (
                  <g key={yv}>
                    <line
                      x1={pad.left}
                      y1={py}
                      x2={pad.left + plotW}
                      y2={py}
                      stroke={isDark ? "#1e293b" : "#e2e8f0"}
                      strokeWidth="1"
                    />
                    <text
                      x={pad.left - 8}
                      y={py + 3}
                      textAnchor="end"
                      fontSize="10"
                      fill={isDark ? "#94a3b8" : "#64748b"}
                    >
                      {yv}%
                    </text>
                  </g>
                );
              })}

              {/* National Reference Crosshairs */}
              <line
                x1={natLineX}
                y1={pad.top}
                x2={natLineX}
                y2={pad.top + plotH}
                stroke={isDark ? "#94a3b8" : "#475569"}
                strokeWidth="1.4"
                strokeDasharray="5 4"
              />
              <line
                x1={pad.left}
                y1={natLineY}
                x2={pad.left + plotW}
                y2={natLineY}
                stroke={isDark ? "#94a3b8" : "#475569"}
                strokeWidth="1.4"
                strokeDasharray="5 4"
              />

              {/* Quadrant Annotations */}
              <text
                x={pad.left + plotW - 8}
                y={pad.top + plotH - 10}
                textAnchor="end"
                fontSize="10"
                fontWeight="700"
                fill={isDark ? "#fda4af" : "#be123c"}
              >
                PRIORITAS UTAMA: Beban Tinggi, Berobat Rendah
              </text>
              <text
                x={pad.left + 8}
                y={pad.top + 16}
                fontSize="10"
                fontWeight="700"
                fill={isDark ? "#6ee7b7" : "#047857"}
              >
                Beban Rendah, Akses Berobat Tinggi
              </text>
              <text
                x={pad.left + plotW - 8}
                y={pad.top + 16}
                textAnchor="end"
                fontSize="10"
                fontWeight="600"
                fill={isDark ? "#fcd34d" : "#b45309"}
              >
                Beban Tinggi, Akses Di Atas Rata-rata
              </text>

              {/* Axis Labels */}
              <text
                x={pad.left + plotW / 2}
                y={H - 10}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={isDark ? "#cbd5e1" : "#334155"}
              >
                {xConfig.label} — Garis vertikal Nasional: {formatIdNumber(xConfig.natVal, xConfig.decimals)}%
              </text>
              <text
                x={14}
                y={pad.top + plotH / 2}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={isDark ? "#cbd5e1" : "#334155"}
                transform={`rotate(-90 14 ${pad.top + plotH / 2})`}
              >
                Depresi yang Berobat (%) — Nasional: 12,7%
              </text>

              {/* Province Points */}
              {visibleProvinces.map((p) => {
                const xv = xConfig.getVal(p);
                const yv = p.depresiBerobat.value;
                const cx = toX(xv);
                const cy = toY(yv);
                const isSelected = p.code === selectedProvinceCode;
                const isHovered = p.code === hoveredCode;
                const isHighPriority = xv > xConfig.natVal && yv < natY;
                const lowN = p.depresiBerobat.isLowSample;

                return (
                  <g
                    key={p.code}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredCode(p.code)}
                    onMouseLeave={() => setHoveredCode(null)}
                    onClick={() => onSelectProvince(p.code)}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 8 : isHovered ? 7.5 : 5.5}
                      fill={
                        lowN
                          ? isDark
                            ? "rgba(148, 163, 184, 0.35)"
                            : "rgba(100, 116, 139, 0.25)"
                          : isHighPriority
                          ? "#e11d48"
                          : "#0d9488"
                      }
                      stroke={
                        isSelected
                          ? isDark
                            ? "#ffffff"
                            : "#0f172a"
                          : lowN
                          ? "#64748b"
                          : "#ffffff"
                      }
                      strokeWidth={isSelected ? 2.4 : 1.3}
                      strokeDasharray={lowN ? "2 2" : undefined}
                    />
                    {(isSelected ||
                      isHovered ||
                      ["JB", "KI", "JK", "PP", "PT", "BT", "SN", "AC"].includes(p.code)) && (
                      <text
                        x={cx}
                        y={cy - 9}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="700"
                        fill={isDark ? "#f1f5f9" : "#0f172a"}
                        style={{
                          paintOrder: "stroke",
                          stroke: isDark ? "#020617" : "#ffffff",
                          strokeWidth: "3px",
                        }}
                      >
                        {p.shortName}
                        {lowN ? "*" : ""}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right Insight & Selected Province Detail */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60 xl:col-span-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Inspeksi Provinsi pada Kuadran
              </span>
              <h4 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                {activeProv.name}
              </h4>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between rounded-lg bg-white px-3 py-2 dark:bg-slate-900">
                  <span className="text-slate-500">Depresi (MINI):</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    {formatIdNumber(activeProv.depresi.value, 1)}%{" "}
                    <span className="font-normal text-slate-400">
                      ({formatCI(activeProv.depresi.ciLow, activeProv.depresi.ciHigh, 1, "")})
                    </span>
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-white px-3 py-2 dark:bg-slate-900">
                  <span className="text-slate-500">Masalah Jiwa (SRQ-20):</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">
                    {formatIdNumber(activeProv.masalahJiwa.value, 1)}%
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-white px-3 py-2 dark:bg-slate-900">
                  <span className="text-slate-500">Pikiran Mengakhiri Hidup:</span>
                  <span className="font-bold text-rose-700 dark:text-rose-300">
                    {formatIdNumber(activeProv.pikiranMengakhiriHidup.value, 2)}%
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-white px-3 py-2 dark:bg-slate-900">
                  <span className="text-slate-500">Depresi Berobat:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {formatIdNumber(activeProv.depresiBerobat.value, 1)}%
                    {activeProv.depresiBerobat.isLowSample ? "*" : ""}{" "}
                    <span className="font-normal text-slate-400">
                      (N={formatIntegerId(activeProv.depresiBerobat.nWeighted)})
                    </span>
                  </span>
                </div>
              </div>

              {activeProv.depresiBerobat.isLowSample && (
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-[11px] text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-200">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    Lingkaran abu-abu berputus-putus menandakan N tertimbang depresi &lt; 50 (pada {activeProv.shortName}: N={activeProv.depresiBerobat.nWeighted}*), sehingga proporsi berobat memiliki CI lebar.
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3 text-xs text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200">
              <strong>Sorotan Jawa Barat &amp; Kalimantan Timur:</strong> Jawa Barat memiliki prevalensi depresi tertinggi di Indonesia (<strong>3,3%</strong>; N depresi = 3.748 dari 8.680 total nasional), tetapi hanya <strong>8,7%</strong> yang berobat (91,3% tidak tertangani). Demikian pula Kaltim (depresi <strong>2,2%</strong>, berobat hanya <strong>9,0%</strong>).
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
