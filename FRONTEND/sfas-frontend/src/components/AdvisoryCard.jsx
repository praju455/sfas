import { useState } from "react";
import ExplanationModal from "./ExplanationModal";

export default function AdvisoryCard({ result }) {
  const [open, setOpen] = useState(false);

  if (!result || result.ml_prediction === undefined) return null;

  // ✅ Numeric confidence (for logic & bar)
  const confidenceNum = Math.round(result.ml_prediction * 100);

  // ✅ Display value
  const confidenceText = confidenceNum.toFixed(2);

  return (
    <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl shadow-sm">
      
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Advisory Report
      </h2>

      <p className="text-sm mb-2">
        <strong>Recommendation:</strong> {result.recommendation}
      </p>

      {result.benefits && (
        <div className="mt-3 text-sm space-y-1">
          <p><strong>Yield Increase:</strong> {result.benefits.yield}%</p>
          <p><strong>Cost Reduction:</strong> {result.benefits.cost}%</p>
          <p><strong>Loss Reduction:</strong> {result.benefits.loss}%</p>
        </div>
      )}

      {/* ================= ML CONFIDENCE ================= */}
      <div className="mt-4 p-4 bg-green-100 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">
          🤖 ML Prediction Confidence
        </h3>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className={`h-3 rounded-full transition-all duration-500
              ${
                confidenceNum > 80
                  ? "bg-green-600"
                  : confidenceNum > 60
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }
            `}
            style={{ width: `${confidenceNum}%` }}
          />
        </div>

        <p className="text-sm">
          <strong>Confidence:</strong>{" "}
          <span className={
            confidenceNum > 80 ? "text-green-700" : "text-yellow-700"
          }>
            {confidenceText}%
          </span>
        </p>

        <p className="text-sm">
          <strong>Risk Level:</strong>{" "}
          {confidenceNum > 80
            ? "Low"
            : confidenceNum > 60
            ? "Moderate"
            : "High"}
        </p>
      </div>

      {/* Explanation */}
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-green-600 hover:underline mt-4"
      >
        Why this recommendation?
      </button>

      <ExplanationModal
        open={open}
        onClose={() => setOpen(false)}
        explanation={result.explanation}
      />
    </div>
  );
}
