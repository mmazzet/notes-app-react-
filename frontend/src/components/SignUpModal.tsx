import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { ConflictError } from "../errors/http_errors";
import { useTranslation } from "react-i18next";

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void,
}

const SignUpModal = ({onDismiss, onSignUpSuccessful}: SignUpModalProps) => {

    const { t } = useTranslation();
    const [errorText, setErrorText] = useState<string|null>(null);

    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await NotesApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        } catch (error) {
            if (error instanceof ConflictError) {
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
                {t("signUpModal_form_header_title")}
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>
              {errorText &&
                <Alert variant="danger">
                    {errorText}
                </Alert>
              }  
              <Form onSubmit= {handleSubmit(onSubmit)}>
                <TextInputField name="username"
                label= {t("signUpModal_form_label_username")}
                type="text"
                placeholder={t("signUpModal_form_placeholder_username")}
                register={register}
                registerOptions={{ required: t("signUpModal_form_error_username")}}
                error={errors.username}   
                />
                <TextInputField name="email"
                label={t("signUpModal_form_label_email")}
                type="email"
                placeholder={t("signUpModal_form_placeholder_email")}
                register={register}
                registerOptions={{ required: t("signUpModal_form_error_username")}}
                error={errors.email}   
                />
                <TextInputField name="password"
                label={t("signUpModal_form_label_password")}
                type="password"
                placeholder={t("signUpModal_form_placeholder_password")}
                register={register}
                registerOptions={{ required: t("signUpModal_form_error_password")}}
                error={errors.password}   
                />
                <Button
                type="submit"
                disabled={isSubmitting}
                className={styleUtils.width100}
                >
                    {t("signUpModal_form_signup_button")}
                </Button>
                </Form>  
            </Modal.Body>
        </Modal>
    );
}
 
export default SignUpModal;