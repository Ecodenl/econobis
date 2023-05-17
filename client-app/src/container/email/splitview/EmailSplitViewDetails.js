import React, {useEffect, useState} from 'react';
import EmailSplitViewDetailsHeaderPanel from "./EmailSplitViewDetailsHeaderPanel";
import EmailAttachmentsPanel from "../../../components/email/EmailAttachmentsPanel";
import EmailGenericAPI from "../../../api/email/EmailGenericAPI";
import EmailSplitviewAPI from "../../../api/email/EmailSplitviewAPI";

export default function EmailSplitViewDetails({emailId, updatedEmailHandler}) {
    const [email, setEmail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!emailId) {
            return;
        }

        fetchEmail();
    }, [emailId]);

    const fetchEmail = () => {
        setIsLoading(true);
        EmailSplitviewAPI.fetchEmail(emailId).then(data => {
            setEmail(data);
            setIsLoading(false);
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

    if (isLoading || !email) {
        return (
            <></>
        )
    }

    return (
        <div>
            <EmailSplitViewDetailsHeaderPanel email={email} updateEmailAttributes={updateEmailAttributes} updatedEmailHandler={() => {fetchEmail(); updatedEmailHandler();}} />

            <div className="panel panel-default">
                <div className="panel-body panel-small" style={{padding: '20px'}}>
                    <div dangerouslySetInnerHTML={{__html: email.htmlBodyWithEmbeddedImages}}/>
                </div>
            </div>

            <EmailAttachmentsPanel email={email} />
        </div>
    );
}

