# PRODUCT REQUIREMENT DOCUMENT (PRD)

## **Project Name:** NoteFlow
**Version:** 1.1.0 (MVP + Sign Language Input Integration)  
**Author:** Rosid Hakimudin  
**Date:** June 24, 2026  
**Target Launch:** Academic Session 2026  

---

## **1. Executive Summary & Objectives**

### **1.1. Product Overview**
NoteFlow adalah platform manajemen pengetahuan adaptif dan aksesibilitas cerdas berbasis web. Aplikasi ini dirancang utamanya untuk menjembatani hambatan komunikasi bagi mahasiswa penyandang **tuna rungu (deaf/hard of hearing)** dalam menangkap materi perkuliahan lisan secara *real-time*. Melalui pemanfaatan *Speech-to-Text* (STT), *Sign Language Recognition*, dan integrasi Artificial Intelligence (AI), NoteFlow mentransformasikan suara kelas dan gerakan isyarat tubuh menjadi catatan teks terstruktur serta visualisasi pikiran interaktif (*mind mapping*). Meskipun diprioritaskan untuk pemenuhan pendidikan inklusif, NoteFlow juga dikembangkan secara universal agar dapat digunakan secara personal oleh pengguna umum non-disabilitas (baik mahasiswa maupun dosen) yang ingin meningkatkan efisiensi belajar dan fleksibilitas mencatat mereka.

### **1.2. The Problem Statement**
* **Hambatan Aksesibilitas:** Mahasiswa tuna rungu seringkali tertinggal dalam menangkap penjelasan dosen yang disampaikan secara lisan (ceramah kelas), terutama dalam diskusi yang berjalan cepat atau tanpa alat bantu dengar/juru bahasa isyarat.
* **Keterbatasan Alat Input Tradisional:** Proses mencatat konvensional menggunakan *keyboard* terkadang tidak cukup cepat atau kurang intuitif bagi pengguna yang lebih fasih mengekspresikan konsep akademis maupun instruksi aplikasi melalui bahasa isyarat.
* **Cognitive Overload:** Mengubah transkrip teks perkuliahan yang sangat panjang menjadi ringkasan yang mudah dipahami membutuhkan waktu dan energi kognitif yang besar bagi mahasiswa.

### **1.3. Value Proposition & Big Goal**
* **Goal Terbesar:** Membantu pengguna aplikasi (khususnya mahasiswa) untuk memahami, mendestilasi, dan menguasai materi yang ia dapatkan di perkuliahan secara mandiri dan inklusif.
* **Solusi:** Menyediakan ekosistem belajar *all-in-one* yang mengubah *audio/visual sign input* → *text notes* → *visual mind map* → *gamified assessment* (kuis & game pencocokan).

---

## **2. User Journey & High-Level Flow**

1. **Landing Page:** Pengguna mengakses platform pertama kali, mendapatkan informasi produk, dan diarahkan untuk melakukan registrasi/autentikasi.
2. **Authentication (Supabase Auth):** Pengguna masuk menggunakan akun email & password yang terdaftar secara aman.
3. **Workspace Page (Core Hub):** Setelah berhasil login, pengguna langsung diarahkan ke halaman utama kerja (Workspace) untuk mulai mencatat, mengaktifkan mikrofon (STT), menyalakan kamera (Sign Language Detection), atau mengunggah dokumen kuliah.
4. **Mind Map Generation:** Setelah teks terkumpul dari input suara, ketikan, atau isyarat, pengguna mengeklik perintah untuk meminta AI memproses catatan menjadi *mind map* interaktif.
5. **Assessment Component:** Dari *mind map* atau catatan visual tersebut, pengguna secara manual menekan tombol *"Generate Quiz"* untuk memicu AI menyusun soal latihan, bermain *matching game*, atau masuk ke arena *Quiz Battle 1v1*.

---

## **3. MVP Scope Feature Specification**

### **3.1. Input & Catatan Modul**
* **Rich Text Editor:** Komponen editor teks yang mendukung format lengkap (Bold, Italic, Bullet/Numbered List, Heading H1-H3).
* **Photo Upload Integration:** Pengguna dapat menyisipkan file gambar ke dalam dokumen catatan, yang disimpan secara aman di *Supabase Storage*.
* **Real-time Audio Transcription (STT):** Perekaman suara guru/dosen secara langsung menggunakan *Web Speech API* lokal browser, yang secara instan dikonversi menjadi teks paragraf di editor.
* **Sign Language Keyword Input (Predictive Triggers):** Integrasi kamera pendeteksi gestur tangan statis (via MediaPipe Hands + `fingerpose`) yang berfungsi langsung di dalam Workspace. Sistem akan menerjemahkan gestur alfabet/simbol isyarat dasar menjadi input kata kunci perkuliahan utuh (seperti: "Definisi:", "[PERTANYAAN]", "Contoh:", "Kesimpulan:") dan otomatis menyisipkannya ke dalam Rich Text Editor tanpa perlu mengetik manual di keyboard.
* **File Upload Extractor:** Fitur unggah dokumen berformat PDF, PPT, dan DOCX untuk mengekstraksi teks mentah di dalamnya sebagai basis catatan.
* **Histori Catatan:** Sistem manajemen versi untuk melacak riwayat perubahan isi catatan dari waktu ke waktu.

### **3.2. Mind Map Visualizer**
* **AI Mind Map Generator:** Integrasi model AI untuk mengekstrak entitas utama dari catatan teks panjang dan menyusunnya dalam struktur objek grafis.
* **Canvas Interaktif (React Flow):** Kanvas diagram yang mendukung interaksi fisik pengguna seperti *drag-and-drop* node, fitur *zoom in/out*, serta pengubahan label teks langsung di area kerja.
* **Ekspor Gambar (html-to-image):** Fitur untuk mengunduh area kanvas grafis *mind map* menjadi file eksternal berupa gambar PNG.
* **Tipe Layout Konvensional:** Menyediakan pilihan tipe diagram dasar: *Standard Map, Tree Map, Flow Map, Bubble Map,* dan *Multi-Flow Map*.

