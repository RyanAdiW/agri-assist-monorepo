package seed

import "agri-assist-be/internal/diagnosis/domain"

type Dataset struct {
	Crop     domain.Crop
	Symptoms []domain.Symptom
	Diseases []domain.Disease
}

// CabaiDataset is derived from the PDF source
// "Hama dan Penyakit pada Tanaman Cabai Serta Pengendaliannya" (BPTP Jambi, 2014).
// Symptom weights are inferred from the hallmark symptoms emphasized in the document.
func CabaiDataset() Dataset {
	crop := domain.Crop{
		ID:   "cabai",
		Name: "Cabai",
	}

	symptoms := []domain.Symptom{
		{ID: "daun-menguning", Name: "Daun menguning mulai dari bagian bawah", Category: domain.SymptomCategoryLeaf, Hint: "Warna daun berubah pucat lalu menguning dan menjalar ke atas."},
		{ID: "daun-keriting", Name: "Daun mengeriting atau menggulung", Category: domain.SymptomCategoryLeaf, Hint: "Daun tampak keriput, mengeriting, atau menggulung."},
		{ID: "bercak-coklat-daun", Name: "Daun memiliki bercak bulat coklat", Category: domain.SymptomCategoryLeaf, Hint: "Bercak coklat tampak jelas pada daun dan dapat meluas."},
		{ID: "batang-layu", Name: "Tanaman tampak layu bertahap", Category: domain.SymptomCategoryStem, Hint: "Daun, batang, atau pucuk terlihat turun dan lemas."},
		{ID: "titik-hitam-pangkal-buah", Name: "Ada titik hitam pada pangkal buah", Category: domain.SymptomCategoryFruit, Hint: "Pada pangkal buah terlihat titik hitam bekas tusukan."},
		{ID: "buah-bercak-hitam", Name: "Buah bercak cekung hitam atau coklat", Category: domain.SymptomCategoryFruit, Hint: "Bercak cekung gelap muncul pada kulit buah."},
		{ID: "buah-busuk-basah", Name: "Buah membusuk dan mudah jatuh", Category: domain.SymptomCategoryFruit, Hint: "Buah cepat busuk, lunak, lalu jatuh ke tanah."},
		{ID: "bunga-rontok", Name: "Tunas atau bunga mudah gugur", Category: domain.SymptomCategoryFruit, Hint: "Bunga atau tunas muda mudah rontok sebelum berkembang."},
		{ID: "akar-coklat", Name: "Akar atau pangkal batang berwarna coklat", Category: domain.SymptomCategoryRoot, Hint: "Jaringan akar atau batang bawah tampak kecoklatan."},
		{ID: "tanaman-kerdil", Name: "Pertumbuhan tanaman terhambat atau kerdil", Category: domain.SymptomCategoryCommon, Hint: "Tanaman tumbuh lambat dan ukuran keseluruhan mengecil."},
		{ID: "kutu-halus", Name: "Ada koloni kutu di bawah daun", Category: domain.SymptomCategoryCommon, Hint: "Serangga kecil tampak bergerombol pada permukaan bawah daun."},
		{ID: "daun-bercak-keperakan", Name: "Daun tampak berbercak keperakan", Category: domain.SymptomCategoryLeaf, Hint: "Permukaan daun terlihat keperakan terutama pada daun muda."},
		{ID: "pucuk-benjol-menggulung", Name: "Pucuk menggulung dengan benjolan", Category: domain.SymptomCategoryCommon, Hint: "Pucuk menggulung ke dalam dan tampak benjol seperti tumor."},
		{ID: "embun-jelaga-hitam", Name: "Daun atau buah tertutup jelaga hitam", Category: domain.SymptomCategoryCommon, Hint: "Permukaan tanaman tampak hitam karena embun jelaga."},
		{ID: "daun-keriput-kekuningan", Name: "Daun keriput dengan warna kekuningan", Category: domain.SymptomCategoryLeaf, Hint: "Daun berkerut, kekuningan, dan tampak tidak sehat."},
		{ID: "embun-madu", Name: "Ada embun madu lengket pada tanaman", Category: domain.SymptomCategoryCommon, Hint: "Permukaan tanaman terasa lengket karena cairan manis hama."},
		{ID: "daun-menebal-kecokelatan", Name: "Daun menebal dan berwarna kecokelatan", Category: domain.SymptomCategoryLeaf, Hint: "Daun menebal, terasa kaku, dan berubah warna tembaga atau coklat."},
		{ID: "daun-kaku-melengkung-bawah", Name: "Daun kaku dan melengkung ke bawah", Category: domain.SymptomCategoryLeaf, Hint: "Daun menyusut, kaku, lalu melengkung ke bawah."},
		{ID: "hifa-putih-kapas", Name: "Luka tertutup hifa putih seperti kapas", Category: domain.SymptomCategoryStem, Hint: "Pada bagian terinfeksi tampak hifa putih menyerupai kapas."},
		{ID: "layu-daun-tetap-hijau", Name: "Tanaman layu mendadak tetapi daun tetap hijau", Category: domain.SymptomCategoryCommon, Hint: "Seluruh tanaman layu permanen namun warna daun masih hijau."},
		{ID: "cairan-keruh-batang", Name: "Batang mengeluarkan cairan keruh saat dipotong", Category: domain.SymptomCategoryStem, Hint: "Bila batang dicelupkan ke air, keluar lendir keruh seperti asap."},
		{ID: "buah-kuning-pucat-layu", Name: "Buah menjadi kuning pucat dan layu", Category: domain.SymptomCategoryFruit, Hint: "Buah berubah pucat, layu, dan kualitasnya menurun."},
		{ID: "buah-keriput-mengering", Name: "Buah keriput dan mengering seperti jerami", Category: domain.SymptomCategoryFruit, Hint: "Buah menghitam, keriput, lalu mengering."},
		{ID: "vein-clearing-daun-pucuk", Name: "Daun pucuk mengalami vein clearing", Category: domain.SymptomCategoryLeaf, Hint: "Daun pucuk menampakkan tulang daun yang tampak jernih."},
		{ID: "daun-kuning-menggulung-atas", Name: "Daun menguning dan menggulung ke atas", Category: domain.SymptomCategoryLeaf, Hint: "Daun menguning jelas dengan tulang daun menebal dan tepi menggulung ke atas."},
		{ID: "daun-mengecil-kuning-terang", Name: "Daun mengecil dan kuning terang", Category: domain.SymptomCategoryLeaf, Hint: "Daun menjadi kecil, sempit, dan kuning terang."},
		{ID: "tidak-berbuah", Name: "Tanaman tidak berbuah atau buah kecil mudah gugur", Category: domain.SymptomCategoryFruit, Hint: "Pembentukan buah terganggu atau buah kecil cepat gugur."},
		{ID: "pusat-bercak-pucat-berlubang", Name: "Pusat bercak pucat dan daun berlubang", Category: domain.SymptomCategoryLeaf, Hint: "Bagian tengah bercak memucat hingga daun terlihat berlubang."},
		{ID: "daun-layu-rontok", Name: "Daun layu lalu rontok", Category: domain.SymptomCategoryLeaf, Hint: "Daun yang terserang cepat layu dan akhirnya rontok."},
	}

	diseases := []domain.Disease{
		{
			ID:          "thrips",
			CropID:      crop.ID,
			Kind:        domain.DiagnosisKindPest,
			Name:        "Thrips",
			Description: "Hama penghisap permukaan bawah daun muda yang menimbulkan bercak keperakan, pucuk menggulung, dan tanaman kerdil serta dapat menjadi vektor virus.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "daun-bercak-keperakan", Weight: 5},
				{SymptomID: "daun-keriting", Weight: 4},
				{SymptomID: "pucuk-benjol-menggulung", Weight: 5},
				{SymptomID: "daun-menebal-kecokelatan", Weight: 3},
				{SymptomID: "tanaman-kerdil", Weight: 2},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Lakukan sanitasi lingkungan dan potong bagian tanaman yang terserang thrips."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Gunakan tanaman perangkap seperti kenikir kuning dan pasang mulsa perak."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Pasang perangkap warna kuning sejak tanaman berumur 2 minggu."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Manfaatkan musuh alami seperti kumbang Coccinellidae, larva Chrysopidae, kepik Anthocoridae, tungau predator, dan Entomophthora sp."},
				{Category: domain.TreatmentCategoryChemical, Content: "Gunakan pestisida hanya bila serangan mencapai ambang pengendalian atau cara lain tidak lagi efektif."},
			},
		},
		{
			ID:          "lalat-buah",
			CropID:      crop.ID,
			Kind:        domain.DiagnosisKindPest,
			Name:        "Lalat Buah",
			Description: "Hama buah yang meletakkan telur pada buah cabai sehingga buah menjadi pucat, busuk, dan mudah jatuh terutama pada musim hujan.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "titik-hitam-pangkal-buah", Weight: 5},
				{SymptomID: "buah-kuning-pucat-layu", Weight: 4},
				{SymptomID: "buah-busuk-basah", Weight: 5},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Musnahkan buah yang terserang dan bungkus buah sehat untuk mencegah oviposisi."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Gunakan perangkap atraktan metil eugenol atau petrogenol sejak tanaman berumur 2 minggu hingga akhir panen."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Lakukan rotasi tanaman untuk menekan sumber serangan."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Manfaatkan musuh alami seperti parasitoid Biosteres sp. dan Opius sp., semut, laba-laba, kumbang Staphylinidae, dan Dermaptera."},
				{Category: domain.TreatmentCategoryChemical, Content: "Gunakan pestisida yang efektif dan terdaftar bila cara lain belum mampu menekan populasi."},
			},
		},
		{
			ID:          "kutu-kebul",
			CropID:      crop.ID,
			Kind:        domain.DiagnosisKindPest,
			Name:        "Kutu Kebul",
			Description: "Hama pengisap daun yang menimbulkan bercak nekrotik, embun jelaga, hambatan pertumbuhan, dan berperan penting sebagai vektor berbagai virus.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "bercak-coklat-daun", Weight: 3},
				{SymptomID: "embun-jelaga-hitam", Weight: 4},
				{SymptomID: "tanaman-kerdil", Weight: 3},
				{SymptomID: "kutu-halus", Weight: 4},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Lakukan sanitasi lingkungan untuk mengurangi sumber serangan."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Gunakan perangkap kuning, tumpangsari cabai dengan Tagetes, dan tanam jagung di sekeliling lahan sebagai tanaman perangkap."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Lakukan rotasi dengan tanaman bukan inang untuk memutus siklus populasi."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Manfaatkan predator, parasitoid, dan patogen serangga yang efektif terhadap Bemisia tabaci."},
				{Category: domain.TreatmentCategoryChemical, Content: "Gunakan insektisida selektif sebagai alternatif terakhir bila pengendalian lain tidak memadai."},
			},
		},
		{
			ID:          "kutu-daun-persik",
			CropID:      crop.ID,
			Kind:        domain.DiagnosisKindPest,
			Name:        "Kutu Daun Persik",
			Description: "Kutu daun yang mengisap jaringan muda, menyebabkan daun berbercak, keriting, keriput, kekuningan, dan tanaman kerdil serta menjadi vektor banyak virus.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "kutu-halus", Weight: 5},
				{SymptomID: "daun-keriting", Weight: 4},
				{SymptomID: "daun-keriput-kekuningan", Weight: 4},
				{SymptomID: "tanaman-kerdil", Weight: 3},
				{SymptomID: "daun-menguning", Weight: 2},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Pantau tanaman muda secara rutin terutama pada musim kemarau ketika populasi meningkat."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Manfaatkan parasitoid Diaretiella rapae serta predator seperti kumbang macan, laba-laba, larva syrphid, dan belalang sembah."},
				{Category: domain.TreatmentCategoryChemical, Content: "Gunakan insektisida bila populasi melebihi ambang kendali, terutama pada tanaman muda atau menjelang panen."},
			},
		},
		{
			ID:          "kutu-daun",
			CropID:      crop.ID,
			Kind:        domain.DiagnosisKindPest,
			Name:        "Kutu Daun",
			Description: "Aphididae menyerang pucuk dan daun muda, menyebabkan daun mengkerut, tanaman kerdil, embun madu, dan sering diikuti jelaga hitam serta penularan virus.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "kutu-halus", Weight: 4},
				{SymptomID: "daun-keriting", Weight: 4},
				{SymptomID: "embun-madu", Weight: 5},
				{SymptomID: "embun-jelaga-hitam", Weight: 3},
				{SymptomID: "tanaman-kerdil", Weight: 2},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Pantau pucuk tanaman pada musim kemarau karena serangan berat biasanya terjadi pada kondisi kering."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Infestasikan musuh alami seperti parasitoid Aphelinus gossypii dan Lysiphlebus testaceipes, predator Coccinella transversalis, atau cendawan Neozygites fresenii."},
			},
		},
		{
			ID:          "tungau",
			CropID:      crop.ID,
			Kind:        domain.DiagnosisKindPest,
			Name:        "Tungau",
			Description: "Tungau menyerang daun muda dengan mengisap cairan tanaman hingga daun menebal, kaku, melengkung ke bawah, bunga gugur, dan gejala memberat saat musim kemarau.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "daun-menebal-kecokelatan", Weight: 5},
				{SymptomID: "daun-kaku-melengkung-bawah", Weight: 4},
				{SymptomID: "daun-keriting", Weight: 3},
				{SymptomID: "bunga-rontok", Weight: 3},
				{SymptomID: "tanaman-kerdil", Weight: 1},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Lakukan sanitasi dengan mengeradikasi bagian tanaman yang terserang lalu memusnahkannya."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Manfaatkan predator Amblyseius cucumeris sebagai musuh alami."},
				{Category: domain.TreatmentCategoryChemical, Content: "Gunakan akarisida yang efektif dan terdaftar bila gejala kerusakan daun dan populasi tungau terus meningkat."},
			},
		},
		{
			ID:          "layu-fusarium",
			CropID:      crop.ID,
			Kind:        domain.DiagnosisKindDisease,
			Name:        "Layu Fusarium",
			Description: "Penyakit cendawan yang menyebabkan kelayuan bertahap dari daun bawah, perubahan warna jaringan akar dan batang menjadi coklat, serta munculnya hifa putih seperti kapas.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "batang-layu", Weight: 5},
				{SymptomID: "daun-menguning", Weight: 4},
				{SymptomID: "akar-coklat", Weight: 4},
				{SymptomID: "hifa-putih-kapas", Weight: 4},
				{SymptomID: "tidak-berbuah", Weight: 1},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Cabut dan musnahkan tanaman yang sudah terserang untuk mencegah sumber inokulum bertahan di lahan."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Gunakan agen antagonis Trichoderma spp. dan Gliocladium spp. bersama pemupukan dasar."},
				{Category: domain.TreatmentCategoryChemical, Content: "Gunakan fungisida sesuai anjuran hanya sebagai alternatif terakhir."},
			},
		},
		{
			ID:          "layu-bakteri-ralstonia",
			CropID:      crop.ID,
			Kind:        domain.DiagnosisKindDisease,
			Name:        "Layu Bakteri Ralstonia",
			Description: "Penyakit bakteri yang menimbulkan layu mendadak, warna daun tetap hijau, jaringan vaskuler kecoklatan, dan keluarnya cairan keruh dari batang saat diuji di air.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "layu-daun-tetap-hijau", Weight: 5},
				{SymptomID: "cairan-keruh-batang", Weight: 5},
				{SymptomID: "batang-layu", Weight: 4},
				{SymptomID: "akar-coklat", Weight: 4},
				{SymptomID: "buah-kuning-pucat-layu", Weight: 2},
				{SymptomID: "buah-busuk-basah", Weight: 1},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryPrevention, Content: "Lakukan pergiliran tanaman, gunakan benih sehat, dan cabut serta musnahkan tanaman sakit."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Gunakan agen antagonis Trichoderma spp. dan Gliocladium spp. bersamaan dengan pemupukan dasar."},
				{Category: domain.TreatmentCategoryChemical, Content: "Gunakan bakterisida sesuai anjuran hanya sebagai alternatif terakhir."},
			},
		},
		{
			ID:          "antraknosa",
			CropID:      crop.ID,
			Kind:        domain.DiagnosisKindDisease,
			Name:        "Busuk Buah Antraknosa",
			Description: "Penyakit buah yang ditandai bercak cekung gelap pada buah, pembusukan cepat saat lembap, dan pada serangan berat buah menjadi keriput kering seperti jerami.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "buah-bercak-hitam", Weight: 5},
				{SymptomID: "buah-busuk-basah", Weight: 4},
				{SymptomID: "buah-keriput-mengering", Weight: 3},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Bersihkan lahan dan singkirkan tanaman atau buah yang terserang agar penyakit tidak menyebar."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Lakukan seleksi benih atau gunakan benih yang sehat karena patogen ini dapat terbawa benih."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Lakukan pergiliran tanaman serta potong dan musnahkan buah yang sakit."},
				{Category: domain.TreatmentCategoryChemical, Content: "Gunakan fungisida sesuai anjuran sebagai alternatif terakhir dan pastikan alat semprot bersih."},
			},
		},
		{
			ID:          "virus-kuning",
			CropID:      crop.ID,
			Kind:        domain.DiagnosisKindDisease,
			Name:        "Virus Kuning",
			Description: "Penyakit virus yang memicu vein clearing pada daun pucuk, daun menguning dan menggulung ke atas, tanaman kerdil, serta kegagalan pembentukan buah.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "vein-clearing-daun-pucuk", Weight: 5},
				{SymptomID: "daun-kuning-menggulung-atas", Weight: 5},
				{SymptomID: "daun-mengecil-kuning-terang", Weight: 4},
				{SymptomID: "tanaman-kerdil", Weight: 3},
				{SymptomID: "tidak-berbuah", Weight: 4},
				{SymptomID: "kutu-halus", Weight: 1},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryOrganic, Content: "Kendalikan vektor kutu kebul dengan predator seperti Menochilus sexmaculatus atau jamur Beauveria bassiana dan Verticillium lecanii."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Gunakan varietas tahan seperti hotchilli dan bersihkan tanaman inang di sekitar lahan."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Tambahkan pemupukan untuk meningkatkan daya tahan tanaman, gunakan mulsa plastik, lakukan perlakuan benih, dan tanam pembatas seperti jagung atau Tagetes."},
			},
		},
		{
			ID:          "bercak-daun-cercospora",
			CropID:      crop.ID,
			Kind:        domain.DiagnosisKindDisease,
			Name:        "Bercak Daun Cercospora",
			Description: "Penyakit daun yang menyebabkan bercak bulat coklat, pusat bercak memucat hingga berlubang, diikuti kelayuan dan kerontokan daun terutama pada kondisi lembap.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "bercak-coklat-daun", Weight: 5},
				{SymptomID: "pusat-bercak-pucat-berlubang", Weight: 4},
				{SymptomID: "daun-layu-rontok", Weight: 4},
				{SymptomID: "daun-menguning", Weight: 1},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Musnahkan sisa tanaman yang terinfeksi untuk menurunkan sumber patogen."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Gunakan bibit bebas patogen, lakukan perlakuan benih, perbaiki drainase, dan tanam pada musim kemarau dengan irigasi yang baik."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Lakukan pergiliran tanaman dengan tanaman non-solanaceae pada lahan yang pernah terserang."},
				{Category: domain.TreatmentCategoryChemical, Content: "Gunakan fungisida secara bijaksana, efektif, dan sesuai anjuran berdasarkan kondisi lapangan."},
			},
		},
	}

	return Dataset{
		Crop:     crop,
		Symptoms: symptoms,
		Diseases: diseases,
	}
}
