import { confidenceLabels, treatmentLabels } from "@/lib/copy";
import { diseases, symptoms } from "@/lib/mock-data";
import type {
  DiagnosisCandidate,
  DiagnosisRequest,
  DiagnosisResponse,
  FeedbackResult,
  FeedbackSubmission,
  TreatmentCategory
} from "@/lib/types";

const DIAGNOSIS_THRESHOLD = 0.6;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getConfidenceLabel(score: number) {
  if (score >= 0.8) {
    return "tinggi" as const;
  }

  if (score > DIAGNOSIS_THRESHOLD) {
    return "sedang" as const;
  }

  return "rendah" as const;
}

function mapPillars(
  treatments: Record<TreatmentCategory, string[]>
): DiagnosisCandidate["treatmentPillars"] {
  return (Object.keys(treatments) as TreatmentCategory[]).map((category) => ({
    category,
    title: treatmentLabels[category],
    items: treatments[category]
  }));
}

export async function submitDiagnosis(
  request: DiagnosisRequest
): Promise<DiagnosisResponse> {
  await wait(450);

  const selected = new Set(request.symptomIds);

  const ranked = diseases
    .map((disease) => {
      const totalWeight = disease.symptoms.reduce(
        (sum, symptom) => sum + symptom.weight,
        0
      );
      const matchedSymptoms = disease.symptoms.filter((symptom) =>
        selected.has(symptom.symptomId)
      );
      const rawScore = matchedSymptoms.reduce(
        (sum, symptom) => sum + symptom.weight,
        0
      );
      const score = totalWeight === 0 ? 0 : rawScore / totalWeight;

      return {
        id: disease.id,
        name: disease.name,
        description: disease.description,
        score,
        confidenceLabel: getConfidenceLabel(score),
        matchedSymptomIds: matchedSymptoms.map((symptom) => symptom.symptomId),
        treatmentPillars: mapPillars(disease.treatments)
      } satisfies DiagnosisCandidate;
    })
    .sort((a, b) => b.score - a.score);

  const hasConfidentDiagnosis = ranked.some(
    (candidate) => candidate.score > DIAGNOSIS_THRESHOLD
  );
  const candidates = ranked.slice(0, hasConfidentDiagnosis ? 3 : 2);

  return {
    cropId: "cabai",
    cropName: "Cabai",
    hasConfidentDiagnosis,
    message: hasConfidentDiagnosis
      ? "Berikut kemungkinan diagnosis dengan kecocokan gejala tertinggi."
      : "Belum ada diagnosis yang cukup yakin. Kami tetap menampilkan kemungkinan teratas dengan label kemungkinan rendah.",
    selectedSymptomIds: request.symptomIds,
    generatedAt: new Date().toISOString(),
    candidates
  };
}

export async function submitFeedback(
  payload: FeedbackSubmission
): Promise<FeedbackResult> {
  await wait(250);

  return {
    status: "saved",
    submittedAt: new Date().toISOString(),
    payload
  };
}

export function getSymptoms() {
  return symptoms;
}

export function getSymptomName(symptomId: string) {
  return symptoms.find((symptom) => symptom.id === symptomId)?.name ?? symptomId;
}

export function getConfidenceCopy(label: DiagnosisCandidate["confidenceLabel"]) {
  return confidenceLabels[label];
}
