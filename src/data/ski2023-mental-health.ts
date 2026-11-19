// Data resmi Bab 5: Kesehatan Jiwa — Survei Kesehatan Indonesia (SKI) 2023 dalam Angka
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

export interface MetricPoint {
  value: number;
  ciLow: number;
  ciHigh: number;
  nWeighted: number;
  isLowSample?: boolean;
}

export interface ProvinceMentalHealthRecord {
  code: string;
  name: string;
  shortName: string;
  region: RegionName | "Nasional";
  isNational: boolean;
  mapPos: { x: number; y: number };
  gridPos: { row: number; col: number };
  psychosisGejala: MetricPoint;
  psychosisDiagnosis: MetricPoint;
  psychosisHouseholdsN: number;
  depresi: MetricPoint;
  masalahJiwa: MetricPoint;
  pikiranMengakhiriHidup: MetricPoint;
  individuals15PlusN: number;
  depresiBerobat: MetricPoint;
}

export interface HouseholdPsychosisPasungRecord {
  group: HouseholdGroup;
  label: string;
  psychosisGejala: MetricPoint;
  psychosisDiagnosis: MetricPoint;
  psychosisRtN: number;
  pasungLifetime: MetricPoint;
  pasungLifetimeN: number;
}

export interface IndividualDemographicRecord {
  group: DemographicDimension;
  label: string;
  depresi: MetricPoint;
  masalahJiwa: MetricPoint;
  pikiranMengakhiriHidup: MetricPoint;
  population15PlusN: number;
  depresiBerobat: MetricPoint;
}

export interface PsychosisFacilityUtilizationRecord {
  group: HouseholdGroup;
  label: string;
  hanyaFasyankes: { value: number; ciLow: number; ciHigh: number };
  hanyaNonFasyankes: { value: number; ciLow: number; ciHigh: number };
  keduanya: { value: number; ciLow: number; ciHigh: number };
  tidakBerobat: { value: number; ciLow: number; ciHigh: number };
  nWeighted: number;
}

export interface PsychosisMedicationAdherenceRecord {
  group: HouseholdGroup;
  label: string;
  minumSemua: number;
  minumTidakSemua: number;
  tidakMinum: number;
  nMinum1Bulan: number;
  rutinSemua: number;
  nRutin1Bulan: number;
}

export interface SimpleReasonRecord {
  reason: string;
  percent: number;
  nWeighted: number;
}

export interface OfficialTableCatalogItem {
  id: string;
  tableNumber: string;
  title: string;
  reportPage: number;
  pdfPage: number;
  unit: string;
  granularity: "Provinsi" | "Karakteristik Rumah Tangga" | "Karakteristik Responden" | "Nasional";
  notes?: string;
}

export interface SubchapterMethodology {
  id: string;
  code: string;
  title: string;
  reportPages: string;
  pdfPage: number;
  instrument: string;
  targetPopulation: string;
  summary: string;
  definitions: string[];
  formulas: { label: string; expression: string }[];
}

export const REPORT_METADATA = {
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
  samples: {
    householdsWeighted: 315621,
    individuals15PlusWeighted: 630827,
    psychosisDiagnosedHouseholdsWeighted: 844,
    pasungRecentHouseholdsWeighted: 55,
    psychosisTreated1MoWeighted: 774,
    psychosisRoutine1MoWeighted: 486,
    psychosisNonAdherentWeighted: 51,
    depressedIndividualsWeighted: 8680,
  },
};

export const REGION_ORDER: RegionName[] = [
  "Sumatera",
  "Jawa-Bali",
  "Nusa Tenggara",
  "Kalimantan",
  "Sulawesi",
  "Maluku",
  "Papua",
];

