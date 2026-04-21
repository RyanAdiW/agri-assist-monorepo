export type SymptomCategory = "daun" | "batang" | "buah" | "akar" | "umum";

export type TreatmentCategory =
  | "alami"
  | "pencegahan"
  | "organik"
  | "kimia";

export type ConfidenceLabel = "tinggi" | "sedang" | "rendah";

export interface Symptom {
  id: string;
  name: string;
  category: SymptomCategory;
  hint: string;
}

export interface DiagnosisRequest {
  cropId: string;
  symptomIds: string[];
}

export interface TreatmentPillar {
  category: TreatmentCategory;
  title: string;
  items: string[];
}

export interface DiagnosisCandidate {
  id: string;
  name: string;
  description: string;
  score: number;
  confidenceLabel: ConfidenceLabel;
  matchedSymptomIds: string[];
  treatmentPillars: TreatmentPillar[];
}

export interface DiagnosisResponse {
  cropId: string;
  cropName: string;
  hasConfidentDiagnosis: boolean;
  message: string;
  selectedSymptomIds: string[];
  generatedAt: string;
  candidates: DiagnosisCandidate[];
}

export interface FeedbackSubmission {
  diagnosisId: string;
  isHelpful: boolean;
  notes?: string;
}

export interface FeedbackResult {
  status: "saved";
  submittedAt: string;
  payload: FeedbackSubmission;
}

export interface DiseaseSeed {
  id: string;
  name: string;
  description: string;
  symptoms: Array<{
    symptomId: string;
    weight: number;
  }>;
  treatments: Record<TreatmentCategory, string[]>;
}
