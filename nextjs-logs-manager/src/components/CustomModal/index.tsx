import { Modal } from "flowbite-react";

interface CustomModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    footerContent?: React.ReactNode;
    actionButton?: React.ReactNode;
}

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
