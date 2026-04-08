import type { Metadata } from "next";

import "@/app/globals.css";
import { DiagnosisProvider } from "@/components/providers/diagnosis-provider";

export const metadata: Metadata = {
  title: "Agri-Assist",
  description:
    "Frontend diagnosis tanaman cabai berbasis gejala untuk membantu keputusan lapangan."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <DiagnosisProvider>{children}</DiagnosisProvider>
      </body>
    </html>
  );
}
