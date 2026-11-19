import { MetricPoint, ProvinceMentalHealthRecord } from "@/data/ski2023-mental-health";

export type ProvinceMetricKey =
  | "psychosisGejala"
  | "psychosisDiagnosis"
  | "depresi"
  | "masalahJiwa"
  | "pikiranMengakhiriHidup"
  | "depresiBerobat";

export interface ProvinceMetricConfig {
  key: ProvinceMetricKey;
  label: string;
  shortLabel: string;
  unit: "%" | "‰";
  decimals: number;
  tableRef: string;
  subchapter: string;
  targetGroup: string;
  higherIsBetter: boolean;
  accentColor: string;
  description: string;
}

export const PROVINCE_METRICS_CONFIG: Record<ProvinceMetricKey, ProvinceMetricConfig> = {
  psychosisGejala: {
    key: "psychosisGejala",
    label: "Psikosis/Skizofrenia (Gejala)",
    shortLabel: "Psikosis (Gejala)",
    unit: "‰",
    decimals: 1,
    tableRef: "Tabel 5.1",
    subchapter: "5.1",
    targetGroup: "Rumah Tangga",
    higherIsBetter: false,
    accentColor: "#0f766e",
    description: "Prevalensi (per mil) rumah tangga yang memiliki ART dengan gejala gangguan jiwa psikosis/skizofrenia.",
  },
  psychosisDiagnosis: {
    key: "psychosisDiagnosis",
    label: "Psikosis/Skizofrenia (Gejala + Diagnosis)",
    shortLabel: "Psikosis (Diagnosis)",
    unit: "‰",
    decimals: 1,
    tableRef: "Tabel 5.1",
    subchapter: "5.1",
    targetGroup: "Rumah Tangga",
    higherIsBetter: false,
    accentColor: "#0d9488",
    description: "Prevalensi (per mil) rumah tangga yang memiliki ART dengan gejala dan sudah didiagnosis dokter psikosis/skizofrenia.",
  },
  depresi: {
    key: "depresi",
    label: "Prevalensi Depresi (MINI)",
    shortLabel: "Depresi (MINI)",
    unit: "%",
    decimals: 1,
    tableRef: "Tabel 5.4",
    subchapter: "5.2",
    targetGroup: "Penduduk ≥ 15 Tahun",
    higherIsBetter: false,
    accentColor: "#e11d48",
    description: "Prevalensi depresi dalam 2 minggu terakhir berdasarkan instrumen Mini International Neuropsychiatric Interview (MINI).",
  },
  masalahJiwa: {
    key: "masalahJiwa",
    label: "Masalah Kesehatan Jiwa (SRQ-20)",
    shortLabel: "Masalah Jiwa (SRQ-20)",
    unit: "%",
    decimals: 1,
    tableRef: "Tabel 5.6",
    subchapter: "5.3",
    targetGroup: "Penduduk ≥ 15 Tahun",
    higherIsBetter: false,
    accentColor: "#d97706",
    description: "Prevalensi masalah kesehatan jiwa dalam 1 bulan terakhir berdasarkan WHO SRQ-20 (nilai batas pisah ≥ 6).",
  },
  pikiranMengakhiriHidup: {
    key: "pikiranMengakhiriHidup",
    label: "Pikiran Mengakhiri Hidup (C-29)",
    shortLabel: "Pikiran Mengakhiri Hidup",
    unit: "%",
    decimals: 2,
    tableRef: "Tabel 5.8",
    subchapter: "5.3",
    targetGroup: "Penduduk ≥ 15 Tahun",
    higherIsBetter: false,
    accentColor: "#be123c",
    description: "Prevalensi penduduk ≥15 tahun yang mempunyai pikiran mengakhiri hidup dalam 1 bulan terakhir (SRQ-20 pertanyaan C-29).",
  },
  depresiBerobat: {
    key: "depresiBerobat",
    label: "Depresi yang Berobat (Akses Layanan)",
    shortLabel: "Depresi Berobat",
    unit: "%",
    decimals: 1,
    tableRef: "Tabel 5.13",
    subchapter: "5.5",
    targetGroup: "Individu Depresi ≥ 15 Tahun",
    higherIsBetter: true,
    accentColor: "#059669",
    description: "Proporsi individu dengan depresi yang berobat/ditangani tenaga kesehatan di fasilitas kesehatan dalam 2 minggu terakhir.",
  },
};

export const PROVINCE_METRIC_LIST: ProvinceMetricConfig[] = [
  PROVINCE_METRICS_CONFIG.depresi,
  PROVINCE_METRICS_CONFIG.masalahJiwa,
  PROVINCE_METRICS_CONFIG.pikiranMengakhiriHidup,
  PROVINCE_METRICS_CONFIG.psychosisGejala,
  PROVINCE_METRICS_CONFIG.psychosisDiagnosis,
  PROVINCE_METRICS_CONFIG.depresiBerobat,
];

export function getProvinceMetric(
  record: ProvinceMentalHealthRecord,
  key: ProvinceMetricKey
): MetricPoint {
  return record[key];
}

export function formatIdNumber(val: number, decimals = 1): string {
  return val.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatIntegerId(val: number): string {
  return val.toLocaleString("id-ID");
}

export function formatMetricValue(val: number, key: ProvinceMetricKey): string {
  const cfg = PROVINCE_METRICS_CONFIG[key];
  return `${formatIdNumber(val, cfg.decimals)}${cfg.unit}`;
}

export function formatCI(ciLow: number, ciHigh: number, decimals = 1, unit = "%"): string {
  return `${formatIdNumber(ciLow, decimals)}–${formatIdNumber(ciHigh, decimals)}${unit}`;
}

export function getChoroplethFill(
  value: number,
  min: number,
  max: number,
  higherIsBetter: boolean,
  isDark: boolean
): string {
  const range = max - min || 1;
  const t = Math.max(0, Math.min(1, (value - min) / range));

  if (higherIsBetter) {
    // Low coverage (treatment gap) -> amber/rose; high coverage -> emerald/teal
    const lightRamp = ["#fecdd3", "#fde68a", "#99f6e4", "#2dd4bf", "#0d9488", "#047857"];
    const darkRamp = ["#881337", "#78350f", "#115e59", "#0f766e", "#059669", "#10b981"];
    const ramp = isDark ? darkRamp : lightRamp;
    const idx = Math.min(ramp.length - 1, Math.floor(t * ramp.length));
    return ramp[idx];
  }

  // Burden metrics: low -> crisp teal/mint; mid -> amber; high -> coral/crimson
  const lightRamp = ["#ccfbf1", "#5eead4", "#fde68a", "#fdba74", "#fb7185", "#be123c"];
  const darkRamp = ["#134e4a", "#0f766e", "#854d0e", "#9a3412", "#be123c", "#e11d48"];
  const ramp = isDark ? darkRamp : lightRamp;
  const idx = Math.min(ramp.length - 1, Math.floor(t * ramp.length));
  return ramp[idx];
}

export function downloadCsv(
  filename: string,
  headers: string[],
  rows: (string | number | boolean | null | undefined)[][]
): void {
  const escape = (cell: string | number | boolean | null | undefined) => {
    const str = cell === null || cell === undefined ? "" : String(cell);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  const csvContent =
    "\uFEFF" +
    [headers.map(escape).join(","), ...rows.map((r) => r.map(escape).join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