export const PROVINCE_RECORDS: ProvinceMentalHealthRecord[] = [
  {
    "code": "AC",
    "name": "Aceh",
    "shortName": "Aceh",
    "region": "Sumatera",
    "isNational": false,
    "mapPos": {
      "x": 42,
      "y": 46
    },
    "gridPos": {
      "row": 0,
      "col": 0
    },
    "psychosisGejala": {
      "value": 4.6,
      "ciLow": 3.3,
      "ciHigh": 6.2,
      "nWeighted": 5756
    },
    "psychosisDiagnosis": {
      "value": 4.0,
      "ciLow": 2.9,
      "ciHigh": 5.7,
      "nWeighted": 5756
    },
    "psychosisHouseholdsN": 5756,
    "depresi": {
      "value": 0.8,
      "ciLow": 0.6,
      "ciHigh": 1.1,
      "nWeighted": 11858
    },
    "masalahJiwa": {
      "value": 1.7,
      "ciLow": 1.5,
      "ciHigh": 1.9,
      "nWeighted": 11858
    },
    "pikiranMengakhiriHidup": {
      "value": 0.15,
      "ciLow": 0.09,
      "ciHigh": 0.22,
      "nWeighted": 11858
    },
    "individuals15PlusN": 11858,
    "depresiBerobat": {
      "value": 27.0,
      "ciLow": 18.9,
      "ciHigh": 37.1,
      "nWeighted": 100,
      "isLowSample": false
    }
  },
  {
    "code": "SU",
    "name": "Sumatera Utara",
    "shortName": "Sumut",
    "region": "Sumatera",
    "isNational": false,
    "mapPos": {
      "x": 92,
      "y": 96
    },
    "gridPos": {
      "row": 0,
      "col": 1
    },
    "psychosisGejala": {
      "value": 1.6,
      "ciLow": 1.1,
      "ciHigh": 2.3,
      "nWeighted": 15884
    },
    "psychosisDiagnosis": {
      "value": 1.1,
      "ciLow": 0.7,
      "ciHigh": 1.7,
      "nWeighted": 15884
    },
    "psychosisHouseholdsN": 15884,
    "depresi": {
      "value": 1.2,
      "ciLow": 0.9,
      "ciHigh": 1.6,
      "nWeighted": 33667
    },
    "masalahJiwa": {
      "value": 1.8,
      "ciLow": 1.4,
      "ciHigh": 2.2,
      "nWeighted": 33667
    },
    "pikiranMengakhiriHidup": {
      "value": 0.23,
      "ciLow": 0.16,
      "ciHigh": 0.34,
      "nWeighted": 33667
    },
    "individuals15PlusN": 33667,
    "depresiBerobat": {
      "value": 19.9,
      "ciLow": 9.7,
      "ciHigh": 36.4,
      "nWeighted": 417,
      "isLowSample": false
    }
  },
  {
    "code": "SB",
    "name": "Sumatera Barat",
    "shortName": "Sumbar",
    "region": "Sumatera",
    "isNational": false,
    "mapPos": {
      "x": 126,
      "y": 158
    },
    "gridPos": {
      "row": 1,
      "col": 0
    },
    "psychosisGejala": {
      "value": 4.8,
      "ciLow": 3.4,
      "ciHigh": 6.7,
      "nWeighted": 6042
    },
    "psychosisDiagnosis": {
      "value": 4.5,
      "ciLow": 3.1,
      "ciHigh": 6.4,
      "nWeighted": 6042
    },
    "psychosisHouseholdsN": 6042,
    "depresi": {
      "value": 0.8,
      "ciLow": 0.6,
      "ciHigh": 1.0,
      "nWeighted": 12973
    },
    "masalahJiwa": {
      "value": 1.3,
      "ciLow": 1.0,
      "ciHigh": 1.6,
      "nWeighted": 12973
    },
    "pikiranMengakhiriHidup": {
      "value": 0.18,
      "ciLow": 0.12,
      "ciHigh": 0.28,
      "nWeighted": 12973
    },
    "individuals15PlusN": 12973,
    "depresiBerobat": {
      "value": 18.2,
      "ciLow": 11.6,
      "ciHigh": 27.2,
      "nWeighted": 98,
      "isLowSample": false
    }
  },
  {
    "code": "RI",
    "name": "Riau",
    "shortName": "Riau",
    "region": "Sumatera",
    "isNational": false,
    "mapPos": {
      "x": 166,
      "y": 134
    },
    "gridPos": {
      "row": 1,
      "col": 1
    },
    "psychosisGejala": {
      "value": 2.6,
      "ciLow": 1.5,
      "ciHigh": 4.4,
      "nWeighted": 7051
    },
    "psychosisDiagnosis": {
      "value": 1.6,
      "ciLow": 0.8,
      "ciHigh": 3.2,
      "nWeighted": 7051
    },
    "psychosisHouseholdsN": 7051,
    "depresi": {
      "value": 0.6,
      "ciLow": 0.5,
      "ciHigh": 0.8,
      "nWeighted": 14408
    },
    "masalahJiwa": {
      "value": 1.2,
      "ciLow": 1.0,
      "ciHigh": 1.5,
      "nWeighted": 14408
    },
    "pikiranMengakhiriHidup": {
      "value": 0.18,
      "ciLow": 0.12,
      "ciHigh": 0.28,
      "nWeighted": 14408
    },
    "individuals15PlusN": 14408,
    "depresiBerobat": {
      "value": 12.6,
      "ciLow": 6.8,
      "ciHigh": 22.1,
      "nWeighted": 92,
      "isLowSample": false
    }
  },
  {
    "code": "JA",
    "name": "Jambi",
    "shortName": "Jambi",
    "region": "Sumatera",
    "isNational": false,
    "mapPos": {
      "x": 184,
      "y": 184
    },
    "gridPos": {
      "row": 1,
      "col": 2
    },
    "psychosisGejala": {
      "value": 2.8,
      "ciLow": 1.4,
      "ciHigh": 5.5,
      "nWeighted": 4051
    },
    "psychosisDiagnosis": {
      "value": 2.8,
      "ciLow": 1.4,
      "ciHigh": 5.5,
      "nWeighted": 4051
    },
    "psychosisHouseholdsN": 4051,
    "depresi": {
      "value": 0.3,
      "ciLow": 0.2,
      "ciHigh": 0.4,
      "nWeighted": 7890
    },
    "masalahJiwa": {
      "value": 0.9,
      "ciLow": 0.6,
      "ciHigh": 1.3,
      "nWeighted": 7890
    },
    "pikiranMengakhiriHidup": {
      "value": 0.09,
      "ciLow": 0.04,
      "ciHigh": 0.18,
      "nWeighted": 7890
    },
    "individuals15PlusN": 7890,
    "depresiBerobat": {
      "value": 33.5,
      "ciLow": 18.0,
      "ciHigh": 53.7,
      "nWeighted": 21,
      "isLowSample": true
    }
  },
  {
    "code": "SS",
    "name": "Sumatera Selatan",
    "shortName": "Sumsel",
    "region": "Sumatera",
    "isNational": false,
    "mapPos": {
      "x": 222,
      "y": 222
    },
    "gridPos": {
      "row": 2,
      "col": 1
    },
    "psychosisGejala": {
      "value": 3.0,
      "ciLow": 2.0,
      "ciHigh": 4.5,
      "nWeighted": 9402
    },
    "psychosisDiagnosis": {
      "value": 2.1,
      "ciLow": 1.4,
      "ciHigh": 3.2,
      "nWeighted": 9402
    },
    "psychosisHouseholdsN": 9402,
    "depresi": {
      "value": 0.5,
      "ciLow": 0.4,
      "ciHigh": 0.6,
      "nWeighted": 19282
    },
    "masalahJiwa": {
      "value": 0.9,
      "ciLow": 0.7,
      "ciHigh": 1.1,
      "nWeighted": 19282
    },
    "pikiranMengakhiriHidup": {
      "value": 0.11,
      "ciLow": 0.07,
      "ciHigh": 0.17,
      "nWeighted": 19282
    },
    "individuals15PlusN": 19282,
    "depresiBerobat": {
      "value": 20.2,
      "ciLow": 13.1,
      "ciHigh": 29.8,
      "nWeighted": 91,
      "isLowSample": false
    }
  },
  {
    "code": "BE",
    "name": "Bengkulu",
    "shortName": "Bengkulu",
    "region": "Sumatera",
    "isNational": false,
    "mapPos": {
      "x": 175,
      "y": 226
    },
    "gridPos": {
      "row": 2,
      "col": 0
    },
    "psychosisGejala": {
      "value": 2.8,
      "ciLow": 1.6,
      "ciHigh": 4.6,
      "nWeighted": 2323
    },
    "psychosisDiagnosis": {
      "value": 2.1,
      "ciLow": 1.2,
      "ciHigh": 3.9,
      "nWeighted": 2323
    },
    "psychosisHouseholdsN": 2323,
    "depresi": {
      "value": 0.5,
      "ciLow": 0.4,
      "ciHigh": 0.8,
      "nWeighted": 4674
    },
    "masalahJiwa": {
      "value": 1.1,
      "ciLow": 0.8,
      "ciHigh": 1.5,
      "nWeighted": 4674
    },
    "pikiranMengakhiriHidup": {
      "value": 0.08,
      "ciLow": 0.03,
      "ciHigh": 0.19,
      "nWeighted": 4674
    },
    "individuals15PlusN": 4674,
    "depresiBerobat": {
      "value": 11.7,
      "ciLow": 5.6,
      "ciHigh": 22.8,
      "nWeighted": 26,
      "isLowSample": true
    }
  },
  {
    "code": "LA",
    "name": "Lampung",
    "shortName": "Lampung",
    "region": "Sumatera",
    "isNational": false,
    "mapPos": {
      "x": 245,
      "y": 266
    },
    "gridPos": {
      "row": 2,
      "col": 2
    },
    "psychosisGejala": {
      "value": 2.8,
      "ciLow": 1.6,
      "ciHigh": 4.8,
      "nWeighted": 10424
    },
    "psychosisDiagnosis": {
      "value": 2.0,
      "ciLow": 1.0,
      "ciHigh": 4.2,
      "nWeighted": 10424
    },
    "psychosisHouseholdsN": 10424,
    "depresi": {
      "value": 0.5,
      "ciLow": 0.4,
      "ciHigh": 0.6,
      "nWeighted": 20646
    },
    "masalahJiwa": {
      "value": 0.7,
      "ciLow": 0.5,
      "ciHigh": 0.9,
      "nWeighted": 20646
    },
    "pikiranMengakhiriHidup": {
      "value": 0.14,
      "ciLow": 0.08,
      "ciHigh": 0.25,
      "nWeighted": 20646
    },
    "individuals15PlusN": 20646,
    "depresiBerobat": {
      "value": 14.8,
      "ciLow": 7.0,
      "ciHigh": 28.6,
      "nWeighted": 99,
      "isLowSample": false
    }
  },
  {
    "code": "BB",
    "name": "Kepulauan Bangka Belitung",
    "shortName": "Babel",
    "region": "Sumatera",
    "isNational": false,
    "mapPos": {
      "x": 266,
      "y": 198
    },
    "gridPos": {
      "row": 1,
      "col": 3
    },
    "psychosisGejala": {
      "value": 3.1,
      "ciLow": 1.8,
      "ciHigh": 5.3,
      "nWeighted": 1707
    },
    "psychosisDiagnosis": {
      "value": 2.2,
      "ciLow": 1.2,
      "ciHigh": 4.1,
      "nWeighted": 1707
    },
    "psychosisHouseholdsN": 1707,
    "depresi": {
      "value": 0.3,
      "ciLow": 0.2,
      "ciHigh": 0.4,
      "nWeighted": 3439
    },
    "masalahJiwa": {
      "value": 0.5,
      "ciLow": 0.4,
      "ciHigh": 0.7,
      "nWeighted": 3439
    },
    "pikiranMengakhiriHidup": {
      "value": 0.07,
      "ciLow": 0.03,
      "ciHigh": 0.17,
      "nWeighted": 3439
    },
    "individuals15PlusN": 3439,
    "depresiBerobat": {
      "value": 14.0,
      "ciLow": 5.4,
      "ciHigh": 31.6,
      "nWeighted": 10,
      "isLowSample": true
    }
  },
  {
    "code": "KR",
    "name": "Kepulauan Riau",
    "shortName": "Kepri",
    "region": "Sumatera",
    "isNational": false,
    "mapPos": {
      "x": 236,
      "y": 126
    },
    "gridPos": {
      "row": 0,
      "col": 3
    },
    "psychosisGejala": {
      "value": 2.6,
      "ciLow": 0.6,
      "ciHigh": 10.5,
      "nWeighted": 2514
    },
    "psychosisDiagnosis": {
      "value": 2.6,
      "ciLow": 0.6,
      "ciHigh": 10.5,
      "nWeighted": 2514
    },
    "psychosisHouseholdsN": 2514,
    "depresi": {
      "value": 0.5,
      "ciLow": 0.3,
      "ciHigh": 0.8,
      "nWeighted": 4778
    },
    "masalahJiwa": {
      "value": 0.9,
      "ciLow": 0.6,
      "ciHigh": 1.2,
      "nWeighted": 4778
    },
    "pikiranMengakhiriHidup": {
      "value": 0.12,
      "ciLow": 0.07,
      "ciHigh": 0.23,
      "nWeighted": 4778
    },
    "individuals15PlusN": 4778,
    "depresiBerobat": {
      "value": 9.9,
      "ciLow": 6.1,
      "ciHigh": 15.6,
      "nWeighted": 24,
      "isLowSample": true
    }
  },
  {
    "code": "JK",
    "name": "DKI Jakarta",
    "shortName": "DKI Jakarta",
    "region": "Jawa-Bali",
    "isNational": false,
    "mapPos": {
      "x": 284,
      "y": 288
    },
    "gridPos": {
      "row": 3,
      "col": 3
    },
    "psychosisGejala": {
      "value": 4.9,
      "ciLow": 2.8,
      "ciHigh": 8.3,
      "nWeighted": 12317
    },
    "psychosisDiagnosis": {
      "value": 4.9,
      "ciLow": 2.8,
      "ciHigh": 8.3,
      "nWeighted": 12317
    },
    "psychosisHouseholdsN": 12317,
    "depresi": {
      "value": 1.5,
      "ciLow": 1.2,
      "ciHigh": 2.0,
      "nWeighted": 24697
    },
    "masalahJiwa": {
      "value": 2.3,
      "ciLow": 1.9,
      "ciHigh": 2.9,
      "nWeighted": 24697
    },
    "pikiranMengakhiriHidup": {
      "value": 0.44,
      "ciLow": 0.28,
      "ciHigh": 0.7,
      "nWeighted": 24697
    },
    "individuals15PlusN": 24697,
    "depresiBerobat": {
      "value": 25.1,
      "ciLow": 17.8,
      "ciHigh": 34.3,
      "nWeighted": 380,
      "isLowSample": false
    }
  },
  {
    "code": "JB",
    "name": "Jawa Barat",
    "shortName": "Jabar",
    "region": "Jawa-Bali",
    "isNational": false,
    "mapPos": {
      "x": 305,
      "y": 304
    },
    "gridPos": {
      "row": 3,
      "col": 4
    },
    "psychosisGejala": {
      "value": 3.8,
      "ciLow": 2.9,
      "ciHigh": 4.9,
      "nWeighted": 58510
    },
    "psychosisDiagnosis": {
      "value": 2.4,
      "ciLow": 1.8,
      "ciHigh": 3.4,
      "nWeighted": 58510
    },
    "psychosisHouseholdsN": 58510,
    "depresi": {
      "value": 3.3,
      "ciLow": 3.0,
      "ciHigh": 3.7,
      "nWeighted": 113568
    },
    "masalahJiwa": {
      "value": 4.4,
      "ciLow": 4.0,
      "ciHigh": 4.8,
      "nWeighted": 113568
    },
    "pikiranMengakhiriHidup": {
      "value": 0.45,
      "ciLow": 0.36,
      "ciHigh": 0.56,
      "nWeighted": 113568
    },
    "individuals15PlusN": 113568,
    "depresiBerobat": {
      "value": 8.7,
      "ciLow": 6.9,
      "ciHigh": 10.9,
      "nWeighted": 3748,
      "isLowSample": false
    }
  },
  {
    "code": "JT",
    "name": "Jawa Tengah",
    "shortName": "Jateng",
    "region": "Jawa-Bali",
    "isNational": false,
    "mapPos": {
      "x": 365,
      "y": 312
    },
    "gridPos": {
      "row": 3,
      "col": 5
    },
    "psychosisGejala": {
      "value": 6.5,
      "ciLow": 5.4,
      "ciHigh": 7.9,
      "nWeighted": 44456
    },
    "psychosisDiagnosis": {
      "value": 5.1,
      "ciLow": 4.1,
      "ciHigh": 6.4,
      "nWeighted": 44456
    },
    "psychosisHouseholdsN": 44456,
    "depresi": {
      "value": 1.0,
      "ciLow": 0.9,
      "ciHigh": 1.2,
      "nWeighted": 86668
    },
    "masalahJiwa": {
      "value": 1.7,
      "ciLow": 1.5,
      "ciHigh": 2.0,
      "nWeighted": 86668
    },
    "pikiranMengakhiriHidup": {
      "value": 0.18,
      "ciLow": 0.14,
      "ciHigh": 0.23,
      "nWeighted": 86668
    },
    "individuals15PlusN": 86668,
    "depresiBerobat": {
      "value": 14.1,
      "ciLow": 10.5,
      "ciHigh": 18.6,
      "nWeighted": 897,
      "isLowSample": false
    }
  },
  {
    "code": "YO",
    "name": "DI Yogyakarta",
    "shortName": "DIY",
    "region": "Jawa-Bali",
    "isNational": false,
    "mapPos": {
      "x": 372,
      "y": 330
    },
    "gridPos": {
      "row": 3,
      "col": 6
    },
    "psychosisGejala": {
      "value": 9.3,
      "ciLow": 6.1,
      "ciHigh": 14.2,
      "nWeighted": 4957
    },
    "psychosisDiagnosis": {
      "value": 7.8,
      "ciLow": 4.9,
      "ciHigh": 12.4,
      "nWeighted": 4957
    },
    "psychosisHouseholdsN": 4957,
    "depresi": {
      "value": 1.5,
      "ciLow": 1.2,
      "ciHigh": 1.8,
      "nWeighted": 8827
    },
    "masalahJiwa": {
      "value": 1.9,
      "ciLow": 1.6,
      "ciHigh": 2.4,
      "nWeighted": 8827
    },
    "pikiranMengakhiriHidup": {
      "value": 0.3,
      "ciLow": 0.19,
      "ciHigh": 0.47,
      "nWeighted": 8827
    },
    "individuals15PlusN": 8827,
    "depresiBerobat": {
      "value": 12.7,
      "ciLow": 7.4,
      "ciHigh": 21.0,
      "nWeighted": 128,
      "isLowSample": false
    }
  },
  {
    "code": "JI",
    "name": "Jawa Timur",
    "shortName": "Jatim",
    "region": "Jawa-Bali",
    "isNational": false,
    "mapPos": {
      "x": 425,
      "y": 326
    },
    "gridPos": {
      "row": 3,
      "col": 7
    },
    "psychosisGejala": {
      "value": 4.2,
      "ciLow": 3.3,
      "ciHigh": 5.3,
      "nWeighted": 50588
    },
    "psychosisDiagnosis": {
      "value": 3.0,
      "ciLow": 2.3,
      "ciHigh": 4.0,
      "nWeighted": 50588
    },
    "psychosisHouseholdsN": 50588,
    "depresi": {
      "value": 0.7,
      "ciLow": 0.6,
      "ciHigh": 0.8,
      "nWeighted": 97746
    },
    "masalahJiwa": {
      "value": 1.0,
      "ciLow": 0.8,
      "ciHigh": 1.1,
      "nWeighted": 97746
    },
    "pikiranMengakhiriHidup": {
      "value": 0.1,
      "ciLow": 0.07,
      "ciHigh": 0.14,
      "nWeighted": 97746
    },
    "individuals15PlusN": 97746,
    "depresiBerobat": {
      "value": 14.0,
      "ciLow": 10.2,
      "ciHigh": 18.8,
      "nWeighted": 648,
      "isLowSample": false
    }
  },
  {
    "code": "BT",
    "name": "Banten",
    "shortName": "Banten",
    "region": "Jawa-Bali",
    "isNational": false,
    "mapPos": {
      "x": 264,
      "y": 296
    },
    "gridPos": {
      "row": 3,
      "col": 2
    },
    "psychosisGejala": {
      "value": 2.0,
      "ciLow": 1.0,
      "ciHigh": 4.3,
      "nWeighted": 13332
    },
    "psychosisDiagnosis": {
      "value": 1.1,
      "ciLow": 0.4,
      "ciHigh": 2.9,
      "nWeighted": 13332
    },
    "psychosisHouseholdsN": 13332,
    "depresi": {
      "value": 1.7,
      "ciLow": 1.3,
      "ciHigh": 2.4,
      "nWeighted": 27507
    },
    "masalahJiwa": {
      "value": 2.7,
      "ciLow": 2.0,
      "ciHigh": 3.6,
      "nWeighted": 27507
    },
    "pikiranMengakhiriHidup": {
      "value": 0.36,
      "ciLow": 0.21,
      "ciHigh": 0.62,
      "nWeighted": 27507
    },
    "individuals15PlusN": 27507,
    "depresiBerobat": {
      "value": 15.4,
      "ciLow": 9.5,
      "ciHigh": 23.9,
      "nWeighted": 479,
      "isLowSample": false
    }
  },
  {
    "code": "BA",
    "name": "Bali",
    "shortName": "Bali",
    "region": "Jawa-Bali",
    "isNational": false,
    "mapPos": {
      "x": 476,
      "y": 342
    },
    "gridPos": {
      "row": 3,
      "col": 8
    },
    "psychosisGejala": {
      "value": 1.4,
      "ciLow": 0.7,
      "ciHigh": 2.9,
      "nWeighted": 5149
    },
    "psychosisDiagnosis": {
      "value": 0.9,
      "ciLow": 0.4,
      "ciHigh": 2.0,
      "nWeighted": 5149
    },
    "psychosisHouseholdsN": 5149,
    "depresi": {
      "value": 0.2,
      "ciLow": 0.1,
      "ciHigh": 0.3,
      "nWeighted": 10412
    },
    "masalahJiwa": {
      "value": 0.3,
      "ciLow": 0.2,
      "ciHigh": 0.5,
      "nWeighted": 10412
    },
    "pikiranMengakhiriHidup": {
      "value": 0.06,
      "ciLow": 0.02,
      "ciHigh": 0.13,
      "nWeighted": 10412
    },
    "individuals15PlusN": 10412,
    "depresiBerobat": {
      "value": 10.4,
      "ciLow": 5.6,
      "ciHigh": 18.3,
      "nWeighted": 16,
      "isLowSample": true
    }
  },
  {
    "code": "NB",
    "name": "Nusa Tenggara Barat",
    "shortName": "NTB",
    "region": "Nusa Tenggara",
    "isNational": false,
    "mapPos": {
      "x": 526,
      "y": 348
    },
    "gridPos": {
      "row": 3,
      "col": 9
    },
    "psychosisGejala": {
      "value": 3.7,
      "ciLow": 2.0,
      "ciHigh": 6.8,
      "nWeighted": 6849
    },
    "psychosisDiagnosis": {
      "value": 3.0,
      "ciLow": 1.5,
      "ciHigh": 6.1,
      "nWeighted": 6849
    },
    "psychosisHouseholdsN": 6849,
    "depresi": {
      "value": 1.3,
      "ciLow": 1.0,
      "ciHigh": 1.8,
      "nWeighted": 11964
    },
    "masalahJiwa": {
      "value": 1.7,
      "ciLow": 1.3,
      "ciHigh": 2.4,
      "nWeighted": 11964
    },
    "pikiranMengakhiriHidup": {
      "value": 0.22,
      "ciLow": 0.11,
      "ciHigh": 0.46,
      "nWeighted": 11964
    },
    "individuals15PlusN": 11964,
    "depresiBerobat": {
      "value": 7.5,
      "ciLow": 4.5,
      "ciHigh": 12.2,
      "nWeighted": 156,
      "isLowSample": false
    }
  },
  {
    "code": "NT",
    "name": "Nusa Tenggara Timur",
    "shortName": "NTT",
    "region": "Nusa Tenggara",
    "isNational": false,
    "mapPos": {
      "x": 622,
      "y": 368
    },
    "gridPos": {
      "row": 3,
      "col": 10
    },
    "psychosisGejala": {
      "value": 5.5,
      "ciLow": 4.3,
      "ciHigh": 7.0,
      "nWeighted": 5333
    },
    "psychosisDiagnosis": {
      "value": 3.4,
      "ciLow": 2.4,
      "ciHigh": 4.8,
      "nWeighted": 5333
    },
    "psychosisHouseholdsN": 5333,
    "depresi": {
      "value": 1.1,
      "ciLow": 0.9,
      "ciHigh": 1.3,
      "nWeighted": 11779
    },
    "masalahJiwa": {
      "value": 2.2,
      "ciLow": 1.9,
      "ciHigh": 2.5,
      "nWeighted": 11779
    },
    "pikiranMengakhiriHidup": {
      "value": 0.26,
      "ciLow": 0.2,
      "ciHigh": 0.35,
      "nWeighted": 11779
    },
    "individuals15PlusN": 11779,
    "depresiBerobat": {
      "value": 9.9,
      "ciLow": 7.1,
      "ciHigh": 13.6,
      "nWeighted": 129,
      "isLowSample": false
    }
  },
  {
    "code": "KB",
    "name": "Kalimantan Barat",
    "shortName": "Kalbar",
    "region": "Kalimantan",
    "isNational": false,
    "mapPos": {
      "x": 366,
      "y": 148
    },
    "gridPos": {
      "row": 1,
      "col": 5
    },
    "psychosisGejala": {
      "value": 2.7,
      "ciLow": 1.7,
      "ciHigh": 4.4,
      "nWeighted": 5783
    },
    "psychosisDiagnosis": {
      "value": 2.2,
      "ciLow": 1.3,
      "ciHigh": 3.6,
      "nWeighted": 5783
    },
    "psychosisHouseholdsN": 5783,
    "depresi": {
      "value": 0.5,
      "ciLow": 0.4,
      "ciHigh": 0.7,
      "nWeighted": 12525
    },
    "masalahJiwa": {
      "value": 0.6,
      "ciLow": 0.5,
      "ciHigh": 0.8,
      "nWeighted": 12525
    },
    "pikiranMengakhiriHidup": {
      "value": 0.06,
      "ciLow": 0.03,
      "ciHigh": 0.16,
      "nWeighted": 12525
    },
    "individuals15PlusN": 12525,
    "depresiBerobat": {
      "value": 12.6,
      "ciLow": 5.8,
      "ciHigh": 25.1,
      "nWeighted": 60,
      "isLowSample": false
    }
  },
  {
    "code": "KT",
    "name": "Kalimantan Tengah",
    "shortName": "Kalteng",
    "region": "Kalimantan",
    "isNational": false,
    "mapPos": {
      "x": 432,
      "y": 178
    },
    "gridPos": {
      "row": 1,
      "col": 6
    },
    "psychosisGejala": {
      "value": 2.4,
      "ciLow": 1.3,
      "ciHigh": 4.4,
      "nWeighted": 3178
    },
    "psychosisDiagnosis": {
      "value": 1.8,
      "ciLow": 0.9,
      "ciHigh": 3.9,
      "nWeighted": 3178
    },
    "psychosisHouseholdsN": 3178,
    "depresi": {
      "value": 0.3,
      "ciLow": 0.2,
      "ciHigh": 0.4,
      "nWeighted": 6163
    },
    "masalahJiwa": {
      "value": 0.6,
      "ciLow": 0.4,
      "ciHigh": 0.8,
      "nWeighted": 6163
    },
    "pikiranMengakhiriHidup": {
      "value": 0.08,
      "ciLow": 0.04,
      "ciHigh": 0.16,
      "nWeighted": 6163
    },
    "individuals15PlusN": 6163,
    "depresiBerobat": {
      "value": 15.6,
      "ciLow": 6.7,
      "ciHigh": 32.3,
      "nWeighted": 17,
      "isLowSample": true
    }
  },
  {
    "code": "KS",
    "name": "Kalimantan Selatan",
    "shortName": "Kalsel",
    "region": "Kalimantan",
    "isNational": false,
    "mapPos": {
      "x": 476,
      "y": 202
    },
    "gridPos": {
      "row": 2,
      "col": 6
    },
    "psychosisGejala": {
      "value": 4.8,
      "ciLow": 3.2,
      "ciHigh": 7.1,
      "nWeighted": 5023
    },
    "psychosisDiagnosis": {
      "value": 3.9,
      "ciLow": 2.5,
      "ciHigh": 6.1,
      "nWeighted": 5023
    },
    "psychosisHouseholdsN": 5023,
    "depresi": {
      "value": 0.5,
      "ciLow": 0.4,
      "ciHigh": 0.7,
      "nWeighted": 9301
    },
    "masalahJiwa": {
      "value": 1.0,
      "ciLow": 0.8,
      "ciHigh": 1.3,
      "nWeighted": 9301
    },
    "pikiranMengakhiriHidup": {
      "value": 0.08,
      "ciLow": 0.05,
      "ciHigh": 0.13,
      "nWeighted": 9301
    },
    "individuals15PlusN": 9301,
    "depresiBerobat": {
      "value": 15.2,
      "ciLow": 8.2,
      "ciHigh": 26.3,
      "nWeighted": 49,
      "isLowSample": true
    }
  },
  {
    "code": "KI",
    "name": "Kalimantan Timur",
    "shortName": "Kaltim",
    "region": "Kalimantan",
    "isNational": false,
    "mapPos": {
      "x": 508,
      "y": 134
    },
    "gridPos": {
      "row": 1,
      "col": 7
    },
    "psychosisGejala": {
      "value": 3.6,
      "ciLow": 1.9,
      "ciHigh": 6.8,
      "nWeighted": 4319
    },
    "psychosisDiagnosis": {
      "value": 3.1,
      "ciLow": 1.6,
      "ciHigh": 6.2,
      "nWeighted": 4319
    },
    "psychosisHouseholdsN": 4319,
    "depresi": {
      "value": 2.2,
      "ciLow": 1.7,
      "ciHigh": 2.7,
      "nWeighted": 8850
    },
    "masalahJiwa": {
      "value": 2.9,
      "ciLow": 2.4,
      "ciHigh": 3.5,
      "nWeighted": 8850
    },
    "pikiranMengakhiriHidup": {
      "value": 0.5,
      "ciLow": 0.35,
      "ciHigh": 0.69,
      "nWeighted": 8850
    },
    "individuals15PlusN": 8850,
    "depresiBerobat": {
      "value": 9.0,
      "ciLow": 5.4,
      "ciHigh": 14.6,
      "nWeighted": 192,
      "isLowSample": false
    }
  },
  {
    "code": "KU",
    "name": "Kalimantan Utara",
    "shortName": "Kaltara",
    "region": "Kalimantan",
    "isNational": false,
    "mapPos": {
      "x": 504,
      "y": 72
    },
    "gridPos": {
      "row": 0,
      "col": 7
    },
    "psychosisGejala": {
      "value": 1.9,
      "ciLow": 0.7,
      "ciHigh": 5.0,
      "nWeighted": 729
    },
    "psychosisDiagnosis": {
      "value": 1.6,
      "ciLow": 0.5,
      "ciHigh": 4.9,
      "nWeighted": 729
    },
    "psychosisHouseholdsN": 729,
    "depresi": {
      "value": 0.5,
      "ciLow": 0.3,
      "ciHigh": 0.9,
      "nWeighted": 1637
    },
    "masalahJiwa": {
      "value": 0.8,
      "ciLow": 0.5,
      "ciHigh": 1.3,
      "nWeighted": 1637
    },
    "pikiranMengakhiriHidup": {
      "value": 0.23,
      "ciLow": 0.1,
      "ciHigh": 0.54,
      "nWeighted": 1637
    },
    "individuals15PlusN": 1637,
    "depresiBerobat": {
      "value": 14.1,
      "ciLow": 3.0,
      "ciHigh": 46.4,
      "nWeighted": 8,
      "isLowSample": true
    }
  },
  {
    "code": "SA",
    "name": "Sulawesi Utara",
    "shortName": "Sulut",
    "region": "Sulawesi",
    "isNational": false,
    "mapPos": {
      "x": 676,
      "y": 118
    },
    "gridPos": {
      "row": 0,
      "col": 10
    },
    "psychosisGejala": {
      "value": 1.2,
      "ciLow": 0.5,
      "ciHigh": 3.1,
      "nWeighted": 3031
    },
    "psychosisDiagnosis": {
      "value": 1.2,
      "ciLow": 0.4,
      "ciHigh": 3.1,
      "nWeighted": 3031
    },
    "psychosisHouseholdsN": 3031,
    "depresi": {
      "value": 1.4,
      "ciLow": 1.0,
      "ciHigh": 1.8,
      "nWeighted": 6178
    },
    "masalahJiwa": {
      "value": 1.9,
      "ciLow": 1.5,
      "ciHigh": 2.4,
      "nWeighted": 6178
    },
    "pikiranMengakhiriHidup": {
      "value": 0.23,
      "ciLow": 0.13,
      "ciHigh": 0.42,
      "nWeighted": 6178
    },
    "individuals15PlusN": 6178,
    "depresiBerobat": {
      "value": 11.1,
      "ciLow": 7.0,
      "ciHigh": 17.3,
      "nWeighted": 83,
      "isLowSample": false
    }
  },
  {
    "code": "ST",
    "name": "Sulawesi Tengah",
    "shortName": "Sulteng",
    "region": "Sulawesi",
    "isNational": false,
    "mapPos": {
      "x": 610,
      "y": 172
    },
    "gridPos": {
      "row": 1,
      "col": 10
    },
    "psychosisGejala": {
      "value": 3.9,
      "ciLow": 2.5,
      "ciHigh": 6.1,
      "nWeighted": 3215
    },
    "psychosisDiagnosis": {
      "value": 3.4,
      "ciLow": 2.1,
      "ciHigh": 5.5,
      "nWeighted": 3215
    },
    "psychosisHouseholdsN": 3215,
    "depresi": {
      "value": 1.5,
      "ciLow": 1.1,
      "ciHigh": 1.9,
      "nWeighted": 6832
    },
    "masalahJiwa": {
      "value": 2.5,
      "ciLow": 2.0,
      "ciHigh": 3.0,
      "nWeighted": 6832
    },
    "pikiranMengakhiriHidup": {
      "value": 0.35,
      "ciLow": 0.25,
      "ciHigh": 0.51,
      "nWeighted": 6832
    },
    "individuals15PlusN": 6832,
    "depresiBerobat": {
      "value": 16.1,
      "ciLow": 11.4,
      "ciHigh": 22.3,
      "nWeighted": 102,
      "isLowSample": false
    }
  },
  {
    "code": "SN",
    "name": "Sulawesi Selatan",
    "shortName": "Sulsel",
    "region": "Sulawesi",
    "isNational": false,
    "mapPos": {
      "x": 578,
      "y": 240
    },
    "gridPos": {
      "row": 2,
      "col": 9
    },
    "psychosisGejala": {
      "value": 4.8,
      "ciLow": 3.7,
      "ciHigh": 6.3,
      "nWeighted": 9483
    },
    "psychosisDiagnosis": {
      "value": 3.1,
      "ciLow": 2.3,
      "ciHigh": 4.1,
      "nWeighted": 9483
    },
    "psychosisHouseholdsN": 9483,
    "depresi": {
      "value": 1.7,
      "ciLow": 1.4,
      "ciHigh": 2.0,
      "nWeighted": 21208
    },
    "masalahJiwa": {
      "value": 2.7,
      "ciLow": 2.3,
      "ciHigh": 3.1,
      "nWeighted": 21208
    },
    "pikiranMengakhiriHidup": {
      "value": 0.29,
      "ciLow": 0.2,
      "ciHigh": 0.41,
      "nWeighted": 21208
    },
    "individuals15PlusN": 21208,
    "depresiBerobat": {
      "value": 13.0,
      "ciLow": 9.3,
      "ciHigh": 17.7,
      "nWeighted": 363,
      "isLowSample": false
    }
  },
  {
    "code": "SG",
    "name": "Sulawesi Tenggara",
    "shortName": "Sultra",
    "region": "Sulawesi",
    "isNational": false,
    "mapPos": {
      "x": 632,
      "y": 232
    },
    "gridPos": {
      "row": 2,
      "col": 10
    },
    "psychosisGejala": {
      "value": 2.9,
      "ciLow": 1.9,
      "ciHigh": 4.5,
      "nWeighted": 2733
    },
    "psychosisDiagnosis": {
      "value": 2.2,
      "ciLow": 1.4,
      "ciHigh": 3.6,
      "nWeighted": 2733
    },
    "psychosisHouseholdsN": 2733,
    "depresi": {
      "value": 0.8,
      "ciLow": 0.6,
      "ciHigh": 1.0,
      "nWeighted": 5912
    },
    "masalahJiwa": {
      "value": 1.6,
      "ciLow": 1.4,
      "ciHigh": 1.9,
      "nWeighted": 5912
    },
    "pikiranMengakhiriHidup": {
      "value": 0.24,
      "ciLow": 0.16,
      "ciHigh": 0.37,
      "nWeighted": 5912
    },
    "individuals15PlusN": 5912,
    "depresiBerobat": {
      "value": 17.0,
      "ciLow": 11.2,
      "ciHigh": 25.1,
      "nWeighted": 47,
      "isLowSample": true
    }
  },
  {
    "code": "GO",
    "name": "Gorontalo",
    "shortName": "Gorontalo",
    "region": "Sulawesi",
    "isNational": false,
    "mapPos": {
      "x": 636,
      "y": 136
    },
    "gridPos": {
      "row": 0,
      "col": 11
    },
    "psychosisGejala": {
      "value": 2.9,
      "ciLow": 1.4,
      "ciHigh": 5.9,
      "nWeighted": 1260
    },
    "psychosisDiagnosis": {
      "value": 2.3,
      "ciLow": 1.1,
      "ciHigh": 4.9,
      "nWeighted": 1260
    },
    "psychosisHouseholdsN": 1260,
    "depresi": {
      "value": 1.0,
      "ciLow": 0.7,
      "ciHigh": 1.5,
      "nWeighted": 2753
    },
    "masalahJiwa": {
      "value": 1.6,
      "ciLow": 1.3,
      "ciHigh": 2.1,
      "nWeighted": 2753
    },
    "pikiranMengakhiriHidup": {
      "value": 0.11,
      "ciLow": 0.04,
      "ciHigh": 0.28,
      "nWeighted": 2753
    },
    "individuals15PlusN": 2753,
    "depresiBerobat": {
      "value": 25.1,
      "ciLow": 14.5,
      "ciHigh": 39.9,
      "nWeighted": 29,
      "isLowSample": true
    }
  },
  {
    "code": "SR",
    "name": "Sulawesi Barat",
    "shortName": "Sulbar",
    "region": "Sulawesi",
    "isNational": false,
    "mapPos": {
      "x": 568,
      "y": 194
    },
    "gridPos": {
      "row": 1,
      "col": 9
    },
    "psychosisGejala": {
      "value": 5.9,
      "ciLow": 3.2,
      "ciHigh": 10.8,
      "nWeighted": 1467
    },
    "psychosisDiagnosis": {
      "value": 4.2,
      "ciLow": 2.1,
      "ciHigh": 8.3,
      "nWeighted": 1467
    },
    "psychosisHouseholdsN": 1467,
    "depresi": {
      "value": 0.6,
      "ciLow": 0.4,
      "ciHigh": 0.9,
      "nWeighted": 3171
    },
    "masalahJiwa": {
      "value": 1.4,
      "ciLow": 1.1,
      "ciHigh": 1.9,
      "nWeighted": 3171
    },
    "pikiranMengakhiriHidup": {
      "value": 0.21,
      "ciLow": 0.11,
      "ciHigh": 0.42,
      "nWeighted": 3171
    },
    "individuals15PlusN": 3171,
    "depresiBerobat": {
      "value": 34.0,
      "ciLow": 17.7,
      "ciHigh": 55.2,
      "nWeighted": 20,
      "isLowSample": true
    }
  },
  {
    "code": "MA",
    "name": "Maluku",
    "shortName": "Maluku",
    "region": "Maluku",
    "isNational": false,
    "mapPos": {
      "x": 758,
      "y": 224
    },
    "gridPos": {
      "row": 2,
      "col": 12
    },
    "psychosisGejala": {
      "value": 1.3,
      "ciLow": 0.6,
      "ciHigh": 2.8,
      "nWeighted": 1751
    },
    "psychosisDiagnosis": {
      "value": 1.2,
      "ciLow": 0.6,
      "ciHigh": 2.7,
      "nWeighted": 1751
    },
    "psychosisHouseholdsN": 1751,
    "depresi": {
      "value": 0.7,
      "ciLow": 0.5,
      "ciHigh": 0.9,
      "nWeighted": 4273
    },
    "masalahJiwa": {
      "value": 1.4,
      "ciLow": 1.1,
      "ciHigh": 1.8,
      "nWeighted": 4273
    },
    "pikiranMengakhiriHidup": {
      "value": 0.17,
      "ciLow": 0.1,
      "ciHigh": 0.31,
      "nWeighted": 4273
    },
    "individuals15PlusN": 4273,
    "depresiBerobat": {
      "value": 6.1,
      "ciLow": 2.5,
      "ciHigh": 14.4,
      "nWeighted": 29,
      "isLowSample": true
    }
  },
  {
    "code": "MU",
    "name": "Maluku Utara",
    "shortName": "Malut",
    "region": "Maluku",
    "isNational": false,
    "mapPos": {
      "x": 760,
      "y": 136
    },
    "gridPos": {
      "row": 0,
      "col": 13
    },
    "psychosisGejala": {
      "value": 1.7,
      "ciLow": 0.7,
      "ciHigh": 4.3,
      "nWeighted": 1222
    },
    "psychosisDiagnosis": {
      "value": 1.6,
      "ciLow": 0.6,
      "ciHigh": 4.3,
      "nWeighted": 1222
    },
    "psychosisHouseholdsN": 1222,
    "depresi": {
      "value": 0.7,
      "ciLow": 0.5,
      "ciHigh": 0.9,
      "nWeighted": 2920
    },
    "masalahJiwa": {
      "value": 0.8,
      "ciLow": 0.6,
      "ciHigh": 1.1,
      "nWeighted": 2920
    },
    "pikiranMengakhiriHidup": {
      "value": 0.18,
      "ciLow": 0.1,
      "ciHigh": 0.31,
      "nWeighted": 2920
    },
    "individuals15PlusN": 2920,
    "depresiBerobat": {
      "value": 11.2,
      "ciLow": 5.7,
      "ciHigh": 20.9,
      "nWeighted": 19,
      "isLowSample": true
    }
  },
  {
    "code": "PB",
    "name": "Papua Barat",
    "shortName": "Papua Barat",
    "region": "Papua",
    "isNational": false,
    "mapPos": {
      "x": 884,
      "y": 198
    },
    "gridPos": {
      "row": 1,
      "col": 14
    },
    "psychosisGejala": {
      "value": 1.1,
      "ciLow": 0.4,
      "ciHigh": 3.0,
      "nWeighted": 563
    },
    "psychosisDiagnosis": {
      "value": 0.6,
      "ciLow": 0.2,
      "ciHigh": 2.6,
      "nWeighted": 563
    },
    "psychosisHouseholdsN": 563,
    "depresi": {
      "value": 0.7,
      "ciLow": 0.4,
      "ciHigh": 1.1,
      "nWeighted": 1219
    },
    "masalahJiwa": {
      "value": 1.6,
      "ciLow": 1.1,
      "ciHigh": 2.3,
      "nWeighted": 1219
    },
    "pikiranMengakhiriHidup": {
      "value": 0.57,
      "ciLow": 0.14,
      "ciHigh": 2.38,
      "nWeighted": 1219
    },
    "individuals15PlusN": 1219,
    "depresiBerobat": {
      "value": 18.2,
      "ciLow": 11.4,
      "ciHigh": 27.9,
      "nWeighted": 8,
      "isLowSample": true
    }
  },
  {
    "code": "PD",
    "name": "Papua Barat Daya",
    "shortName": "PBD",
    "region": "Papua",
    "isNational": false,
    "mapPos": {
      "x": 842,
      "y": 176
    },
    "gridPos": {
      "row": 1,
      "col": 13
    },
    "psychosisGejala": {
      "value": 1.3,
      "ciLow": 0.5,
      "ciHigh": 3.4,
      "nWeighted": 599
    },
    "psychosisDiagnosis": {
      "value": 0.7,
      "ciLow": 0.2,
      "ciHigh": 3.0,
      "nWeighted": 599
    },
    "psychosisHouseholdsN": 599,
    "depresi": {
      "value": 1.1,
      "ciLow": 0.7,
      "ciHigh": 1.7,
      "nWeighted": 1359
    },
    "masalahJiwa": {
      "value": 2.1,
      "ciLow": 1.5,
      "ciHigh": 2.9,
      "nWeighted": 1359
    },
    "pikiranMengakhiriHidup": {
      "value": 0.4,
      "ciLow": 0.17,
      "ciHigh": 0.92,
      "nWeighted": 1359
    },
    "individuals15PlusN": 1359,
    "depresiBerobat": {
      "value": 12.2,
      "ciLow": 4.3,
      "ciHigh": 29.9,
      "nWeighted": 15,
      "isLowSample": true
    }
  },
  {
    "code": "PA",
    "name": "Papua",
    "shortName": "Papua",
    "region": "Papua",
    "isNational": false,
    "mapPos": {
      "x": 968,
      "y": 188
    },
    "gridPos": {
      "row": 1,
      "col": 15
    },
    "psychosisGejala": {
      "value": 3.0,
      "ciLow": 1.0,
      "ciHigh": 9.0,
      "nWeighted": 1029
    },
    "psychosisDiagnosis": {
      "value": 1.6,
      "ciLow": 0.5,
      "ciHigh": 5.1,
      "nWeighted": 1029
    },
    "psychosisHouseholdsN": 1029,
    "depresi": {
      "value": 0.6,
      "ciLow": 0.4,
      "ciHigh": 0.9,
      "nWeighted": 2059
    },
    "masalahJiwa": {
      "value": 1.3,
      "ciLow": 0.9,
      "ciHigh": 1.7,
      "nWeighted": 2059
    },
    "pikiranMengakhiriHidup": {
      "value": 0.24,
      "ciLow": 0.06,
      "ciHigh": 0.89,
      "nWeighted": 2059
    },
    "individuals15PlusN": 2059,
    "depresiBerobat": {
      "value": 3.3,
      "ciLow": 1.2,
      "ciHigh": 8.7,
      "nWeighted": 12,
      "isLowSample": true
    }
  },
  {
    "code": "PS",
    "name": "Papua Selatan",
    "shortName": "Papua Selatan",
    "region": "Papua",
    "isNational": false,
    "mapPos": {
      "x": 990,
      "y": 290
    },
    "gridPos": {
      "row": 3,
      "col": 15
    },
    "psychosisGejala": {
      "value": 1.0,
      "ciLow": 0.1,
      "ciHigh": 7.0,
      "nWeighted": 546
    },
    "psychosisDiagnosis": {
      "value": 1.0,
      "ciLow": 0.1,
      "ciHigh": 7.0,
      "nWeighted": 546
    },
    "psychosisHouseholdsN": 546,
    "depresi": {
      "value": 0.5,
      "ciLow": 0.3,
      "ciHigh": 1.1,
      "nWeighted": 982
    },
    "masalahJiwa": {
      "value": 1.3,
      "ciLow": 0.6,
      "ciHigh": 2.8,
      "nWeighted": 982
    },
    "pikiranMengakhiriHidup": {
      "value": 0.18,
      "ciLow": 0.07,
      "ciHigh": 0.43,
      "nWeighted": 982
    },
    "individuals15PlusN": 982,
    "depresiBerobat": {
      "value": 7.3,
      "ciLow": 0.9,
      "ciHigh": 39.1,
      "nWeighted": 5,
      "isLowSample": true
    }
  },
  {
    "code": "PT",
    "name": "Papua Tengah",
    "shortName": "Papua Tengah",
    "region": "Papua",
    "isNational": false,
    "mapPos": {
      "x": 938,
      "y": 234
    },
    "gridPos": {
      "row": 2,
      "col": 14
    },
    "psychosisGejala": {
      "value": 3.0,
      "ciLow": 1.3,
      "ciHigh": 6.9,
      "nWeighted": 1528
    },
    "psychosisDiagnosis": {
      "value": 0.4,
      "ciLow": 0.1,
      "ciHigh": 2.7,
      "nWeighted": 1528
    },
    "psychosisHouseholdsN": 1528,
    "depresi": {
      "value": 1.0,
      "ciLow": 0.5,
      "ciHigh": 2.0,
      "nWeighted": 3249
    },
    "masalahJiwa": {
      "value": 2.9,
      "ciLow": 1.7,
      "ciHigh": 4.8,
      "nWeighted": 3249
    },
    "pikiranMengakhiriHidup": {
      "value": 1.64,
      "ciLow": 0.78,
      "ciHigh": 3.44,
      "nWeighted": 3249
    },
    "individuals15PlusN": 3249,
    "depresiBerobat": {
      "value": 34.4,
      "ciLow": 24.5,
      "ciHigh": 45.8,
      "nWeighted": 34,
      "isLowSample": true
    }
  },
  {
    "code": "PP",
    "name": "Papua Pegunungan",
    "shortName": "Papua Peg.",
    "region": "Papua",
    "isNational": false,
    "mapPos": {
      "x": 1006,
      "y": 236
    },
    "gridPos": {
      "row": 2,
      "col": 15
    },
    "psychosisGejala": {
      "value": 2.2,
      "ciLow": 0.8,
      "ciHigh": 6.0,
      "nWeighted": 1516
    },
    "psychosisDiagnosis": {
      "value": 0.2,
      "ciLow": 0.0,
      "ciHigh": 1.2,
      "nWeighted": 1516
    },
    "psychosisHouseholdsN": 1516,
    "depresi": {
      "value": 0.8,
      "ciLow": 0.4,
      "ciHigh": 1.9,
      "nWeighted": 3454
    },
    "masalahJiwa": {
      "value": 3.0,
      "ciLow": 2.0,
      "ciHigh": 4.6,
      "nWeighted": 3454
    },
    "pikiranMengakhiriHidup": {
      "value": 0.21,
      "ciLow": 0.09,
      "ciHigh": 0.46,
      "nWeighted": 3454
    },
    "individuals15PlusN": 3454,
    "depresiBerobat": {
      "value": 47.9,
      "ciLow": 16.4,
      "ciHigh": 81.3,
      "nWeighted": 29,
      "isLowSample": true
    }
  },
  {
    "code": "ID",
    "name": "INDONESIA",
    "shortName": "INDONESIA",
    "region": "Nasional",
    "isNational": true,
    "mapPos": {
      "x": 0,
      "y": 0
    },
    "gridPos": {
      "row": 0,
      "col": 0
    },
    "psychosisGejala": {
      "value": 4.0,
      "ciLow": 3.7,
      "ciHigh": 4.4,
      "nWeighted": 315621
    },
    "psychosisDiagnosis": {
      "value": 3.0,
      "ciLow": 2.7,
      "ciHigh": 3.3,
      "nWeighted": 315621
    },
    "psychosisHouseholdsN": 315621,
    "depresi": {
      "value": 1.4,
      "ciLow": 1.3,
      "ciHigh": 1.5,
      "nWeighted": 630827
    },
    "masalahJiwa": {
      "value": 2.0,
      "ciLow": 2.0,
      "ciHigh": 2.1,
      "nWeighted": 630827
    },
    "pikiranMengakhiriHidup": {
      "value": 0.25,
      "ciLow": 0.22,
      "ciHigh": 0.27,
      "nWeighted": 630827
    },
    "individuals15PlusN": 630827,
    "depresiBerobat": {
      "value": 12.7,
      "ciLow": 11.3,
      "ciHigh": 14.2,
      "nWeighted": 8680,
      "isLowSample": false
    }
  }
];

