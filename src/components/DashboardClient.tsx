"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  BarChart2,
  BookOpen,
  Brain,
  ExternalLink,
  HeartPulse,
  Lock,
  MapPin,
  Moon,
  ShieldCheck,
  Sun,
  Table2,
  Users,
} from "lucide-react";
import {
  INDONESIA_RECORD,
  PROVINCES_38,
  REPORT_METADATA,
} from "@/data/ski2023-mental-health";
import { ProvinceMetricKey, formatIdNumber } from "@/lib/mental-health-helpers";
import IndonesiaMap38 from "./IndonesiaMap38";
import ProvinceComparisonSection from "./ProvinceComparisonSection";
import PsychosisPasungSection from "./PsychosisPasungSection";
import TreatmentGapScatter from "./TreatmentGapScatter";
import DemographicBreakdownSection from "./DemographicBreakdownSection";
import InteractiveDataTable from "./InteractiveDataTable";
import MethodologyAndPdfPanel from "./MethodologyAndPdfPanel";

type DashboardTab = "overview" | "psychosis" | "depression" | "demographics" | "tables";

const TABS: { id: DashboardTab; label: string; shortLabel: string; icon: React.ReactNode }[] = [
  {
    id: "overview",
    label: "Ringkasan & Peta 38 Provinsi",
    shortLabel: "Peta & Ringkasan",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    id: "psychosis",
    label: "Psikosis, Pemasungan & Obat",
    shortLabel: "Psikosis & Pasung",
    icon: <Lock className="h-4 w-4" />,
  },
  {
    id: "depression",
    label: "Depresi, SRQ-20 & Treatment Gap",
    shortLabel: "Depresi & SRQ-20",
    icon: <Brain className="h-4 w-4" />,
  },
  {
    id: "demographics",
    label: "Disparitas Demografi & Sosioekonomi",
    shortLabel: "Demografi",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "tables",
    label: "Tabel Data Resmi (15) & PDF",
    shortLabel: "15 Tabel & PDF",
    icon: <Table2 className="h-4 w-4" />,
  },
];

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [metricKey, setMetricKey] = useState<ProvinceMetricKey>("depresi");
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("JB");
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const handleTabSwitch = (tab: DashboardTab) => {
    setActiveTab(tab);
    if (tab === "psychosis" && !metricKey.startsWith("psychosis")) {
      setMetricKey("psychosisGejala");
    } else if (
      tab === "depression" &&
      !["depresi", "masalahJiwa", "pikiranMengakhiriHidup", "depresiBerobat"].includes(metricKey)
    ) {
      setMetricKey("depresi");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      {/* Top Official Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 text-white shadow-sm">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-bold text-teal-800 dark:bg-teal-950/80 dark:text-teal-300">
                    <ShieldCheck className="h-3 w-3" />
                    BKPK Kementerian Kesehatan RI
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    SKI 2023 dalam Angka · {REPORT_METADATA.chapter} ({REPORT_METADATA.reportPages})
                  </span>
                </div>
                <h1 className="mt-0.5 text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-xl">
                  Dasbor Analitik Kesehatan Jiwa Indonesia 2023
                </h1>
              </div>
            </div>

            {/* Quick Controls: Province Selector + PDF Link + Theme Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 dark:border-slate-800 dark:bg-slate-900">
                <MapPin className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                <select
                  value={selectedProvinceCode}
                  onChange={(e) => setSelectedProvinceCode(e.target.value)}
                  aria-label="Pilih provinsi fokus"
                  className="bg-transparent text-xs font-semibold text-slate-800 outline-none dark:text-slate-100"
                >
                  {PROVINCES_38.map((p) => (
                    <option key={p.code} value={p.code} className="dark:bg-slate-900">
                      Fokus: {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <a
                href="/api/pdf#page=181"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-700"
              >
                <BookOpen className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                PDF Bab 5
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Ubah tema terang atau gelap"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {isDark ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-slate-600" />
                    <span className="hidden sm:inline">Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 5-Tab Navigation */}
          <nav
            aria-label="Navigasi bagian dasbor"
            className="mt-3 flex gap-1.5 overflow-x-auto pb-1"
          >
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabSwitch(tab.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* 5 Top National KPI Cards */}
        <section aria-label="Ringkasan Indikator Nasional" className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center justify-between text-[11px] font-semibold text-teal-700 dark:text-teal-400">
              <span>Psikosis / Skizofrenia</span>
              <span className="rounded bg-teal-50 px-1.5 py-0.5 dark:bg-teal-950">T5.1</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {formatIdNumber(INDONESIA_RECORD.psychosisGejala.value, 1)}‰
              </span>
              <span className="text-xs font-medium text-slate-500">
                ({formatIdNumber(INDONESIA_RECORD.psychosisDiagnosis.value, 1)}‰ diag.)
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              RT memiliki ART psikosis · N=315.621 RT
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center justify-between text-[11px] font-semibold text-rose-700 dark:text-rose-400">
              <span>Pemasungan ART</span>
              <span className="rounded bg-rose-50 px-1.5 py-0.5 dark:bg-rose-950">T5.3</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                6,6%
              </span>
              <span className="text-xs font-medium text-slate-500">(25,2% 3 bln)</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Pernah pasung seumur hidup (Desa 8,4%)
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center justify-between text-[11px] font-semibold text-rose-700 dark:text-rose-400">
              <span>Depresi (MINI ≥15 th)</span>
              <span className="rounded bg-rose-50 px-1.5 py-0.5 dark:bg-rose-950">T5.4</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {formatIdNumber(INDONESIA_RECORD.depresi.value, 1)}%
              </span>
              <span className="text-xs font-medium text-slate-500">
                (CI 1,3–1,5%)
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Tertinggi usia 15–24 th (2,0%) &amp; Jabar (3,3%)
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center justify-between text-[11px] font-semibold text-amber-700 dark:text-amber-400">
              <span>Masalah Jiwa &amp; Ide</span>
              <span className="rounded bg-amber-50 px-1.5 py-0.5 dark:bg-amber-950">T5.6/8</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {formatIdNumber(INDONESIA_RECORD.masalahJiwa.value, 1)}%
              </span>
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                / {formatIdNumber(INDONESIA_RECORD.pikiranMengakhiriHidup.value, 2)}%
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              SRQ-20 ≥ 6 (2,0%) · Ide akhiri hidup (0,25%)
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/30">
            <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              <span>Depresi yang Berobat</span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 dark:bg-emerald-900">T5.13</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
                {formatIdNumber(INDONESIA_RECORD.depresiBerobat.value, 1)}%
              </span>
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                (87,3% gap)
              </span>
            </div>
            <p className="mt-1 text-[11px] text-emerald-900/75 dark:text-emerald-200/75">
              Hanya 1 dari 8 penderita depresi berobat (N=8.680)
            </p>
          </div>
        </section>

        {/* Tab 1: Ringkasan & Peta 38 Provinsi */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <IndonesiaMap38
              metricKey={metricKey}
              onMetricChange={setMetricKey}
              selectedProvinceCode={selectedProvinceCode}
              onSelectProvince={setSelectedProvinceCode}
              isDark={isDark}
            />

            <ProvinceComparisonSection
              metricKey={metricKey}
              onMetricChange={setMetricKey}
              selectedProvinceCode={selectedProvinceCode}
              onSelectProvince={setSelectedProvinceCode}
            />

            {/* Key Policy Synthesis Cards */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Sintesis Temuan Kunci Bab 5: Kesehatan Jiwa (SKI 2023)
                </h2>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="text-xs font-bold text-rose-700 dark:text-rose-400">
                    1. Kesenjangan Pengobatan Depresi (87,3%)
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    Dari penduduk usia ≥15 tahun yang mengalami depresi (1,4% nasional), hanya <strong>12,7%</strong> yang berobat ke tenaga kesehatan. Kelompok pelajar/mahasiswa (&ldquo;Sekolah&rdquo;) dan usia muda 15–24 tahun memiliki prevalensi tertinggi (2,0%) namun cakupan pengobatan terendah (9,3% &amp; 10,4%).
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="text-xs font-bold text-teal-700 dark:text-teal-400">
                    2. Beban Ekonomi pada Psikosis &amp; Pasung
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    Rumah tangga kuintil ekonomi <strong>Terbawah</strong> mencatat prevalensi psikosis tertinggi (<strong>8,8‰</strong> vs <strong>1,5‰</strong> di Teratas) dan riwayat pasung tertinggi (<strong>9,9%</strong> vs <strong>3,2%</strong>). DI Yogyakarta menempati posisi tertinggi sebaran psikosis per provinsi (9,3‰ gejala / 7,8‰ diagnosis).
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    3. Kepatuhan Obat &amp; Disparitas Desa-Kota
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    Sebanyak <strong>37,2%</strong> RT dengan ART psikosis yang pernah ke fasyankes tidak minum/suntik obat dalam 1 bulan terakhir (perdesaan 47,4% vs perkotaan 31,0%). Alasan utama ketidakpatuhan adalah bosan/malas/lupa (27,5%) dan merasa sudah sehat (25,4%).
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: Psikosis, Pemasungan & Obat */}
        {activeTab === "psychosis" && (
          <div className="space-y-6">
            <PsychosisPasungSection />
            <ProvinceComparisonSection
              metricKey={metricKey.startsWith("psychosis") ? metricKey : "psychosisGejala"}
              onMetricChange={setMetricKey}
              selectedProvinceCode={selectedProvinceCode}
              onSelectProvince={setSelectedProvinceCode}
            />
          </div>
        )}

        {/* Tab 3: Depresi, SRQ-20 & Pikiran Mengakhiri Hidup */}
        {activeTab === "depression" && (
          <div className="space-y-6">
            <TreatmentGapScatter
              selectedProvinceCode={selectedProvinceCode}
              onSelectProvince={setSelectedProvinceCode}
              isDark={isDark}
            />
            <ProvinceComparisonSection
              metricKey={
                ["depresi", "masalahJiwa", "pikiranMengakhiriHidup", "depresiBerobat"].includes(metricKey)
                  ? metricKey
                  : "depresi"
              }
              onMetricChange={setMetricKey}
              selectedProvinceCode={selectedProvinceCode}
              onSelectProvince={setSelectedProvinceCode}
            />
          </div>
        )}

        {/* Tab 4: Disparitas Demografi & Sosioekonomi */}
        {activeTab === "demographics" && <DemographicBreakdownSection />}

        {/* Tab 5: 15 Tabel Resmi & Metodologi PDF */}
        {activeTab === "tables" && (
          <div className="space-y-6">
            <InteractiveDataTable />
            <MethodologyAndPdfPanel />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200 bg-white/70 py-6 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <strong className="text-slate-800 dark:text-slate-200">
              Sumber Data Resmi:
            </strong>{" "}
            {REPORT_METADATA.title} — {REPORT_METADATA.chapter} ({REPORT_METADATA.reportPages}),{" "}
            {REPORT_METADATA.institution}.
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("tables")}
              className="inline-flex items-center gap-1 font-semibold text-teal-600 hover:underline dark:text-teal-400"
            >
              <BarChart2 className="h-3.5 w-3.5" />
              Eksplorasi 15 Tabel &amp; Rumus
            </button>
            <span>·</span>
            <a
              href="/api/pdf#page=181"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal-600 hover:underline dark:text-teal-400"
            >
              Dokumen PDF Asli
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
