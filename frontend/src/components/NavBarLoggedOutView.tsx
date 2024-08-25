import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";


interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,

}

const NavBarLoggedOutView = ({onSignUpClicked, onLoginClicked}: NavBarLoggedOutViewProps) => {
    const { t } = useTranslation();
    return (  
        <>
        <Button onClick={onSignUpClicked}>{t("navBarLoggedOutView_button_signup")}</Button>
        <Button onClick={onLoginClicked}>{t("navBarLoggedOutView_button_login")}</Button>
        </>
    );
}
 
export default NavBarLoggedOutView;