export const PROVINCES_38 = PROVINCE_RECORDS.filter((r) => !r.isNational);
export const INDONESIA_RECORD = PROVINCE_RECORDS.find((r) => r.isNational)!;

export const HOUSEHOLD_PSYCHOSIS_PASUNG: HouseholdPsychosisPasungRecord[] = [
  {
    "group": "Tempat Tinggal",
    "label": "Perkotaan",
    "psychosisGejala": {
      "value": 4.0,
      "ciLow": 3.6,
      "ciHigh": 4.5,
      "nWeighted": 183405
    },
    "psychosisDiagnosis": {
      "value": 3.1,
      "ciLow": 2.8,
      "ciHigh": 3.6,
      "nWeighted": 183405
    },
    "psychosisRtN": 183405,
    "pasungLifetime": {
      "value": 5.4,
      "ciLow": 3.5,
      "ciHigh": 8.1,
      "nWeighted": 514
    },
    "pasungLifetimeN": 514
  },
  {
    "group": "Tempat Tinggal",
    "label": "Perdesaan",
    "psychosisGejala": {
      "value": 4.0,
      "ciLow": 3.5,
      "ciHigh": 4.7,
      "nWeighted": 132216
    },
    "psychosisDiagnosis": {
      "value": 2.8,
      "ciLow": 2.3,
      "ciHigh": 3.3,
      "nWeighted": 132216
    },
    "psychosisRtN": 132216,
    "pasungLifetime": {
      "value": 8.4,
      "ciLow": 6.8,
      "ciHigh": 10.4,
      "nWeighted": 330
    },
    "pasungLifetimeN": 330
  },
  {
    "group": "Status Ekonomi",
    "label": "Terbawah",
    "psychosisGejala": {
      "value": 8.8,
      "ciLow": 7.5,
      "ciHigh": 10.2,
      "nWeighted": 50291
    },
    "psychosisDiagnosis": {
      "value": 5.9,
      "ciLow": 4.9,
      "ciHigh": 7.1,
      "nWeighted": 50291
    },
    "psychosisRtN": 50291,
    "pasungLifetime": {
      "value": 9.9,
      "ciLow": 7.4,
      "ciHigh": 13.0,
      "nWeighted": 265
    },
    "pasungLifetimeN": 265
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah bawah",
    "psychosisGejala": {
      "value": 5.2,
      "ciLow": 4.3,
      "ciHigh": 6.2,
      "nWeighted": 59016
    },
    "psychosisDiagnosis": {
      "value": 3.7,
      "ciLow": 3.0,
      "ciHigh": 4.6,
      "nWeighted": 59016
    },
    "psychosisRtN": 59016,
    "pasungLifetime": {
      "value": 6.1,
      "ciLow": 3.7,
      "ciHigh": 10.1,
      "nWeighted": 195
    },
    "pasungLifetimeN": 195
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah",
    "psychosisGejala": {
      "value": 3.8,
      "ciLow": 3.0,
      "ciHigh": 4.6,
      "nWeighted": 65697
    },
    "psychosisDiagnosis": {
      "value": 3.0,
      "ciLow": 2.4,
      "ciHigh": 3.8,
      "nWeighted": 65697
    },
    "psychosisRtN": 65697,
    "pasungLifetime": {
      "value": 4.7,
      "ciLow": 2.1,
      "ciHigh": 10.2,
      "nWeighted": 175
    },
    "pasungLifetimeN": 175
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah atas",
    "psychosisGejala": {
      "value": 2.3,
      "ciLow": 1.8,
      "ciHigh": 2.9,
      "nWeighted": 71513
    },
    "psychosisDiagnosis": {
      "value": 1.9,
      "ciLow": 1.5,
      "ciHigh": 2.4,
      "nWeighted": 71513
    },
    "psychosisRtN": 71513,
    "pasungLifetime": {
      "value": 5.1,
      "ciLow": 2.0,
      "ciHigh": 12.3,
      "nWeighted": 122
    },
    "pasungLifetimeN": 122
  },
  {
    "group": "Status Ekonomi",
    "label": "Teratas",
    "psychosisGejala": {
      "value": 1.5,
      "ciLow": 1.1,
      "ciHigh": 2.1,
      "nWeighted": 69104
    },
    "psychosisDiagnosis": {
      "value": 1.4,
      "ciLow": 1.0,
      "ciHigh": 1.9,
      "nWeighted": 69104
    },
    "psychosisRtN": 69104,
    "pasungLifetime": {
      "value": 3.2,
      "ciLow": 1.2,
      "ciHigh": 8.2,
      "nWeighted": 87
    },
    "pasungLifetimeN": 87
  },
  {
    "group": "Nasional",
    "label": "INDONESIA",
    "psychosisGejala": {
      "value": 4.0,
      "ciLow": 3.7,
      "ciHigh": 4.4,
      "nWeighted": 315621
    },
    "psychosisDiagnosis": {
      "value": 3.0,
      "ciLow": 2.7,
      "ciHigh": 3.3,
      "nWeighted": 315621
    },
    "psychosisRtN": 315621,
    "pasungLifetime": {
      "value": 6.6,
      "ciLow": 5.2,
      "ciHigh": 8.3,
      "nWeighted": 844
    },
    "pasungLifetimeN": 844
  }
];

