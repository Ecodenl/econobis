import React, {useEffect, useState} from 'react';
import EmailSplitviewAPI from "../../../api/email/EmailSplitviewAPI";
import EmailSplitViewDetailsHeaderPanel from "./EmailSplitViewDetailsHeaderPanel";
import EmailSplitViewDetailsAttachmentsPanel from "./EmailSplitViewDetailsAttachmentsPanel";

export default function EmailSplitViewDetails({emailId}) {
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

        EmailSplitviewAPI.update(emailId, attributes);
    }

    if (isLoading || !email) {
        return (
            <div>Laden...</div>
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

            <EmailSplitViewDetailsAttachmentsPanel email={email} />
        </div>
    );
}

