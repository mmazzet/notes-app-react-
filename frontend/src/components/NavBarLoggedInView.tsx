import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import { useTranslation } from "react-i18next";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {
    const { t } = useTranslation();

    async function logout() {
        try {
            await NotesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);

        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                {t("navBarLoggedInView_navbar_text")} {user.username}
            </Navbar.Text>
            <Button onClick={logout}>{t("navBarLoggedInView_navbar_button_logout")}</Button>
        </>
    );
}

export default NavBarLoggedInView;