export const HOUSEHOLD_ART_COUNT_DISTRIBUTION = {
  nWeighted: 844,
  items: [
    { label: "1 orang ART psikosis/skizofrenia", percent: 95.6 },
    { label: "2 orang ART psikosis/skizofrenia", percent: 4.3 },
    { label: "3 orang ART psikosis/skizofrenia", percent: 0.1 },
  ],
};

export const PASUNG_RECENT_3MO_NOTE = {
  value: 25.2,
  ciLow: 19.7,
  ciHigh: 31.6,
  nWeighted: 55,
  description:
    "Dari semua rumah tangga yang memiliki ART pernah dipasung, terdapat 25,2% (95% CI: 19,7–31,6) rumah tangga yang memiliki ART pernah atau masih dipasung dalam 3 bulan terakhir (N tertimbang = 55 rumah tangga).",
};

export const PASUNG_REASONS: SimpleReasonRecord[] = [
  {
    reason: "Mengganggu ketenangan orang lain",
    percent: 69.5,
    nWeighted: 55,
  },
  {
    reason: "Perilaku kekerasan terhadap orang lain (mengamuk, membunuh, dll)",
    percent: 65.7,
    nWeighted: 55,
  },
  {
    reason: "Merusak",
    percent: 48.2,
    nWeighted: 55,
  },
  {
    reason: "Perilaku kekerasan terhadap diri sendiri (cenderung menyakiti diri sendiri, mencoba bunuh diri, dll)",
    percent: 38.1,
    nWeighted: 55,
  },
  {
    reason: "Tidak ada yang merawat",
    percent: 13.0,
    nWeighted: 55,
  },
  {
    reason: "Lainnya",
    percent: 11.8,
    nWeighted: 55,
  },
];

