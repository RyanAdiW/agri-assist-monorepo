import {
  type DiagnosisKind,
  type SymptomCategory,
  type TreatmentCategory
} from "@/lib/types";

export const appCopy = {
  brand: "Agri-Assist",
  cropLabel: "Fokus tanaman cabai",
  heroTitle: "Bantu petani cabai mengambil keputusan lebih cepat.",
  heroSubtitle:
    "Pilih gejala yang terlihat, dapatkan 2 sampai 3 kemungkinan diagnosis, lalu ikuti rekomendasi tindakan yang praktis.",
  heroCta: "Mulai Diagnosis",
  trustTitle: "Dirancang untuk dipakai di lapangan",
  trustPoints: [
    "Checklist gejala yang mudah dipahami",
    "Tampilan mobile-first dengan tombol besar",
    "Rekomendasi dibagi dalam 4 pilar tindakan"
  ],
  steps: [
    "Pilih gejala yang tampak pada daun, batang, buah, atau akar.",
    "Sistem menghitung kecocokan berbobot untuk beberapa penyakit utama cabai.",
    "Lihat hasil, baca rekomendasi, lalu beri umpan balik agar sistem makin rapi."
  ],
  resultsTitle: "Ringkasan hasil diagnosis",
  feedbackTitle: "Apakah hasil utama ini membantu?",
  feedbackSuccess: "Terima kasih. Masukan Anda sudah kami simpan untuk evaluasi."
};

export const categoryLabels: Record<"semua" | SymptomCategory, string> = {
  semua: "Semua gejala",
  daun: "Daun",
  batang: "Batang",
  buah: "Buah",
  akar: "Akar",
  umum: "Umum"
};

export const treatmentLabels: Record<TreatmentCategory, string> = {
  alami: "Penanganan alami",
  pencegahan: "Langkah pencegahan",
  organik: "Pupuk organik",
  kimia: "Obat kimia"
};

export const confidenceLabels = {
  tinggi: "Tingkat yakin tinggi",
  sedang: "Cukup yakin",
  rendah: "Kemungkinan rendah"
} as const;

export const diagnosisKindLabels: Record<DiagnosisKind, string> = {
  hama: "Hama",
  penyakit: "Penyakit"
};

export const landingStats = [
  { value: "2-3", label: "kemungkinan hasil yang ditampilkan" },
  { value: "4 pilar", label: "rekomendasi tindakan per diagnosis" },
  { value: "Online", label: "agar data diagnosis tetap mutakhir" }
];
