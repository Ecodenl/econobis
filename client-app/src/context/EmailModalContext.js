import React, { createContext, useState } from 'react';
import EmailDetailsModal from "../components/email/details-modal/EmailDetailsModal";

export const EmailModalContext = createContext();

export const EmailModalProvider = ({ children }) => {
    const [isEmailDetailsModalOpen, setIsEmailDetailsModalOpen] = useState(false);
    const [emailId, setEmailId] = useState(null);

    const openEmailDetailsModal = (emailId) => {
        setEmailId(emailId);
        setIsEmailDetailsModalOpen(true);
    };

    return (
        <EmailModalContext.Provider value={{ isEmailDetailsModalOpen, openEmailDetailsModal }}>
            {children}
            <EmailDetailsModal emailId={emailId} showModal={isEmailDetailsModalOpen} setShowModal={setIsEmailDetailsModalOpen} />
        </EmailModalContext.Provider>
    );
};
