"use client";

import Link from "next/link";
import { useState } from "react";

import { appCopy, diagnosisKindLabels } from "@/lib/copy";
import { getSymptomName } from "@/lib/diagnosis-service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useDiagnosis } from "@/components/providers/diagnosis-provider";
import { ResultCard } from "@/components/results/result-card";

export function ResultsPageClient() {
  const { latestResult, feedbackResult, saveFeedback, symptoms } = useDiagnosis();
  const [helpfulChoice, setHelpfulChoice] = useState<boolean | null>(null);
  const [notes, setNotes] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  if (!latestResult) {
    return (
      <main className="min-h-screen bg-field">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-10 sm:px-6">
          <Card className="w-full bg-white/95">
            <CardHeader>
              <Badge variant="warning" className="w-fit">
                Belum ada hasil
              </Badge>
              <CardTitle className="text-3xl">
                Diagnosis belum dijalankan pada sesi ini.
              </CardTitle>
              <CardDescription>
                Kembali ke halaman gejala untuk memilih gejala tanaman cabai terlebih
                dahulu.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg">
                <Link href="/diagnosis">Pilih gejala sekarang</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const topCandidate = latestResult.candidates[0];
  const candidateCounts = latestResult.candidates.reduce(
    (counts, candidate) => {
      counts[candidate.kind] += 1;
      return counts;
    },
    { hama: 0, penyakit: 0 }
  );
  const selectedSymptoms = latestResult.selectedSymptomIds.map((symptomId) =>
    getSymptomName(symptoms, symptomId)
  );

  const handleFeedback = async () => {
    if (helpfulChoice === null || !topCandidate) {
      return;
    }

    setIsSendingFeedback(true);

    try {
      await saveFeedback({
        diagnosisId: topCandidate.id,
        isHelpful: helpfulChoice,
        notes
      });
    } finally {
      setIsSendingFeedback(false);
    }
  };

  return (
    <main className="min-h-screen bg-field">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-chili-700">
              Hasil diagnosis
            </p>
            <h1 className="text-3xl">{appCopy.resultsTitle}</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/diagnosis">Ubah gejala</Link>
          </Button>
        </header>

        <Card className="overflow-hidden bg-white/95">
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={latestResult.hasConfidentDiagnosis ? "success" : "warning"}>
                {latestResult.hasConfidentDiagnosis
                  ? "Ada diagnosis yang cukup yakin"
                  : "Perlu konsultasi lanjutan"}
              </Badge>
              <Badge variant="outline">{latestResult.cropName}</Badge>
              {topCandidate ? (
                <Badge variant={topCandidate.kind === "hama" ? "warning" : "success"}>
                  Hasil utama: {diagnosisKindLabels[topCandidate.kind]}
                </Badge>
              ) : null}
            </div>
            <CardTitle className="text-3xl">{latestResult.message}</CardTitle>
            <CardDescription>
              Sistem menampilkan {latestResult.candidates.length} kemungkinan terbaik
              berdasarkan gejala yang dipilih, terdiri dari {candidateCounts.hama}{" "}
              kemungkinan hama dan {candidateCounts.penyakit} kemungkinan penyakit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptomName) => (
                <Badge key={symptomName} variant="outline">
                  {symptomName}
                </Badge>
              ))}
            </div>

            {!latestResult.hasConfidentDiagnosis ? (
              <div className="rounded-[28px] border border-chili-100 bg-chili-50 p-4 text-sm leading-7 text-chili-700">
                Tidak ada diagnosis yang melewati ambang 60%. Gunakan hasil ini
                sebagai petunjuk awal dan pertimbangkan konsultasi lanjutan.
              </div>
            ) : null}
          </CardContent>
        </Card>

        <section className="grid gap-4">
          {latestResult.candidates.map((candidate, index) => (
            <ResultCard
              key={candidate.id}
              candidate={candidate}
              index={index}
              symptoms={symptoms}
            />
          ))}
        </section>

        {topCandidate ? (
          <Card className="bg-leaf-700 text-white shadow-leaf">
            <CardHeader>
              <Badge className="w-fit bg-white/12 text-white">Feedback pengguna</Badge>
              <CardTitle className="text-3xl text-white">
                {appCopy.feedbackTitle}
              </CardTitle>
              <CardDescription className="text-white/80">
                Umpan balik ini akan ditautkan ke hasil utama:{" "}
                {diagnosisKindLabels[topCandidate.kind]} {topCandidate.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setHelpfulChoice(true)}
                  className={`rounded-[26px] border px-4 py-4 text-left transition-colors ${
                    helpfulChoice === true
                      ? "border-white bg-white text-leaf-700"
                      : "border-white/20 bg-white/10 text-white"
                  }`}
                >
                  Sangat membantu
                </button>
                <button
                  type="button"
                  onClick={() => setHelpfulChoice(false)}
                  className={`rounded-[26px] border px-4 py-4 text-left transition-colors ${
                    helpfulChoice === false
                      ? "border-white bg-white text-leaf-700"
                      : "border-white/20 bg-white/10 text-white"
                  }`}
                >
                  Kurang sesuai
                </button>
              </div>

              <Textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Catatan tambahan (opsional), misalnya gejala lain yang belum tersedia."
                className="border-white/10 bg-white text-foreground"
              />

              <Button
                size="lg"
                className="bg-white text-leaf-700 hover:bg-leaf-50"
                disabled={helpfulChoice === null || isSendingFeedback}
                onClick={handleFeedback}
              >
                {isSendingFeedback ? "Mengirim feedback..." : "Kirim feedback"}
              </Button>

              {feedbackResult ? (
                <p className="rounded-[24px] bg-white/10 px-4 py-3 text-sm leading-6 text-white">
                  {appCopy.feedbackSuccess}
                </p>
              ) : null}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </main>
  );
}
