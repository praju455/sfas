import { useTranslation } from "react-i18next";

export default function PdfDownload() {
  const { t } = useTranslation();

  const API = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="text-center">
      <a
        href={`${API}/api/report`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-700 text-white px-4 py-2 rounded"
      >
        {t("download")}
      </a>
    </div>
  );
}
