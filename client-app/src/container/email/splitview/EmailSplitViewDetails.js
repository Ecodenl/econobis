import React, { useContext, useEffect, useState } from 'react';
import EmailSplitViewDetailsHeaderPanel from './EmailSplitViewDetailsHeaderPanel';
import EmailAttachmentsPanel from '../../../components/email/EmailAttachmentsPanel';
import EmailGenericAPI from '../../../api/email/EmailGenericAPI';
import EmailSplitviewAPI from '../../../api/email/EmailSplitviewAPI';
import { EmailModalContext } from '../../../context/EmailModalContext';
import Frame from 'react-frame-component';

export default function EmailSplitViewDetails({ emailId, updatedEmailHandler, deleted, folder }) {
    const { isEmailDetailsModalOpen, isEmailSendModalOpen, modalEmailId } = useContext(EmailModalContext);
    const [email, setEmail] = useState({ attachments: [], toAddresses: [], contacts: [], manualContacts: [] });
    const { openEmailSendModal } = useContext(EmailModalContext);

    useEffect(() => {
        if (!isEmailDetailsModalOpen && email.id === modalEmailId) {
            fetchEmail();
        }
    }, [isEmailDetailsModalOpen]);

    useEffect(() => {
        /**
         * Als het mail verzenden scherm sluit kan dit over de huidige mail (in splitview) gaan maar ook een reply(all), forward of nieuwe mail.
         * Bij sluiten van het send modal altijd huidige mail vernieuwen omdat bij een reply(all) ook de status van de oorspronkelijke mail wordt gewijzigd.
         *
         * Hierdoor wordt de mail ook vernieuwd bij nieuwe email of een forward, dit is eigenlijk niet nodig maar het wordt onnodig complex om dit af te vangen.
         */
        if (!isEmailSendModalOpen) {
            fetchEmail();
        }
    }, [isEmailSendModalOpen]);

    useEffect(() => {
        fetchEmail();
    }, [emailId]);

    const fetchEmail = () => {
        if (!emailId) {
            return;
        }

        EmailSplitviewAPI.fetchEmail(emailId).then(data => {
            setEmail(data);
        });
    };

    const updateEmailAttributes = attributes => {
        setEmail({
            ...email,
            ...attributes,
        });

        EmailGenericAPI.update(emailId, attributes).then(() => {
            updatedEmailHandler();
        });
    };

    // FIXME : captureMailtoLinks werkt niet goed (ook niet in EmailDetailsModalLayout.js).
    //  voorlopig even geen captureMailtoLinks click event
    // useEffect(() => {
    //     document.getElementById("split-view-email-html").addEventListener("click", captureMailtoLinks);
    //
    //     return () => {
    //         if(document.getElementById("split-view-email-html")){
    //             document.getElementById("split-view-email-html").removeEventListener("click", captureMailtoLinks);
    //         }
    //     }
    // }, []);
    //
    // const captureMailtoLinks = (event) => {
    //     if (event.target.tagName === 'A' && event.target.href && event.target.href.indexOf('mailto:') !== -1) {
    //         event.preventDefault();
    //
    //         if(confirm('Wil je een e-mail opstellen aan mailadres ' + event.target.href.replace('mailto:', '') + '?')) {
    //             EmailGenericAPI.storeNew({
    //                 to: [event.target.href.replace('mailto:', '')],
    //             }).then(payload => {
    //                 openEmailSendModal(payload.data.id)
    //             });
    //         }
    //     }
    // }

    if (!email) {
        return <></>;
    }

    return (
        <div>
            {email.folder === 'removed' && folder !== 'removed' && (
                <div className="panel panel-default">
                    <div className="panel-body panel-small">
                        <div className="row" style={{ marginLeft: '-5px' }}>
                            <div className="col-md-12">
                                <span className="h5" style={{ color: '#e64a4a' }}>
                                    Deze e-mail is verwijderd.&nbsp;
                                    <a
                                        style={{ color: '#e64a4a', cursor: 'pointer' }}
                                        onClick={() => updateEmailAttributes({ folder: folder })}
                                    >
                                        <strong>Klik hier om verwijderen ongedaan te maken.</strong>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <EmailSplitViewDetailsHeaderPanel
                email={email}
                updateEmailAttributes={updateEmailAttributes}
                deleted={deleted}
            />

            <div className="panel panel-default">
                <div className="panel-body panel-small" style={{ padding: '20px' }} id="split-view-email-html">
                    <Frame style={{ height: 'calc(100vh - 550px)' }}>
                        <div dangerouslySetInnerHTML={{ __html: email.htmlBodyWithEmbeddedImages }} />
                    </Frame>
                </div>
            </div>

            <EmailAttachmentsPanel email={email} />
        </div>
    );
}
