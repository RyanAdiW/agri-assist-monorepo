import { type DiseaseSeed, type Symptom } from "@/lib/types";

// Derived from the PDF source
// "Hama dan Penyakit pada Tanaman Cabai Serta Pengendaliannya" (BPTP Jambi, 2014).
// Rule weights are inferred from the hallmark symptoms described in the document.
export const symptoms: Symptom[] = [
  {
    id: "daun-menguning",
    name: "Daun menguning mulai dari bagian bawah",
    category: "daun",
    hint: "Warna daun berubah pucat lalu menguning dan menjalar ke atas."
  },
  {
    id: "daun-keriting",
    name: "Daun mengeriting atau menggulung",
    category: "daun",
    hint: "Daun tampak keriput, mengeriting, atau menggulung."
  },
  {
    id: "bercak-coklat-daun",
    name: "Daun memiliki bercak bulat coklat",
    category: "daun",
    hint: "Bercak coklat tampak jelas pada daun dan dapat meluas."
  },
  {
    id: "batang-layu",
    name: "Tanaman tampak layu bertahap",
    category: "batang",
    hint: "Daun, batang, atau pucuk terlihat turun dan lemas."
  },
  {
    id: "titik-hitam-pangkal-buah",
    name: "Ada titik hitam pada pangkal buah",
    category: "buah",
    hint: "Pada pangkal buah terlihat titik hitam bekas tusukan."
  },
  {
    id: "buah-bercak-hitam",
    name: "Buah bercak cekung hitam atau coklat",
    category: "buah",
    hint: "Bercak cekung gelap muncul pada kulit buah."
  },
  {
    id: "buah-busuk-basah",
    name: "Buah membusuk dan mudah jatuh",
    category: "buah",
    hint: "Buah cepat busuk, lunak, lalu jatuh ke tanah."
  },
  {
    id: "bunga-rontok",
    name: "Tunas atau bunga mudah gugur",
    category: "buah",
    hint: "Bunga atau tunas muda mudah rontok sebelum berkembang."
  },
  {
    id: "akar-coklat",
    name: "Akar atau pangkal batang berwarna coklat",
    category: "akar",
    hint: "Jaringan akar atau batang bawah tampak kecoklatan."
  },
  {
    id: "tanaman-kerdil",
    name: "Pertumbuhan tanaman terhambat atau kerdil",
    category: "umum",
    hint: "Tanaman tumbuh lambat dan ukuran keseluruhan mengecil."
  },
  {
    id: "kutu-halus",
    name: "Ada koloni kutu di bawah daun",
    category: "umum",
    hint: "Serangga kecil tampak bergerombol pada permukaan bawah daun."
  },
  {
    id: "daun-bercak-keperakan",
    name: "Daun tampak berbercak keperakan",
    category: "daun",
    hint: "Permukaan daun terlihat keperakan terutama pada daun muda."
  },
  {
    id: "pucuk-benjol-menggulung",
    name: "Pucuk menggulung dengan benjolan",
    category: "umum",
    hint: "Pucuk menggulung ke dalam dan tampak benjol seperti tumor."
  },
  {
    id: "embun-jelaga-hitam",
    name: "Daun atau buah tertutup jelaga hitam",
    category: "umum",
    hint: "Permukaan tanaman tampak hitam karena embun jelaga."
  },
  {
    id: "daun-keriput-kekuningan",
    name: "Daun keriput dengan warna kekuningan",
    category: "daun",
    hint: "Daun berkerut, kekuningan, dan tampak tidak sehat."
  },
  {
    id: "embun-madu",
    name: "Ada embun madu lengket pada tanaman",
    category: "umum",
    hint: "Permukaan tanaman terasa lengket karena cairan manis hama."
  },
  {
    id: "daun-menebal-kecokelatan",
    name: "Daun menebal dan berwarna kecokelatan",
    category: "daun",
    hint: "Daun menebal, terasa kaku, dan berubah warna tembaga atau coklat."
  },
  {
    id: "daun-kaku-melengkung-bawah",
    name: "Daun kaku dan melengkung ke bawah",
    category: "daun",
    hint: "Daun menyusut, kaku, lalu melengkung ke bawah."
  },
  {
    id: "hifa-putih-kapas",
    name: "Luka tertutup hifa putih seperti kapas",
    category: "batang",
    hint: "Pada bagian terinfeksi tampak hifa putih menyerupai kapas."
  },
  {
    id: "layu-daun-tetap-hijau",
    name: "Tanaman layu mendadak tetapi daun tetap hijau",
    category: "umum",
    hint: "Seluruh tanaman layu permanen namun warna daun masih hijau."
  },
  {
    id: "cairan-keruh-batang",
    name: "Batang mengeluarkan cairan keruh saat dipotong",
    category: "batang",
    hint: "Bila batang dicelupkan ke air, keluar lendir keruh seperti asap."
  },
  {
    id: "buah-kuning-pucat-layu",
    name: "Buah menjadi kuning pucat dan layu",
    category: "buah",
    hint: "Buah berubah pucat, layu, dan kualitasnya menurun."
  },
  {
    id: "buah-keriput-mengering",
    name: "Buah keriput dan mengering seperti jerami",
    category: "buah",
    hint: "Buah menghitam, keriput, lalu mengering."
  },
  {
    id: "vein-clearing-daun-pucuk",
    name: "Daun pucuk mengalami vein clearing",
    category: "daun",
    hint: "Daun pucuk menampakkan tulang daun yang tampak jernih."
  },
  {
    id: "daun-kuning-menggulung-atas",
    name: "Daun menguning dan menggulung ke atas",
    category: "daun",
    hint: "Daun menguning jelas dengan tulang daun menebal dan tepi menggulung ke atas."
  },
  {
    id: "daun-mengecil-kuning-terang",
    name: "Daun mengecil dan kuning terang",
    category: "daun",
    hint: "Daun menjadi kecil, sempit, dan kuning terang."
  },
  {
    id: "tidak-berbuah",
    name: "Tanaman tidak berbuah atau buah kecil mudah gugur",
    category: "buah",
    hint: "Pembentukan buah terganggu atau buah kecil cepat gugur."
  },
  {
    id: "pusat-bercak-pucat-berlubang",
    name: "Pusat bercak pucat dan daun berlubang",
    category: "daun",
    hint: "Bagian tengah bercak memucat hingga daun terlihat berlubang."
  },
  {
    id: "daun-layu-rontok",
    name: "Daun layu lalu rontok",
    category: "daun",
    hint: "Daun yang terserang cepat layu dan akhirnya rontok."
  }
];

