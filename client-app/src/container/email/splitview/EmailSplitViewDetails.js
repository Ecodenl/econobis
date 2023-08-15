import React, {useContext, useEffect, useState} from 'react';
import EmailSplitViewDetailsHeaderPanel from "./EmailSplitViewDetailsHeaderPanel";
import EmailAttachmentsPanel from "../../../components/email/EmailAttachmentsPanel";
import EmailGenericAPI from "../../../api/email/EmailGenericAPI";
import EmailSplitviewAPI from "../../../api/email/EmailSplitviewAPI";
import {EmailModalContext} from "../../../context/EmailModalContext";

export default function EmailSplitViewDetails({emailId, updatedEmailHandler}) {
    const { isEmailDetailsModalOpen, isEmailSendModalOpen, modalEmailId } = useContext(EmailModalContext);
    const [email, setEmail] = useState({attachments: [], toAddresses: []});
    const {openEmailSendModal} = useContext(EmailModalContext);

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

    useEffect(() => {
        document.getElementById("split-view-email-html").addEventListener("click", captureMailtoLinks);

        return () => {
            if(document.getElementById("split-view-email-html")){
                document.getElementById("split-view-email-html").removeEventListener("click", captureMailtoLinks);
            }
        }
    }, []);

    const captureMailtoLinks = (event) => {
        if (event.target.tagName === 'A' && event.target.href && event.target.href.indexOf('mailto:') !== -1) {
            event.preventDefault();

            if(confirm('Wil je een e-mail opstellen aan mailadres ' + event.target.href.replace('mailto:', '') + '?')) {
                EmailGenericAPI.storeNew({
                    to: [event.target.href.replace('mailto:', '')],
                }).then(payload => {
                    openEmailSendModal(payload.data.id)
                });
            }
        }
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
                <div className="panel-body panel-small" style={{padding: '20px'}} id="split-view-email-html">
                    <div dangerouslySetInnerHTML={{__html: email.htmlBodyWithEmbeddedImages}}/>
                </div>
            </div>

            <EmailAttachmentsPanel email={email} />
        </div>
    );
}