export const PSYCHOSIS_FACILITY_UTILIZATION: PsychosisFacilityUtilizationRecord[] = [
  {
    "group": "Tempat Tinggal",
    "label": "Perkotaan",
    "hanyaFasyankes": {
      "value": 60.9,
      "ciLow": 55.3,
      "ciHigh": 66.3
    },
    "hanyaNonFasyankes": {
      "value": 0.7,
      "ciLow": 0.3,
      "ciHigh": 1.9
    },
    "keduanya": {
      "value": 32.7,
      "ciLow": 27.8,
      "ciHigh": 38.1
    },
    "tidakBerobat": {
      "value": 5.6,
      "ciLow": 3.6,
      "ciHigh": 8.5
    },
    "nWeighted": 514
  },
  {
    "group": "Tempat Tinggal",
    "label": "Perdesaan",
    "hanyaFasyankes": {
      "value": 60.3,
      "ciLow": 54.2,
      "ciHigh": 66.1
    },
    "hanyaNonFasyankes": {
      "value": 0.0,
      "ciLow": 0.0,
      "ciHigh": 0.0
    },
    "keduanya": {
      "value": 28.2,
      "ciLow": 23.1,
      "ciHigh": 33.9
    },
    "tidakBerobat": {
      "value": 11.5,
      "ciLow": 8.8,
      "ciHigh": 14.8
    },
    "nWeighted": 330
  },
  {
    "group": "Status Ekonomi",
    "label": "Terbawah",
    "hanyaFasyankes": {
      "value": 57.6,
      "ciLow": 50.1,
      "ciHigh": 64.7
    },
    "hanyaNonFasyankes": {
      "value": 0.5,
      "ciLow": 0.1,
      "ciHigh": 3.2
    },
    "keduanya": {
      "value": 33.2,
      "ciLow": 26.8,
      "ciHigh": 40.3
    },
    "tidakBerobat": {
      "value": 8.8,
      "ciLow": 5.5,
      "ciHigh": 13.7
    },
    "nWeighted": 265
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah bawah",
    "hanyaFasyankes": {
      "value": 59.9,
      "ciLow": 52.6,
      "ciHigh": 66.7
    },
    "hanyaNonFasyankes": {
      "value": 1.0,
      "ciLow": 0.3,
      "ciHigh": 3.3
    },
    "keduanya": {
      "value": 26.5,
      "ciLow": 20.6,
      "ciHigh": 33.5
    },
    "tidakBerobat": {
      "value": 12.6,
      "ciLow": 9.2,
      "ciHigh": 16.9
    },
    "nWeighted": 195
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah",
    "hanyaFasyankes": {
      "value": 62.7,
      "ciLow": 52.1,
      "ciHigh": 72.2
    },
    "hanyaNonFasyankes": {
      "value": 0.0,
      "ciLow": 0.0,
      "ciHigh": 0.0
    },
    "keduanya": {
      "value": 33.6,
      "ciLow": 24.6,
      "ciHigh": 44.1
    },
    "tidakBerobat": {
      "value": 3.7,
      "ciLow": 1.4,
      "ciHigh": 9.4
    },
    "nWeighted": 175
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah atas",
    "hanyaFasyankes": {
      "value": 62.7,
      "ciLow": 52.1,
      "ciHigh": 72.3
    },
    "hanyaNonFasyankes": {
      "value": 0.5,
      "ciLow": 0.1,
      "ciHigh": 3.2
    },
    "keduanya": {
      "value": 33.9,
      "ciLow": 24.4,
      "ciHigh": 44.8
    },
    "tidakBerobat": {
      "value": 2.9,
      "ciLow": 1.6,
      "ciHigh": 5.3
    },
    "nWeighted": 122
  },
  {
    "group": "Status Ekonomi",
    "label": "Teratas",
    "hanyaFasyankes": {
      "value": 65.4,
      "ciLow": 49.0,
      "ciHigh": 78.8
    },
    "hanyaNonFasyankes": {
      "value": 0.0,
      "ciLow": 0.0,
      "ciHigh": 0.0
    },
    "keduanya": {
      "value": 24.6,
      "ciLow": 12.7,
      "ciHigh": 42.2
    },
    "tidakBerobat": {
      "value": 10.0,
      "ciLow": 5.4,
      "ciHigh": 17.8
    },
    "nWeighted": 87
  },
  {
    "group": "Nasional",
    "label": "INDONESIA",
    "hanyaFasyankes": {
      "value": 60.7,
      "ciLow": 56.6,
      "ciHigh": 64.7
    },
    "hanyaNonFasyankes": {
      "value": 0.5,
      "ciLow": 0.2,
      "ciHigh": 1.1
    },
    "keduanya": {
      "value": 31.0,
      "ciLow": 27.3,
      "ciHigh": 34.0
    },
    "tidakBerobat": {
      "value": 7.9,
      "ciLow": 6.2,
      "ciHigh": 10.0
    },
    "nWeighted": 844
  }
];