### **3.3. Evaluasi & Gamifikasi (Quiz & Exercise)**
* **AI Quiz Generator:** Membuat soal pilihan ganda (4 opsi jawaban: A, B, C, D) secara otomatis bersumber dari konten *mind map* yang aktif setelah pengguna menekan tombol pemicu.
* **Interactive Matching Game:** Game edukasi interaktif menggunakan mekanisme *drag-and-drop* untuk menjodohkan konsep teori dengan definisinya yang tepat.
* **Review & Pembahasan Ringkas:** Halaman evaluasi pasca-kuis untuk memperlihatkan kunci jawaban benar disertai alasan atau landasan teorinya.
* **WebSocket 1v1 Quiz Battle:** Fitur kompetisi *real-time* berbasis Node.js/Express.js Server yang memungkinkan pengguna mengundang (*invite*) pengguna aktif lain untuk bertanding menjawab kuis secara bersamaan dengan pembaruan papan skor instan.

### **3.4. Penjadwalan & Sistem Akun**
* **Calendar Dashboard:** Kalender akademik visual terintegrasi untuk mencatat dan mengatur jadwal belajar, agenda kuis, atau tenggat waktu perkuliahan.
* **User Profile & History Logs:** Halaman manajemen data diri pengguna yang melacak perolehan poin gamifikasi serta menyimpan catatan riwayat aktivitas kuis yang pernah diikuti.
* **Personal Sign Dictionary Manager (Baru):** Halaman bagi pengguna untuk mengelola pemetaan pustaka koordinat gerakan isyarat personal mereka yang tersimpan di database.

---

## **4. Non-Functional Requirements & Performance**

### **4.1. Data Persistence & Auto-Save Mechanism**
* **Front-end Debouncing:** Untuk mencegah beban tinggi (*request overload*) ke database selama sesi penggunaan panjang (1-2 jam), Front-end wajib mengimplementasikan mekanisme *auto-save interval*.
* **30-Second Sync Interval:** Teks hasil konversi *Speech-to-Text* (STT) maupun *Sign Language Input* akan diakumulasikan dan disimpan secara berkala dari Front-end menuju Express Backend ke database Supabase setiap **30 detik sekali** guna menghemat kuota operasi write API dan mengoptimalkan performa jaringan.
* **Local Storage Backup:** Sebelum data berhasil tersinkronisasi ke server, teks transkrip *real-time* harus dicadangkan sementara di *IndexedDB* atau *LocalStorage* browser untuk mengantisipasi kehilangan data jika koneksi internet terputus di tengah sesi.

### **4.2. Accessibility & Visual Constraints (Deaf-Friendly)**
* **Zero Audio Dependency:** Aplikasi tidak boleh mengeluarkan output informasi kritis yang hanya berbentuk suara. Kegagalan sistem, status rekam, atau notifikasi kuis wajib direpresentasikan melalui transisi komponen visual yang kontras.
* **UI Responsiveness & Low Latency Tracking:** Transkripsi teks STT harus di-render dengan *latency* $< 500\text{ms}$. Untuk *Sign Language Recognition*, visualisasi *tracking skeleton* koordinat pada overlay kamera wajib berjalan stabil minimal pada **15-20 FPS** pada perangkat kelas menengah untuk menghindari efek visual yang patah-patah (*stuttering*).

---

## **5. Technical Stack Spec**

* **Frontend Framework:** React.js (Vite)
* **Routing:** React Router DOM
* **Styling Framework:** Tailwind CSS
* **Global State:** Zustand
* **Mind Map Core:** React Flow (`reactflow`)
* **Canvas Exporter:** `html-to-image`
* **Computer Vision Core (Baru):** MediaPipe Holistic (`@mediapipe/tasks-vision`) untuk pelacakan simultan wajah, tubuh, dan tangan di sisi client.
* **Backend Framework (Baru):** Express.js (Node.js) untuk penanganan API kustom, rute terproteksi, manajemen state kuis, dan integrasi LLM Gateway (Gemini/OpenAI API Key Protection).
* **Database & Auth:** Supabase (Auth, Storage, Relational Database PostgreSQL)
* **Real-time Sync & WebSockets:** `socket.io` (Server) & `socket.io-client` (Frontend React) tersemat pada Express server untuk Quiz Battle 1v1.
* **Aksesibilitas STT:** Web Speech API (Browser Native)

---

## **6. Key Success Metrics (Kriteria Keberhasilan)**

1. **Akurasi Transkripsi:** Tingkat akurasi pengenalan kata (*Word Error Rate*) pada fitur *Speech-to-Text* untuk Bahasa Indonesia akademik berada **di atas 85%**.
2. **Konektivitas WebSocket:** Fitur *Quiz Battle 1v1* harus dapat mensinkronisasi progres antarpemain melalui server Express dengan *delay* hantaran data di bawah **2 detik**.
3. **Efisiensi Model Visi (Baru):** Fitur *Sign Language Input* tidak memicu *memory leak* pada browser (konsumsi RAM stabil $< 400\text{MB}$ selama pemrosesan aktif) dan memiliki tingkat akurasi klasifikasi gestur statis/dasar minimal **80%**.
4. **Keamanan Data:** Kegagalan perangkat tidak boleh menghilangkan data transkripsi kelas yang sudah berjalan berkat mekanisme penyelarasan hibrida lokal dan interval 30 detik.