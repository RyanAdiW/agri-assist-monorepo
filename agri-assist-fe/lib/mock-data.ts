import { type DiseaseSeed, type Symptom } from "@/lib/types";

export const symptoms: Symptom[] = [
  {
    id: "daun-menguning",
    name: "Daun menguning tidak merata",
    category: "daun",
    hint: "Warna daun berubah pucat lalu menguning."
  },
  {
    id: "daun-keriting",
    name: "Daun menggulung atau keriting",
    category: "daun",
    hint: "Permukaan daun tampak mengerut dan mengecil."
  },
  {
    id: "bercak-coklat-daun",
    name: "Bercak coklat pada daun",
    category: "daun",
    hint: "Ada bercak kecil yang meluas pada helaian daun."
  },
  {
    id: "batang-layu",
    name: "Batang dan pucuk tampak layu",
    category: "batang",
    hint: "Tanaman terlihat turun dan lemas walau tanah masih lembap."
  },
  {
    id: "pangkal-busuk",
    name: "Pangkal batang terlihat busuk",
    category: "batang",
    hint: "Area pangkal batang tampak gelap, lunak, atau berair."
  },
  {
    id: "buah-bercak-hitam",
    name: "Buah memiliki bercak hitam cekung",
    category: "buah",
    hint: "Bercak hitam muncul pada permukaan buah dan tampak masuk ke dalam."
  },
  {
    id: "buah-busuk-basah",
    name: "Buah membusuk basah",
    category: "buah",
    hint: "Buah menjadi lembek dan cepat rusak."
  },
  {
    id: "bunga-rontok",
    name: "Bunga atau bakal buah mudah rontok",
    category: "buah",
    hint: "Bunga jatuh sebelum berkembang menjadi buah."
  },
  {
    id: "akar-coklat",
    name: "Akar berubah coklat dan lemah",
    category: "akar",
    hint: "Akar tampak gelap dan tidak segar."
  },
  {
    id: "tanaman-kerdil",
    name: "Pertumbuhan tanaman kerdil",
    category: "umum",
    hint: "Tanaman terlihat lebih kecil dan lambat berkembang."
  },
  {
    id: "kutu-halus",
    name: "Ada kutu halus di bawah daun",
    category: "umum",
    hint: "Terlihat serangga kecil yang aktif di permukaan bawah daun."
  },
  {
    id: "daun-berlubang",
    name: "Daun berlubang atau rusak gigitan",
    category: "umum",
    hint: "Terdapat sobekan atau lubang acak pada daun."
  }
];

