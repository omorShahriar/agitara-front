import { useTranslation } from "@/app/i18n";

import Link from "next/link";
import { FadeInLeftWrapper } from "./InViewAnimatedWrappers/Wrapper";
const ViewAll = async ({ lang, page }) => {
  const { t } = await useTranslation(lang);
  return (
    <FadeInLeftWrapper>
      {" "}
      <Link
        href={`/${lang}/${page}`}
        className="font-sans font-bold text-theme-purple-light text-2xl"
      >
        <div className="  ">
          <span className="relative  "> {t("to-all")}</span>
        </div>
      </Link>
    </FadeInLeftWrapper>
  );
};

export default ViewAll;
