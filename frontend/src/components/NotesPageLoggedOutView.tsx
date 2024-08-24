import React from "react";
import { useTranslation } from "react-i18next";

const NotesPageLoggedOutView: React.FC = () => {
    const { t } = useTranslation();
    return ( 
        <p>{t('notesPageLoggedOutView_message')}</p>
     );
}
 
export default NotesPageLoggedOutView;