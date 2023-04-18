import React, {useEffect, useState} from 'react';
import EmailAPI from "../../../api/email/EmailAPI";
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
        EmailAPI.fetchEmail(emailId).then(data => {
            setEmail(data);
            setIsLoading(false);
        });
    }

    if (isLoading || !email) {
        return (
            <div>Laden...</div>
        )
    }

    return (
        <div>
            <EmailSplitViewDetailsHeaderPanel email={email} />

            <div className="panel panel-default">
                <div className="panel-body panel-small" style={{padding: '20px'}}>
                    <div dangerouslySetInnerHTML={{__html: email.htmlBodyWithEmbeddedImages}}/>
                </div>
            </div>

            <EmailSplitViewDetailsAttachmentsPanel email={email} />
        </div>
    );
}