export const diseases: DiseaseSeed[] = [
  {
    id: "antraknosa",
    name: "Patek / Antraknosa",
    description:
      "Jamur menyerang buah cabai dan memicu bercak cekung gelap yang cepat meluas pada musim lembap.",
    symptoms: [
      { symptomId: "buah-bercak-hitam", weight: 5 },
      { symptomId: "buah-busuk-basah", weight: 4 },
      { symptomId: "bunga-rontok", weight: 2 },
      { symptomId: "bercak-coklat-daun", weight: 1 }
    ],
    treatments: {
      alami: [
        "Pisahkan dan buang buah yang sudah parah agar penyebaran tidak meluas.",
        "Semprot ekstrak bawang putih atau serai pada sore hari sebagai langkah bantu."
      ],
      pencegahan: [
        "Perbaiki sirkulasi udara dan hindari percikan air langsung ke buah.",
        "Gunakan mulsa dan panen buah matang tepat waktu."
      ],
      organik: [
        "Tambahkan kompos matang untuk menjaga kondisi tanah tetap seimbang.",
        "Gunakan pupuk kandang matang secukupnya agar tanaman tidak stres."
      ],
      kimia: [
        "Jika serangan meluas, gunakan fungisida sesuai label dan rotasi bahan aktif.",
        "Semprot hanya pada area terdampak dan gunakan alat pelindung."
      ]
    }
  },
  {
    id: "layu-fusarium",
    name: "Layu Fusarium",
    description:
      "Jamur tanah mengganggu pembuluh tanaman, membuat daun menguning dan tanaman layu bertahap.",
    symptoms: [
      { symptomId: "batang-layu", weight: 5 },
      { symptomId: "daun-menguning", weight: 4 },
      { symptomId: "akar-coklat", weight: 3 },
      { symptomId: "pangkal-busuk", weight: 2 },
      { symptomId: "tanaman-kerdil", weight: 1 }
    ],
    treatments: {
      alami: [
        "Cabut tanaman yang sudah mati untuk menekan sumber infeksi di bedengan.",
        "Atur penyiraman agar tanah tidak terus jenuh air."
      ],
      pencegahan: [
        "Gunakan bibit sehat dan lakukan rotasi lahan bila memungkinkan.",
        "Perbaiki drainase supaya akar tidak terendam terlalu lama."
      ],
      organik: [
        "Tambahkan bahan organik matang untuk membantu struktur tanah.",
        "Gunakan agen hayati atau kompos aktif bila tersedia."
      ],
      kimia: [
        "Gunakan fungisida tanah hanya sebagai opsi terakhir dan ikuti dosis label.",
        "Fokuskan aplikasi pada titik serangan, bukan seluruh lahan secara berlebihan."
      ]
    }
  },
  {
    id: "keriting-trips",
    name: "Keriting Daun akibat Trips",
    description:
      "Serangan trips membuat daun keriting, bunga rontok, dan pertumbuhan tanaman terganggu.",
    symptoms: [
      { symptomId: "daun-keriting", weight: 5 },
      { symptomId: "kutu-halus", weight: 4 },
      { symptomId: "bunga-rontok", weight: 2 },
      { symptomId: "tanaman-kerdil", weight: 2 },
      { symptomId: "daun-menguning", weight: 1 }
    ],
    treatments: {
      alami: [
        "Pasang perangkap warna dan buang daun yang rusak berat.",
        "Semprot air bertekanan ringan di bawah daun pada pagi hari."
      ],
      pencegahan: [
        "Bersihkan gulma sekitar lahan yang bisa menjadi tempat hama berkembang.",
        "Pantau bagian bawah daun secara rutin sejak fase vegetatif."
      ],
      organik: [
        "Gunakan pupuk organik cair ringan untuk menjaga pemulihan tanaman.",
        "Tambah kompos matang agar tanaman tetap kuat menghadapi stres."
      ],
      kimia: [
        "Bila populasi meningkat tajam, gunakan insektisida selektif sesuai label.",
        "Rotasi bahan aktif untuk membantu menekan risiko resistensi."
      ]
    }
  },
  {
    id: "busuk-pangkal-batang",
    name: "Busuk Pangkal Batang",
    description:
      "Kondisi lembap berkepanjangan dapat memicu busuk pada pangkal batang dan akar hingga tanaman roboh.",
    symptoms: [
      { symptomId: "pangkal-busuk", weight: 5 },
      { symptomId: "batang-layu", weight: 4 },
      { symptomId: "akar-coklat", weight: 3 },
      { symptomId: "buah-busuk-basah", weight: 2 }
    ],
    treatments: {
      alami: [
        "Kurangi genangan dan singkirkan bagian tanaman yang membusuk.",
        "Tinggikan bedengan agar area pangkal batang lebih cepat kering."
      ],
      pencegahan: [
        "Jaga jarak tanam dan sirkulasi udara agar kelembapan tidak terlalu tinggi.",
        "Hindari penyiraman berlebih pada sore atau malam hari."
      ],
      organik: [
        "Gunakan pupuk organik matang dalam jumlah seimbang agar tanah tetap gembur.",
        "Campurkan bahan organik yang membantu drainase tetap baik."
      ],
      kimia: [
        "Jika perlu, gunakan fungisida yang sesuai untuk penyakit busuk pangkal batang.",
        "Lakukan aplikasi terbatas dan ikuti masa tunggu panen."
      ]
    }
  }
];