export const PSYCHOSIS_MEDICATION_ADHERENCE: PsychosisMedicationAdherenceRecord[] = [
  {
    "group": "Tempat Tinggal",
    "label": "Perkotaan",
    "minumSemua": 63.0,
    "minumTidakSemua": 6.0,
    "tidakMinum": 31.0,
    "nMinum1Bulan": 482,
    "rutinSemua": 92.1,
    "nRutin1Bulan": 333
  },
  {
    "group": "Tempat Tinggal",
    "label": "Perdesaan",
    "minumSemua": 44.1,
    "minumTidakSemua": 8.6,
    "tidakMinum": 47.4,
    "nMinum1Bulan": 292,
    "rutinSemua": 83.6,
    "nRutin1Bulan": 154
  },
  {
    "group": "Status Ekonomi",
    "label": "Terbawah",
    "minumSemua": 49.0,
    "minumTidakSemua": 6.6,
    "tidakMinum": 44.4,
    "nMinum1Bulan": 241,
    "rutinSemua": 85.3,
    "nRutin1Bulan": 134
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah bawah",
    "minumSemua": 52.1,
    "minumTidakSemua": 7.6,
    "tidakMinum": 40.2,
    "nMinum1Bulan": 168,
    "rutinSemua": 86.4,
    "nRutin1Bulan": 101
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah",
    "minumSemua": 54.9,
    "minumTidakSemua": 5.9,
    "tidakMinum": 39.3,
    "nMinum1Bulan": 169,
    "rutinSemua": 92.6,
    "nRutin1Bulan": 103
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah atas",
    "minumSemua": 67.2,
    "minumTidakSemua": 9.1,
    "tidakMinum": 23.7,
    "nMinum1Bulan": 118,
    "rutinSemua": 89.3,
    "nRutin1Bulan": 90
  },
  {
    "group": "Status Ekonomi",
    "label": "Teratas",
    "minumSemua": 70.4,
    "minumTidakSemua": 5.7,
    "tidakMinum": 23.9,
    "nMinum1Bulan": 78,
    "rutinSemua": 98.6,
    "nRutin1Bulan": 59
  },
  {
    "group": "Nasional",
    "label": "INDONESIA",
    "minumSemua": 55.9,
    "minumTidakSemua": 7.0,
    "tidakMinum": 37.2,
    "nMinum1Bulan": 774,
    "rutinSemua": 89.4,
    "nRutin1Bulan": 486
  }
];

export const PSYCHOSIS_NON_ADHERENCE_REASONS: SimpleReasonRecord[] = [
  { reason: "Lainnya", percent: 31.9, nWeighted: 51 },
  { reason: "Bosan/malas/sering lupa", percent: 27.5, nWeighted: 51 },
  { reason: "Merasa sudah sehat", percent: 25.4, nWeighted: 51 },
  { reason: "Obat tidak tersedia di fasyankes (RS/Puskesmas/Apotek)", percent: 6.8, nWeighted: 51 },
  { reason: "Tidak tahan efek samping obat", percent: 5.9, nWeighted: 51 },
  { reason: "Minum obat tradisional", percent: 2.6, nWeighted: 51 },
];

