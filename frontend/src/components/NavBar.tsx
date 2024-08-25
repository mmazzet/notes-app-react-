import { User } from "../models/user";
import { Container, Nav, Navbar } from "react-bootstrap";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import GlobeIcon from "./GlobeIcon";




interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const languages = [
    {
        code: "en",
        name: "English",
        country_code: "ie"
    },

    {
        code: "it",
        name: "Italiano",
        country_code: "it"
    },

]

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    const { t } = useTranslation();
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    NotesApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                            {t("navbar_link_privacy")}
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                            : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                    <Nav className="d-flex justify-content-end">
                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <GlobeIcon />
                            </button>
                            <ul className="dropdown-menu">
                                {languages.map(({ code, name, country_code }) => (
                                    <li key={country_code}>
                                        <button className="dropdown-item" onClick={() => i18next.changeLanguage(code)} >
                                            <span className={`fi fi-${country_code} mx-2`}></span>
                                            {name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;