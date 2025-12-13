import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      className="border p-2 rounded text-black"
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      defaultValue="en"
    >
      <option value="en">English</option>
      <option value="kn">ಕನ್ನಡ</option>
      <option value="hi">हिंदी</option>
    </select>
  );
}
