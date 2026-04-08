import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";

import { submitDiagnosis } from "@/lib/diagnosis-service";
import { DiagnosisProvider } from "@/components/providers/diagnosis-provider";
import { ResultsPageClient } from "@/components/results/results-page-client";

describe("ResultsPageClient", () => {
  it("renders saved diagnosis results from session storage", async () => {
    const result = await submitDiagnosis({
      cropId: "cabai",
      symptomIds: ["buah-bercak-hitam", "buah-busuk-basah", "bunga-rontok"]
    });

    window.sessionStorage.setItem(
      "agri-assist:latest-result",
      JSON.stringify(result)
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
