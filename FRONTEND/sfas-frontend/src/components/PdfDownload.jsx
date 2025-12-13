import { useTranslation } from "react-i18next";

export default function PdfDownload() {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <a
        href="http://127.0.0.1:5000/api/report"
        target="_blank"
        className="bg-green-700 text-white px-4 py-2 rounded"
      >
        {t("download")}
      </a>
    </div>
  );
}

