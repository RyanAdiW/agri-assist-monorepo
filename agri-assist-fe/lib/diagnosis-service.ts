import { confidenceLabels, treatmentLabels } from "@/lib/copy";
import type {
  DiagnosisCandidate,
  DiagnosisRequest,
  DiagnosisResponse,
  FeedbackResult,
  FeedbackSubmission,
  Symptom,
  TreatmentCategory
} from "@/lib/types";

const DEFAULT_API_BASE_URL = "http://localhost:8080";
const DEFAULT_CROP_ID = "cabai";

type ApiTreatmentPillar = {
  category: TreatmentCategory;
  title: string;
  items: string[];
};

type ApiSymptom = {
  id: string;
  name: string;
  category: Symptom["category"];
  hint: string;
};

type ApiSymptomsResponse = {
  crop_id: string;
  crop_name: string;
  symptoms: ApiSymptom[];
};

type ApiDiagnosisCandidate = {
  id: string;
  name: string;
  description: string;
  score: number;
  confidence_label: DiagnosisCandidate["confidenceLabel"];
  matched_symptom_ids: string[];
  treatment_pillars: ApiTreatmentPillar[];
};

type ApiDiagnosisResponse = {
  crop_id: string;
  crop_name: string;
  has_confident_diagnosis: boolean;
  message: string;
  selected_symptom_ids: string[];
  generated_at: string;
  candidates: ApiDiagnosisCandidate[];
};

type ApiFeedbackSubmission = {
  diagnosis_id: string;
  is_helpful: boolean;
  notes?: string;
};

type ApiFeedbackResult = {
  status: "saved";
  submitted_at: string;
  payload: ApiFeedbackSubmission;
};

type ApiErrorResponse = {
  error: string;
  symptom_ids?: string[];
};

class ApiRequestError extends Error {
  status: number;
  symptomIds: string[];

  constructor(message: string, status: number, symptomIds: string[] = []) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.symptomIds = symptomIds;
  }
}

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
    DEFAULT_API_BASE_URL
  );
}

async function requestJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const headers = new Headers(init?.headers);

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
    cache: "no-store"
  });

  const rawBody = await response.text();
  const payload = rawBody.length > 0 ? (JSON.parse(rawBody) as unknown) : null;

  if (!response.ok) {
    const apiError =
      payload && typeof payload === "object" && payload !== null
        ? (payload as ApiErrorResponse)
        : null;

    throw new ApiRequestError(
      apiError?.error ?? "request failed",
      response.status,
      apiError?.symptom_ids ?? []
    );
  }

  if (payload === null) {
    throw new Error("empty response body");
  }

  return payload as T;
}

function mapSymptom(symptom: ApiSymptom): Symptom {
  return {
    id: symptom.id,
    name: symptom.name,
    category: symptom.category,
    hint: symptom.hint
  };
}

function mapDiagnosisCandidate(
  candidate: ApiDiagnosisCandidate
): DiagnosisCandidate {
  return {
    id: candidate.id,
    name: candidate.name,
    description: candidate.description,
    score: candidate.score,
    confidenceLabel: candidate.confidence_label,
    matchedSymptomIds: candidate.matched_symptom_ids,
    treatmentPillars: candidate.treatment_pillars
  };
}

function mapDiagnosisResponse(response: ApiDiagnosisResponse): DiagnosisResponse {
  return {
    cropId: response.crop_id,
    cropName: response.crop_name,
    hasConfidentDiagnosis: response.has_confident_diagnosis,
    message: response.message,
    selectedSymptomIds: response.selected_symptom_ids,
    generatedAt: response.generated_at,
    candidates: response.candidates.map(mapDiagnosisCandidate)
  };
}

function mapFeedbackSubmission(
  submission: ApiFeedbackSubmission
): FeedbackSubmission {
  return submission.notes
    ? {
        diagnosisId: submission.diagnosis_id,
        isHelpful: submission.is_helpful,
        notes: submission.notes
      }
    : {
        diagnosisId: submission.diagnosis_id,
        isHelpful: submission.is_helpful
      };
}

export async function submitDiagnosis(
  request: DiagnosisRequest
): Promise<DiagnosisResponse> {
  const response = await requestJson<ApiDiagnosisResponse>("/api/v1/diagnoses", {
    method: "POST",
    body: JSON.stringify({
      crop_id: request.cropId || DEFAULT_CROP_ID,
      symptom_ids: request.symptomIds
    })
  });

  return mapDiagnosisResponse(response);
}

export async function submitFeedback(
  payload: FeedbackSubmission
): Promise<FeedbackResult> {
  const response = await requestJson<ApiFeedbackResult>("/api/v1/feedbacks", {
    method: "POST",
    body: JSON.stringify({
      diagnosis_id: payload.diagnosisId,
      is_helpful: payload.isHelpful,
      notes: payload.notes
    })
  });

  return {
    status: response.status,
    submittedAt: response.submitted_at,
    payload: mapFeedbackSubmission(response.payload)
  };
}

export async function getSymptoms(cropId = DEFAULT_CROP_ID): Promise<Symptom[]> {
  const searchParams = new URLSearchParams({
    crop_id: cropId
  });
  const response = await requestJson<ApiSymptomsResponse>(
    `/api/v1/symptoms?${searchParams.toString()}`
  );

  return response.symptoms.map(mapSymptom);
}

export function getSymptomName(symptoms: Symptom[], symptomId: string) {
  return symptoms.find((symptom) => symptom.id === symptomId)?.name ?? symptomId;
}

export function getConfidenceCopy(label: DiagnosisCandidate["confidenceLabel"]) {
  return confidenceLabels[label];
}

export function getTreatmentTitle(category: TreatmentCategory) {
  return treatmentLabels[category];
}

export function isApiRequestError(error: unknown): error is ApiRequestError {
  return error instanceof ApiRequestError;
}
