import {
  submitDiagnosis,
  submitFeedback
} from "@/lib/diagnosis-service";

describe("diagnosis service", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns ranked confident candidates for strong symptom matches", async () => {
    vi.useFakeTimers();

    const promise = submitDiagnosis({
      cropId: "cabai",
      symptomIds: ["buah-bercak-hitam", "buah-busuk-basah", "bunga-rontok"]
    });

    await vi.advanceTimersByTimeAsync(450);
    const result = await promise;

    expect(result.hasConfidentDiagnosis).toBe(true);
    expect(result.candidates[0]?.name).toBe("Patek / Antraknosa");
    expect(result.candidates[0]?.score).toBeGreaterThan(0.8);
  });

  it("returns low-confidence fallback results when nothing passes the threshold", async () => {
    vi.useFakeTimers();

    const promise = submitDiagnosis({
      cropId: "cabai",
      symptomIds: ["daun-berlubang"]
    });

    await vi.advanceTimersByTimeAsync(450);
    const result = await promise;

    expect(result.hasConfidentDiagnosis).toBe(false);
    expect(result.candidates).toHaveLength(2);
    expect(result.message).toMatch(/belum ada diagnosis/i);
  });

  it("echoes feedback payload in the mock feedback adapter", async () => {
    vi.useFakeTimers();

    const promise = submitFeedback({
      diagnosisId: "antraknosa",
      isHelpful: true,
      notes: "Sesuai dengan kondisi buah."
    });

    await vi.advanceTimersByTimeAsync(250);
    const result = await promise;

    expect(result.status).toBe("saved");
    expect(result.payload).toEqual({
      diagnosisId: "antraknosa",
      isHelpful: true,
      notes: "Sesuai dengan kondisi buah."
    });
  });
});
