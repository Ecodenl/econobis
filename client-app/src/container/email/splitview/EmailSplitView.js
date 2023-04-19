import React, {useEffect, useState} from 'react';
import EmailSplitviewAPI from "../../../api/email/EmailSplitviewAPI";
import EmailSplitViewDetails from "./EmailSplitViewDetails";
import EmailSplitViewSelectList from "./EmailSplitViewSelectList";

export default function EmailSplitView({router}) {
    const perPage = 50;
    const [emails, setEmails] = useState([]);
    const [emailCount, setEmailCount] = useState([]);
    const [selectedEmailId, setSelectedEmailId] = useState(null);

    useEffect(() => {
        reset();
    }, [router.params.folder]);

    const reset = () => {
        setEmails([]);
        setEmailCount(0);
        setSelectedEmailId(null);
        fetchMoreEmails();
    }

    const fetchMoreEmails = () => {
        return EmailSplitviewAPI.fetchSelectList({
            filter: getFilter(),
            limit: perPage,
            offset: emails.length,
            sorts: getSorts(),
        }).then(response => {
            setEmails([...emails, ...response.data.items])
            setEmailCount(response.data.total);
        });
    }

    const updateEmailAttributes = (emailId, attributes) => {
        const newEmails = emails.map(email => {
            if (email.id === emailId) {
                return {...email, ...attributes};
            }

            return email;
        });

        setEmails(newEmails);
    }

    const getFilter = () => {
        return {
            and: [
                {
                    f: 'folder',
                    d: router.params.folder,
                }
            ]
        }
    }

    const getSorts = () => {
        return ['-dateSent'];
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12 margin-10-top">
                    <div className="panel panel-default">
                        <div className="panel-body panel-small">
                            <div className="row">
                                <div className="col-md-4">
                                    Filters
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 margin-10-top" style={{paddingRight: '0px'}}>
                    <EmailSplitViewSelectList
                        emails={emails}
                        folder={router.params.folder}
                        emailCount={emailCount}
                        fetchMoreEmails={fetchMoreEmails}
                        selectedEmailId={selectedEmailId}
                        setSelectedEmailId={setSelectedEmailId}
                        updateEmailAttributes={updateEmailAttributes}
                    />
                </div>
                <div className="col-md-8 margin-10-top">
                    <EmailSplitViewDetails emailId={selectedEmailId}/>
                </div>
            </div>
        </div>
    );
}

