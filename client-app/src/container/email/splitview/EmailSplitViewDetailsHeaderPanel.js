import React, {useState} from 'react';
import Icon from "react-icons-kit";
import {mailReply} from 'react-icons-kit/fa/mailReply';
import {mailReplyAll} from 'react-icons-kit/fa/mailReplyAll';
import {mailForward} from 'react-icons-kit/fa/mailForward';
import {trash} from 'react-icons-kit/fa/trash';
import {windowRestore} from 'react-icons-kit/fa/windowRestore';
import {Link} from "react-router";
import {useSelector} from 'react-redux'
import InputSelectGroup from "../../../components/form/InputSelectGroup";
import InputSelect from "../../../components/form/InputSelect";
import EmailSplitviewAPI from "../../../api/email/EmailSplitviewAPI";

export default function EmailSplitViewDetailsHeaderPanel({email, updateEmailAttributes}) {
    const defaultCcDisplayLimit = 2;
    const statusses = useSelector((state) => state.systemData.emailStatuses);
    const teams = useSelector((state) => state.systemData.teams);
    const users = useSelector((state) => state.systemData.users);
    const [ccDisplayLimit, setCcDisplayLimit] = useState(defaultCcDisplayLimit);

    const setResonsibleValue = (val) => {
        let values = {
            responsibleUserId: null,
            responsibleTeamId: null,
        };

        if (val.indexOf('user') === 0) {
            values.responsibleUserId = val.replace('user', '');
        }

        if (val.indexOf('team') === 0) {
            values.responsibleTeamId = val.replace('team', '');
        }

        updateEmailAttributes(values);
    }

    const getResponsibleValue = () => {
        if (email.responsibleUserId) {
            return 'user' + email.responsibleUserId;
        }
        if (email.responsibleTeamId) {
            return 'team' + email.responsibleTeamId;
        }

        return '';
    }

    const createReply = () => {
        EmailSplitviewAPI.storeReply(email.id).then(payload => {
            // Todo; open popup
        });
    }

    const createReplyAll = () => {
        EmailSplitviewAPI.storeReplyAll(email.id).then(payload => {
            // Todo; open popup
        });
    }

    const createForward = () => {
        EmailSplitviewAPI.storeForward(email.id).then(payload => {
            // Todo; open popup
        });
    }

    return (
        <div className="panel panel-default">
            <div className="panel-body panel-small">
                <div className="row" style={{marginLeft: '-5px'}}>
                    <div className="col-md-12">
                        <div className="btn-group margin-small" role="group">
                            <button
                                type="button"
                                title="Beantwoorden"
                                className={'btn btn-success btn-sm'}
                                onClick={createReply}
                            >
                                <Icon icon={mailReply} size={13}/>
                            </button>
                            <button
                                type="button"
                                title="Allen beantwoorden"
                                className={'btn btn-success btn-sm'}
                                onClick={createReplyAll}
                            >
                                <Icon icon={mailReplyAll} size={13}/>
                            </button>
                            <button
                                type="button"
                                title="Doorsturen"
                                className={'btn btn-success btn-sm'}
                                onClick={createForward}
                            >
                                <Icon icon={mailForward} size={13}/>
                            </button>
                        </div>
                        <div className="btn-group margin-small margin-10-left" role="group">
                            <button
                                type="button"
                                title="Verwijderen"
                                className={'btn btn-success btn-sm'}
                                // onClick={() => {
                                //     hashHistory.push(`/email/${id}/doorsturen`);
                                // }}
                            >
                                <Icon icon={trash} size={13}/>
                            </button>
                            <button
                                type="button"
                                title="Doorsturen"
                                className={'btn btn-success btn-sm'}
                                // onClick={() => {
                                //     hashHistory.push(`/email/${id}/doorsturen`);
                                // }}
                            >
                                <Icon icon={windowRestore} size={13}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginTop: '12px'}}>
                    <div className="col-sm-6">
                        <label className="col-sm-6">Gekoppeld contact</label>
                        <div className="col-sm-6">
                            {
                                email && email.contacts &&
                                email.contacts.map(contact => {
                                    return (
                                        <span key={contact.id}>
                                        <Link to={`/contact/${contact.id}`} className="link-underline">
                                            {contact.fullName}
                                        </Link>{' '}
                                            <br/>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <InputSelect
                        label={'Status'}
                        size={'col-sm-6'}
                        name={'status'}
                        options={statusses}
                        value={email.status}
                        onChangeAction={(e) => updateEmailAttributes({status: e.target.value})}
                        emptyOption={false}
                    />
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <label className="col-sm-6">CC</label>
                        <div className="col-sm-6">
                            {
                                [...email.ccAddresses].splice(0, ccDisplayLimit).map((cc, index) => {
                                    return (
                                        <span key={cc.id}>
                                            {
                                                index > 0 && (
                                                    <span>, </span>
                                                )
                                            }
                                            {cc.name}
                                        </span>
                                    )
                                })
                            }
                            {
                                email.ccAddresses.length > ccDisplayLimit && (
                                    <>
                                        <br/>
                                        <a href="#" onClick={(e) => {
                                            e.preventDefault();
                                            setCcDisplayLimit(email.ccAddresses.length)
                                        }}>
                                            {email.ccAddresses.length - ccDisplayLimit} meer...
                                        </a>
                                    </>
                                )
                            }
                            {
                                ccDisplayLimit > defaultCcDisplayLimit && (
                                    <>
                                        <br/>
                                        <a href="#" onClick={(e) => {
                                            e.preventDefault();
                                            setCcDisplayLimit(defaultCcDisplayLimit)
                                        }}>
                                            verbergen
                                        </a>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <InputSelectGroup
                        label={'Verantwoordelijke'}
                        size={'col-sm-6'}
                        name={'responsible'}
                        optionsInGroups={[
                            {
                                name: 'user',
                                label: 'Gebruikers',
                                options: users,
                                optionName: 'fullName',
                            },
                            {name: 'team', label: 'Teams', options: teams},
                        ]}
                        value={getResponsibleValue()}
                        onChangeAction={(e) => setResonsibleValue(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

