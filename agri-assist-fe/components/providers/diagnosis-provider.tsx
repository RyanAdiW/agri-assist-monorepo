"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  getSymptoms,
  submitDiagnosis,
  submitFeedback
} from "@/lib/diagnosis-service";
import type {
  DiagnosisResponse,
  FeedbackResult,
  FeedbackSubmission,
  Symptom
} from "@/lib/types";

interface DiagnosisContextValue {
  symptoms: Symptom[];
  symptomsError: string;
  selectedSymptomIds: string[];
  latestResult: DiagnosisResponse | null;
  isReady: boolean;
  isSubmittingDiagnosis: boolean;
  feedbackResult: FeedbackResult | null;
  toggleSymptom: (symptomId: string) => void;
  clearSelection: () => void;
  runDiagnosis: () => Promise<DiagnosisResponse>;
  saveFeedback: (payload: FeedbackSubmission) => Promise<FeedbackResult>;
}

const STORAGE_KEYS = {
  selection: "agri-assist:selected-symptoms",
  result: "agri-assist:latest-result"
};

const DiagnosisContext = createContext<DiagnosisContextValue | null>(null);

export function DiagnosisProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [symptomsError, setSymptomsError] = useState("");
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<string[]>([]);
  const [latestResult, setLatestResult] = useState<DiagnosisResponse | null>(null);
  const [feedbackResult, setFeedbackResult] = useState<FeedbackResult | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSubmittingDiagnosis, setIsSubmittingDiagnosis] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrateSession = () => {
      try {
        const savedSelection = window.sessionStorage.getItem(STORAGE_KEYS.selection);
        const savedResult = window.sessionStorage.getItem(STORAGE_KEYS.result);

        if (savedSelection) {
          const parsedSelection = JSON.parse(savedSelection) as string[];
          setSelectedSymptomIds((current) =>
            current.length > 0 ? current : parsedSelection
          );
        }

        if (savedResult) {
          const parsedResult = JSON.parse(savedResult) as DiagnosisResponse;
          setLatestResult((current) => current ?? parsedResult);
        }
      } catch (error) {
        console.error("Gagal memuat sesi diagnosis", error);
      }
    };

    const loadSymptoms = async () => {
      hydrateSession();

      try {
        const response = await getSymptoms();
        if (!isMounted) {
          return;
        }

        setSymptoms(response);
        setSymptomsError("");
      } catch (error) {
        console.error("Gagal memuat daftar gejala", error);

        if (!isMounted) {
          return;
        }

        setSymptoms([]);
        setSymptomsError(
          "Daftar gejala belum bisa dimuat saat ini. Periksa koneksi ke backend lalu coba lagi."
        );
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    };

    loadSymptoms();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.sessionStorage.setItem(
      STORAGE_KEYS.selection,
      JSON.stringify(selectedSymptomIds)
    );
  }, [isReady, selectedSymptomIds]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!latestResult) {
      window.sessionStorage.removeItem(STORAGE_KEYS.result);
      return;
    }

    window.sessionStorage.setItem(
      STORAGE_KEYS.result,
      JSON.stringify(latestResult)
    );
  }, [isReady, latestResult]);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptomIds((current) =>
      current.includes(symptomId)
        ? current.filter((item) => item !== symptomId)
        : [...current, symptomId]
    );
  };

  const clearSelection = () => {
    setSelectedSymptomIds([]);
    setLatestResult(null);
    setFeedbackResult(null);
  };

  const runDiagnosis = async () => {
    setIsSubmittingDiagnosis(true);
    setFeedbackResult(null);

    try {
      const response = await submitDiagnosis({
        cropId: "cabai",
        symptomIds: selectedSymptomIds
      });

      setLatestResult(response);
      return response;
    } finally {
      setIsSubmittingDiagnosis(false);
    }
  };

  const saveFeedback = async (payload: FeedbackSubmission) => {
    const response = await submitFeedback(payload);
    setFeedbackResult(response);
    return response;
  };

  return (
    <DiagnosisContext.Provider
      value={{
        symptoms,
        symptomsError,
        selectedSymptomIds,
        latestResult,
        isReady,
        isSubmittingDiagnosis,
        feedbackResult,
        toggleSymptom,
        clearSelection,
        runDiagnosis,
        saveFeedback
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
}

export function useDiagnosis() {
  const context = useContext(DiagnosisContext);

  if (!context) {
    throw new Error("useDiagnosis must be used inside DiagnosisProvider");
  }

  return context;
}
