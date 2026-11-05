# Vintage Scrapbook Remotion — Android/GitHub Edition

Template motion graphics vertikal 9:16 dengan nuansa vintage scrapbook. Project ini dirancang supaya kamu bisa mengedit file dan menjalankan render dari HP Android lewat GitHub website. Kamu tidak perlu memasang Node.js atau Remotion di HP.

## Isi project
- Remotion 4 + React + TypeScript
- Komposisi 1080 × 1920, 30 fps, durasi 27 detik
- 5 bagian: intro, 3 bagian cerita, outro
- Elemen kertas, tape, kartu foto, doodle arrow, grain, kinetic word
- GitHub Actions untuk render MP4
- Input judul, subjudul, dan kalimat inti saat menjalankan workflow

## Cara pakai dari HP Android

### 1. Buat repository GitHub
1. Buka https://github.com dan login.
2. Tekan tombol `+` → `New repository`.
3. Isi nama: `vintage-scrapbook-remotion`.
4. Pilih `Public` atau `Private`, lalu tekan `Create repository`.

### 2. Upload project
1. Download ZIP project ini dan ekstrak menggunakan aplikasi Files/ZArchiver.
2. Di halaman repository GitHub, pilih `Add file` → `Upload files`.
3. Upload **isi folder project**, bukan folder pembungkusnya. Pastikan `package.json`, `src`, dan `.github` terlihat di halaman utama repository.
4. Tekan `Commit changes`.

> Penting: folder `.github` kadang tersembunyi di file manager. Aktifkan opsi tampilkan file tersembunyi sebelum upload. Pastikan `.github/workflows/render.yml` ikut ter-upload.

### 3. Render video
1. Buka tab `Actions` di repository.
2. Pilih workflow `Render Vintage Scrapbook Video`.
3. Tekan `Run workflow`.
4. Isi `title`, `subtitle`, dan `accent`.
5. Tekan tombol hijau `Run workflow`.
6. Tunggu sampai proses selesai dengan status hijau.

### 4. Download MP4
1. Buka hasil run yang sudah selesai.
2. Scroll ke bagian `Artifacts`.
3. Download `vintage-scrapbook-mp4`.
4. Ekstrak ZIP artifact; file MP4 ada di dalamnya.

## Mengubah template
- `src/Video.tsx`: urutan scene, teks, durasi, dan struktur cerita.
- `src/components.tsx`: tampilan elemen scrapbook.
- `src/Root.tsx`: ukuran, FPS, durasi, dan nilai default.
- `.github/workflows/render.yml`: proses render otomatis.

## Catatan penting
Ini adalah **template motion graphics reusable**, bukan AI video generator penuh. Mengganti input workflow saat ini mengganti judul/subjudul/kalimat inti pada template. Naskah lengkap otomatis, ilustrasi AI yang berbeda untuk tiap topik, voice-over, musik, dan QC visual otomatis belum disambungkan. Kartu visual saat ini berupa artwork placeholder yang dibuat dengan CSS; ganti dengan ilustrasi milikmu di tahap pengembangan berikutnya.

## Jika workflow gagal
- Pastikan `package.json`, `src/index.ts`, `src/Root.tsx`, dan `.github/workflows/render.yml` ada.
- Buka run yang gagal → buka langkah merah → salin pesan error.
- Kirim pesan error itu untuk diperbaiki. Jangan mengubah banyak file sekaligus sebelum penyebabnya diketahui.

## Spesifikasi
- 1080 × 1920 (vertical 9:16)
- 30 fps
- 810 frames / 27 detik
- H.264 MP4
