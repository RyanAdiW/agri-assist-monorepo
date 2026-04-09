package seed

import "agri-assist-be/internal/diagnosis/domain"

type Dataset struct {
	Crop     domain.Crop
	Symptoms []domain.Symptom
	Diseases []domain.Disease
}

func CabaiDataset() Dataset {
	crop := domain.Crop{
		ID:   "cabai",
		Name: "Cabai",
	}

	symptoms := []domain.Symptom{
		{ID: "daun-menguning", Name: "Daun menguning tidak merata", Category: domain.SymptomCategoryLeaf, Hint: "Warna daun berubah pucat lalu menguning."},
		{ID: "daun-keriting", Name: "Daun menggulung atau keriting", Category: domain.SymptomCategoryLeaf, Hint: "Permukaan daun tampak mengerut dan mengecil."},
		{ID: "bercak-coklat-daun", Name: "Bercak coklat pada daun", Category: domain.SymptomCategoryLeaf, Hint: "Ada bercak kecil yang meluas pada helaian daun."},
		{ID: "batang-layu", Name: "Batang dan pucuk tampak layu", Category: domain.SymptomCategoryStem, Hint: "Tanaman terlihat turun dan lemas walau tanah masih lembap."},
		{ID: "pangkal-busuk", Name: "Pangkal batang terlihat busuk", Category: domain.SymptomCategoryStem, Hint: "Area pangkal batang tampak gelap, lunak, atau berair."},
		{ID: "buah-bercak-hitam", Name: "Buah memiliki bercak hitam cekung", Category: domain.SymptomCategoryFruit, Hint: "Bercak hitam muncul pada permukaan buah dan tampak masuk ke dalam."},
		{ID: "buah-busuk-basah", Name: "Buah membusuk basah", Category: domain.SymptomCategoryFruit, Hint: "Buah menjadi lembek dan cepat rusak."},
		{ID: "bunga-rontok", Name: "Bunga atau bakal buah mudah rontok", Category: domain.SymptomCategoryFruit, Hint: "Bunga jatuh sebelum berkembang menjadi buah."},
		{ID: "akar-coklat", Name: "Akar berubah coklat dan lemah", Category: domain.SymptomCategoryRoot, Hint: "Akar tampak gelap dan tidak segar."},
		{ID: "tanaman-kerdil", Name: "Pertumbuhan tanaman kerdil", Category: domain.SymptomCategoryCommon, Hint: "Tanaman terlihat lebih kecil dan lambat berkembang."},
		{ID: "kutu-halus", Name: "Ada kutu halus di bawah daun", Category: domain.SymptomCategoryCommon, Hint: "Terlihat serangga kecil yang aktif di permukaan bawah daun."},
		{ID: "daun-berlubang", Name: "Daun berlubang atau rusak gigitan", Category: domain.SymptomCategoryCommon, Hint: "Terdapat sobekan atau lubang acak pada daun."},
	}

	diseases := []domain.Disease{
		{
			ID:          "antraknosa",
			CropID:      crop.ID,
			Name:        "Patek / Antraknosa",
			Description: "Jamur menyerang buah cabai dan memicu bercak cekung gelap yang cepat meluas pada musim lembap.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "buah-bercak-hitam", Weight: 5},
				{SymptomID: "buah-busuk-basah", Weight: 4},
				{SymptomID: "bunga-rontok", Weight: 2},
				{SymptomID: "bercak-coklat-daun", Weight: 1},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Pisahkan dan buang buah yang sudah parah agar penyebaran tidak meluas."},
				{Category: domain.TreatmentCategoryNatural, Content: "Semprot ekstrak bawang putih atau serai pada sore hari sebagai langkah bantu."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Perbaiki sirkulasi udara dan hindari percikan air langsung ke buah."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Gunakan mulsa dan panen buah matang tepat waktu."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Tambahkan kompos matang untuk menjaga kondisi tanah tetap seimbang."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Gunakan pupuk kandang matang secukupnya agar tanaman tidak stres."},
				{Category: domain.TreatmentCategoryChemical, Content: "Jika serangan meluas, gunakan fungisida sesuai label dan rotasi bahan aktif."},
				{Category: domain.TreatmentCategoryChemical, Content: "Semprot hanya pada area terdampak dan gunakan alat pelindung."},
			},
		},
		{
			ID:          "layu-fusarium",
			CropID:      crop.ID,
			Name:        "Layu Fusarium",
			Description: "Jamur tanah mengganggu pembuluh tanaman, membuat daun menguning dan tanaman layu bertahap.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "batang-layu", Weight: 5},
				{SymptomID: "daun-menguning", Weight: 4},
				{SymptomID: "akar-coklat", Weight: 3},
				{SymptomID: "pangkal-busuk", Weight: 2},
				{SymptomID: "tanaman-kerdil", Weight: 1},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Cabut tanaman yang sudah mati untuk menekan sumber infeksi di bedengan."},
				{Category: domain.TreatmentCategoryNatural, Content: "Atur penyiraman agar tanah tidak terus jenuh air."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Gunakan bibit sehat dan lakukan rotasi lahan bila memungkinkan."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Perbaiki drainase supaya akar tidak terendam terlalu lama."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Tambahkan bahan organik matang untuk membantu struktur tanah."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Gunakan agen hayati atau kompos aktif bila tersedia."},
				{Category: domain.TreatmentCategoryChemical, Content: "Gunakan fungisida tanah hanya sebagai opsi terakhir dan ikuti dosis label."},
				{Category: domain.TreatmentCategoryChemical, Content: "Fokuskan aplikasi pada titik serangan, bukan seluruh lahan secara berlebihan."},
			},
		},
		{
			ID:          "keriting-trips",
			CropID:      crop.ID,
			Name:        "Keriting Daun akibat Trips",
			Description: "Serangan trips membuat daun keriting, bunga rontok, dan pertumbuhan tanaman terganggu.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "daun-keriting", Weight: 5},
				{SymptomID: "kutu-halus", Weight: 4},
				{SymptomID: "bunga-rontok", Weight: 2},
				{SymptomID: "tanaman-kerdil", Weight: 2},
				{SymptomID: "daun-menguning", Weight: 1},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Pasang perangkap warna dan buang daun yang rusak berat."},
				{Category: domain.TreatmentCategoryNatural, Content: "Semprot air bertekanan ringan di bawah daun pada pagi hari."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Bersihkan gulma sekitar lahan yang bisa menjadi tempat hama berkembang."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Pantau bagian bawah daun secara rutin sejak fase vegetatif."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Gunakan pupuk organik cair ringan untuk menjaga pemulihan tanaman."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Tambah kompos matang agar tanaman tetap kuat menghadapi stres."},
				{Category: domain.TreatmentCategoryChemical, Content: "Bila populasi meningkat tajam, gunakan insektisida selektif sesuai label."},
				{Category: domain.TreatmentCategoryChemical, Content: "Rotasi bahan aktif untuk membantu menekan risiko resistensi."},
			},
		},
		{
			ID:          "busuk-pangkal-batang",
			CropID:      crop.ID,
			Name:        "Busuk Pangkal Batang",
			Description: "Kondisi lembap berkepanjangan dapat memicu busuk pada pangkal batang dan akar hingga tanaman roboh.",
			SymptomRules: []domain.DiseaseSymptom{
				{SymptomID: "pangkal-busuk", Weight: 5},
				{SymptomID: "batang-layu", Weight: 4},
				{SymptomID: "akar-coklat", Weight: 3},
				{SymptomID: "buah-busuk-basah", Weight: 2},
			},
			Treatments: []domain.Treatment{
				{Category: domain.TreatmentCategoryNatural, Content: "Kurangi genangan dan singkirkan bagian tanaman yang membusuk."},
				{Category: domain.TreatmentCategoryNatural, Content: "Tinggikan bedengan agar area pangkal batang lebih cepat kering."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Jaga jarak tanam dan sirkulasi udara agar kelembapan tidak terlalu tinggi."},
				{Category: domain.TreatmentCategoryPrevention, Content: "Hindari penyiraman berlebih pada sore atau malam hari."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Gunakan pupuk organik matang dalam jumlah seimbang agar tanah tetap gembur."},
				{Category: domain.TreatmentCategoryOrganic, Content: "Campurkan bahan organik yang membantu drainase tetap baik."},
				{Category: domain.TreatmentCategoryChemical, Content: "Jika perlu, gunakan fungisida yang sesuai untuk penyakit busuk pangkal batang."},
				{Category: domain.TreatmentCategoryChemical, Content: "Lakukan aplikasi terbatas dan ikuti masa tunggu panen."},
			},
		},
	}

	return Dataset{
		Crop:     crop,
		Symptoms: symptoms,
		Diseases: diseases,
	}
}
