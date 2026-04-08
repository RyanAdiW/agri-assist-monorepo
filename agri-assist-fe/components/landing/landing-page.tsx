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

export function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-field">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-soil-100/35 to-transparent" />
      <div className="absolute right-[-120px] top-8 h-64 w-64 rounded-full bg-leaf-100/45 blur-3xl" />
      <div className="absolute left-[-90px] top-40 h-56 w-56 rounded-full bg-soil-100/45 blur-3xl" />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-14 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <header className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
              {appCopy.brand}
            </p>
            <p className="text-sm text-muted-foreground">{appCopy.cropLabel}</p>
          </div>
          <p className="text-sm text-muted-foreground">Pendamping keputusan berbasis gejala</p>
        </header>

        <section className="relative z-10 flex min-h-[58vh] items-center py-4 sm:py-8">
          <div className="max-w-3xl space-y-8">
            <div className="space-y-5">
              <h1 className="max-w-2xl text-4xl leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
                {appCopy.heroTitle}
              </h1>
              <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                {appCopy.heroSubtitle}
              </p>
            </div>
            <div className="pt-1">
              <Button asChild size="lg" className="min-w-[220px]">
                <Link href="/diagnosis">{appCopy.heroCta}</Link>
              </Button>
            </div>
            <p className="max-w-lg text-sm leading-7 text-muted-foreground">
              Dirancang agar mudah dipakai di lapangan, dengan alur singkat dan hasil
              yang tetap rapi saat dibaca di layar ponsel.
            </p>
          </div>
        </section>

        <section className="grid gap-4 border-y border-border/70 py-8 sm:grid-cols-3">
          {landingStats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-3xl font-semibold text-leaf-700">{stat.value}</p>
              <p className="max-w-[18rem] text-sm leading-7 text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Card className="border-white/60 bg-white/80 shadow-none">
            <CardHeader className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-chili-700">
                Nilai utama
              </p>
              <CardTitle className="text-2xl">Dibuat supaya terasa jelas, bukan rumit.</CardTitle>
              <CardDescription className="max-w-md text-sm leading-7">
                Fokus utama aplikasi tetap sama: membantu petani cabai memilih gejala,
                memahami kemungkinan diagnosis, dan mengambil tindakan awal dengan
                lebih tenang.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3">
            {appCopy.trustPoints.map((point) => (
              <Card key={point} className="border-white/60 bg-white/72 shadow-none">
                <CardContent className="p-5">
                  <p className="text-sm font-medium leading-7 text-foreground">{point}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="alur"
          className="rounded-[32px] border border-border/80 bg-white/88 p-6 shadow-soil sm:p-8"
        >
          <div className="mb-8 max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-chili-700">
              Alur penggunaan
            </p>
            <h2 className="text-3xl">{appCopy.trustTitle}</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Alurnya tetap singkat agar petani bisa bergerak dari pengamatan ke
              tindakan tanpa harus membaca layar yang terlalu padat.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {appCopy.steps.map((step, index) => (
              <div
                key={step}
                className="rounded-[28px] border border-border/60 bg-soil-50/80 p-5"
              >
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-leaf-700">
                  Langkah {index + 1}
                </p>
                <p className="text-sm leading-7 text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
