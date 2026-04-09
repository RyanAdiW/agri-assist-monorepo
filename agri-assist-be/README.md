# Agri-Assist Backend

Backend API untuk diagnosis tanaman cabai berbasis gejala. Implementasi awal ini sudah menyediakan:

- `GET /health` dan `GET /api/v1/health`
- `GET /api/v1/symptoms?cropId=cabai`
- `POST /api/v1/diagnoses`
- `POST /api/v1/feedbacks`

Arsitektur dibuat sederhana bergaya hexagonal:

- `cmd/api` untuk entrypoint
- `internal/diagnosis` untuk domain dan rule engine
- `internal/feedback` untuk penyimpanan feedback
- `internal/httpapi` untuk adapter HTTP Echo
- `internal/seed` untuk data awal cabai

Saat ini data diagnosis masih menggunakan seed in-memory agar service langsung bisa dijalankan. Struktur repository sudah dipisahkan supaya adapter PostgreSQL/Gorm bisa ditambahkan pada langkah berikutnya tanpa mengubah use case utama.

## Requirement

Gunakan Go `1.22` atau lebih baru untuk menjalankan backend ini.

## Menjalankan

```bash
go mod tidy
go run ./cmd/api
```

Atau gunakan `Makefile`:

```bash
make tidy
make test
make run
```

Server akan aktif di `http://localhost:8080` kecuali `PORT` diubah.

## Contoh Request

```bash
curl http://localhost:8080/api/v1/symptoms?cropId=cabai
```

```bash
curl -X POST http://localhost:8080/api/v1/diagnoses \
  -H "Content-Type: application/json" \
  -d "{\"cropId\":\"cabai\",\"symptomIds\":[\"buah-bercak-hitam\",\"buah-busuk-basah\",\"bunga-rontok\"]}"
```

```bash
curl -X POST http://localhost:8080/api/v1/feedbacks \
  -H "Content-Type: application/json" \
  -d "{\"diagnosisId\":\"antraknosa\",\"isHelpful\":true,\"notes\":\"Cocok di lapangan\"}"
```
