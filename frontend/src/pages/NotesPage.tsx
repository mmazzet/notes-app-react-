import { Container } from "react-bootstrap";
import NotesPageLoggedinView from '../components/NotesPageLoggedinView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
import styles from "../styles/NotesPage.module.css";
import { User } from "../models/user";


interface NotesPageProps {
  loggedInUser: User | null,
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>
        {loggedInUser
          ? <NotesPageLoggedinView />
          : <NotesPageLoggedOutView />
        }
      </>

    </Container>

  );
}

export default NotesPage;