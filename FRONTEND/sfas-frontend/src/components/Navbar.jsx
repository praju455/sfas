import { Sprout } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Sprout size={32} />
          <div>
            <h1 className="text-2xl font-bold">{t("title")}</h1>
            <p className="text-sm opacity-90">{t("subtitle")}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}


