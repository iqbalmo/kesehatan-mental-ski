# Dasbor Analitik Kesehatan Jiwa — SKI 2023 dalam Angka

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss&logoColor=white)

Dasbor analitik web interaktif berbasis **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS v4** untuk memvisualisasikan dan mengeksplorasi seluruh data **Bab 5: Kesehatan Jiwa** dari laporan resmi **Survei Kesehatan Indonesia (SKI) 2023 dalam Angka** yang diterbitkan oleh Badan Kebijakan Pembangunan Kesehatan (BKPK), Kementerian Kesehatan RI.

---

## Ringkasan Data Nasional (Bab 5: Kesehatan Jiwa)

Seluruh angka pada dasbor diekstrak dan diverifikasi langsung dari dokumen laporan resmi (halaman laporan 142–158 / halaman PDF 181–197):

| Indikator Utama | Nilai Nasional | Instrumen / Keterangan | Referensi |
| --- | --- | --- | --- |
| **Psikosis / Skizofrenia (RT)** | **4,0‰** (gejala) / **3,0‰** (diagnosis) | Kuesioner Rumah Tangga (`N = 315.621` RT) | Tabel 5.1 |
| **Pemasungan ART Psikosis** | **6,6%** (seumur hidup) · **25,2%** (3 bln terakhir) | Permenkes No. 54/2017 (`N = 844` & `N = 55` RT) | Tabel 5.3 & 4.65 |
| **Depresi (Penduduk ≥ 15 Tahun)** | **1,4%** (`95% CI: 1,3–1,5%`) | Wawancara MINI 10 pertanyaan (`N = 630.827`) | Tabel 5.4 |
| **Masalah Kesehatan Jiwa** | **2,0%** (`95% CI: 2,0–2,1%`) | WHO SRQ-20 *cut-off* `≥ 6` (`N = 630.827`) | Tabel 5.6 |
| **Pikiran Mengakhiri Hidup** | **0,25%** (`95% CI: 0,22–0,27%`) | WHO SRQ-20 item C-29 (`N = 630.827`) | Tabel 5.8 |
| **Depresi yang Berobat** | **12,7%** (*treatment gap* **87,3%**) | Penanganan oleh dokter/nakes di fasyankes (`N = 8.680`) | Tabel 5.13 |

---

## Fitur Utama

1. **Ringkasan & Peta Interaktif 38 Provinsi**
   - Peta *choropleth* SVG Nusantara mencakup seluruh **38 provinsi** (termasuk 4 Daerah Otonomi Baru Papua) dengan opsi tampilan **Peta Geografis** (dilengkapi node proporsional) dan **Cartogram 38 Grid**.
   - Filter wilayah pulau (*Sumatera, Jawa-Bali, Nusa Tenggara, Kalimantan, Sulawesi, Maluku, Papua*), inspeksi profil 6 indikator per provinsi, serta **Komparator Head-to-Head** dua provinsi terhadap rata-rata nasional (`INDONESIA`).
2. **Analisis Psikosis, Pemasungan & Kepatuhan Obat**
   - Visualisasi gradien status ekonomi pada psikosis dan pemasungan (Tabel 5.2 & 5.3), distribusi jumlah ART psikosis dalam rumah tangga, serta alasan pemasungan (Tabel 4.65).
   - Evaluasi pemanfaatan fasilitas kesehatan vs non-kesehatan (Tabel 5.10), kepatuhan minum/suntik obat 1 bulan terakhir (Tabel 5.11), dan alasan ketidakpatuhan (Tabel 5.12).
3. **Depresi, SRQ-20 & Kuadran *Treatment Gap***
   - Grafik kuadran *scatter plot* 38 provinsi yang memetakan beban prevalensi (Depresi MINI, SRQ-20, atau Pikiran Mengakhiri Hidup) terhadap cakupan pengobatan depresi, lengkap dengan opsi menyaring provinsi ber-sampel kecil (`*N tertimbang < 50`).
4. **Disparitas Demografi & Sosial-Ekonomi**
   - Analisis lintas **6 dimensi responden ≥ 15 tahun**: Kelompok Umur, Jenis Kelamin, Pendidikan, Pekerjaan, Tempat Tinggal (Perkotaan/Perdesaan), dan Status Ekonomi (5 kuintil), lengkap dengan rentang `95% CI` dan matriks perbandingan 4 indikator.
5. **Penjelajah 15 Tabel Resmi, Ekspor Data & Penampil PDF**
   - Penjelajah interaktif untuk seluruh **15 tabel resmi Bab 5** (`Tabel 5.1`–`5.14` dan `Tabel 4.65`) dengan fitur pencarian, filter kelompok, pengurutan kolom, serta ekspor ke **CSV** dan **JSON**.
   - Panel metodologi berisi definisi operasional dan formula perhitungan resmi, serta endpoint `/api/pdf` yang mendukung *byte-range streaming* untuk membuka halaman dokumen PDF asli secara langsung (`#page=181`).
