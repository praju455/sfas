import AdvisoryForm from "../components/AdvisoryForm";
import AdvisoryCard from "../components/AdvisoryCard";
import { useState } from "react";

export default function Crops() {
  const [result, setResult] = useState(null);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Location Based Crops</h1>
      <AdvisoryForm setResult={setResult} />
      {result && <AdvisoryCard result={result} />}
    </div>
  );
}



