"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { categoryLabels } from "@/lib/copy";
import { type SymptomCategory } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDiagnosis } from "@/components/providers/diagnosis-provider";
import { cn } from "@/lib/utils";

const filters: Array<"semua" | SymptomCategory> = [
  "semua",
  "daun",
  "batang",
  "buah",
  "akar",
  "umum"
];

export function DiagnosisPageClient() {
  const router = useRouter();
  const {
    symptoms,
    selectedSymptomIds,
    isReady,
    isSubmittingDiagnosis,
    toggleSymptom,
    clearSelection,
    runDiagnosis
  } = useDiagnosis();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"semua" | SymptomCategory>(
    "semua"
  );
  const [submissionError, setSubmissionError] = useState("");

  const selectedSymptoms = symptoms.filter((symptom) =>
    selectedSymptomIds.includes(symptom.id)
  );
  const filteredSymptoms = symptoms.filter((symptom) => {
    const matchesCategory =
      activeFilter === "semua" || symptom.category === activeFilter;
    const keyword = search.trim().toLowerCase();
    const matchesSearch =
      keyword.length === 0 ||
      symptom.name.toLowerCase().includes(keyword) ||
      symptom.hint.toLowerCase().includes(keyword);

    return matchesCategory && matchesSearch;
  });

  const handleSubmit = async () => {
    setSubmissionError("");

    try {
      await runDiagnosis();
      router.push("/hasil");
    } catch (error) {
      console.error(error);
      setSubmissionError(
        "Hasil belum bisa ditampilkan saat ini. Silakan coba beberapa saat lagi."
      );
    }
  };

  return (
    <main
      className="min-h-screen bg-field"
      data-testid="diagnosis-screen"
      data-ready={isReady ? "true" : "false"}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-chili-700">
              Checklist gejala
            </p>
            <h1 className="text-3xl">Pilih gejala yang terlihat pada tanaman cabai</h1>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">Kembali</Link>
          </Button>
        </header>

        <Card className="bg-white/90 shadow-none">
          <CardHeader className="gap-3">
            <Badge variant="outline" className="w-fit">
              Tahap 1 dari 2
            </Badge>
            <CardTitle className="text-2xl">
              Tandai sebanyak mungkin gejala yang benar-benar terlihat.
            </CardTitle>
            <CardDescription>
              Semakin tepat gejala yang dipilih, semakin rapi urutan hasil diagnosis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari gejala, misalnya daun menguning atau bercak hitam"
              aria-label="Cari gejala"
              disabled={!isReady}
            />

            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  disabled={!isReady}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                    activeFilter === filter
                      ? "bg-leaf-700 text-white"
                      : "bg-white text-foreground ring-1 ring-border hover:bg-muted"
                  )}
                  onClick={() => setActiveFilter(filter)}
                >
                  {categoryLabels[filter]}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredSymptoms.length > 0 ? (
              filteredSymptoms.map((symptom) => {
                const isSelected = selectedSymptomIds.includes(symptom.id);

                return (
                  <button
                    key={symptom.id}
                    type="button"
                    aria-pressed={isSelected}
                    disabled={!isReady}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={cn(
                      "rounded-[28px] border p-5 text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
                      isSelected
                        ? "border-leaf-700 bg-leaf-50 shadow-leaf"
                        : "border-border bg-white hover:-translate-y-0.5 hover:border-chili-100 hover:bg-soil-50"
                    )}
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <Badge variant={isSelected ? "success" : "outline"}>
                        {categoryLabels[symptom.category]}
                      </Badge>
                      <span
                        className={cn(
                          "mt-1 h-5 w-5 rounded-full border",
                          isSelected
                            ? "border-leaf-700 bg-leaf-700"
                            : "border-border bg-white"
                        )}
                      />
                    </div>
                    <h2 className="text-lg font-semibold">{symptom.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {symptom.hint}
                    </p>
                  </button>
                );
              })
            ) : (
              <Card className="sm:col-span-2">
                <CardContent className="p-6">
                  <p className="text-sm leading-7 text-muted-foreground">
                    Gejala yang Anda cari belum ditemukan. Coba ganti kata kunci
                    atau ubah filter kategori.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <Card className="overflow-hidden bg-leaf-700 text-white shadow-leaf">
              <CardHeader className="space-y-3">
                <Badge className="w-fit bg-white/15 text-white">
                  Ringkasan pilihan
                </Badge>
                <CardTitle className="text-2xl text-white">
                  {selectedSymptomIds.length} gejala dipilih
                </CardTitle>
                <CardDescription className="text-white/80">
                  {isReady
                    ? "Pilihan Anda akan disimpan selama sesi ini agar mudah dilanjutkan."
                    : "Menyiapkan sesi diagnosis..."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.length > 0 ? (
                    selectedSymptoms.map((symptom) => (
                      <Badge
                        key={symptom.id}
                        className="bg-white/12 text-white"
                        variant="default"
                      >
                        {symptom.name}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm leading-6 text-white/80">
                      Belum ada gejala yang dipilih.
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Button
                    size="lg"
                    className="bg-white text-leaf-700 hover:bg-leaf-50"
                    disabled={!isReady || selectedSymptomIds.length === 0 || isSubmittingDiagnosis}
                    onClick={handleSubmit}
                  >
                    {isSubmittingDiagnosis ? "Menganalisis..." : "Lihat hasil diagnosis"}
                  </Button>
                  <Button
                    variant="ghost"
                    className="border border-white/20 text-white hover:bg-white/10"
                    disabled={selectedSymptomIds.length === 0}
                    onClick={clearSelection}
                  >
                    Reset pilihan
                  </Button>
                </div>

                {submissionError ? (
                  <p className="rounded-3xl bg-white/10 px-4 py-3 text-sm leading-6 text-white">
                    {submissionError}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
}
