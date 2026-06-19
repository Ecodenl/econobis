import React, { createContext, useState } from 'react';
import EmailDetailsModal from '../components/email/details-modal/EmailDetailsModal';
import EmailSendModal from '../components/email/send-modal/EmailSendModal';

export const EmailModalContext = createContext();

export const EmailModalProvider = ({ children }) => {
    const [isEmailDetailsModalOpen, setIsEmailDetailsModalOpen] = useState(false);
    const [isEmailSendModalOpen, setIsEmailSendModalOpen] = useState(false);
    const [modalEmailId, setModalEmailId] = useState(null);

    const openEmailDetailsModal = modalEmailId => {
        setModalEmailId(modalEmailId);
        setIsEmailSendModalOpen(false);
        setIsEmailDetailsModalOpen(true);
    };

    const openEmailSendModal = modalEmailId => {
        setModalEmailId(modalEmailId);
        setIsEmailDetailsModalOpen(false);
        setIsEmailSendModalOpen(true);
    };

    return (
        <EmailModalContext.Provider
            value={{
                isEmailDetailsModalOpen,
                isEmailSendModalOpen,
                openEmailDetailsModal,
                openEmailSendModal,
                modalEmailId,
                setIsEmailDetailsModalOpen,
            }}
        >
            {children}
            {isEmailDetailsModalOpen && (
                <EmailDetailsModal
                    emailId={modalEmailId}
                    showModal={isEmailDetailsModalOpen}
                    setShowModal={setIsEmailDetailsModalOpen}
                />
            )}
            {isEmailSendModalOpen && (
                <EmailSendModal
                    emailId={modalEmailId}
                    showModal={isEmailSendModalOpen}
                    setShowModal={setIsEmailSendModalOpen}
                />
            )}
        </EmailModalContext.Provider>
    );
};
