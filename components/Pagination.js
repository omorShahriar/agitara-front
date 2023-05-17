import { useTranslation } from "@/app/i18n/client";

import Button from "@/components/Button";
const Pagination = ({
  data,
  pageIndex,
  decreasePageIndex,
  increasePageIndex,
  lang,
}) => {
  const { t } = useTranslation(lang);
  return (
    <div className="my-12 flex gap-4 md:gap-8 flex-col md:flex-row items-center justify-center">
      {pageIndex === 1 &&
      pageIndex === (data && data.meta.pagination.pageCount) ? null : (
        <div className="flex gap-x-4 md:gap-x-8">
          {" "}
          <Button disabled={pageIndex === 1} onClick={decreasePageIndex}>
            {t("pagination.prev")}
          </Button>
          <Button
            disabled={pageIndex === (data && data.meta.pagination.pageCount)}
            onClick={increasePageIndex}
          >
            {t("pagination.next")}
          </Button>
        </div>
      )}

      <span>
        {t("pagination.page")} {pageIndex} {t("pagination.of")}{" "}
        {data && data.meta.pagination.pageCount}
      </span>
    </div>
  );
};

export default Pagination;
