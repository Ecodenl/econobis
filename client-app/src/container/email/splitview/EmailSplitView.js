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

    const refetchCurrentEmails = () => {
        return EmailSplitviewAPI.fetchSelectList({
            filter: getFilter(),
            limit: emails.length,
            offset: 0,
            sorts: getSorts(),
        }).then(response => {
            setEmails(response.data.items)
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
                <div className="col-md-12" style={{marginTop: '-10px'}}>
                    <div className="panel panel-default">
                        <div className="panel-body panel-small">
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-condensed table-hover table-striped col-xs-12" style={{marginBottom: '0px'}}>
                                    <thead>
                                    <tr className="thead-title">
                                        <th className="" width="10%">Van e-mail</th>
                                        <th className="" width="10%">Gekoppeld contact</th>
                                        <th className="" width="15%">Onderwerp</th>
                                        <th className="" width="10%">Datum</th>
                                        <th className="" width="15%">Mailbox</th>
                                        <th className="" width="10%">Status</th>
                                        <th className="" width="10%">Verantwoordelijke</th>
                                        <th className="" width="10%">Aan</th>
                                        <th className="" width="5%">Bijlage</th>
                                    </tr>
                                    <tr className="thead-filter">
                                        <th className="DayPicker-overflow ">
                                            <div className="DayPickerInput"><input placeholder=""
                                                                                   className="form-control input-sm"
                                                                                   value=""/></div>
                                        </th>
                                        <th><input type="text" className="form-control input-sm" value=""/></th>
                                        <th><input type="text" className="form-control input-sm" value=""/></th>
                                        <th><input type="text" className="form-control input-sm" value=""/></th>
                                        <th><input type="text" className="form-control input-sm" value=""/></th>
                                        <th><select className="form-control input-sm">
                                            <option></option>
                                            <option value="null">Geen status</option>
                                            <option value="unread">Ongelezen</option>
                                            <option value="read">Gelezen</option>
                                            <option value="in_progress">In behandeling</option>
                                            <option value="urgent">Urgent</option>
                                            <option value="closed">Afgehandeld</option>
                                        </select></th>
                                        <th><input type="text" className="form-control input-sm" value=""/></th>
                                        <th><input type="text" className="form-control input-sm" value=""/></th>
                                        <th><select className="form-control input-sm">
                                            <option></option>
                                        </select></th>
                                    </tr>
                                    </thead>
                                    </table>
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
                    <EmailSplitViewDetails emailId={selectedEmailId} updatedEmailHandler={refetchCurrentEmails}/>
                </div>
            </div>
        </div>
    );
}

