import React, {useEffect, useState} from 'react';
import EmailAPI from "../../../api/email/EmailAPI";
import EmailSplitViewDetails from "./EmailSplitViewDetails";

export default function EmailSplitView({router}) {
    const perPage = 20;
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

    useEffect(() => {
        if (selectedEmailId) {
            return;
        }

        if (emails.length === 0) {
            return;
        }

        setSelectedEmailId(emails[0].id);
    }, [emails]);

    const fetchMoreEmails = () => {
        return EmailAPI.fetchEmails({
            folder: router.params.folder,
            pagination: {limit: perPage, offset: emails.length},
            sorts: [{field: "date", order: "DESC"}],
        }).then(response => {
            setEmails([...emails, ...response.data.data])
            setEmailCount(response.data.meta.total);
        });
    }

    const getTitle = () => {
        switch (router.params.folder) {
            case 'inbox':
                return 'Inbox';
            case 'sent':
                return 'Verzonden';
            case 'drafts':
                return 'Concepten';
            case 'trash':
                return 'Prullenbak';
            default:
                return 'Onbekend';
        }
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
                    <div className="panel panel-default">
                        <div className="panel-body panel-small"
                             style={{height: "calc(100vh - 160px)", overflow: 'auto'}}>
                            <table className="table table-condensed table-hover table-striped col-xs-12">
                                <thead>
                                <tr className="thead-title">
                                    <th>{getTitle()} ({emailCount})</th>
                                </tr>
                                </thead>

                                <tbody>
                                {emails.length === 0 ? (
                                        <tr>
                                            <td>Geen e-mails gevonden!</td>
                                        </tr>
                                    ) :
                                    emails.map(email => (
                                        <tr key={email.id} style={{cursor: 'pointer'}}>
                                            <td onClick={() => setSelectedEmailId(email.id)}
                                                style={{fontWeight: email.id === selectedEmailId ? 'bold' : 'normal'}}>
                                                <span>{email.subject}</span>
                                                <br/>{email.from}
                                            </td>
                                        </tr>
                                    ))
                                }
                                {emails.length < emailCount && (
                                    <tr>
                                        <td>
                                            <button
                                                className="btn btn-link pull-right"
                                                onClick={() => fetchMoreEmails()}
                                            >
                                                meer laden...
                                            </button>

                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 margin-10-top">
                    <EmailSplitViewDetails emailId={selectedEmailId}/>
                </div>
            </div>
        </div>
    );
}

