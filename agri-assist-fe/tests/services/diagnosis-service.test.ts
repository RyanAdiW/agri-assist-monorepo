import {
  getSymptoms,
  submitDiagnosis,
  submitFeedback
} from "@/lib/diagnosis-service";

describe("diagnosis service", () => {
  const fetchMock = vi.fn();

  function jsonResponse(body: unknown, status = 200) {
    return {
      ok: status >= 200 && status < 300,
      status,
      text: async () => JSON.stringify(body)
    } as Response;
  }

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps symptoms from the backend payload", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        crop_id: "cabai",
        crop_name: "Cabai",
        symptoms: [
          {
            id: "kutu-halus",
            name: "Ada kutu halus di bawah daun",
            category: "umum",
            hint: "Terlihat serangga kecil di bawah daun."
          }
        ]
      })
    );

    await expect(getSymptoms()).resolves.toEqual([
      {
        id: "kutu-halus",
        name: "Ada kutu halus di bawah daun",
        category: "umum",
        hint: "Terlihat serangga kecil di bawah daun."
      }
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/symptoms?crop_id=cabai",
      expect.objectContaining({
        cache: "no-store"
      })
    );
  });

  it("maps ranked confident candidates from the diagnosis endpoint", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        crop_id: "cabai",
        crop_name: "Cabai",
        has_confident_diagnosis: true,
        message: "Berikut kemungkinan diagnosis dengan kecocokan gejala tertinggi.",
        selected_symptom_ids: [
          "buah-bercak-hitam",
          "buah-busuk-basah",
          "bunga-rontok"
        ],
        generated_at: "2026-04-21T08:00:00Z",
        candidates: [
          {
            id: "antraknosa",
            kind: "penyakit",
            name: "Patek / Antraknosa",
            description: "Jamur menyerang buah cabai.",
            score: 0.917,
            confidence_label: "tinggi",
            matched_symptom_ids: [
              "buah-bercak-hitam",
              "buah-busuk-basah",
              "bunga-rontok"
            ],
            treatment_pillars: [
              {
                category: "alami",
                title: "Penanganan alami",
                items: ["Buang buah yang sudah parah."]
              }
            ]
          }
        ]
      })
    );

    const result = await submitDiagnosis({
      cropId: "cabai",
      symptomIds: ["buah-bercak-hitam", "buah-busuk-basah", "bunga-rontok"]
    });

    expect(result.hasConfidentDiagnosis).toBe(true);
    expect(result.candidates[0]?.name).toBe("Patek / Antraknosa");
    expect(result.candidates[0]?.score).toBeGreaterThan(0.8);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/diagnoses",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          crop_id: "cabai",
          symptom_ids: [
            "buah-bercak-hitam",
            "buah-busuk-basah",
            "bunga-rontok"
          ]
        })
      })
    );
  });

  it("propagates backend validation errors", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse(
        {
          error: "unknown symptom ids",
          symptom_ids: ["gejala-tidak-ada"]
        },
        400
      )
    );

    await expect(
      submitDiagnosis({
        cropId: "cabai",
        symptomIds: ["gejala-tidak-ada"]
      })
    ).rejects.toThrow(/unknown symptom ids/i);
  });

  it("maps feedback responses from the backend payload", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        status: "saved",
        submitted_at: "2026-04-21T08:05:00Z",
        payload: {
          diagnosis_id: "antraknosa",
          is_helpful: true,
          notes: "Sesuai dengan kondisi buah."
        }
      })
    );

    const result = await submitFeedback({
      diagnosisId: "antraknosa",
      isHelpful: true,
      notes: "Sesuai dengan kondisi buah."
    });

    expect(result.status).toBe("saved");
    expect(result.submittedAt).toBe("2026-04-21T08:05:00Z");
    expect(result.payload).toEqual({
      diagnosisId: "antraknosa",
      isHelpful: true,
      notes: "Sesuai dengan kondisi buah."
    });
  });
});