6. **Dukungan Light & Dark Mode**
   - Antarmuka responsif bernuansa *Modern Health & Public Policy* dengan tombol pengalih tema terang/gelap.

---

## Struktur Proyek

```text
kesehatan-mental-ski/
├── LAPORAN SKI 2023 DALAM ANGKA_REVISI I_OK.pdf   # Dokumen sumber resmi SKI 2023 (965 halaman)
├── scripts/
│   ├── extract_bab5.py                            # Ekstraksi tabel Bab 5 dari PDF menggunakan pypdf
│   ├── generate_ts_dataset.py                     # Pembangkit dataset TypeScript dari JSON terverifikasi
│   ├── build_svg_paths.py                         # Pembangkit koordinat path SVG 38 provinsi
│   ├── verify_dataset.py                          # Validasi kelengkapan 38 provinsi & 15 tabel
│   └── bab5_verified.json                         # Hasil ekstraksi JSON terverifikasi
├── src/
│   ├── app/
│   │   ├── api/pdf/route.ts                       # API route streaming PDF (mendukung Range 206)
│   │   ├── globals.css                            # Konfigurasi Tailwind CSS v4 & varian dark mode
│   │   ├── layout.tsx                             # Root layout & metadata aplikasi
│   │   └── page.tsx                               # Halaman utama dasbor
│   ├── components/
│   │   ├── DashboardClient.tsx                    # Shell dasbor, KPI nasional, & navigasi 5 tab
│   │   ├── IndonesiaMap38.tsx                     # Peta choropleth & cartogram 38 provinsi
│   │   ├── ProvinceComparisonSection.tsx          # Grafik batang 95% CI & komparator head-to-head
│   │   ├── PsychosisPasungSection.tsx             # Visualisasi Subbab 5.1 & 5.4
│   │   ├── TreatmentGapScatter.tsx                # Grafik kuadran treatment gap (Subbab 5.2, 5.3, 5.5)
│   │   ├── DemographicBreakdownSection.tsx        # Eksplorasi disparitas 6 dimensi demografi
│   │   ├── InteractiveDataTable.tsx               # Penjelajah 15 tabel resmi & ekspor CSV/JSON
│   │   └── MethodologyAndPdfPanel.tsx             # Metodologi, rumus resmi, & pratinjau PDF
│   ├── data/
│   │   ├── ski2023-mental-health.ts               # Dataset lengkap Bab 5 bertipe kuat (TypeScript)
│   │   └── indonesia-38-map-paths.ts              # Geometri path SVG 38 provinsi
│   └── lib/
│       └── mental-health-helpers.ts               # Utilitas pemformatan angka, warna peta, & ekspor
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Prasyarat & Menjalankan Secara Lokal

### Prasyarat
- **Node.js** v20+ (diuji pada Node.js `v22.20.0` dan `npm 10.9.3`)
- **Python 3** dengan pustaka `pypdf` *(opsional, hanya diperlukan jika ingin menjalankan ulang skrip ekstraksi/verifikasi PDF)*

### Instalasi & Menjalankan Server Pengembangan

```bash
# 1. Pasang dependensi Node.js
npm install

# 2. Jalankan server pengembangan
npm run dev
```

Buka **`http://localhost:3000`** melalui browser.

> **Catatan untuk Windows PowerShell:** Jika kebijakan eksekusi skrip memblokir `npm.ps1` / `npx.ps1`, gunakan `npm.cmd` dan `npx.cmd`:
> ```powershell
> npm.cmd install
> npm.cmd run dev
> ```

### Build Produksi & Verifikasi

```bash
# Pemeriksaan tipe TypeScript
npx tsc --noEmit

# Build produksi Next.js
npm run build

# Jalankan build produksi
npm run start
```

*(Opsional)* Untuk memverifikasi ulang ekstraksi data dari file PDF sumber:

```bash
python scripts/extract_bab5.py
python scripts/verify_dataset.py
```

---

## Sumber Data & Atribusi

- **Dokumen Sumber:** *Survei Kesehatan Indonesia (SKI) 2023 dalam Angka* — **Bab 5: Kesehatan Jiwa** (Halaman 142–158), Badan Kebijakan Pembangunan Kesehatan (BKPK), Kementerian Kesehatan Republik Indonesia.
- File PDF sumber (`LAPORAN SKI 2023 DALAM ANGKA_REVISI I_OK.pdf`) harus tetap berada di direktori utama proyek agar fitur penampil PDF (`/api/pdf`) dapat berfungsi.
