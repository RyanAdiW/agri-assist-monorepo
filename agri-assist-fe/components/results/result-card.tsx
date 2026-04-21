"use client";

import { useState } from "react";

import { diagnosisKindLabels } from "@/lib/copy";
import { getConfidenceCopy, getSymptomName } from "@/lib/diagnosis-service";
import type { DiagnosisCandidate, Symptom } from "@/lib/types";
import { formatPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const badgeVariantByConfidence = {
  tinggi: "success",
  sedang: "default",
  rendah: "warning"
} as const;

export function ResultCard({
  candidate,
  index,
  symptoms
}: {
  candidate: DiagnosisCandidate;
  index: number;
  symptoms: Symptom[];
}) {
  const [openCategory, setOpenCategory] = useState(
    candidate.treatmentPillars[0]?.category
  );

  return (
    <Card
      className={index === 0 ? "border-chili-100 bg-white" : "border-border bg-white/90"}
    >
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={index === 0 ? "warning" : "outline"}>
            Peringkat {index + 1}
          </Badge>
          <Badge variant={candidate.kind === "hama" ? "warning" : "success"}>
            {diagnosisKindLabels[candidate.kind]}
          </Badge>
          <Badge variant={badgeVariantByConfidence[candidate.confidenceLabel]}>
            {getConfidenceCopy(candidate.confidenceLabel)}
          </Badge>
          <Badge variant="outline">{formatPercent(candidate.score)}</Badge>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl">{candidate.name}</CardTitle>
          <CardDescription>{candidate.description}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">
            Gejala yang paling cocok
          </p>
          <div className="flex flex-wrap gap-2">
            {candidate.matchedSymptomIds.length > 0 ? (
              candidate.matchedSymptomIds.map((symptomId) => (
                <Badge key={symptomId} variant="outline">
                  {getSymptomName(symptoms, symptomId)}
                </Badge>
              ))
            ) : (
              <Badge variant="muted">Belum ada gejala yang cocok kuat</Badge>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {candidate.treatmentPillars.map((pillar) => (
            <details
              key={pillar.category}
              className="rounded-[24px] border border-border bg-soil-50 p-4"
              open={openCategory === pillar.category}
              onToggle={(event) => {
                if ((event.currentTarget as HTMLDetailsElement).open) {
                  setOpenCategory(pillar.category);
                }
              }}
            >
              <summary className="cursor-pointer list-none text-base font-semibold">
                {pillar.title}
              </summary>
              <div className="mt-3 grid gap-2">
                {pillar.items.map((item) => (
                  <p key={item} className="text-sm leading-7 text-muted-foreground">
                    {item}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
