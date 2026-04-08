import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { DiagnosisProvider } from "@/components/providers/diagnosis-provider";
import { DiagnosisPageClient } from "@/components/diagnosis/diagnosis-page-client";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push
  })
}));

describe("DiagnosisPageClient", () => {
  it("filters symptoms and enables diagnosis after a symptom is selected", async () => {
    const user = userEvent.setup();

    render(
      <DiagnosisProvider>
        <DiagnosisPageClient />
      </DiagnosisProvider>
    );

    const submitButton = await screen.findByRole("button", {
      name: /lihat hasil diagnosis/i
    });

    expect(submitButton).toBeDisabled();

    await user.type(screen.getByLabelText(/cari gejala/i), "kutu");

    expect(
      screen.getByRole("button", { name: /ada kutu halus di bawah daun/i })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /ada kutu halus di bawah daun/i })
    );

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    expect(screen.getByText(/1 gejala dipilih/i)).toBeInTheDocument();
  });
});
