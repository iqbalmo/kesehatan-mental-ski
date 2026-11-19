"""
Generate src/data/ski2023-mental-health.ts from verified PDF extraction (scripts/bab5_verified.json).
"""

import json
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
VERIFIED_PATH = ROOT_DIR / "scripts" / "bab5_verified.json"
OUT_TS_PATH = ROOT_DIR / "src" / "data" / "ski2023-mental-health.ts"

PROVINCE_META = {
    "Aceh": ("AC", "Aceh", "Sumatera", (42, 46), (0, 0)),
    "Sumatera Utara": ("SU", "Sumut", "Sumatera", (92, 96), (0, 1)),
    "Sumatera Barat": ("SB", "Sumbar", "Sumatera", (126, 158), (1, 0)),
    "Riau": ("RI", "Riau", "Sumatera", (166, 134), (1, 1)),
    "Jambi": ("JA", "Jambi", "Sumatera", (184, 184), (1, 2)),
    "Sumatera Selatan": ("SS", "Sumsel", "Sumatera", (222, 222), (2, 1)),
    "Bengkulu": ("BE", "Bengkulu", "Sumatera", (175, 226), (2, 0)),
    "Lampung": ("LA", "Lampung", "Sumatera", (245, 266), (2, 2)),
    "Kepulauan Bangka Belitung": ("BB", "Babel", "Sumatera", (266, 198), (1, 3)),
    "Kepulauan Riau": ("KR", "Kepri", "Sumatera", (236, 126), (0, 3)),
    "DKI Jakarta": ("JK", "DKI Jakarta", "Jawa-Bali", (284, 288), (3, 3)),
    "Jawa Barat": ("JB", "Jabar", "Jawa-Bali", (305, 304), (3, 4)),
    "Jawa Tengah": ("JT", "Jateng", "Jawa-Bali", (365, 312), (3, 5)),
    "DI Yogyakarta": ("YO", "DIY", "Jawa-Bali", (372, 330), (3, 6)),
    "Jawa Timur": ("JI", "Jatim", "Jawa-Bali", (425, 326), (3, 7)),
    "Banten": ("BT", "Banten", "Jawa-Bali", (264, 296), (3, 2)),
    "Bali": ("BA", "Bali", "Jawa-Bali", (476, 342), (3, 8)),
    "Nusa Tenggara Barat": ("NB", "NTB", "Nusa Tenggara", (526, 348), (3, 9)),
    "Nusa Tenggara Timur": ("NT", "NTT", "Nusa Tenggara", (622, 368), (3, 10)),
    "Kalimantan Barat": ("KB", "Kalbar", "Kalimantan", (366, 148), (1, 5)),
    "Kalimantan Tengah": ("KT", "Kalteng", "Kalimantan", (432, 178), (1, 6)),
    "Kalimantan Selatan": ("KS", "Kalsel", "Kalimantan", (476, 202), (2, 6)),
    "Kalimantan Timur": ("KI", "Kaltim", "Kalimantan", (508, 134), (1, 7)),
    "Kalimantan Utara": ("KU", "Kaltara", "Kalimantan", (504, 72), (0, 7)),
    "Sulawesi Utara": ("SA", "Sulut", "Sulawesi", (676, 118), (0, 10)),
    "Sulawesi Tengah": ("ST", "Sulteng", "Sulawesi", (610, 172), (1, 10)),
    "Sulawesi Selatan": ("SN", "Sulsel", "Sulawesi", (578, 240), (2, 9)),
    "Sulawesi Tenggara": ("SG", "Sultra", "Sulawesi", (632, 232), (2, 10)),
    "Gorontalo": ("GO", "Gorontalo", "Sulawesi", (636, 136), (0, 11)),
    "Sulawesi Barat": ("SR", "Sulbar", "Sulawesi", (568, 194), (1, 9)),
    "Maluku": ("MA", "Maluku", "Maluku", (758, 224), (2, 12)),
    "Maluku Utara": ("MU", "Malut", "Maluku", (760, 136), (0, 13)),
    "Papua Barat": ("PB", "Papua Barat", "Papua", (884, 198), (1, 14)),
    "Papua Barat Daya": ("PD", "PBD", "Papua", (842, 176), (1, 13)),
    "Papua": ("PA", "Papua", "Papua", (968, 188), (1, 15)),
    "Papua Selatan": ("PS", "Papua Selatan", "Papua", (990, 290), (3, 15)),
    "Papua Tengah": ("PT", "Papua Tengah", "Papua", (938, 234), (2, 14)),
    "Papua Pegunungan": ("PP", "Papua Peg.", "Papua", (1006, 236), (2, 15)),
    "INDONESIA": ("ID", "INDONESIA", "Nasional", (0, 0), (0, 0)),
}


