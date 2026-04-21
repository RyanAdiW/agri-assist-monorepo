import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";

import { DiagnosisProvider } from "@/components/providers/diagnosis-provider";
import { ResultsPageClient } from "@/components/results/results-page-client";

describe("ResultsPageClient", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          crop_id: "cabai",
          crop_name: "Cabai",
          symptoms: [
            {
              id: "buah-bercak-hitam",
              name: "Buah memiliki bercak hitam cekung",
              category: "buah",
              hint: "Bercak hitam muncul pada buah."
            },
            {
              id: "buah-busuk-basah",
              name: "Buah membusuk basah",
              category: "buah",
              hint: "Buah menjadi lembek dan cepat rusak."
            },
            {
              id: "bunga-rontok",
              name: "Bunga atau bakal buah mudah rontok",
              category: "buah",
              hint: "Bunga jatuh sebelum berkembang."
            }
          ]
        })
    } as Response);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders saved diagnosis results from session storage", async () => {
    window.sessionStorage.setItem(
      "agri-assist:latest-result",
      JSON.stringify({
        cropId: "cabai",
        cropName: "Cabai",
        hasConfidentDiagnosis: true,
        message: "Berikut kemungkinan diagnosis dengan kecocokan gejala tertinggi.",
        selectedSymptomIds: [
          "buah-bercak-hitam",
          "buah-busuk-basah",
          "bunga-rontok"
        ],
        generatedAt: "2026-04-21T08:00:00Z",
        candidates: [
          {
            id: "antraknosa",
            kind: "penyakit",
            name: "Patek / Antraknosa",
            description: "Jamur menyerang buah cabai.",
            score: 0.917,
            confidenceLabel: "tinggi",
            matchedSymptomIds: [
              "buah-bercak-hitam",
              "buah-busuk-basah",
              "bunga-rontok"
            ],
            treatmentPillars: [
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

    render(
      <DiagnosisProvider>
        <ResultsPageClient />
      </DiagnosisProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/patek \/ antraknosa/i).length).toBeGreaterThan(0);
    });

    expect(screen.getAllByText(/penanganan alami/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/sangat membantu/i)).toBeInTheDocument();
  });
});
