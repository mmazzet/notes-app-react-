import { Button, Form, Modal } from "react-bootstrap";
import { NoteInput } from "../network/notes_api";
import { useForm } from "react-hook-form";
import * as NotesApi from "../network/notes_api";
import { Note } from "../models/note";
import TextInputField from "./form/TextInputField";
import { useTranslation } from "react-i18next";

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
}

const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) => {

    const { t } = useTranslation();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }
            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? t('addEditNoteDialog_form_title_edit') : t("addEditNoteDialog_form_title_add")}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label={t("addEditNoteDialog_form_label_title")}
                        type="text"
                        placeholder={t("addEditNoteDialog_form_placeholder_title")}
                        register={register}
                        registerOptions={{ required: t("addEditNoteDialog_form_error_title") }}
                        error={errors.title}
                    />
                    <TextInputField
                        name="text"
                        label={t("addEditNoteDialog_form_label_text")}
                        as="textarea"
                        rows={5}
                        placeholder={t("addEditNoteDialog_form_placeholder_text")}
                        register={register}
                    />

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditNoteForm"
                    disabled={isSubmitting}
                >
                    {t('addEditNoteDialog_save_button')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialog;