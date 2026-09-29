import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF8]" />}>
      <SearchContent />
    </Suspense>
  );
}