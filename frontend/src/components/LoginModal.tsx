import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { UnauthorizedError } from "../errors/http_errors";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

const LoginModal = ({onDismiss, onLoginSuccessful}: LoginModalProps) => {
    const { t } = useTranslation();

    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting }}= useForm<LoginCredentials>();

    async function onSubmit(credentials:LoginCredentials) {
        try {
            const user = await NotesApi.login(credentials);
            onLoginSuccessful(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    return (  
        <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                {t("logInModal_form_header_title")}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {errorText &&
                <Alert variant="danger">
                    {errorText}
                </Alert>

            }
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField 
                name="username"
                label={t("logInModal_form_label_username")}
                text="text"
                placeholder={t("logInModal_form_placeholder_username")}
                register={register}
                registerOptions={{required: t("logInModal_form_error_username")}}
                error={errors.username}
                />
                <TextInputField 
                name="password"
                label={t("logInModal_form_label_password")}
                text="password"
                type="password"
                placeholder={t("logInModal_form_placeholder_password")}
                register={register}
                registerOptions={{required: t("logInModal_form_error_password")}}
                error={errors.password}
                />
                <Button
                type="submit"
                disabled={isSubmitting}
                className={styleUtils.width100}
                >
                    {t("logInModal_form_login_button")}
                </Button>
            </Form>
        </Modal.Body>
        </Modal>
    );
}
 
export default LoginModal;