import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("global");

    return (
        <>
            {t("title")}
        </>
    );
}