export const INDIVIDUAL_DEMOGRAPHIC_RECORDS: IndividualDemographicRecord[] = [
  {
    "group": "Kelompok Umur",
    "label": "15-24",
    "depresi": {
      "value": 2.0,
      "ciLow": 1.8,
      "ciHigh": 2.2,
      "nWeighted": 130977
    },
    "masalahJiwa": {
      "value": 2.8,
      "ciLow": 2.6,
      "ciHigh": 3.1,
      "nWeighted": 130977
    },
    "pikiranMengakhiriHidup": {
      "value": 0.39,
      "ciLow": 0.33,
      "ciHigh": 0.48,
      "nWeighted": 130977
    },
    "population15PlusN": 130977,
    "depresiBerobat": {
      "value": 10.4,
      "ciLow": 7.7,
      "ciHigh": 14.0,
      "nWeighted": 2572,
      "isLowSample": false
    }
  },
  {
    "group": "Kelompok Umur",
    "label": "25-34",
    "depresi": {
      "value": 1.3,
      "ciLow": 1.2,
      "ciHigh": 1.5,
      "nWeighted": 132645
    },
    "masalahJiwa": {
      "value": 1.7,
      "ciLow": 1.5,
      "ciHigh": 1.9,
      "nWeighted": 132645
    },
    "pikiranMengakhiriHidup": {
      "value": 0.22,
      "ciLow": 0.17,
      "ciHigh": 0.28,
      "nWeighted": 132645
    },
    "population15PlusN": 132645,
    "depresiBerobat": {
      "value": 11.7,
      "ciLow": 9.0,
      "ciHigh": 15.0,
      "nWeighted": 1724,
      "isLowSample": false
    }
  },
  {
    "group": "Kelompok Umur",
    "label": "35-44",
    "depresi": {
      "value": 1.0,
      "ciLow": 0.9,
      "ciHigh": 1.1,
      "nWeighted": 124836
    },
    "masalahJiwa": {
      "value": 1.5,
      "ciLow": 1.3,
      "ciHigh": 1.6,
      "nWeighted": 124836
    },
    "pikiranMengakhiriHidup": {
      "value": 0.19,
      "ciLow": 0.15,
      "ciHigh": 0.23,
      "nWeighted": 124836
    },
    "population15PlusN": 124836,
    "depresiBerobat": {
      "value": 13.8,
      "ciLow": 10.9,
      "ciHigh": 17.2,
      "nWeighted": 1240,
      "isLowSample": false
    }
  },
  {
    "group": "Kelompok Umur",
    "label": "45-54",
    "depresi": {
      "value": 1.1,
      "ciLow": 1.0,
      "ciHigh": 1.3,
      "nWeighted": 107685
    },
    "masalahJiwa": {
      "value": 1.8,
      "ciLow": 1.6,
      "ciHigh": 1.9,
      "nWeighted": 107685
    },
    "pikiranMengakhiriHidup": {
      "value": 0.19,
      "ciLow": 0.15,
      "ciHigh": 0.24,
      "nWeighted": 107685
    },
    "population15PlusN": 107685,
    "depresiBerobat": {
      "value": 12.3,
      "ciLow": 9.5,
      "ciHigh": 15.7,
      "nWeighted": 1226,
      "isLowSample": false
    }
  },
  {
    "group": "Kelompok Umur",
    "label": "55-64",
    "depresi": {
      "value": 1.2,
      "ciLow": 1.1,
      "ciHigh": 1.4,
      "nWeighted": 77553
    },
    "masalahJiwa": {
      "value": 2.1,
      "ciLow": 1.9,
      "ciHigh": 2.3,
      "nWeighted": 77553
    },
    "pikiranMengakhiriHidup": {
      "value": 0.2,
      "ciLow": 0.15,
      "ciHigh": 0.25,
      "nWeighted": 77553
    },
    "population15PlusN": 77553,
    "depresiBerobat": {
      "value": 17.7,
      "ciLow": 13.9,
      "ciHigh": 22.2,
      "nWeighted": 962,
      "isLowSample": false
    }
  },
  {
    "group": "Kelompok Umur",
    "label": "65-74",
    "depresi": {
      "value": 1.6,
      "ciLow": 1.4,
      "ciHigh": 1.8,
      "nWeighted": 42219
    },
    "masalahJiwa": {
      "value": 2.7,
      "ciLow": 2.5,
      "ciHigh": 3.0,
      "nWeighted": 42219
    },
    "pikiranMengakhiriHidup": {
      "value": 0.28,
      "ciLow": 0.2,
      "ciHigh": 0.38,
      "nWeighted": 42219
    },
    "population15PlusN": 42219,
    "depresiBerobat": {
      "value": 15.4,
      "ciLow": 11.2,
      "ciHigh": 20.7,
      "nWeighted": 676,
      "isLowSample": false
    }
  },
  {
    "group": "Kelompok Umur",
    "label": "75+",
    "depresi": {
      "value": 1.9,
      "ciLow": 1.5,
      "ciHigh": 2.3,
      "nWeighted": 14912
    },
    "masalahJiwa": {
      "value": 3.1,
      "ciLow": 2.7,
      "ciHigh": 3.6,
      "nWeighted": 14912
    },
    "pikiranMengakhiriHidup": {
      "value": 0.27,
      "ciLow": 0.16,
      "ciHigh": 0.45,
      "nWeighted": 14912
    },
    "population15PlusN": 14912,
    "depresiBerobat": {
      "value": 14.3,
      "ciLow": 8.8,
      "ciHigh": 22.3,
      "nWeighted": 281,
      "isLowSample": false
    }
  },
  {
    "group": "Jenis Kelamin",
    "label": "Laki-laki",
    "depresi": {
      "value": 1.0,
      "ciLow": 0.9,
      "ciHigh": 1.1,
      "nWeighted": 316156
    },
    "masalahJiwa": {
      "value": 1.5,
      "ciLow": 1.4,
      "ciHigh": 1.6,
      "nWeighted": 316156
    },
    "pikiranMengakhiriHidup": {
      "value": 0.17,
      "ciLow": 0.14,
      "ciHigh": 0.2,
      "nWeighted": 316156
    },
    "population15PlusN": 316156,
    "depresiBerobat": {
      "value": 12.5,
      "ciLow": 10.6,
      "ciHigh": 14.6,
      "nWeighted": 3161,
      "isLowSample": false
    }
  },
  {
    "group": "Jenis Kelamin",
    "label": "Perempuan",
    "depresi": {
      "value": 1.8,
      "ciLow": 1.6,
      "ciHigh": 1.9,
      "nWeighted": 314671
    },
    "masalahJiwa": {
      "value": 2.6,
      "ciLow": 2.5,
      "ciHigh": 2.8,
      "nWeighted": 314671
    },
    "pikiranMengakhiriHidup": {
      "value": 0.33,
      "ciLow": 0.29,
      "ciHigh": 0.37,
      "nWeighted": 314671
    },
    "population15PlusN": 314671,
    "depresiBerobat": {
      "value": 12.9,
      "ciLow": 11.1,
      "ciHigh": 14.9,
      "nWeighted": 5519,
      "isLowSample": false
    }
  },
  {
    "group": "Pendidikan",
    "label": "Tidak/belum pernah sekolah",
    "depresi": {
      "value": 1.5,
      "ciLow": 1.3,
      "ciHigh": 1.7,
      "nWeighted": 27090
    },
    "masalahJiwa": {
      "value": 2.6,
      "ciLow": 2.3,
      "ciHigh": 3.0,
      "nWeighted": 27090
    },
    "pikiranMengakhiriHidup": {
      "value": 0.38,
      "ciLow": 0.26,
      "ciHigh": 0.54,
      "nWeighted": 27090
    },
    "population15PlusN": 27090,
    "depresiBerobat": {
      "value": 18.0,
      "ciLow": 12.5,
      "ciHigh": 25.3,
      "nWeighted": 404,
      "isLowSample": false
    }
  },
  {
    "group": "Pendidikan",
    "label": "Tidak tamat SD/MI",
    "depresi": {
      "value": 1.5,
      "ciLow": 1.3,
      "ciHigh": 1.7,
      "nWeighted": 40315
    },
    "masalahJiwa": {
      "value": 2.4,
      "ciLow": 2.1,
      "ciHigh": 2.7,
      "nWeighted": 40315
    },
    "pikiranMengakhiriHidup": {
      "value": 0.28,
      "ciLow": 0.2,
      "ciHigh": 0.38,
      "nWeighted": 40315
    },
    "population15PlusN": 40315,
    "depresiBerobat": {
      "value": 12.6,
      "ciLow": 9.0,
      "ciHigh": 17.3,
      "nWeighted": 601,
      "isLowSample": false
    }
  },
  {
    "group": "Pendidikan",
    "label": "Tamat SD/MI",
    "depresi": {
      "value": 1.5,
      "ciLow": 1.4,
      "ciHigh": 1.7,
      "nWeighted": 163009
    },
    "masalahJiwa": {
      "value": 2.4,
      "ciLow": 2.2,
      "ciHigh": 2.5,
      "nWeighted": 163009
    },
    "pikiranMengakhiriHidup": {
      "value": 0.27,
      "ciLow": 0.22,
      "ciHigh": 0.32,
      "nWeighted": 163009
    },
    "population15PlusN": 163009,
    "depresiBerobat": {
      "value": 14.7,
      "ciLow": 11.7,
      "ciHigh": 18.3,
      "nWeighted": 2473,
      "isLowSample": false
    }
  },
  {
    "group": "Pendidikan",
    "label": "Tamat SLTP/MTs",
    "depresi": {
      "value": 1.5,
      "ciLow": 1.4,
      "ciHigh": 1.7,
      "nWeighted": 134648
    },
    "masalahJiwa": {
      "value": 2.2,
      "ciLow": 2.0,
      "ciHigh": 2.4,
      "nWeighted": 134648
    },
    "pikiranMengakhiriHidup": {
      "value": 0.28,
      "ciLow": 0.23,
      "ciHigh": 0.34,
      "nWeighted": 134648
    },
    "population15PlusN": 134648,
    "depresiBerobat": {
      "value": 10.4,
      "ciLow": 8.3,
      "ciHigh": 13.0,
      "nWeighted": 2024,
      "isLowSample": false
    }
  },
  {
    "group": "Pendidikan",
    "label": "Tamat SLTA/MA",
    "depresi": {
      "value": 1.3,
      "ciLow": 1.2,
      "ciHigh": 1.4,
      "nWeighted": 205030
    },
    "masalahJiwa": {
      "value": 1.8,
      "ciLow": 1.7,
      "ciHigh": 1.9,
      "nWeighted": 205030
    },
    "pikiranMengakhiriHidup": {
      "value": 0.22,
      "ciLow": 0.18,
      "ciHigh": 0.26,
      "nWeighted": 205030
    },
    "population15PlusN": 205030,
    "depresiBerobat": {
      "value": 11.4,
      "ciLow": 9.4,
      "ciHigh": 13.8,
      "nWeighted": 2725,
      "isLowSample": false
    }
  },
  {
    "group": "Pendidikan",
    "label": "Tamat D1/D2/D3/PT",
    "depresi": {
      "value": 0.7,
      "ciLow": 0.6,
      "ciHigh": 0.9,
      "nWeighted": 60735
    },
    "masalahJiwa": {
      "value": 1.2,
      "ciLow": 1.1,
      "ciHigh": 1.4,
      "nWeighted": 60735
    },
    "pikiranMengakhiriHidup": {
      "value": 0.14,
      "ciLow": 0.1,
      "ciHigh": 0.2,
      "nWeighted": 60735
    },
    "population15PlusN": 60735,
    "depresiBerobat": {
      "value": 15.5,
      "ciLow": 10.3,
      "ciHigh": 22.7,
      "nWeighted": 454,
      "isLowSample": false
    }
  },
  {
    "group": "Pekerjaan",
    "label": "Tidak bekerja",
    "depresi": {
      "value": 2.0,
      "ciLow": 1.9,
      "ciHigh": 2.2,
      "nWeighted": 187265
    },
    "masalahJiwa": {
      "value": 2.9,
      "ciLow": 2.8,
      "ciHigh": 3.1,
      "nWeighted": 187265
    },
    "pikiranMengakhiriHidup": {
      "value": 0.4,
      "ciLow": 0.34,
      "ciHigh": 0.46,
      "nWeighted": 187265
    },
    "population15PlusN": 187265,
    "depresiBerobat": {
      "value": 14.7,
      "ciLow": 12.5,
      "ciHigh": 17.3,
      "nWeighted": 3805,
      "isLowSample": false
    }
  },
  {
    "group": "Pekerjaan",
    "label": "Sekolah",
    "depresi": {
      "value": 2.0,
      "ciLow": 1.8,
      "ciHigh": 2.3,
      "nWeighted": 58605
    },
    "masalahJiwa": {
      "value": 2.9,
      "ciLow": 2.6,
      "ciHigh": 3.2,
      "nWeighted": 58605
    },
    "pikiranMengakhiriHidup": {
      "value": 0.41,
      "ciLow": 0.32,
      "ciHigh": 0.52,
      "nWeighted": 58605
    },
    "population15PlusN": 58605,
    "depresiBerobat": {
      "value": 9.3,
      "ciLow": 6.4,
      "ciHigh": 13.2,
      "nWeighted": 1176,
      "isLowSample": false
    }
  },
  {
    "group": "Pekerjaan",
    "label": "PNS/TNI/POLRI/BUMN/BUMD",
    "depresi": {
      "value": 0.3,
      "ciLow": 0.2,
      "ciHigh": 0.3,
      "nWeighted": 19723
    },
    "masalahJiwa": {
      "value": 0.7,
      "ciLow": 0.5,
      "ciHigh": 0.9,
      "nWeighted": 19723
    },
    "pikiranMengakhiriHidup": {
      "value": 0.1,
      "ciLow": 0.06,
      "ciHigh": 0.18,
      "nWeighted": 19723
    },
    "population15PlusN": 19723,
    "depresiBerobat": {
      "value": 11.4,
      "ciLow": 5.9,
      "ciHigh": 20.8,
      "nWeighted": 49,
      "isLowSample": true
    }
  },
  {
    "group": "Pekerjaan",
    "label": "Pegawai swasta",
    "depresi": {
      "value": 1.0,
      "ciLow": 0.8,
      "ciHigh": 1.2,
      "nWeighted": 71965
    },
    "masalahJiwa": {
      "value": 1.2,
      "ciLow": 1.1,
      "ciHigh": 1.4,
      "nWeighted": 71965
    },
    "pikiranMengakhiriHidup": {
      "value": 0.11,
      "ciLow": 0.07,
      "ciHigh": 0.16,
      "nWeighted": 71965
    },
    "population15PlusN": 71965,
    "depresiBerobat": {
      "value": 10.8,
      "ciLow": 7.0,
      "ciHigh": 16.3,
      "nWeighted": 714,
      "isLowSample": false
    }
  },
  {
    "group": "Pekerjaan",
    "label": "Wiraswasta",
    "depresi": {
      "value": 1.0,
      "ciLow": 0.8,
      "ciHigh": 1.2,
      "nWeighted": 96764
    },
    "masalahJiwa": {
      "value": 1.4,
      "ciLow": 1.2,
      "ciHigh": 1.5,
      "nWeighted": 96764
    },
    "pikiranMengakhiriHidup": {
      "value": 0.13,
      "ciLow": 0.09,
      "ciHigh": 0.18,
      "nWeighted": 96764
    },
    "population15PlusN": 96764,
    "depresiBerobat": {
      "value": 8.6,
      "ciLow": 6.0,
      "ciHigh": 12.1,
      "nWeighted": 955,
      "isLowSample": false
    }
  },
  {
    "group": "Pekerjaan",
    "label": "Petani/buruh tani",
    "depresi": {
      "value": 0.7,
      "ciLow": 0.6,
      "ciHigh": 0.8,
      "nWeighted": 102215
    },
    "masalahJiwa": {
      "value": 1.3,
      "ciLow": 1.2,
      "ciHigh": 1.4,
      "nWeighted": 102215
    },
    "pikiranMengakhiriHidup": {
      "value": 0.15,
      "ciLow": 0.12,
      "ciHigh": 0.18,
      "nWeighted": 102215
    },
    "population15PlusN": 102215,
    "depresiBerobat": {
      "value": 14.6,
      "ciLow": 11.0,
      "ciHigh": 19.1,
      "nWeighted": 722,
      "isLowSample": false
    }
  },
  {
    "group": "Pekerjaan",
    "label": "Nelayan",
    "depresi": {
      "value": 0.8,
      "ciLow": 0.5,
      "ciHigh": 1.2,
      "nWeighted": 5074
    },
    "masalahJiwa": {
      "value": 1.2,
      "ciLow": 0.9,
      "ciHigh": 1.7,
      "nWeighted": 5074
    },
    "pikiranMengakhiriHidup": {
      "value": 0.12,
      "ciLow": 0.05,
      "ciHigh": 0.26,
      "nWeighted": 5074
    },
    "population15PlusN": 5074,
    "depresiBerobat": {
      "value": 13.5,
      "ciLow": 4.2,
      "ciHigh": 35.4,
      "nWeighted": 38,
      "isLowSample": true
    }
  },
  {
    "group": "Pekerjaan",
    "label": "Buruh/sopir/pembantu ruta",
    "depresi": {
      "value": 1.6,
      "ciLow": 1.4,
      "ciHigh": 1.9,
      "nWeighted": 51213
    },
    "masalahJiwa": {
      "value": 2.5,
      "ciLow": 2.2,
      "ciHigh": 2.9,
      "nWeighted": 51213
    },
    "pikiranMengakhiriHidup": {
      "value": 0.25,
      "ciLow": 0.17,
      "ciHigh": 0.37,
      "nWeighted": 51213
    },
    "population15PlusN": 51213,
    "depresiBerobat": {
      "value": 13.4,
      "ciLow": 9.4,
      "ciHigh": 18.7,
      "nWeighted": 816,
      "isLowSample": false
    }
  },
  {
    "group": "Pekerjaan",
    "label": "Lainnya",
    "depresi": {
      "value": 1.1,
      "ciLow": 0.9,
      "ciHigh": 1.3,
      "nWeighted": 38002
    },
    "masalahJiwa": {
      "value": 1.8,
      "ciLow": 1.6,
      "ciHigh": 2.1,
      "nWeighted": 38002
    },
    "pikiranMengakhiriHidup": {
      "value": 0.19,
      "ciLow": 0.14,
      "ciHigh": 0.25,
      "nWeighted": 38002
    },
    "population15PlusN": 38002,
    "depresiBerobat": {
      "value": 12.6,
      "ciLow": 7.8,
      "ciHigh": 19.7,
      "nWeighted": 404,
      "isLowSample": false
    }
  },
  {
    "group": "Tempat Tinggal",
    "label": "Perkotaan",
    "depresi": {
      "value": 1.7,
      "ciLow": 1.6,
      "ciHigh": 1.8,
      "nWeighted": 369660
    },
    "masalahJiwa": {
      "value": 2.4,
      "ciLow": 2.2,
      "ciHigh": 2.5,
      "nWeighted": 369660
    },
    "pikiranMengakhiriHidup": {
      "value": 0.3,
      "ciLow": 0.26,
      "ciHigh": 0.34,
      "nWeighted": 369660
    },
    "population15PlusN": 369660,
    "depresiBerobat": {
      "value": 11.7,
      "ciLow": 10.3,
      "ciHigh": 13.3,
      "nWeighted": 6289,
      "isLowSample": false
    }
  },
  {
    "group": "Tempat Tinggal",
    "label": "Perdesaan",
    "depresi": {
      "value": 0.9,
      "ciLow": 0.8,
      "ciHigh": 1.0,
      "nWeighted": 261167
    },
    "masalahJiwa": {
      "value": 1.6,
      "ciLow": 1.5,
      "ciHigh": 1.8,
      "nWeighted": 261167
    },
    "pikiranMengakhiriHidup": {
      "value": 0.17,
      "ciLow": 0.15,
      "ciHigh": 0.2,
      "nWeighted": 261167
    },
    "population15PlusN": 261167,
    "depresiBerobat": {
      "value": 15.3,
      "ciLow": 12.2,
      "ciHigh": 19.0,
      "nWeighted": 2392,
      "isLowSample": false
    }
  },
  {
    "group": "Status Ekonomi",
    "label": "Terbawah",
    "depresi": {
      "value": 1.6,
      "ciLow": 1.4,
      "ciHigh": 1.8,
      "nWeighted": 92202
    },
    "masalahJiwa": {
      "value": 2.5,
      "ciLow": 2.3,
      "ciHigh": 2.7,
      "nWeighted": 92202
    },
    "pikiranMengakhiriHidup": {
      "value": 0.32,
      "ciLow": 0.26,
      "ciHigh": 0.4,
      "nWeighted": 92202
    },
    "population15PlusN": 92202,
    "depresiBerobat": {
      "value": 12.6,
      "ciLow": 9.8,
      "ciHigh": 16.1,
      "nWeighted": 1479,
      "isLowSample": false
    }
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah bawah",
    "depresi": {
      "value": 1.3,
      "ciLow": 1.2,
      "ciHigh": 1.5,
      "nWeighted": 115108
    },
    "masalahJiwa": {
      "value": 2.1,
      "ciLow": 2.0,
      "ciHigh": 2.3,
      "nWeighted": 115108
    },
    "pikiranMengakhiriHidup": {
      "value": 0.25,
      "ciLow": 0.2,
      "ciHigh": 0.31,
      "nWeighted": 115108
    },
    "population15PlusN": 115108,
    "depresiBerobat": {
      "value": 15.3,
      "ciLow": 12.4,
      "ciHigh": 18.7,
      "nWeighted": 1542,
      "isLowSample": false
    }
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah",
    "depresi": {
      "value": 1.3,
      "ciLow": 1.2,
      "ciHigh": 1.5,
      "nWeighted": 133106
    },
    "masalahJiwa": {
      "value": 2.0,
      "ciLow": 1.9,
      "ciHigh": 2.2,
      "nWeighted": 133106
    },
    "pikiranMengakhiriHidup": {
      "value": 0.22,
      "ciLow": 0.18,
      "ciHigh": 0.26,
      "nWeighted": 133106
    },
    "population15PlusN": 133106,
    "depresiBerobat": {
      "value": 12.2,
      "ciLow": 9.8,
      "ciHigh": 15.1,
      "nWeighted": 1784,
      "isLowSample": false
    }
  },
  {
    "group": "Status Ekonomi",
    "label": "Menengah atas",
    "depresi": {
      "value": 1.4,
      "ciLow": 1.3,
      "ciHigh": 1.6,
      "nWeighted": 146053
    },
    "masalahJiwa": {
      "value": 2.0,
      "ciLow": 1.8,
      "ciHigh": 2.2,
      "nWeighted": 146053
    },
    "pikiranMengakhiriHidup": {
      "value": 0.25,
      "ciLow": 0.2,
      "ciHigh": 0.31,
      "nWeighted": 146053
    },
    "population15PlusN": 146053,
    "depresiBerobat": {
      "value": 11.6,
      "ciLow": 8.4,
      "ciHigh": 15.8,
      "nWeighted": 2077,
      "isLowSample": false
    }
  },
  {
    "group": "Status Ekonomi",
    "label": "Teratas",
    "depresi": {
      "value": 1.2,
      "ciLow": 1.1,
      "ciHigh": 1.4,
      "nWeighted": 144310
    },
    "masalahJiwa": {
      "value": 1.8,
      "ciLow": 1.6,
      "ciHigh": 1.9,
      "nWeighted": 144310
    },
    "pikiranMengakhiriHidup": {
      "value": 0.23,
      "ciLow": 0.18,
      "ciHigh": 0.3,
      "nWeighted": 144310
    },
    "population15PlusN": 144310,
    "depresiBerobat": {
      "value": 12.4,
      "ciLow": 9.6,
      "ciHigh": 15.9,
      "nWeighted": 1798,
      "isLowSample": false
    }
  }
];

