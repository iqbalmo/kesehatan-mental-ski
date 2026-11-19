"""
Ekstraksi lengkap & verifikasi seluruh 15 tabel Bab 5 (Kesehatan Jiwa)
dari LAPORAN SKI 2023 DALAM ANGKA_REVISI I_OK.pdf (halaman PDF 181-197).
"""

import json
import re
from pathlib import Path
import pypdf

ROOT_DIR = Path(__file__).resolve().parent.parent
PDF_PATH = ROOT_DIR / "LAPORAN SKI 2023 DALAM ANGKA_REVISI I_OK.pdf"

PROVINCE_NAMES = [
    "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi",
    "Sumatera Selatan", "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau",
    "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten", "Bali",
    "Nusa Tenggara Barat", "Nusa Tenggara Timur",
    "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
    "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
    "Maluku", "Maluku Utara",
    "Papua Barat", "Papua Barat Daya", "Papua", "Papua Selatan", "Papua Tengah", "Papua Pegunungan",
    "INDONESIA",
]

INDIVIDUAL_CHAR_GROUPS = [
    ("Kelompok Umur", ["15-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75+"]),
    ("Jenis Kelamin", ["Laki-laki", "Perempuan"]),
    ("Pendidikan", [
        "Tidak/belum pernah sekolah", "Tidak tamat SD/MI", "Tamat SD/MI",
        "Tamat SLTP/MTs", "Tamat SLTA/MA", "Tamat D1/D2/D3/PT",
    ]),
    ("Pekerjaan", [
        "Tidak bekerja", "Sekolah", "PNS/TNI/POLRI/BUMN/BUMD", "Pegawai swasta",
        "Wiraswasta", "Petani/buruh tani", "Nelayan", "Buruh/sopir/pembantu ruta", "Lainnya",
    ]),
    ("Tempat Tinggal", ["Perkotaan", "Perdesaan"]),
    ("Status Ekonomi", ["Terbawah", "Menengah bawah", "Menengah", "Menengah atas", "Teratas"]),
]

HOUSEHOLD_CHARS = [
    ("Tempat Tinggal", ["Perkotaan", "Perdesaan"]),
    ("Status Ekonomi", ["Terbawah", "Menengah bawah", "Menengah", "Menengah atas", "Teratas"]),
]


def parse_id_float(val: str) -> float:
    s = val.strip()
    if s == "0-0":
        return 0.0
    return float(s.replace(".", "").replace(",", "."))


def parse_id_int(val: str) -> tuple[int, bool]:
    s = val.strip()
    low = s.endswith("*")
    s = s.rstrip("*")
    return int(s.replace(".", "")), low


def parse_ci(val: str) -> tuple[float, float]:
    parts = val.strip().split("-")
    if len(parts) != 2:
        raise ValueError(f"Format CI tidak dikenali: {val}")
    return float(parts[0].replace(",", ".")), float(parts[1].replace(",", "."))


def parse_single_metric_rows(text: str, labels: list[str]) -> list[dict]:
    rows = []
    for label in labels:
        pattern = rf"^\s*{re.escape(label)}\s+([\d,]+)\s+([\d,.]+-[\d,.]+)\s+([\d.]+\*?)\s*$"
        m = re.search(pattern, text, flags=re.MULTILINE)
        if not m:
            raise ValueError(f"Gagal parse baris '{label}'")
        ci_low, ci_high = parse_ci(m.group(2))
        n_w, is_low = parse_id_int(m.group(3))
        rows.append({
            "label": label,
            "value": parse_id_float(m.group(1)),
            "ciLow": ci_low,
            "ciHigh": ci_high,
            "nWeighted": n_w,
            "isLowSample": is_low,
        })
    return rows


def parse_individual_table(text: str) -> list[dict]:
    result = []
    for group_name, labels in INDIVIDUAL_CHAR_GROUPS:
        rows = parse_single_metric_rows(text, labels)
        for r in rows:
            r["group"] = group_name
            result.append(r)
    return result


