"use client";

import React, { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Download, FileJson, Search, Table2 } from "lucide-react";
import {
  DemographicDimension,
  HOUSEHOLD_ART_COUNT_DISTRIBUTION,
  HOUSEHOLD_PSYCHOSIS_PASUNG,
  INDIVIDUAL_DEMOGRAPHIC_RECORDS,
  OFFICIAL_TABLES_CATALOG,
  PASUNG_REASONS,
  PASUNG_RECENT_3MO_NOTE,
  PROVINCE_RECORDS,
  PSYCHOSIS_FACILITY_UTILIZATION,
  PSYCHOSIS_MEDICATION_ADHERENCE,
  PSYCHOSIS_NON_ADHERENCE_REASONS,
  REGION_ORDER,
  REPORT_METADATA,
} from "@/data/ski2023-mental-health";
import {
  downloadCsv,
  downloadJson,
  formatCI,
  formatIdNumber,
  formatIntegerId,
} from "@/lib/mental-health-helpers";

interface NormalizedColumn {
  key: string;
  label: string;
  align?: "left" | "right";
  sortable?: boolean;
}

interface NormalizedRow {
  id: string;
  groupTag?: string;
  cells: Record<
    string,
    {
      display: string;
      sortValue: number | string;
      sub?: string;
      highlight?: "rose" | "teal" | "amber" | "emerald";
      barPct?: number;
      isLowSample?: boolean;
    }
  >;
  isNational?: boolean;
}

