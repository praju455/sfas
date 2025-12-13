export default function ExplanationModal({ open, onClose, explanation }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      
      {/* Modal Box */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          🧠 Why this recommendation?
        </h2>

        {/* Explanation Content */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {explanation}
        </p>

        {/* Footer */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
}
