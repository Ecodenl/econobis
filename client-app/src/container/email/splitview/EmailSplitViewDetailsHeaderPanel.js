import React from 'react';
import Icon from "react-icons-kit";
import {mailReply} from 'react-icons-kit/fa/mailReply';
import {mailReplyAll} from 'react-icons-kit/fa/mailReplyAll';
import {mailForward} from 'react-icons-kit/fa/mailForward';
import {trash} from 'react-icons-kit/fa/trash';
import {windowRestore} from 'react-icons-kit/fa/windowRestore';
import InputReactSelect from "../../../components/form/InputReactSelect";
import {Link} from "react-router";

export default function EmailSplitViewDetailsHeaderPanel({email}) {
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
                    <InputReactSelect
                        label={'Verantwoordelijke'}
                        size={'col-sm-6'}
                        name={'intakeId'}
                        options={[]}
                        value={'1'}
                        clearable={true}
                        onChangeAction={() => {
                        }}
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