def main() -> None:
    data = json.loads(VERIFIED_PATH.read_text(encoding="utf-8"))

    t51 = {r["name"]: r for r in data["t5_1"]}
    t54 = {r["label"]: r for r in data["t5_4"]}
    t56 = {r["label"]: r for r in data["t5_6"]}
    t58 = {r["label"]: r for r in data["t5_8"]}
    t513 = {r["label"]: r for r in data["t5_13"]}

    provinces_ts = []
    for name, (code, short_name, region, map_pos, grid_pos) in PROVINCE_META.items():
        r1 = t51[name]
        r4 = t54[name]
        r6 = t56[name]
        r8 = t58[name]
        r13 = t513[name]
        assert r4["nWeighted"] == r6["nWeighted"] == r8["nWeighted"], f"N mismatch on {name}"

        provinces_ts.append({
            "code": code,
            "name": name,
            "shortName": short_name,
            "region": region,
            "isNational": name == "INDONESIA",
            "mapPos": {"x": map_pos[0], "y": map_pos[1]},
            "gridPos": {"row": grid_pos[0], "col": grid_pos[1]},
            "psychosisGejala": {
                "value": r1["gejalaValue"],
                "ciLow": r1["gejalaCiLow"],
                "ciHigh": r1["gejalaCiHigh"],
                "nWeighted": r1["nWeighted"],
            },
            "psychosisDiagnosis": {
                "value": r1["diagnosisValue"],
                "ciLow": r1["diagnosisCiLow"],
                "ciHigh": r1["diagnosisCiHigh"],
                "nWeighted": r1["nWeighted"],
            },
            "psychosisHouseholdsN": r1["nWeighted"],
            "depresi": {
                "value": r4["value"],
                "ciLow": r4["ciLow"],
                "ciHigh": r4["ciHigh"],
                "nWeighted": r4["nWeighted"],
            },
            "masalahJiwa": {
                "value": r6["value"],
                "ciLow": r6["ciLow"],
                "ciHigh": r6["ciHigh"],
                "nWeighted": r6["nWeighted"],
            },
            "pikiranMengakhiriHidup": {
                "value": r8["value"],
                "ciLow": r8["ciLow"],
                "ciHigh": r8["ciHigh"],
                "nWeighted": r8["nWeighted"],
            },
            "individuals15PlusN": r4["nWeighted"],
            "depresiBerobat": {
                "value": r13["value"],
                "ciLow": r13["ciLow"],
                "ciHigh": r13["ciHigh"],
                "nWeighted": r13["nWeighted"],
                "isLowSample": r13["isLowSample"],
            },
        })

    # Merge household tables 5.2 and 5.3
    t52 = {(r["group"], r["label"]): r for r in data["t5_2"]}
    t53 = {(r["group"], r["label"]): r for r in data["t5_3"]}
    hh_psychosis_pasung = []
    for r3 in data["t5_3"]:
        key = (r3["group"], r3["label"])
        r2 = t52.get(key)
        # For INDONESIA row, pull from t51['INDONESIA']
        if r3["label"] == "INDONESIA":
            ind = t51["INDONESIA"]
            r2_obj = {
                "gejala": {"value": ind["gejalaValue"], "ciLow": ind["gejalaCiLow"], "ciHigh": ind["gejalaCiHigh"], "nWeighted": ind["nWeighted"]},
                "diagnosis": {"value": ind["diagnosisValue"], "ciLow": ind["diagnosisCiLow"], "ciHigh": ind["diagnosisCiHigh"], "nWeighted": ind["nWeighted"]},
                "rtN": ind["nWeighted"],
            }
        else:
            assert r2 is not None
            r2_obj = {
                "gejala": {"value": r2["gejalaValue"], "ciLow": r2["gejalaCiLow"], "ciHigh": r2["gejalaCiHigh"], "nWeighted": r2["nWeighted"]},
                "diagnosis": {"value": r2["diagnosisValue"], "ciLow": r2["diagnosisCiLow"], "ciHigh": r2["diagnosisCiHigh"], "nWeighted": r2["nWeighted"]},
                "rtN": r2["nWeighted"],
            }
        hh_psychosis_pasung.append({
            "group": r3["group"],
            "label": r3["label"],
            "psychosisGejala": r2_obj["gejala"],
            "psychosisDiagnosis": r2_obj["diagnosis"],
            "psychosisRtN": r2_obj["rtN"],
            "pasungLifetime": {
                "value": r3["value"],
                "ciLow": r3["ciLow"],
                "ciHigh": r3["ciHigh"],
                "nWeighted": r3["nWeighted"],
            },
            "pasungLifetimeN": r3["nWeighted"],
        })

    # Merge individual demographic tables 5.5, 5.7, 5.9, 5.14
    t55 = {(r["group"], r["label"]): r for r in data["t5_5"]}
    t57 = {(r["group"], r["label"]): r for r in data["t5_7"]}
    t59 = {(r["group"], r["label"]): r for r in data["t5_9"]}
    t514 = {(r["group"], r["label"]): r for r in data["t5_14"]}

    individual_rows = []
    for r5 in data["t5_5"]:
        k = (r5["group"], r5["label"])
        r7 = t57[k]
        r9 = t59[k]
        r14 = t514[k]
        assert r5["nWeighted"] == r7["nWeighted"] == r9["nWeighted"], f"N mismatch on {k}"
        individual_rows.append({
            "group": r5["group"],
            "label": r5["label"],
            "depresi": {"value": r5["value"], "ciLow": r5["ciLow"], "ciHigh": r5["ciHigh"], "nWeighted": r5["nWeighted"]},
            "masalahJiwa": {"value": r7["value"], "ciLow": r7["ciLow"], "ciHigh": r7["ciHigh"], "nWeighted": r7["nWeighted"]},
            "pikiranMengakhiriHidup": {"value": r9["value"], "ciLow": r9["ciLow"], "ciHigh": r9["ciHigh"], "nWeighted": r9["nWeighted"]},
            "population15PlusN": r5["nWeighted"],
            "depresiBerobat": {
                "value": r14["value"],
                "ciLow": r14["ciLow"],
                "ciHigh": r14["ciHigh"],
                "nWeighted": r14["nWeighted"],
                "isLowSample": r14["isLowSample"],
            },
        })

    ts_content = f'''// Data resmi Bab 5: Kesehatan Jiwa — Survei Kesehatan Indonesia (SKI) 2023 dalam Angka
// Diekstrak & diverifikasi langsung dari: LAPORAN SKI 2023 DALAM ANGKA_REVISI I_OK.pdf (Hal. 142-158 / PDF Hal. 181-197)

export type RegionName =
  | "Sumatera"
  | "Jawa-Bali"
  | "Nusa Tenggara"
  | "Kalimantan"
  | "Sulawesi"
  | "Maluku"
  | "Papua";

export type DemographicDimension =
  | "Kelompok Umur"
  | "Jenis Kelamin"
  | "Pendidikan"
  | "Pekerjaan"
  | "Tempat Tinggal"
  | "Status Ekonomi";

export type HouseholdGroup = "Tempat Tinggal" | "Status Ekonomi" | "Nasional";

export interface MetricPoint {{
  value: number;
  ciLow: number;
  ciHigh: number;
  nWeighted: number;
  isLowSample?: boolean;
}}

export interface ProvinceMentalHealthRecord {{
  code: string;
  name: string;
  shortName: string;
  region: RegionName | "Nasional";
  isNational: boolean;
  mapPos: {{ x: number; y: number }};
  gridPos: {{ row: number; col: number }};
  psychosisGejala: MetricPoint;
  psychosisDiagnosis: MetricPoint;
  psychosisHouseholdsN: number;
  depresi: MetricPoint;
  masalahJiwa: MetricPoint;
  pikiranMengakhiriHidup: MetricPoint;
  individuals15PlusN: number;
  depresiBerobat: MetricPoint;
}}

export interface HouseholdPsychosisPasungRecord {{
  group: HouseholdGroup;
  label: string;
  psychosisGejala: MetricPoint;
  psychosisDiagnosis: MetricPoint;
  psychosisRtN: number;
  pasungLifetime: MetricPoint;
  pasungLifetimeN: number;
}}

export interface IndividualDemographicRecord {{
  group: DemographicDimension;
  label: string;
  depresi: MetricPoint;
  masalahJiwa: MetricPoint;
  pikiranMengakhiriHidup: MetricPoint;
  population15PlusN: number;
  depresiBerobat: MetricPoint;
}}

export interface PsychosisFacilityUtilizationRecord {{
  group: HouseholdGroup;
  label: string;
  hanyaFasyankes: {{ value: number; ciLow: number; ciHigh: number }};
  hanyaNonFasyankes: {{ value: number; ciLow: number; ciHigh: number }};
  keduanya: {{ value: number; ciLow: number; ciHigh: number }};
  tidakBerobat: {{ value: number; ciLow: number; ciHigh: number }};
  nWeighted: number;
}}

export interface PsychosisMedicationAdherenceRecord {{
  group: HouseholdGroup;
  label: string;
  minumSemua: number;
  minumTidakSemua: number;
  tidakMinum: number;
  nMinum1Bulan: number;
  rutinSemua: number;
  nRutin1Bulan: number;
}}

export interface SimpleReasonRecord {{
  reason: string;
  percent: number;
  nWeighted: number;
}}

export interface OfficialTableCatalogItem {{
  id: string;
  tableNumber: string;
  title: string;
  reportPage: number;
  pdfPage: number;
  unit: string;
  granularity: "Provinsi" | "Karakteristik Rumah Tangga" | "Karakteristik Responden" | "Nasional";
  notes?: string;
}}

export interface SubchapterMethodology {{
  id: string;
  code: string;
  title: string;
  reportPages: string;
  pdfPage: number;
  instrument: string;
  targetPopulation: string;
  summary: string;
  definitions: string[];
  formulas: {{ label: string; expression: string }}[];
}}

export const REPORT_METADATA = {{
  title: "Survei Kesehatan Indonesia (SKI) 2023 dalam Angka",
  chapter: "Bab 5: Kesehatan Jiwa",
  institution: "Badan Kebijakan Pembangunan Kesehatan, Kementerian Kesehatan RI",
  pdfFilename: "LAPORAN SKI 2023 DALAM ANGKA_REVISI I_OK.pdf",
  reportPages: "Halaman 142–158",
  pdfPages: "Halaman PDF 181–197 (dari 965 halaman)",
  year: 2023,
  director: "Syarifah Liza Munira, SE., MPP., Ph.D",
  personInCharge: "Dwi Puspasari, SKM, M.Sc",
  mentalHealthTeam: [
    "dr. Yenni Risniati, M.Epid",
    "dr. Heni Kismayawati",
    "dr. Dona Arlinda, M.Sc",
  ],
  samples: {{
    householdsWeighted: 315621,
    individuals15PlusWeighted: 630827,
    psychosisDiagnosedHouseholdsWeighted: 844,
    pasungRecentHouseholdsWeighted: 55,
    psychosisTreated1MoWeighted: 774,
    psychosisRoutine1MoWeighted: 486,
    psychosisNonAdherentWeighted: 51,
    depressedIndividualsWeighted: 8680,
  }},
}};

export const REGION_ORDER: RegionName[] = [
  "Sumatera",
  "Jawa-Bali",
  "Nusa Tenggara",
  "Kalimantan",
  "Sulawesi",
  "Maluku",
  "Papua",
];

export const PROVINCE_RECORDS: ProvinceMentalHealthRecord[] = {json.dumps(provinces_ts, indent=2, ensure_ascii=False)};

export const PROVINCES_38 = PROVINCE_RECORDS.filter((r) => !r.isNational);
export const INDONESIA_RECORD = PROVINCE_RECORDS.find((r) => r.isNational)!;

export const HOUSEHOLD_PSYCHOSIS_PASUNG: HouseholdPsychosisPasungRecord[] = {json.dumps(hh_psychosis_pasung, indent=2, ensure_ascii=False)};

export const HOUSEHOLD_ART_COUNT_DISTRIBUTION = {{
  nWeighted: 844,
  items: [
    {{ label: "1 orang ART psikosis/skizofrenia", percent: 95.6 }},
    {{ label: "2 orang ART psikosis/skizofrenia", percent: 4.3 }},
    {{ label: "3 orang ART psikosis/skizofrenia", percent: 0.1 }},
  ],
}};

export const PASUNG_RECENT_3MO_NOTE = {{
  value: 25.2,
  ciLow: 19.7,
  ciHigh: 31.6,
  nWeighted: 55,
  description:
    "Dari semua rumah tangga yang memiliki ART pernah dipasung, terdapat 25,2% (95% CI: 19,7–31,6) rumah tangga yang memiliki ART pernah atau masih dipasung dalam 3 bulan terakhir (N tertimbang = 55 rumah tangga).",
}};

export const PASUNG_REASONS: SimpleReasonRecord[] = [
  {{
    reason: "Mengganggu ketenangan orang lain",
    percent: 69.5,
    nWeighted: 55,
  }},
  {{
    reason: "Perilaku kekerasan terhadap orang lain (mengamuk, membunuh, dll)",
    percent: 65.7,
    nWeighted: 55,
  }},
  {{
    reason: "Merusak",
    percent: 48.2,
    nWeighted: 55,
  }},
  {{
    reason: "Perilaku kekerasan terhadap diri sendiri (cenderung menyakiti diri sendiri, mencoba bunuh diri, dll)",
    percent: 38.1,
    nWeighted: 55,
  }},
  {{
    reason: "Tidak ada yang merawat",
    percent: 13.0,
    nWeighted: 55,
  }},
  {{
    reason: "Lainnya",
    percent: 11.8,
    nWeighted: 55,
  }},
];

export const PSYCHOSIS_FACILITY_UTILIZATION: PsychosisFacilityUtilizationRecord[] = {json.dumps(data["t5_10"], indent=2, ensure_ascii=False)};

export const PSYCHOSIS_MEDICATION_ADHERENCE: PsychosisMedicationAdherenceRecord[] = {json.dumps(data["t5_11"], indent=2, ensure_ascii=False)};

export const PSYCHOSIS_NON_ADHERENCE_REASONS: SimpleReasonRecord[] = [
  {{ reason: "Lainnya", percent: 31.9, nWeighted: 51 }},
  {{ reason: "Bosan/malas/sering lupa", percent: 27.5, nWeighted: 51 }},
  {{ reason: "Merasa sudah sehat", percent: 25.4, nWeighted: 51 }},
  {{ reason: "Obat tidak tersedia di fasyankes (RS/Puskesmas/Apotek)", percent: 6.8, nWeighted: 51 }},
  {{ reason: "Tidak tahan efek samping obat", percent: 5.9, nWeighted: 51 }},
  {{ reason: "Minum obat tradisional", percent: 2.6, nWeighted: 51 }},
];

export const INDIVIDUAL_DEMOGRAPHIC_RECORDS: IndividualDemographicRecord[] = {json.dumps(individual_rows, indent=2, ensure_ascii=False)};

export const OFFICIAL_TABLES_CATALOG: OfficialTableCatalogItem[] = [
  {{
    id: "t5.1",
    tableNumber: "Tabel 5.1",
    title: "Prevalensi (Permil) Rumah Tangga yang Memiliki ART dengan Gangguan Jiwa Psikosis/Skizofrenia menurut Provinsi, SKI 2023",
    reportPage: 144,
    pdfPage: 183,
    unit: "‰ (per mil)",
    granularity: "Provinsi",
    notes: "Mencakup Gejala saja (4,0‰) dan Gejala + Diagnosis Dokter (3,0‰). Total N tertimbang = 315.621 rumah tangga.",
  }},
  {{
    id: "t5.2",
    tableNumber: "Tabel 5.2",
    title: "Prevalensi (Permil) Rumah Tangga yang Memiliki ART dengan Gangguan Jiwa Psikosis/Skizofrenia menurut Karakteristik Rumah Tangga, SKI 2023",
    reportPage: 145,
    pdfPage: 184,
    unit: "‰ (per mil)",
    granularity: "Karakteristik Rumah Tangga",
    notes: "Catatan: dari semua RT dengan ART terdiagnosis psikosis (N=844), 95,6% memiliki 1 ART, 4,3% memiliki 2 ART, dan 0,1% memiliki 3 ART.",
  }},
  {{
    id: "t5.3",
    tableNumber: "Tabel 5.3",
    title: "Proporsi Rumah Tangga yang Memiliki ART dengan Gangguan Jiwa Psikosis/Skizofrenia yang Pernah Dipasung Menurut Karakteristik Rumah Tangga, SKI 2023",
    reportPage: 145,
    pdfPage: 184,
    unit: "%",
    granularity: "Karakteristik Rumah Tangga",
    notes: "Catatan: dari semua RT pernah dipasung, 25,2% (95% CI: 19,7–31,6) mengalami pemasungan dalam 3 bulan terakhir (N tertimbang = 55 rumah tangga).",
  }},
  {{
    id: "t4.65",
    tableNumber: "Tabel 4.65 (Daftar Tabel: 4.67)",
    title: "Proporsi Alasan Dipasung ART dengan Gangguan Jiwa Psikosis/Skizofrenia, SKI 2023*",
    reportPage: 145,
    pdfPage: 184,
    unit: "%",
    granularity: "Nasional",
    notes: "*Pilihan jawaban bisa lebih dari 1 (multiple response). Basis: N tertimbang = 55 rumah tangga.",
  }},
  {{
    id: "t5.4",
    tableNumber: "Tabel 5.4",
    title: "Prevalensi Depresi dalam Dua Minggu Terakhir pada Penduduk Umur ≥15 Tahun menurut Provinsi, SKI 2023",
    reportPage: 147,
    pdfPage: 186,
    unit: "%",
    granularity: "Provinsi",
    notes: "*Berdasarkan MINI (Mini International Neuropsychiatric Interview). Nasional: 1,4% (N tertimbang = 630.827).",
  }},
  {{
    id: "t5.5",
    tableNumber: "Tabel 5.5",
    title: "Prevalensi Depresi dalam Dua Minggu Terakhir pada Penduduk Umur ≥15 Tahun menurut Karakteristik Responden, SKI 2023",
    reportPage: 148,
    pdfPage: 187,
    unit: "%",
    granularity: "Karakteristik Responden",
    notes: "*Berdasarkan MINI. Mencakup Kelompok Umur, Jenis Kelamin, Pendidikan, Pekerjaan, Tempat Tinggal, dan Status Ekonomi.",
  }},
  {{
    id: "t5.6",
    tableNumber: "Tabel 5.6",
    title: "Prevalensi Masalah Kesehatan Jiwa dalam Satu Bulan Terakhir pada Penduduk Umur ≥15 Tahun menurut Provinsi, SKI 2023",
    reportPage: 150,
    pdfPage: 189,
    unit: "%",
    granularity: "Provinsi",
    notes: "**Berdasarkan WHO SRQ-20 (Self Reporting Questionnaire-20), nilai batas pisah (cut-off point) ≥ 6. Nasional: 2,0%.",
  }},
  {{
    id: "t5.7",
    tableNumber: "Tabel 5.7",
    title: "Prevalensi Masalah Kesehatan Jiwa dalam Satu Bulan Terakhir pada Penduduk Umur ≥15 Tahun menurut Karakteristik Responden, SKI 2023",
    reportPage: 151,
    pdfPage: 190,
    unit: "%",
    granularity: "Karakteristik Responden",
    notes: "**Berdasarkan WHO SRQ-20, cut-off point ≥ 6.",
  }},
  {{
    id: "t5.8",
    tableNumber: "Tabel 5.8",
    title: "Prevalensi Penduduk Umur ≥15 Tahun yang Mempunyai Pikiran Mengakhiri Hidup dalam Satu Bulan Terakhir menurut Provinsi, SKI 2023",
    reportPage: 152,
    pdfPage: 191,
    unit: "%",
    granularity: "Provinsi",
    notes: "**Berdasarkan SRQ-20 pertanyaan C-29. Nasional: 0,25% (95% CI: 0,22–0,27%).",
  }},
  {{
    id: "t5.9",
    tableNumber: "Tabel 5.9",
    title: "Prevalensi Penduduk Umur ≥15 Tahun yang Mempunyai Pikiran Mengakhiri Hidup dalam Satu Bulan Terakhir menurut Karakteristik Responden, SKI 2023",
    reportPage: 153,
    pdfPage: 192,
    unit: "%",
    granularity: "Karakteristik Responden",
    notes: "**Berdasarkan SRQ-20 pertanyaan C-29.",
  }},
  {{
    id: "t5.10",
    tableNumber: "Tabel 5.10",
    title: "Proporsi Jenis Fasilitas Pelayanan yang Pernah Dimanfaatkan Rumah Tangga Memiliki ART Gangguan Jiwa Psikosis/Skizofrenia menurut Karakteristik Rumah Tangga, SKI 2023",
    reportPage: 155,
    pdfPage: 194,
    unit: "%",
    granularity: "Karakteristik Rumah Tangga",
    notes: "Fasyankes (RS, Puskesmas, Klinik, Praktik Mandiri) vs Non-Fasyankes (rehabilitasi keagamaan, pemuka agama, panti sosial). N=844.",
  }},
  {{
    id: "t5.11",
    tableNumber: "Tabel 5.11",
    title: "Proporsi Rumah Tangga yang Memiliki ART dengan Gangguan Jiwa Psikosis/Skizofrenia yang Berobat 1 Bulan Terakhir dan Berobat Rutin 1 Bulan Terakhir di Fasilitas Kesehatan menurut Karakteristik Rumah Tangga, SKI 2023",
    reportPage: 155,
    pdfPage: 194,
    unit: "%",
    granularity: "Karakteristik Rumah Tangga",
    notes: "Berobat 1 bulan terakhir (N=774) dan rutin minum/suntik obat sesuai petunjuk dokter (N=486).",
  }},
  {{
    id: "t5.12",
    tableNumber: "Tabel 5.12",
    title: "Alasan Utama Ketidakpatuhan Minum Obat Pada Rumah Tangga yang Memiliki ART dengan Gangguan Jiwa Psikosis/Skizofrenia yang Berobat di Fasilitas Kesehatan, SKI 2023",
    reportPage: 156,
    pdfPage: 195,
    unit: "%",
    granularity: "Nasional",
    notes: "Basis: rumah tangga yang tidak rutin minum/suntik obat dalam 1 bulan terakhir (N tertimbang = 51).",
  }},
  {{
    id: "t5.13",
    tableNumber: "Tabel 5.13",
    title: "Proporsi Individu dengan Depresi yang Berobat dalam Dua Minggu Terakhir pada Penduduk Umur ≥15 Tahun menurut Provinsi, SKI 2023",
    reportPage: 157,
    pdfPage: 196,
    unit: "%",
    granularity: "Provinsi",
    notes: "*N tertimbang < 50 menandakan estimasi memiliki ketidakpastian statistik tinggi (19 provinsi bertanda *). Nasional: 12,7% (N=8.680).",
  }},
  {{
    id: "t5.14",
    tableNumber: "Tabel 5.14",
    title: "Proporsi Individu dengan Depresi yang Berobat dalam Dua Minggu Terakhir pada Penduduk Umur ≥15 Tahun menurut Karakteristik, SKI 2023",
    reportPage: 158,
    pdfPage: 197,
    unit: "%",
    granularity: "Karakteristik Responden",
    notes: "*N tertimbang < 50 berlaku pada kelompok pekerjaan PNS/TNI/POLRI/BUMN/BUMD (N=49*) dan Nelayan (N=38*).",
  }},
];

export const SUBCHAPTER_METHODOLOGY: SubchapterMethodology[] = [
  {{
    id: "5.1",
    code: "Subbab 5.1",
    title: "Gangguan Jiwa Psikosis/Skizofrenia dan Pemasungan dalam Keluarga",
    reportPages: "Hal. 142–145",
    pdfPage: 181,
    instrument: "Kuesioner Rumah Tangga & Permenkes RI No. 54 Tahun 2017",
    targetPopulation: "Kepala Rumah Tangga atau ART yang mewakili (N = 315.621 RT)",
    summary:
      "Mengukur prevalensi (per mil / ‰) rumah tangga yang memiliki ART dengan gejala gangguan jiwa psikosis/skizofrenia (waham/halusinasi menetap ≥1 bulan, perilaku katatonik/agresif, atau dikenal masyarakat sebagai ODGJ berat), baik berdasarkan gejala maupun yang telah terdiagnosis dokter, serta riwayat pemasungan seumur hidup maupun 3 bulan terakhir.",
    definitions: [
      "Gejala psikosis/skizofrenia meliputi waham atau halusinasi menetap ≥1 bulan disertai perilaku aneh (katatonik/agresivitas) dan gejala negatif.",
      "Berdasarkan Permenkes No. 54 Tahun 2017, pemasungan adalah upaya pengikatan (metode manual/mekanik membatasi gerak) atau pengisolasian (mengurung paksa di ruang terbatas) di komunitas; tindakan pengikatan/isolasi medis di fasilitas kesehatan tidak termasuk pemasungan.",
      "Pernah dipasung mencakup riwayat seumur hidup (saat ini maupun masa lampau), sedangkan pasung 3 bulan terakhir mengukur kejadian dalam kurun 3 bulan terakhir.",
    ],
    formulas: [
      {{
        label: "Prevalensi RT dengan ART Gejala Psikosis/Skizofrenia",
        expression: "(Σ RT memiliki ART gejala psikosis/skizofrenia ÷ Σ RT yang diwawancara) × 1.000‰",
      }},
      {{
        label: "Prevalensi RT dengan ART Gejala + Diagnosis Dokter",
        expression: "(Σ RT memiliki ART gejala & diagnosis dokter ÷ Σ RT yang diwawancara) × 1.000‰",
      }},
      {{
        label: "Proporsi Pernah Dipasung (Seumur Hidup)",
        expression: "(Σ RT memiliki ART psikosis yang pernah dipasung ÷ Σ RT memiliki ART psikosis terdiagnosis) × 100%",
      }},
      {{
        label: "Proporsi Dipasung 3 Bulan Terakhir",
        expression: "(Σ RT dengan ART dipasung 3 bulan terakhir ÷ Σ RT dengan ART pernah dipasung) × 100%",
      }},
    ],
  }},
  {{
    id: "5.2",
    code: "Subbab 5.2",
    title: "Depresi dalam Dua Minggu Terakhir",
    reportPages: "Hal. 146–148",
    pdfPage: 185,
    instrument: "Mini International Neuropsychiatric Interview (MINI) — 10 Pertanyaan",
    targetPopulation: "Individu umur ≥15 tahun, wawancara langsung tanpa diwakili (N = 630.827)",
    summary:
      "Mengukur prevalensi depresi dalam 2 minggu terakhir pada penduduk berusia ≥15 tahun menggunakan instrumen terstandar MINI yang terdiri dari 10 pertanyaan Ya/Tidak.",
    definitions: [
      "Responden dikategorikan mengalami depresi apabila menjawab 'Ya' minimal 2 dari 3 pertanyaan utama (pertanyaan 1–3) DAN menjawab 'Ya' minimal 2 dari 7 pertanyaan tambahan (pertanyaan 4–10).",
      "Wawancara wajib dilakukan langsung kepada individu bersangkutan (tidak boleh diwakilkan oleh ART lain).",
    ],
    formulas: [
      {{
        label: "Prevalensi Depresi (2 Minggu Terakhir)",
        expression: "(Σ penduduk ≥15 th mengalami depresi menurut MINI ÷ Σ seluruh penduduk ≥15 th) × 100%",
      }},
    ],
  }},
  {{
    id: "5.3",
    code: "Subbab 5.3",
    title: "Masalah Kesehatan Jiwa & Pikiran Mengakhiri Hidup",
    reportPages: "Hal. 149–153",
    pdfPage: 188,
    instrument: "WHO Self Reporting Questionnaire (SRQ-20) — Cut-off ≥ 6 & Item C-29",
    targetPopulation: "Individu umur ≥15 tahun, wawancara langsung tanpa diwakili (N = 630.827)",
    summary:
      "Menilai masalah kesehatan jiwa (pada Riskesdas 2018 disebut gangguan mental emosional) dalam 1 bulan terakhir menggunakan kuesioner WHO SRQ-20 (20 butir pertanyaan Ya/Tidak), termasuk skrining pikiran untuk mengakhiri hidup melalui item pertanyaan C-29.",
    definitions: [
      "Nilai batas pisah (cut-off point) yang ditetapkan adalah ≥6 jawaban 'Ya' dari 20 butir pertanyaan SRQ-20 (berdasarkan uji validitas Hartono, 1996).",
      "Pikiran mengakhiri hidup diukur dari item spesifik SRQ-20 (pertanyaan C-29): 'Dalam 1 bulan terakhir, apakah ART mempunyai pikiran untuk mengakhiri hidup?'",
    ],
    formulas: [
      {{
        label: "Prevalensi Masalah Kesehatan Jiwa (1 Bulan Terakhir)",
        expression: "(Σ penduduk ≥15 th dengan skor SRQ-20 ≥ 6 ÷ Σ seluruh penduduk ≥15 th) × 100%",
      }},
      {{
        label: "Prevalensi Pikiran Mengakhiri Hidup (1 Bulan Terakhir)",
        expression: "(Σ penduduk ≥15 th menjawab 'Ya' pada item C-29 SRQ-20 ÷ Σ seluruh penduduk ≥15 th) × 100%",
      }},
    ],
  }},
  {{
    id: "5.4",
    code: "Subbab 5.4",
    title: "Fasilitas Kesehatan & Non-Kesehatan dalam Pengobatan Psikosis/Skizofrenia",
    reportPages: "Hal. 154–156",
    pdfPage: 193,
    instrument: "Kuesioner Rumah Tangga (Pemanfaatan Fasyankes, Kepatuhan Obat & Alasan Tidak Rutin)",
    targetPopulation: "Rumah Tangga memiliki ART Psikosis/Skizofrenia (N=844; Berobat 1 bln N=774; Rutin N=486)",
    summary:
      "Mengevaluasi jenis layanan yang pernah dimanfaatkan (RS/Puskesmas/Klinik/Praktik Dokter vs panti sosial/pemuka agama/rehabilitasi keagamaan), keteraturan minum/suntik obat dalam 1 bulan terakhir, serta alasan utama ketidakpatuhan pengobatan.",
    definitions: [
      "Pengobatan di fasilitas kesehatan mencakup RS, Puskesmas, Klinik, dan Praktik Mandiri Dokter; layanan non-fasyankes mencakup tempat rehabilitasi berbasis keagamaan, pemuka agama, dan panti sosial.",
      "Pengobatan rutin dinilai berdasarkan kepatuhan minum/suntik obat sesuai petunjuk dokter dalam 1 bulan terakhir pada RT yang berobat di fasilitas kesehatan.",
    ],
    formulas: [
      {{
        label: "Proporsi Berobat 1 Bulan Terakhir",
        expression: "(Σ RT psikosis berobat 1 bulan terakhir ÷ Σ RT psikosis yang berobat di fasyankes) × 100%",
      }},
      {{
        label: "Proporsi Berobat Rutin 1 Bulan Terakhir",
        expression: "(Σ RT psikosis rutin minum/suntik obat 1 bulan terakhir ÷ Σ RT psikosis yang berobat 1 bulan terakhir) × 100%",
      }},
    ],
  }},
  {{
    id: "5.5",
    code: "Subbab 5.5",
    title: "Pengobatan Individu dengan Depresi",
    reportPages: "Hal. 156–158",
    pdfPage: 195,
    instrument: "Kuesioner Individu (Riwayat Penanganan Depresi oleh Dokter/Nakes di Fasyankes)",
    targetPopulation: "Penduduk ≥15 tahun teridentifikasi depresi MINI dalam 2 minggu terakhir (N = 8.680)",
    summary:
      "Mengukur proporsi individu dengan depresi yang pernah berobat atau menjalani penanganan oleh dokter/tenaga kesehatan di fasilitas kesehatan, sekaligus mengungkap besarnya kesenjangan pengobatan (treatment gap sebesar 87,3% di tingkat nasional).",
    definitions: [
      "Hanya 12,7% penduduk usia ≥15 tahun yang mengalami depresi pernah mendapatkan pengobatan/penanganan tenaga kesehatan di fasilitas kesehatan.",
      "Pada tabel tingkat provinsi (Tabel 5.13), 19 provinsi memiliki N tertimbang < 50 (ditandai *) sehingga interval kepercayaan (95% CI) lebar dan perlu kehati-hatian interpretasi.",
    ],
    formulas: [
      {{
        label: "Proporsi Depresi yang Berobat",
        expression: "(Σ penduduk ≥15 th dengan depresi yang berobat ÷ Σ penduduk ≥15 th dengan depresi) × 100%",
      }},
    ],
  }},
];
'''

    OUT_TS_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_TS_PATH.write_text(ts_content, encoding="utf-8")
    print(f"Dataset TypeScript berhasil ditulis ke {OUT_TS_PATH} ({OUT_TS_PATH.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