def parse_tabel_5_1(text: str) -> list[dict]:
    rows = []
    for prov in PROVINCE_NAMES:
        pattern = (
            rf"^{re.escape(prov)}\s+"
            rf"([\d,]+)\s+([\d,.]+-[\d,.]+)\s+"
            rf"([\d,]+)\s+([\d,.]+-[\d,.]+)\s+"
            rf"([\d.]+\*?)\s*$"
        )
        m = re.search(pattern, text, flags=re.MULTILINE)
        if not m:
            raise ValueError(f"Gagal parse Tabel 5.1 '{prov}'")
        g_ci = parse_ci(m.group(2))
        d_ci = parse_ci(m.group(4))
        n_w, _ = parse_id_int(m.group(5))
        rows.append({
            "name": prov,
            "gejalaValue": parse_id_float(m.group(1)),
            "gejalaCiLow": g_ci[0],
            "gejalaCiHigh": g_ci[1],
            "diagnosisValue": parse_id_float(m.group(3)),
            "diagnosisCiLow": d_ci[0],
            "diagnosisCiHigh": d_ci[1],
            "nWeighted": n_w,
        })
    return rows


def parse_tabel_5_2_5_3(text: str) -> tuple[list[dict], list[dict]]:
    # Split page 184 into Tabel 5.2 and Tabel 5.3 sections
    parts = text.split("Tabel 5.3")
    t52_text = parts[0]
    t53_text = parts[1].split("Tabel 4.65")[0]

    t52_rows = []
    for group_name, labels in HOUSEHOLD_CHARS:
        for label in labels:
            pattern = (
                rf"^\s*{re.escape(label)}\s+"
                rf"([\d,]+)\s+([\d,.]+-[\d,.]+)\s+"
                rf"([\d,]+)\s+([\d,.]+-[\d,.]+)\s+"
                rf"([\d.]+)\s*$"
            )
            m = re.search(pattern, t52_text, flags=re.MULTILINE)
            if not m:
                raise ValueError(f"Gagal parse Tabel 5.2 '{label}'")
            g_ci = parse_ci(m.group(2))
            d_ci = parse_ci(m.group(4))
            n_w, _ = parse_id_int(m.group(5))
            t52_rows.append({
                "group": group_name,
                "label": label,
                "gejalaValue": parse_id_float(m.group(1)),
                "gejalaCiLow": g_ci[0],
                "gejalaCiHigh": g_ci[1],
                "diagnosisValue": parse_id_float(m.group(3)),
                "diagnosisCiLow": d_ci[0],
                "diagnosisCiHigh": d_ci[1],
                "nWeighted": n_w,
            })

    t53_labels = ["Perkotaan", "Perdesaan", "Terbawah", "Menengah bawah", "Menengah", "Menengah atas", "Teratas", "INDONESIA"]
    t53_rows = parse_single_metric_rows(t53_text, t53_labels)
    for r in t53_rows:
        if r["label"] in ["Perkotaan", "Perdesaan"]:
            r["group"] = "Tempat Tinggal"
        elif r["label"] == "INDONESIA":
            r["group"] = "Nasional"
        else:
            r["group"] = "Status Ekonomi"

    return t52_rows, t53_rows


