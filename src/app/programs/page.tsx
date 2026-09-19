import type { Metadata } from "next";
import { ProgramsClient } from "@/components/ProgramsClient";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Search and register for Centerville-Washington Park District programs.",
};

export default function ProgramsPage() {
  return <ProgramsClient />;
}