export const OFFICIAL_TABLES_CATALOG: OfficialTableCatalogItem[] = [
  {
    id: "t5.1",
    tableNumber: "Tabel 5.1",
    title: "Prevalensi (Permil) Rumah Tangga yang Memiliki ART dengan Gangguan Jiwa Psikosis/Skizofrenia menurut Provinsi, SKI 2023",
    reportPage: 144,
    pdfPage: 183,
    unit: "‰ (per mil)",
    granularity: "Provinsi",
    notes: "Mencakup Gejala saja (4,0‰) dan Gejala + Diagnosis Dokter (3,0‰). Total N tertimbang = 315.621 rumah tangga.",
  },
  {
    id: "t5.2",
    tableNumber: "Tabel 5.2",
    title: "Prevalensi (Permil) Rumah Tangga yang Memiliki ART dengan Gangguan Jiwa Psikosis/Skizofrenia menurut Karakteristik Rumah Tangga, SKI 2023",
    reportPage: 145,
    pdfPage: 184,
    unit: "‰ (per mil)",
    granularity: "Karakteristik Rumah Tangga",
    notes: "Catatan: dari semua RT dengan ART terdiagnosis psikosis (N=844), 95,6% memiliki 1 ART, 4,3% memiliki 2 ART, dan 0,1% memiliki 3 ART.",
  },
  {
    id: "t5.3",
    tableNumber: "Tabel 5.3",
    title: "Proporsi Rumah Tangga yang Memiliki ART dengan Gangguan Jiwa Psikosis/Skizofrenia yang Pernah Dipasung Menurut Karakteristik Rumah Tangga, SKI 2023",
    reportPage: 145,
    pdfPage: 184,
    unit: "%",
    granularity: "Karakteristik Rumah Tangga",
    notes: "Catatan: dari semua RT pernah dipasung, 25,2% (95% CI: 19,7–31,6) mengalami pemasungan dalam 3 bulan terakhir (N tertimbang = 55 rumah tangga).",
  },
  {
    id: "t4.65",
    tableNumber: "Tabel 4.65 (Daftar Tabel: 4.67)",
    title: "Proporsi Alasan Dipasung ART dengan Gangguan Jiwa Psikosis/Skizofrenia, SKI 2023*",
    reportPage: 145,
    pdfPage: 184,
    unit: "%",
    granularity: "Nasional",
    notes: "*Pilihan jawaban bisa lebih dari 1 (multiple response). Basis: N tertimbang = 55 rumah tangga.",
  },
  {
    id: "t5.4",
    tableNumber: "Tabel 5.4",
    title: "Prevalensi Depresi dalam Dua Minggu Terakhir pada Penduduk Umur ≥15 Tahun menurut Provinsi, SKI 2023",
    reportPage: 147,
    pdfPage: 186,
    unit: "%",
    granularity: "Provinsi",
    notes: "*Berdasarkan MINI (Mini International Neuropsychiatric Interview). Nasional: 1,4% (N tertimbang = 630.827).",
  },
  {
    id: "t5.5",
    tableNumber: "Tabel 5.5",
    title: "Prevalensi Depresi dalam Dua Minggu Terakhir pada Penduduk Umur ≥15 Tahun menurut Karakteristik Responden, SKI 2023",
    reportPage: 148,
    pdfPage: 187,
    unit: "%",
    granularity: "Karakteristik Responden",
    notes: "*Berdasarkan MINI. Mencakup Kelompok Umur, Jenis Kelamin, Pendidikan, Pekerjaan, Tempat Tinggal, dan Status Ekonomi.",
  },
  {
    id: "t5.6",
    tableNumber: "Tabel 5.6",
    title: "Prevalensi Masalah Kesehatan Jiwa dalam Satu Bulan Terakhir pada Penduduk Umur ≥15 Tahun menurut Provinsi, SKI 2023",
    reportPage: 150,
    pdfPage: 189,
    unit: "%",
    granularity: "Provinsi",
    notes: "**Berdasarkan WHO SRQ-20 (Self Reporting Questionnaire-20), nilai batas pisah (cut-off point) ≥ 6. Nasional: 2,0%.",
  },
  {
    id: "t5.7",
    tableNumber: "Tabel 5.7",
    title: "Prevalensi Masalah Kesehatan Jiwa dalam Satu Bulan Terakhir pada Penduduk Umur ≥15 Tahun menurut Karakteristik Responden, SKI 2023",
    reportPage: 151,
    pdfPage: 190,
    unit: "%",
    granularity: "Karakteristik Responden",
    notes: "**Berdasarkan WHO SRQ-20, cut-off point ≥ 6.",
  },
  {
    id: "t5.8",
    tableNumber: "Tabel 5.8",
    title: "Prevalensi Penduduk Umur ≥15 Tahun yang Mempunyai Pikiran Mengakhiri Hidup dalam Satu Bulan Terakhir menurut Provinsi, SKI 2023",
    reportPage: 152,
    pdfPage: 191,
    unit: "%",
    granularity: "Provinsi",
    notes: "**Berdasarkan SRQ-20 pertanyaan C-29. Nasional: 0,25% (95% CI: 0,22–0,27%).",
  },
  {
    id: "t5.9",
    tableNumber: "Tabel 5.9",
    title: "Prevalensi Penduduk Umur ≥15 Tahun yang Mempunyai Pikiran Mengakhiri Hidup dalam Satu Bulan Terakhir menurut Karakteristik Responden, SKI 2023",
    reportPage: 153,
    pdfPage: 192,
    unit: "%",
    granularity: "Karakteristik Responden",
    notes: "**Berdasarkan SRQ-20 pertanyaan C-29.",
  },
  {
    id: "t5.10",
    tableNumber: "Tabel 5.10",
    title: "Proporsi Jenis Fasilitas Pelayanan yang Pernah Dimanfaatkan Rumah Tangga Memiliki ART Gangguan Jiwa Psikosis/Skizofrenia menurut Karakteristik Rumah Tangga, SKI 2023",
    reportPage: 155,
    pdfPage: 194,
    unit: "%",
    granularity: "Karakteristik Rumah Tangga",
    notes: "Fasyankes (RS, Puskesmas, Klinik, Praktik Mandiri) vs Non-Fasyankes (rehabilitasi keagamaan, pemuka agama, panti sosial). N=844.",
  },
  {
    id: "t5.11",
    tableNumber: "Tabel 5.11",
    title: "Proporsi Rumah Tangga yang Memiliki ART dengan Gangguan Jiwa Psikosis/Skizofrenia yang Berobat 1 Bulan Terakhir dan Berobat Rutin 1 Bulan Terakhir di Fasilitas Kesehatan menurut Karakteristik Rumah Tangga, SKI 2023",
    reportPage: 155,
    pdfPage: 194,
    unit: "%",
    granularity: "Karakteristik Rumah Tangga",
    notes: "Berobat 1 bulan terakhir (N=774) dan rutin minum/suntik obat sesuai petunjuk dokter (N=486).",
  },
  {
    id: "t5.12",
    tableNumber: "Tabel 5.12",
    title: "Alasan Utama Ketidakpatuhan Minum Obat Pada Rumah Tangga yang Memiliki ART dengan Gangguan Jiwa Psikosis/Skizofrenia yang Berobat di Fasilitas Kesehatan, SKI 2023",
    reportPage: 156,
    pdfPage: 195,
    unit: "%",
    granularity: "Nasional",
    notes: "Basis: rumah tangga yang tidak rutin minum/suntik obat dalam 1 bulan terakhir (N tertimbang = 51).",
  },
  {
    id: "t5.13",
    tableNumber: "Tabel 5.13",
    title: "Proporsi Individu dengan Depresi yang Berobat dalam Dua Minggu Terakhir pada Penduduk Umur ≥15 Tahun menurut Provinsi, SKI 2023",
    reportPage: 157,
    pdfPage: 196,
    unit: "%",
    granularity: "Provinsi",
    notes: "*N tertimbang < 50 menandakan estimasi memiliki ketidakpastian statistik tinggi (19 provinsi bertanda *). Nasional: 12,7% (N=8.680).",
  },
  {
    id: "t5.14",
    tableNumber: "Tabel 5.14",
    title: "Proporsi Individu dengan Depresi yang Berobat dalam Dua Minggu Terakhir pada Penduduk Umur ≥15 Tahun menurut Karakteristik, SKI 2023",
    reportPage: 158,
    pdfPage: 197,
    unit: "%",
    granularity: "Karakteristik Responden",
    notes: "*N tertimbang < 50 berlaku pada kelompok pekerjaan PNS/TNI/POLRI/BUMN/BUMD (N=49*) dan Nelayan (N=38*).",
  },
];

export const SUBCHAPTER_METHODOLOGY: SubchapterMethodology[] = [
  {
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
      {
        label: "Prevalensi RT dengan ART Gejala Psikosis/Skizofrenia",
        expression: "(Σ RT memiliki ART gejala psikosis/skizofrenia ÷ Σ RT yang diwawancara) × 1.000‰",
      },
      {
        label: "Prevalensi RT dengan ART Gejala + Diagnosis Dokter",
        expression: "(Σ RT memiliki ART gejala & diagnosis dokter ÷ Σ RT yang diwawancara) × 1.000‰",
      },
      {
        label: "Proporsi Pernah Dipasung (Seumur Hidup)",
        expression: "(Σ RT memiliki ART psikosis yang pernah dipasung ÷ Σ RT memiliki ART psikosis terdiagnosis) × 100%",
      },
      {
        label: "Proporsi Dipasung 3 Bulan Terakhir",
        expression: "(Σ RT dengan ART dipasung 3 bulan terakhir ÷ Σ RT dengan ART pernah dipasung) × 100%",
      },
    ],
  },
  {
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
      {
        label: "Prevalensi Depresi (2 Minggu Terakhir)",
        expression: "(Σ penduduk ≥15 th mengalami depresi menurut MINI ÷ Σ seluruh penduduk ≥15 th) × 100%",
      },
    ],
  },
  {
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
      {
        label: "Prevalensi Masalah Kesehatan Jiwa (1 Bulan Terakhir)",
        expression: "(Σ penduduk ≥15 th dengan skor SRQ-20 ≥ 6 ÷ Σ seluruh penduduk ≥15 th) × 100%",
      },
      {
        label: "Prevalensi Pikiran Mengakhiri Hidup (1 Bulan Terakhir)",
        expression: "(Σ penduduk ≥15 th menjawab 'Ya' pada item C-29 SRQ-20 ÷ Σ seluruh penduduk ≥15 th) × 100%",
      },
    ],
  },
  {
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
      {
        label: "Proporsi Berobat 1 Bulan Terakhir",
        expression: "(Σ RT psikosis berobat 1 bulan terakhir ÷ Σ RT psikosis yang berobat di fasyankes) × 100%",
      },
      {
        label: "Proporsi Berobat Rutin 1 Bulan Terakhir",
        expression: "(Σ RT psikosis rutin minum/suntik obat 1 bulan terakhir ÷ Σ RT psikosis yang berobat 1 bulan terakhir) × 100%",
      },
    ],
  },
  {
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
      {
        label: "Proporsi Depresi yang Berobat",
        expression: "(Σ penduduk ≥15 th dengan depresi yang berobat ÷ Σ penduduk ≥15 th dengan depresi) × 100%",
      },
    ],
  },
];