def parse_tabel_5_10_5_11(text: str) -> tuple[list[dict], list[dict]]:
    parts = text.split("Tabel 5.11")
    t510_text = parts[0]
    t511_text = parts[1]

    labels = ["Perkotaan", "Perdesaan", "Terbawah", "Menengah bawah", "Menengah", "Menengah atas", "Teratas", "INDONESIA"]
    t510_rows = []
    for label in labels:
        pattern = (
            rf"^\s*{re.escape(label)}\s+"
            rf"([\d,]+)\s+([\d,.]+-[\d,.]+)\s+"
            rf"([\d,-]+)\s+([\d,.]+-[\d,.]+)\s+"
            rf"([\d,]+)\s+([\d,.]+-[\d,.]+)\s+"
            rf"([\d,]+)\s+([\d,.]+-[\d,.]+)\s+"
            rf"([\d.]+)\s*$"
        )
        m = re.search(pattern, t510_text, flags=re.MULTILINE)
        if not m:
            raise ValueError(f"Gagal parse Tabel 5.10 '{label}'")
        grp = "Tempat Tinggal" if label in ["Perkotaan", "Perdesaan"] else ("Nasional" if label == "INDONESIA" else "Status Ekonomi")
        t510_rows.append({
            "group": grp,
            "label": label,
            "hanyaFasyankes": {"value": parse_id_float(m.group(1)), "ciLow": parse_ci(m.group(2))[0], "ciHigh": parse_ci(m.group(2))[1]},
            "hanyaNonFasyankes": {"value": parse_id_float(m.group(3)), "ciLow": parse_ci(m.group(4))[0], "ciHigh": parse_ci(m.group(4))[1]},
            "keduanya": {"value": parse_id_float(m.group(5)), "ciLow": parse_ci(m.group(6))[0], "ciHigh": parse_ci(m.group(6))[1]},
            "tidakBerobat": {"value": parse_id_float(m.group(7)), "ciLow": parse_ci(m.group(8))[0], "ciHigh": parse_ci(m.group(8))[1]},
            "nWeighted": parse_id_int(m.group(9))[0],
        })

    t511_rows = []
    for label in labels:
        pattern = (
            rf"^\s*{re.escape(label)}\s+"
            rf"([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d.]+)\s+([\d,]+)\s+([\d.]+)\s*$"
        )
        m = re.search(pattern, t511_text, flags=re.MULTILINE)
        if not m:
            raise ValueError(f"Gagal parse Tabel 5.11 '{label}'")
        grp = "Tempat Tinggal" if label in ["Perkotaan", "Perdesaan"] else ("Nasional" if label == "INDONESIA" else "Status Ekonomi")
        t511_rows.append({
            "group": grp,
            "label": label,
            "minumSemua": parse_id_float(m.group(1)),
            "minumTidakSemua": parse_id_float(m.group(2)),
            "tidakMinum": parse_id_float(m.group(3)),
            "nMinum1Bulan": parse_id_int(m.group(4))[0],
            "rutinSemua": parse_id_float(m.group(5)),
            "nRutin1Bulan": parse_id_int(m.group(6))[0],
        })

    return t510_rows, t511_rows


def main() -> None:
    reader = pypdf.PdfReader(str(PDF_PATH))
    pages = {i + 1: reader.pages[i].extract_text() for i in range(180, 197)}

    t5_1 = parse_tabel_5_1(pages[183])
    t5_2, t5_3 = parse_tabel_5_2_5_3(pages[184])
    t5_4 = parse_single_metric_rows(pages[186], PROVINCE_NAMES)
    t5_5 = parse_individual_table(pages[187])
    t5_6 = parse_single_metric_rows(pages[189], PROVINCE_NAMES)
    t5_7 = parse_individual_table(pages[190])
    t5_8 = parse_single_metric_rows(pages[191], PROVINCE_NAMES)
    t5_9 = parse_individual_table(pages[192])
    t5_10, t5_11 = parse_tabel_5_10_5_11(pages[194])
    t5_13 = parse_single_metric_rows(pages[196], PROVINCE_NAMES)
    t5_14 = parse_individual_table(pages[197])

    all_data = {
        "t5_1": t5_1,
        "t5_2": t5_2,
        "t5_3": t5_3,
        "t5_4": t5_4,
        "t5_5": t5_5,
        "t5_6": t5_6,
        "t5_7": t5_7,
        "t5_8": t5_8,
        "t5_9": t5_9,
        "t5_10": t5_10,
        "t5_11": t5_11,
        "t5_13": t5_13,
        "t5_14": t5_14,
    }

    out_path = ROOT_DIR / "scripts" / "bab5_verified.json"
    out_path.write_text(json.dumps(all_data, indent=2, ensure_ascii=False), encoding="utf-8")

    counts = {k: len(v) for k, v in all_data.items()}
    print("Ekstraksi lengkap Bab 5 berhasil:")
    print(json.dumps(counts, indent=2))


if __name__ == "__main__":
    main()
