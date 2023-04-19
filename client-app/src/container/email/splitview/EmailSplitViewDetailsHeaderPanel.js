import React from 'react';
import Icon from "react-icons-kit";
import {mailReply} from 'react-icons-kit/fa/mailReply';
import {mailReplyAll} from 'react-icons-kit/fa/mailReplyAll';
import {mailForward} from 'react-icons-kit/fa/mailForward';
import {trash} from 'react-icons-kit/fa/trash';
import {windowRestore} from 'react-icons-kit/fa/windowRestore';
import InputReactSelect from "../../../components/form/InputReactSelect";
import {Link} from "react-router";
import { useSelector } from 'react-redux'
import InputSelectGroup from "../../../components/form/InputSelectGroup";
import EmailSplitviewAPI from "../../../api/email/EmailSplitviewAPI";

export default function EmailSplitViewDetailsHeaderPanel({email, setEmail}) {
    const teams = useSelector((state) => state.systemData.teams);
    const users = useSelector((state) => state.systemData.users);

    const setResonsibleValue = (val) => {
        if(val.indexOf('user') === 0) {
            email.responsibleUserId = val.replace('user', '');
            email.responsibleTeamId = null;
        }

        if(val.indexOf('team') === 0) {
            email.responsibleTeamId = val.replace('team', '');
            email.responsibleUserId = null;
        }

        setEmail({...email});

        EmailSplitviewAPI.updateEmail(email);
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
                                // onClick={() => {
                                //     hashHistory.push(`/email/${id}/beantwoorden`);
                                // }}
                            >
                                <Icon icon={mailReply} size={13}/>
                            </button>
                            <button
                                type="button"
                                title="Allen beantwoorden"
                                className={'btn btn-success btn-sm'}
                                // onClick={() => {
                                //     hashHistory.push(`/email/${id}/allenbeantwoorden`);
                                // }}
                            >
                                <Icon icon={mailReplyAll} size={13}/>
                            </button>
                            <button
                                type="button"
                                title="Doorsturen"
                                className={'btn btn-success btn-sm'}
                                // onClick={() => {
                                //     hashHistory.push(`/email/${id}/doorsturen`);
                                // }}
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
                    <InputReactSelect
                        label={'Status'}
                        size={'col-sm-6'}
                        name={'intakeId'}
                        options={[]}
                        value={'1'}
                        clearable={true}
                        onChangeAction={() => {
                        }}
                    />
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
                            { name: 'team', label: 'Teams', options: teams },
                        ]}
                        value={getResponsibleValue()}
                        onChangeAction={(e) => setResonsibleValue(e.target.value)}
                    />
                </div>
                <div className="row">
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
                    <div className="col-sm-6">
                        <label className="col-sm-6">CC</label>
                        <div className="col-sm-6">
                            {
                                email.cc &&
                                email.emailAddressesCcSelected.map(cc => {
                                    return (
                                        <span key={cc.email}>
                                        {cc.name}<br/>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