export const diseases: DiseaseSeed[] = [
  {
    id: "thrips",
    kind: "hama",
    name: "Thrips",
    description:
      "Hama penghisap permukaan bawah daun muda yang menimbulkan bercak keperakan, pucuk menggulung, dan tanaman kerdil serta dapat menjadi vektor virus.",
    symptoms: [
      { symptomId: "daun-bercak-keperakan", weight: 5 },
      { symptomId: "daun-keriting", weight: 4 },
      { symptomId: "pucuk-benjol-menggulung", weight: 5 },
      { symptomId: "daun-menebal-kecokelatan", weight: 3 },
      { symptomId: "tanaman-kerdil", weight: 2 }
    ],
    treatments: {
      alami: [
        "Lakukan sanitasi lingkungan dan potong bagian tanaman yang terserang thrips."
      ],
      pencegahan: [
        "Gunakan tanaman perangkap seperti kenikir kuning dan pasang mulsa perak.",
        "Pasang perangkap warna kuning sejak tanaman berumur 2 minggu."
      ],
      organik: [
        "Manfaatkan musuh alami seperti kumbang Coccinellidae, larva Chrysopidae, kepik Anthocoridae, tungau predator, dan Entomophthora sp."
      ],
      kimia: [
        "Gunakan pestisida hanya bila serangan mencapai ambang pengendalian atau cara lain tidak lagi efektif."
      ]
    }
  },
  {
    id: "lalat-buah",
    kind: "hama",
    name: "Lalat Buah",
    description:
      "Hama buah yang meletakkan telur pada buah cabai sehingga buah menjadi pucat, busuk, dan mudah jatuh terutama pada musim hujan.",
    symptoms: [
      { symptomId: "titik-hitam-pangkal-buah", weight: 5 },
      { symptomId: "buah-kuning-pucat-layu", weight: 4 },
      { symptomId: "buah-busuk-basah", weight: 5 }
    ],
    treatments: {
      alami: [
        "Musnahkan buah yang terserang dan bungkus buah sehat untuk mencegah oviposisi."
      ],
      pencegahan: [
        "Gunakan perangkap atraktan metil eugenol atau petrogenol sejak tanaman berumur 2 minggu hingga akhir panen.",
        "Lakukan rotasi tanaman untuk menekan sumber serangan."
      ],
      organik: [
        "Manfaatkan musuh alami seperti parasitoid Biosteres sp. dan Opius sp., semut, laba-laba, kumbang Staphylinidae, dan Dermaptera."
      ],
      kimia: [
        "Gunakan pestisida yang efektif dan terdaftar bila cara lain belum mampu menekan populasi."
      ]
    }
  },
  {
    id: "kutu-kebul",
    kind: "hama",
    name: "Kutu Kebul",
    description:
      "Hama pengisap daun yang menimbulkan bercak nekrotik, embun jelaga, hambatan pertumbuhan, dan berperan penting sebagai vektor berbagai virus.",
    symptoms: [
      { symptomId: "bercak-coklat-daun", weight: 3 },
      { symptomId: "embun-jelaga-hitam", weight: 4 },
      { symptomId: "tanaman-kerdil", weight: 3 },
      { symptomId: "kutu-halus", weight: 4 }
    ],
    treatments: {
      alami: ["Lakukan sanitasi lingkungan untuk mengurangi sumber serangan."],
      pencegahan: [
        "Gunakan perangkap kuning, tumpangsari cabai dengan Tagetes, dan tanam jagung di sekeliling lahan sebagai tanaman perangkap.",
        "Lakukan rotasi dengan tanaman bukan inang untuk memutus siklus populasi."
      ],
      organik: [
        "Manfaatkan predator, parasitoid, dan patogen serangga yang efektif terhadap Bemisia tabaci."
      ],
      kimia: [
        "Gunakan insektisida selektif sebagai alternatif terakhir bila pengendalian lain tidak memadai."
      ]
    }
  },
  {
    id: "kutu-daun-persik",
    kind: "hama",
    name: "Kutu Daun Persik",
    description:
      "Kutu daun yang mengisap jaringan muda, menyebabkan daun berbercak, keriting, keriput, kekuningan, dan tanaman kerdil serta menjadi vektor banyak virus.",
    symptoms: [
      { symptomId: "kutu-halus", weight: 5 },
      { symptomId: "daun-keriting", weight: 4 },
      { symptomId: "daun-keriput-kekuningan", weight: 4 },
      { symptomId: "tanaman-kerdil", weight: 3 },
      { symptomId: "daun-menguning", weight: 2 }
    ],
    treatments: {
      alami: [
        "Pantau tanaman muda secara rutin terutama pada musim kemarau ketika populasi meningkat."
      ],
      pencegahan: [],
      organik: [
        "Manfaatkan parasitoid Diaretiella rapae serta predator seperti kumbang macan, laba-laba, larva syrphid, dan belalang sembah."
      ],
      kimia: [
        "Gunakan insektisida bila populasi melebihi ambang kendali, terutama pada tanaman muda atau menjelang panen."
      ]
    }
  },
  {
    id: "kutu-daun",
    kind: "hama",
    name: "Kutu Daun",
    description:
      "Aphididae menyerang pucuk dan daun muda, menyebabkan daun mengkerut, tanaman kerdil, embun madu, dan sering diikuti jelaga hitam serta penularan virus.",
    symptoms: [
      { symptomId: "kutu-halus", weight: 4 },
      { symptomId: "daun-keriting", weight: 4 },
      { symptomId: "embun-madu", weight: 5 },
      { symptomId: "embun-jelaga-hitam", weight: 3 },
      { symptomId: "tanaman-kerdil", weight: 2 }
    ],
    treatments: {
      alami: [
        "Pantau pucuk tanaman pada musim kemarau karena serangan berat biasanya terjadi pada kondisi kering."
      ],
      pencegahan: [],
      organik: [
        "Infestasikan musuh alami seperti parasitoid Aphelinus gossypii dan Lysiphlebus testaceipes, predator Coccinella transversalis, atau cendawan Neozygites fresenii."
      ],
      kimia: []
    }
  },
  {
    id: "tungau",
    kind: "hama",
    name: "Tungau",
    description:
      "Tungau menyerang daun muda dengan mengisap cairan tanaman hingga daun menebal, kaku, melengkung ke bawah, bunga gugur, dan gejala memberat saat musim kemarau.",
    symptoms: [
      { symptomId: "daun-menebal-kecokelatan", weight: 5 },
      { symptomId: "daun-kaku-melengkung-bawah", weight: 4 },
      { symptomId: "daun-keriting", weight: 3 },
      { symptomId: "bunga-rontok", weight: 3 },
      { symptomId: "tanaman-kerdil", weight: 1 }
    ],
    treatments: {
      alami: [
        "Lakukan sanitasi dengan mengeradikasi bagian tanaman yang terserang lalu memusnahkannya."
      ],
      pencegahan: [],
      organik: ["Manfaatkan predator Amblyseius cucumeris sebagai musuh alami."],
      kimia: [
        "Gunakan akarisida yang efektif dan terdaftar bila gejala kerusakan daun dan populasi tungau terus meningkat."
      ]
    }
  },
  {
    id: "layu-fusarium",
    kind: "penyakit",
    name: "Layu Fusarium",
    description:
      "Penyakit cendawan yang menyebabkan kelayuan bertahap dari daun bawah, perubahan warna jaringan akar dan batang menjadi coklat, serta munculnya hifa putih seperti kapas.",
    symptoms: [
      { symptomId: "batang-layu", weight: 5 },
      { symptomId: "daun-menguning", weight: 4 },
      { symptomId: "akar-coklat", weight: 4 },
      { symptomId: "hifa-putih-kapas", weight: 4 },
      { symptomId: "tidak-berbuah", weight: 1 }
    ],
    treatments: {
      alami: [
        "Cabut dan musnahkan tanaman yang sudah terserang untuk mencegah sumber inokulum bertahan di lahan."
      ],
      pencegahan: [],
      organik: [
        "Gunakan agen antagonis Trichoderma spp. dan Gliocladium spp. bersama pemupukan dasar."
      ],
      kimia: ["Gunakan fungisida sesuai anjuran hanya sebagai alternatif terakhir."]
    }
  },
  {
    id: "layu-bakteri-ralstonia",
    kind: "penyakit",
    name: "Layu Bakteri Ralstonia",
    description:
      "Penyakit bakteri yang menimbulkan layu mendadak, warna daun tetap hijau, jaringan vaskuler kecoklatan, dan keluarnya cairan keruh dari batang saat diuji di air.",
    symptoms: [
      { symptomId: "layu-daun-tetap-hijau", weight: 5 },
      { symptomId: "cairan-keruh-batang", weight: 5 },
      { symptomId: "batang-layu", weight: 4 },
      { symptomId: "akar-coklat", weight: 4 },
      { symptomId: "buah-kuning-pucat-layu", weight: 2 },
      { symptomId: "buah-busuk-basah", weight: 1 }
    ],
    treatments: {
      alami: [],
      pencegahan: [
        "Lakukan pergiliran tanaman, gunakan benih sehat, dan cabut serta musnahkan tanaman sakit."
      ],
      organik: [
        "Gunakan agen antagonis Trichoderma spp. dan Gliocladium spp. bersamaan dengan pemupukan dasar."
      ],
      kimia: ["Gunakan bakterisida sesuai anjuran hanya sebagai alternatif terakhir."]
    }
  },
  {
    id: "antraknosa",
    kind: "penyakit",
    name: "Busuk Buah Antraknosa",
    description:
      "Penyakit buah yang ditandai bercak cekung gelap pada buah, pembusukan cepat saat lembap, dan pada serangan berat buah menjadi keriput kering seperti jerami.",
    symptoms: [
      { symptomId: "buah-bercak-hitam", weight: 5 },
      { symptomId: "buah-busuk-basah", weight: 4 },
      { symptomId: "buah-keriput-mengering", weight: 3 }
    ],
    treatments: {
      alami: [
        "Bersihkan lahan dan singkirkan tanaman atau buah yang terserang agar penyakit tidak menyebar."
      ],
      pencegahan: [
        "Lakukan seleksi benih atau gunakan benih yang sehat karena patogen ini dapat terbawa benih.",
        "Lakukan pergiliran tanaman serta potong dan musnahkan buah yang sakit."
      ],
      organik: [],
      kimia: [
        "Gunakan fungisida sesuai anjuran sebagai alternatif terakhir dan pastikan alat semprot bersih."
      ]
    }
  },
  {
    id: "virus-kuning",
    kind: "penyakit",
    name: "Virus Kuning",
    description:
      "Penyakit virus yang memicu vein clearing pada daun pucuk, daun menguning dan menggulung ke atas, tanaman kerdil, serta kegagalan pembentukan buah.",
    symptoms: [
      { symptomId: "vein-clearing-daun-pucuk", weight: 5 },
      { symptomId: "daun-kuning-menggulung-atas", weight: 5 },
      { symptomId: "daun-mengecil-kuning-terang", weight: 4 },
      { symptomId: "tanaman-kerdil", weight: 3 },
      { symptomId: "tidak-berbuah", weight: 4 },
      { symptomId: "kutu-halus", weight: 1 }
    ],
    treatments: {
      alami: [],
      pencegahan: [
        "Gunakan varietas tahan seperti hotchilli dan bersihkan tanaman inang di sekitar lahan.",
        "Tambahkan pemupukan untuk meningkatkan daya tahan tanaman, gunakan mulsa plastik, lakukan perlakuan benih, dan tanam pembatas seperti jagung atau Tagetes."
      ],
      organik: [
        "Kendalikan vektor kutu kebul dengan predator seperti Menochilus sexmaculatus atau jamur Beauveria bassiana dan Verticillium lecanii."
      ],
      kimia: []
    }
  },
  {
    id: "bercak-daun-cercospora",
    kind: "penyakit",
    name: "Bercak Daun Cercospora",
    description:
      "Penyakit daun yang menyebabkan bercak bulat coklat, pusat bercak memucat hingga berlubang, diikuti kelayuan dan kerontokan daun terutama pada kondisi lembap.",
    symptoms: [
      { symptomId: "bercak-coklat-daun", weight: 5 },
      { symptomId: "pusat-bercak-pucat-berlubang", weight: 4 },
      { symptomId: "daun-layu-rontok", weight: 4 },
      { symptomId: "daun-menguning", weight: 1 }
    ],
    treatments: {
      alami: [
        "Musnahkan sisa tanaman yang terinfeksi untuk menurunkan sumber patogen."
      ],
      pencegahan: [
        "Gunakan bibit bebas patogen, lakukan perlakuan benih, perbaiki drainase, dan tanam pada musim kemarau dengan irigasi yang baik.",
        "Lakukan pergiliran tanaman dengan tanaman non-solanaceae pada lahan yang pernah terserang."
      ],
      organik: [],
      kimia: [
        "Gunakan fungisida secara bijaksana, efektif, dan sesuai anjuran berdasarkan kondisi lapangan."
      ]
    }
  }
];
