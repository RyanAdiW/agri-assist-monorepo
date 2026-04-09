# Agri-Assist Backend

Backend API untuk diagnosis tanaman cabai berbasis gejala. Implementasi ini sudah menyediakan:

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
- `internal/platform/postgres` untuk koneksi, migrasi, dan seed PostgreSQL via GORM

Diagnosis catalog dan feedback sekarang disimpan di PostgreSQL menggunakan GORM. Saat startup, backend akan menjalankan auto-migration lalu melakukan seed dataset cabai jika database masih kosong.

## Requirement

Gunakan Go `1.22` atau lebih baru dan PostgreSQL yang bisa diakses dari backend.

## Environment

Salin `.env.example` lalu sesuaikan koneksi PostgreSQL. Backend mendukung dua cara konfigurasi:

- `DATABASE_URL`
- atau kombinasi `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSLMODE`, `DB_TIMEZONE`

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

Contoh menjalankan PostgreSQL lokal dengan Docker:

```bash
docker run --name agri-assist-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=agri_assist \
  -p 5432:5432 \
  -d postgres:16
```

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
