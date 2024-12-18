import { Modal } from "flowbite-react";

export interface CustomModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    footerContent?: React.ReactNode;
    actionButton?: React.ReactNode;
}

/**
 * CustomModal component.
 *
 * This component renders a modal dialog with a header, body, and optional footer.
 *
 * @param {boolean} isOpen - Determines whether the modal is open or closed.
 * @param {string} title - The title displayed in the modal header.
 * @param {() => void} onClose - Callback function to handle closing the modal.
 * @param {React.ReactNode} children - The content to be displayed in the modal body.
 * @param {React.ReactNode} [footerContent] - Optional content to be displayed in the modal footer.
 * @param {React.ReactNode} [actionButton] - Optional action button to be displayed in the modal footer.
 *
 * @returns {JSX.Element} The rendered CustomModal component.
 */
const CustomModal: React.FC<CustomModalProps> = ({
    isOpen,
    title,
    onClose,
    children,
    footerContent,
    actionButton,
}) => {
    return (
        <Modal
            show={isOpen}
            onClose={onClose}
            size="lg"
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            {(footerContent || actionButton) && (
                <Modal.Footer>
                    {footerContent}
                    {actionButton}
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default CustomModal;