export default function InteractiveDataTable() {
  const [selectedTableId, setSelectedTableId] = useState<string>("t5.1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [groupFilter, setGroupFilter] = useState<string>("ALL");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const tableMeta = useMemo(
    () => OFFICIAL_TABLES_CATALOG.find((t) => t.id === selectedTableId) || OFFICIAL_TABLES_CATALOG[0],
    [selectedTableId]
  );

  const handleSelectTable = (id: string) => {
    setSelectedTableId(id);
    setGroupFilter("ALL");
    setSortKey(null);
    setSearchQuery("");
  };

  const { columns, rows, availableGroups } = useMemo<{
    columns: NormalizedColumn[];
    rows: NormalizedRow[];
    availableGroups: string[];
  }>(() => {
    if (selectedTableId === "t5.1") {
      return {
        availableGroups: [...REGION_ORDER],
        columns: [
          { key: "name", label: "Provinsi", align: "left", sortable: true },
          { key: "region", label: "Wilayah", align: "left", sortable: true },
          { key: "gejala", label: "Gejala (‰)", align: "right", sortable: true },
          { key: "gejalaCi", label: "95% CI Gejala", align: "right", sortable: false },
          { key: "diagnosis", label: "Gejala + Diagnosis (‰)", align: "right", sortable: true },
          { key: "diagnosisCi", label: "95% CI Diagnosis", align: "right", sortable: false },
          { key: "nWeighted", label: "N Tertimbang RT", align: "right", sortable: true },
        ],
        rows: PROVINCE_RECORDS.map((r) => ({
          id: r.code,
          groupTag: r.region,
          isNational: r.isNational,
          cells: {
            name: { display: r.name, sortValue: r.name },
            region: { display: r.region, sortValue: r.region },
            gejala: {
              display: formatIdNumber(r.psychosisGejala.value, 1),
              sortValue: r.psychosisGejala.value,
              barPct: (r.psychosisGejala.value / 10) * 100,
              highlight: "teal",
            },
            gejalaCi: {
              display: formatCI(r.psychosisGejala.ciLow, r.psychosisGejala.ciHigh, 1, ""),
              sortValue: r.psychosisGejala.ciLow,
            },
            diagnosis: {
              display: formatIdNumber(r.psychosisDiagnosis.value, 1),
              sortValue: r.psychosisDiagnosis.value,
              barPct: (r.psychosisDiagnosis.value / 10) * 100,
            },
            diagnosisCi: {
              display: formatCI(r.psychosisDiagnosis.ciLow, r.psychosisDiagnosis.ciHigh, 1, ""),
              sortValue: r.psychosisDiagnosis.ciLow,
            },
            nWeighted: {
              display: formatIntegerId(r.psychosisHouseholdsN),
              sortValue: r.psychosisHouseholdsN,
            },
          },
        })),
      };
    }

    if (selectedTableId === "t5.2") {
      const subset = HOUSEHOLD_PSYCHOSIS_PASUNG.filter((r) => r.group !== "Nasional");
      return {
        availableGroups: ["Tempat Tinggal", "Status Ekonomi"],
        columns: [
          { key: "group", label: "Kelompok", align: "left", sortable: true },
          { key: "label", label: "Karakteristik Rumah Tangga", align: "left", sortable: true },
          { key: "gejala", label: "Gejala (‰)", align: "right", sortable: true },
          { key: "gejalaCi", label: "95% CI Gejala", align: "right", sortable: false },
          { key: "diagnosis", label: "Gejala + Diagnosis (‰)", align: "right", sortable: true },
          { key: "diagnosisCi", label: "95% CI Diagnosis", align: "right", sortable: false },
          { key: "nWeighted", label: "N Tertimbang RT", align: "right", sortable: true },
        ],
        rows: subset.map((r) => ({
          id: r.label,
          groupTag: r.group,
          cells: {
            group: { display: r.group, sortValue: r.group },
            label: { display: r.label, sortValue: r.label },
            gejala: {
              display: formatIdNumber(r.psychosisGejala.value, 1),
              sortValue: r.psychosisGejala.value,
              barPct: (r.psychosisGejala.value / 10) * 100,
              highlight: "teal",
            },
            gejalaCi: {
              display: formatCI(r.psychosisGejala.ciLow, r.psychosisGejala.ciHigh, 1, ""),
              sortValue: r.psychosisGejala.ciLow,
            },
            diagnosis: {
              display: formatIdNumber(r.psychosisDiagnosis.value, 1),
              sortValue: r.psychosisDiagnosis.value,
            },
            diagnosisCi: {
              display: formatCI(r.psychosisDiagnosis.ciLow, r.psychosisDiagnosis.ciHigh, 1, ""),
              sortValue: r.psychosisDiagnosis.ciLow,
            },
            nWeighted: {
              display: formatIntegerId(r.psychosisRtN),
              sortValue: r.psychosisRtN,
            },
          },
        })),
      };
    }

    if (selectedTableId === "t5.3") {
      return {
        availableGroups: ["Tempat Tinggal", "Status Ekonomi"],
        columns: [
          { key: "group", label: "Kelompok", align: "left", sortable: true },
          { key: "label", label: "Karakteristik Rumah Tangga", align: "left", sortable: true },
          { key: "value", label: "Pernah Dipasung (%)", align: "right", sortable: true },
          { key: "ci", label: "95% CI (%)", align: "right", sortable: false },
          { key: "nWeighted", label: "N Tertimbang", align: "right", sortable: true },
        ],
        rows: HOUSEHOLD_PSYCHOSIS_PASUNG.map((r) => ({
          id: r.label,
          groupTag: r.group,
          isNational: r.group === "Nasional",
          cells: {
            group: { display: r.group, sortValue: r.group },
            label: { display: r.label, sortValue: r.label },
            value: {
              display: formatIdNumber(r.pasungLifetime.value, 1),
              sortValue: r.pasungLifetime.value,
              barPct: (r.pasungLifetime.value / 12) * 100,
              highlight: "rose",
            },
            ci: {
              display: formatCI(r.pasungLifetime.ciLow, r.pasungLifetime.ciHigh, 1, ""),
              sortValue: r.pasungLifetime.ciLow,
            },
            nWeighted: {
              display: formatIntegerId(r.pasungLifetimeN),
              sortValue: r.pasungLifetimeN,
            },
          },
        })),
      };
    }

    if (selectedTableId === "t4.65" || selectedTableId === "t5.12") {
      const list = selectedTableId === "t4.65" ? PASUNG_REASONS : PSYCHOSIS_NON_ADHERENCE_REASONS;
      return {
        availableGroups: [],
        columns: [
          { key: "reason", label: selectedTableId === "t4.65" ? "Alasan ART Dipasung" : "Alasan Ketidakpatuhan Minum Obat", align: "left", sortable: true },
          { key: "percent", label: "Proporsi (%)", align: "right", sortable: true },
          { key: "nWeighted", label: "N Tertimbang", align: "right", sortable: true },
        ],
        rows: list.map((r, i) => ({
          id: String(i),
          cells: {
            reason: { display: r.reason, sortValue: r.reason },
            percent: {
              display: formatIdNumber(r.percent, 1),
              sortValue: r.percent,
              barPct: r.percent,
              highlight: selectedTableId === "t4.65" ? "rose" : "amber",
            },
            nWeighted: { display: formatIntegerId(r.nWeighted), sortValue: r.nWeighted },
          },
        })),
      };
    }

    if (selectedTableId === "t5.10") {
      return {
        availableGroups: ["Tempat Tinggal", "Status Ekonomi"],
        columns: [
          { key: "group", label: "Kelompok", align: "left", sortable: true },
          { key: "label", label: "Karakteristik RT", align: "left", sortable: true },
          { key: "fasyankes", label: "Hanya Fasyankes (%)", align: "right", sortable: true },
          { key: "nonFasyankes", label: "Hanya Non-Kes (%)", align: "right", sortable: true },
          { key: "keduanya", label: "Keduanya (%)", align: "right", sortable: true },
          { key: "tidakBerobat", label: "Tidak Berobat (%)", align: "right", sortable: true },
          { key: "nWeighted", label: "N Tertimbang", align: "right", sortable: true },
        ],
        rows: PSYCHOSIS_FACILITY_UTILIZATION.map((r) => ({
          id: r.label,
          groupTag: r.group,
          isNational: r.group === "Nasional",
          cells: {
            group: { display: r.group, sortValue: r.group },
            label: { display: r.label, sortValue: r.label },
            fasyankes: {
              display: formatIdNumber(r.hanyaFasyankes.value, 1),
              sortValue: r.hanyaFasyankes.value,
              sub: `CI: ${formatCI(r.hanyaFasyankes.ciLow, r.hanyaFasyankes.ciHigh, 1, "")}`,
              highlight: "teal",
            },
            nonFasyankes: {
              display: formatIdNumber(r.hanyaNonFasyankes.value, 1),
              sortValue: r.hanyaNonFasyankes.value,
              sub: `CI: ${formatCI(r.hanyaNonFasyankes.ciLow, r.hanyaNonFasyankes.ciHigh, 1, "")}`,
            },
            keduanya: {
              display: formatIdNumber(r.keduanya.value, 1),
              sortValue: r.keduanya.value,
              sub: `CI: ${formatCI(r.keduanya.ciLow, r.keduanya.ciHigh, 1, "")}`,
            },
            tidakBerobat: {
              display: formatIdNumber(r.tidakBerobat.value, 1),
              sortValue: r.tidakBerobat.value,
              sub: `CI: ${formatCI(r.tidakBerobat.ciLow, r.tidakBerobat.ciHigh, 1, "")}`,
              highlight: "rose",
            },
            nWeighted: { display: formatIntegerId(r.nWeighted), sortValue: r.nWeighted },
          },
        })),
      };
    }

    if (selectedTableId === "t5.11") {
      return {
        availableGroups: ["Tempat Tinggal", "Status Ekonomi"],
        columns: [
          { key: "group", label: "Kelompok", align: "left", sortable: true },
          { key: "label", label: "Karakteristik RT", align: "left", sortable: true },
          { key: "minumSemua", label: "Ya, Semua (%)", align: "right", sortable: true },
          { key: "minumSebagian", label: "Ya, Tdk Semua (%)", align: "right", sortable: true },
          { key: "tidakMinum", label: "Tidak (%)", align: "right", sortable: true },
          { key: "nMinum", label: "N (1 Bln)", align: "right", sortable: true },
          { key: "rutin", label: "Rutin Semua (%)", align: "right", sortable: true },
          { key: "nRutin", label: "N (Rutin)", align: "right", sortable: true },
        ],
        rows: PSYCHOSIS_MEDICATION_ADHERENCE.map((r) => ({
          id: r.label,
          groupTag: r.group,
          isNational: r.group === "Nasional",
          cells: {
            group: { display: r.group, sortValue: r.group },
            label: { display: r.label, sortValue: r.label },
            minumSemua: { display: formatIdNumber(r.minumSemua, 1), sortValue: r.minumSemua, highlight: "emerald" },
            minumSebagian: { display: formatIdNumber(r.minumTidakSemua, 1), sortValue: r.minumTidakSemua },
            tidakMinum: { display: formatIdNumber(r.tidakMinum, 1), sortValue: r.tidakMinum, highlight: "rose" },
            nMinum: { display: formatIntegerId(r.nMinum1Bulan), sortValue: r.nMinum1Bulan },
            rutin: { display: formatIdNumber(r.rutinSemua, 1), sortValue: r.rutinSemua, highlight: "teal" },
            nRutin: { display: formatIntegerId(r.nRutin1Bulan), sortValue: r.nRutin1Bulan },
          },
        })),
      };
    }

    // Provincial Single Metric Tables: t5.4, t5.6, t5.8, t5.13
    if (["t5.4", "t5.6", "t5.8", "t5.13"].includes(selectedTableId)) {
      const decimals = selectedTableId === "t5.8" ? 2 : 1;
      const metricLabel =
        selectedTableId === "t5.4"
          ? "Depresi (%)"
          : selectedTableId === "t5.6"
          ? "Masalah Jiwa (%)"
          : selectedTableId === "t5.8"
          ? "Pikiran Mengakhiri Hidup (%)"
          : "Depresi Berobat (%)";
      const pick = (r: (typeof PROVINCE_RECORDS)[number]) =>
        selectedTableId === "t5.4"
          ? r.depresi
          : selectedTableId === "t5.6"
          ? r.masalahJiwa
          : selectedTableId === "t5.8"
          ? r.pikiranMengakhiriHidup
          : r.depresiBerobat;
      const maxVal = Math.max(...PROVINCE_RECORDS.map((r) => pick(r).value)) || 1;

      return {
        availableGroups: [...REGION_ORDER],
        columns: [
          { key: "name", label: "Provinsi", align: "left", sortable: true },
          { key: "region", label: "Wilayah", align: "left", sortable: true },
          { key: "value", label: metricLabel, align: "right", sortable: true },
          { key: "ci", label: "95% CI (%)", align: "right", sortable: false },
          { key: "nWeighted", label: "N Tertimbang", align: "right", sortable: true },
        ],
        rows: PROVINCE_RECORDS.map((r) => {
          const m = pick(r);
          return {
            id: r.code,
            groupTag: r.region,
            isNational: r.isNational,
            cells: {
              name: { display: r.name, sortValue: r.name },
              region: { display: r.region, sortValue: r.region },
              value: {
                display: formatIdNumber(m.value, decimals),
                sortValue: m.value,
                barPct: (m.value / maxVal) * 100,
                highlight: selectedTableId === "t5.13" ? "emerald" : "rose",
              },
              ci: {
                display: formatCI(m.ciLow, m.ciHigh, decimals, ""),
                sortValue: m.ciLow,
              },
              nWeighted: {
                display: `${formatIntegerId(m.nWeighted)}${m.isLowSample ? "*" : ""}`,
                sortValue: m.nWeighted,
                isLowSample: m.isLowSample,
              },
            },
          };
        }),
      };
    }

    // Individual Demographic Tables: t5.5, t5.7, t5.9, t5.14
    const decimals = selectedTableId === "t5.9" ? 2 : 1;
    const metricLabel =
      selectedTableId === "t5.5"
        ? "Depresi (%)"
        : selectedTableId === "t5.7"
        ? "Masalah Jiwa (%)"
        : selectedTableId === "t5.9"
        ? "Pikiran Mengakhiri Hidup (%)"
        : "Depresi Berobat (%)";
    const pick = (r: (typeof INDIVIDUAL_DEMOGRAPHIC_RECORDS)[number]) =>
      selectedTableId === "t5.5"
        ? r.depresi
        : selectedTableId === "t5.7"
        ? r.masalahJiwa
        : selectedTableId === "t5.9"
        ? r.pikiranMengakhiriHidup
        : r.depresiBerobat;
    const maxVal = Math.max(...INDIVIDUAL_DEMOGRAPHIC_RECORDS.map((r) => pick(r).value)) || 1;
    const dims: DemographicDimension[] = [
      "Kelompok Umur",
      "Jenis Kelamin",
      "Pendidikan",
      "Pekerjaan",
      "Tempat Tinggal",
      "Status Ekonomi",
    ];

    return {
      availableGroups: dims,
      columns: [
        { key: "group", label: "Dimensi", align: "left", sortable: true },
        { key: "label", label: "Karakteristik Responden", align: "left", sortable: true },
        { key: "value", label: metricLabel, align: "right", sortable: true },
        { key: "ci", label: "95% CI (%)", align: "right", sortable: false },
        { key: "nWeighted", label: "N Tertimbang", align: "right", sortable: true },
      ],
      rows: INDIVIDUAL_DEMOGRAPHIC_RECORDS.map((r) => {
        const m = pick(r);
        return {
          id: `${r.group}-${r.label}`,
          groupTag: r.group,
          cells: {
            group: { display: r.group, sortValue: r.group },
            label: { display: r.label, sortValue: r.label },
            value: {
              display: formatIdNumber(m.value, decimals),
              sortValue: m.value,
              barPct: (m.value / maxVal) * 100,
              highlight: selectedTableId === "t5.14" ? "emerald" : "rose",
            },
            ci: {
              display: formatCI(m.ciLow, m.ciHigh, decimals, ""),
              sortValue: m.ciLow,
            },
            nWeighted: {
              display: `${formatIntegerId(m.nWeighted)}${m.isLowSample ? "*" : ""}`,
              sortValue: m.nWeighted,
              isLowSample: m.isLowSample,
            },
          },
        };
      }),
    };
  }, [selectedTableId]);

  const filteredAndSortedRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = rows.filter((row) => {
      if (groupFilter !== "ALL" && row.groupTag !== groupFilter && !row.isNational) {
        return false;
      }
      if (!q) return true;
      return Object.values(row.cells).some((cell) =>
        cell.display.toLowerCase().includes(q)
      );
    });

    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      // Keep INDONESIA pinned at bottom unless sorting explicitly? Better to sort naturally!
      const va = a.cells[sortKey]?.sortValue ?? "";
      const vb = b.cells[sortKey]?.sortValue ?? "";
      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va;
      }
      return sortDir === "asc"
        ? String(va).localeCompare(String(vb), "id")
        : String(vb).localeCompare(String(va), "id");
    });
  }, [rows, searchQuery, groupFilter, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const handleExportCurrentCsv = () => {
    const headers = columns.map((c) => c.label);
    const dataRows = filteredAndSortedRows.map((r) =>
      columns.map((c) => {
        const cell = r.cells[c.key];
        return cell.sub ? `${cell.display} (${cell.sub})` : cell.display;
      })
    );
    downloadCsv(`ski2023-${selectedTableId}.csv`, headers, dataRows);
  };

  const handleExportCurrentJson = () => {
    const payload = {
      table: tableMeta,
      exportedRows: filteredAndSortedRows.map((r) => {
        const obj: Record<string, string | number> = {};
        for (const c of columns) {
          obj[c.label] = r.cells[c.key].display;
        }
        return obj;
      }),
    };
    downloadJson(`ski2023-${selectedTableId}.json`, payload);
  };

  const handleExportFullChapterJson = () => {
    downloadJson("ski2023-bab5-kesehatan-jiwa-lengkap.json", {
      metadata: REPORT_METADATA,
      tablesCatalog: OFFICIAL_TABLES_CATALOG,
      provinces: PROVINCE_RECORDS,
      householdPsychosisPasung: HOUSEHOLD_PSYCHOSIS_PASUNG,
      householdArtDistribution: HOUSEHOLD_ART_COUNT_DISTRIBUTION,
      pasungRecent3Mo: PASUNG_RECENT_3MO_NOTE,
      pasungReasons: PASUNG_REASONS,
      psychosisFacilityUtilization: PSYCHOSIS_FACILITY_UTILIZATION,
      psychosisMedicationAdherence: PSYCHOSIS_MEDICATION_ADHERENCE,
      psychosisNonAdherenceReasons: PSYCHOSIS_NON_ADHERENCE_REASONS,
      individualDemographics: INDIVIDUAL_DEMOGRAPHIC_RECORDS,
    });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
      {/* Header + Export Controls */}
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Table2 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Penjelajah 15 Tabel Resmi SKI 2023 · {tableMeta.granularity}
            </span>
          </div>
          <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {tableMeta.tableNumber}: {tableMeta.title}
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Halaman Laporan: {tableMeta.reportPage} (PDF Halaman {tableMeta.pdfPage}) · Satuan:{" "}
            <strong>{tableMeta.unit}</strong>
            {tableMeta.notes ? ` · ${tableMeta.notes}` : ""}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleExportCurrentCsv}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Download className="h-3.5 w-3.5" />
            Ekspor CSV
          </button>
          <button
            type="button"
            onClick={handleExportCurrentJson}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <FileJson className="h-3.5 w-3.5" />
            Ekspor JSON
          </button>
          <button
            type="button"
            onClick={handleExportFullChapterJson}
            className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-700"
          >
            <Download className="h-3.5 w-3.5" />
            Unduh Semua 15 Tabel (JSON)
          </button>
        </div>
      </div>

      {/* Table Selector, Search, & Group Filter */}
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <label className="block text-[11px] font-semibold uppercase text-slate-500 dark:text-slate-400">
            Pilih Tabel Resmi Bab 5 (15 Tabel Tersedia)
          </label>
          <select
            value={selectedTableId}
            onChange={(e) => handleSelectTable(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {OFFICIAL_TABLES_CATALOG.map((t) => (
              <option key={t.id} value={t.id}>
                {t.tableNumber} (Hal. {t.reportPage}) — {t.title}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-3">
          <label className="block text-[11px] font-semibold uppercase text-slate-500 dark:text-slate-400">
            Cari Baris
          </label>
          <div className="relative mt-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari provinsi / kategori..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-8 text-xs text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <label className="block text-[11px] font-semibold uppercase text-slate-500 dark:text-slate-400">
            Filter Kelompok
          </label>
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            disabled={availableGroups.length === 0}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="ALL">Semua Kelompok ({rows.length} baris)</option>
            {availableGroups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300">
              <th className="w-10 px-3 py-2.5 text-center font-semibold">#</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-2.5 font-semibold ${
                    col.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <span>{col.label}</span>
                      {sortKey === col.key ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-teal-600" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-teal-600" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-40" />
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredAndSortedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                >
                  Tidak ada baris data yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;.
                </td>
              </tr>
            ) : (
              filteredAndSortedRows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={
                    row.isNational
                      ? "bg-teal-50/70 font-semibold dark:bg-teal-950/40"
                      : "hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                  }
                >
                  <td className="px-3 py-2.5 text-center text-[11px] text-slate-400">
                    {idx + 1}
                  </td>
                  {columns.map((col) => {
                    const cell = row.cells[col.key];
                    const textColor =
                      cell.highlight === "rose"
                        ? "font-bold text-rose-600 dark:text-rose-400"
                        : cell.highlight === "teal"
                        ? "font-bold text-teal-700 dark:text-teal-300"
                        : cell.highlight === "emerald"
                        ? "font-bold text-emerald-600 dark:text-emerald-400"
                        : cell.highlight === "amber"
                        ? "font-bold text-amber-600 dark:text-amber-400"
                        : "text-slate-800 dark:text-slate-200";

                    return (
                      <td
                        key={col.key}
                        className={`px-3 py-2.5 ${
                          col.align === "right" ? "text-right" : "text-left"
                        } ${textColor}`}
                      >
                        <div className={col.align === "right" ? "flex flex-col items-end" : ""}>
                          <span className={cell.isLowSample ? "text-amber-600 dark:text-amber-400 font-semibold" : ""}>
                            {cell.display}
                          </span>
                          {cell.sub && (
                            <span className="text-[10px] font-normal text-slate-400">
                              {cell.sub}
                            </span>
                          )}
                          {typeof cell.barPct === "number" && (
                            <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                              <div
                                className="h-full rounded-full bg-teal-600 dark:bg-teal-400"
                                style={{ width: `${Math.min(100, Math.max(2, cell.barPct))}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <span>
          Menampilkan <strong>{filteredAndSortedRows.length}</strong> dari {rows.length} baris pada{" "}
          {tableMeta.tableNumber}.
        </span>
        <span>
          Tanda <strong>*</strong> menandakan N tertimbang &lt; 50 (ketidakpastian sampling tinggi).
        </span>
      </div>
    </section>
  );
}
