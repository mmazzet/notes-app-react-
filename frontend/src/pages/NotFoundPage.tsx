import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
    const { t } = useTranslation();
    return ( 
        <div>
            <p>{t("notFoundPage")}</p>
        </div>
     );
}
 
export default NotFoundPage;