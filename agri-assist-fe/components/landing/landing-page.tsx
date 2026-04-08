import Link from "next/link";

import { appCopy, landingStats } from "@/lib/copy";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const valueCards = [
  {
    title: "Checklist gejala mudah dipahami",
    description:
      "Petani cukup memilih gejala yang benar-benar terlihat tanpa harus menebak istilah yang rumit."
  },
  {
    title: "Mobile-first dengan tombol besar",
    description:
      "Dirancang nyaman dipakai di layar ponsel saat berada di kebun, rumah, atau saat berdiskusi di lapangan."
  },
  {
    title: "Rekomendasi dibagi dalam 4 pilar tindakan",
    description:
      "Setiap hasil diagnosis disusun agar langkah alami, pencegahan, organik, dan kimia mudah dibaca."
  }
];

const usageSteps = [
  {
    number: "01",
    title: "Pilih gejala",
    description: appCopy.steps[0]
  },
  {
    number: "02",
    title: "Lihat kemungkinan diagnosis",
    description: appCopy.steps[1]
  },
  {
    number: "03",
    title: "Tentukan tindakan awal",
    description: appCopy.steps[2]
  }
];

function SproutIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20V10" />
      <path d="M12 12C8.5 12 6 9.5 6 6c3.5 0 6 2.5 6 6Z" />
      <path d="M12 14c0-3.3 2.4-5.7 6-6-.1 3.6-2.6 6-6 6Z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h2" />
      <path d="M9 20V14" />
      <path d="M14 20V10" />
      <path d="M19 20V6" />
    </svg>
  );
}

const statIcons = [SproutIcon, LayersIcon, SignalIcon];

export function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-field">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-soil-100/35 to-transparent" />
      <div className="absolute right-[-120px] top-12 h-72 w-72 rounded-full bg-leaf-100/35 blur-3xl" />
      <div className="absolute left-[-120px] top-44 h-64 w-64 rounded-full bg-soil-100/35 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-18 px-4 py-6 sm:px-6 sm:py-8 lg:gap-24 lg:px-8 lg:py-10">
        <header className="relative z-10 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
              {appCopy.brand}
            </p>
            <p className="text-sm text-muted-foreground">{appCopy.cropLabel}</p>
          </div>
          <p className="max-w-[14rem] text-right text-sm leading-6 text-muted-foreground/90">
            Pendamping keputusan berbasis gejala untuk petani cabai
          </p>
        </header>

        <section className="relative z-10 grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14">
          <div className="max-w-3xl space-y-9">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-chili-700">
                Diagnosis tanaman cabai yang lebih jelas
              </p>
              <h1 className="max-w-[14ch] text-4xl leading-[1.02] text-balance sm:text-5xl lg:text-[4rem]">
                {appCopy.heroTitle}
              </h1>
              <p className="max-w-[36rem] text-base leading-8 text-muted-foreground sm:text-lg">
                {appCopy.heroSubtitle}
              </p>
            </div>

            <div className="pt-2">
              <Button asChild size="lg" className="min-w-[220px]">
                <Link href="/diagnosis">{appCopy.heroCta}</Link>
              </Button>
            </div>

            <p className="max-w-[34rem] text-sm leading-7 text-muted-foreground">
              Dirancang untuk membantu petani bergerak dari pengamatan gejala ke
              tindakan awal yang lebih terarah, tanpa tampilan yang membingungkan.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 translate-x-3 translate-y-4 rounded-[32px] bg-leaf-100/45" />
            <Card className="relative overflow-hidden border-white/80 bg-white/94 shadow-soil">
              <CardHeader className="space-y-3 border-b border-border/60 pb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf-700">
                  Contoh tampilan diagnosis
                </p>
                <CardTitle className="text-2xl">Ringkas, tenang, dan mudah dibaca</CardTitle>
                <CardDescription className="max-w-sm leading-7">
                  Pengguna cukup memilih gejala, lalu sistem menampilkan beberapa
                  kemungkinan diagnosis dan langkah tindak lanjut yang praktis.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4 pt-6">
                <div className="rounded-[24px] bg-soil-50/90 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Gejala terpilih
                  </p>
                  <div className="mt-3 grid gap-2">
                    {[
                      "Daun menguning tidak merata",
                      "Buah memiliki bercak hitam cekung",
                      "Batang dan pucuk tampak layu"
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-white px-3 py-2.5 text-sm text-foreground shadow-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-border/70 bg-white p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Kemungkinan utama
                      </p>
                      <p className="mt-2 text-lg font-semibold text-foreground">
                        Patek / Antraknosa
                      </p>
                    </div>
                    <div className="rounded-full bg-leaf-50 px-3 py-1 text-sm font-semibold text-leaf-700">
                      82%
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    {[
                      "Penanganan alami",
                      "Langkah pencegahan",
                      "Pupuk organik",
                      "Obat kimia"
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-muted px-3 py-2.5 text-muted-foreground"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {landingStats.map((stat, index) => {
            const Icon = statIcons[index];

            return (
              <Card
                key={stat.label}
                className="border-white/70 bg-white/78 shadow-none backdrop-blur-sm"
              >
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-soil-50 text-leaf-700">
                    <Icon />
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-semibold leading-none text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="space-y-7">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-chili-700">
              Nilai utama
            </p>
            <h2 className="text-3xl">Dibuat agar mudah dipakai, bukan terasa rumit.</h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              Struktur informasi tetap sederhana supaya petani bisa fokus pada gejala,
              kemungkinan diagnosis, dan langkah yang perlu diambil.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {valueCards.map((item) => (
              <Card
                key={item.title}
                className="border-white/70 bg-white/82 shadow-none backdrop-blur-sm"
              >
                <CardHeader className="space-y-4 pb-4">
                  <div className="h-1.5 w-12 rounded-full bg-leaf-700/80" />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="alur"
          className="relative overflow-hidden rounded-[32px] border border-border/80 bg-white/88 p-6 shadow-soil sm:p-8"
        >
          <div className="mb-8 max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-chili-700">
              Alur penggunaan
            </p>
            <h2 className="text-3xl">{appCopy.trustTitle}</h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              Alurnya dibuat bertahap agar pengguna bisa membaca proses dari awal sampai
              tindakan tanpa merasa sedang melihat dashboard yang rumit.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[52px] top-10 hidden h-px w-[calc(100%-104px)] bg-border/80 md:block" />

            <div className="grid gap-4 md:grid-cols-3">
              {usageSteps.map((step) => (
                <Card
                  key={step.number}
                  className="relative border-white/70 bg-soil-50/82 shadow-none"
                >
                  <CardHeader className="space-y-4 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-700 text-sm font-semibold tracking-[0.08em] text-white">
                        {step.number}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-4">
          <Card className="overflow-hidden border-leaf-100 bg-leaf-700 text-white shadow-leaf">
            <CardContent className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  Mulai sekarang
                </p>
                <h2 className="max-w-[16ch] text-3xl leading-tight text-white">
                  Siap memeriksa gejala tanaman cabai Anda?
                </h2>
                <p className="text-sm leading-7 text-white/80 sm:text-base">
                  Mulai dari gejala yang terlihat, lalu lihat kemungkinan diagnosis dan
                  rekomendasi tindakan yang paling relevan.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-white text-leaf-700 hover:bg-leaf-50 lg:min-w-[220px]"
              >
                <Link href="/diagnosis">{appCopy.heroCta}</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
