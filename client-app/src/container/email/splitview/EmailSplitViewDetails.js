import React, {useContext, useEffect, useState} from 'react';
import EmailSplitViewDetailsHeaderPanel from "./EmailSplitViewDetailsHeaderPanel";
import EmailAttachmentsPanel from "../../../components/email/EmailAttachmentsPanel";
import EmailGenericAPI from "../../../api/email/EmailGenericAPI";
import EmailSplitviewAPI from "../../../api/email/EmailSplitviewAPI";
import {EmailModalContext} from "../../../context/EmailModalContext";

export default function EmailSplitViewDetails({emailId, updatedEmailHandler}) {
    const { isEmailDetailsModalOpen, isEmailSendModalOpen, modalEmailId } = useContext(EmailModalContext);
    const [email, setEmail] = useState({attachments: []});

    useEffect(() => {
        if(!isEmailDetailsModalOpen && email.id === modalEmailId) {
            fetchEmail();
        }
    }, [isEmailDetailsModalOpen]);

    useEffect(() => {
        if(!isEmailSendModalOpen && email.id === modalEmailId) {
            fetchEmail();
        }
    }, [isEmailSendModalOpen]);

    useEffect(() => {
        if (!emailId) {
            return;
        }

        fetchEmail();
    }, [emailId]);

    const fetchEmail = () => {
        EmailSplitviewAPI.fetchEmail(emailId).then(data => {
            setEmail(data);
        });
    }

    const updateEmailAttributes = (attributes) => {
        setEmail({
            ...email,
            ...attributes,
        });

        EmailGenericAPI.update(emailId, attributes).then(() => {
            updatedEmailHandler();
        });
    }

    if (!email) {
        return (
            <></>
        )
    }

    return (
        <div>
            <EmailSplitViewDetailsHeaderPanel email={email} updateEmailAttributes={updateEmailAttributes} />

            <div className="panel panel-default">
                <div className="panel-body panel-small" style={{padding: '20px'}}>
                    <div dangerouslySetInnerHTML={{__html: email.htmlBodyWithEmbeddedImages}}/>
                </div>
            </div>

            <EmailAttachmentsPanel email={email} />
        </div>
    );
}

