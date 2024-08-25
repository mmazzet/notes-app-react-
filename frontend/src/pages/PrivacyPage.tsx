import { useTranslation } from "react-i18next";

const PrivacyPage = () => {
    const { t } = useTranslation();
    return ( 
        <div>
            <p>{t("privacyPage")}</p>
        </div>
     );
}
 
export default PrivacyPage;