import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, hashHistory } from 'react-router';
import Icon from 'react-icons-kit';
import { mailReply } from 'react-icons-kit/fa/mailReply';
import { mailReplyAll } from 'react-icons-kit/fa/mailReplyAll';
import { mailForward } from 'react-icons-kit/fa/mailForward';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';

const EmailDetailsToolbar = ({ email, id, removeEmail }) => {
    const { from } = email;
    let removeButtonClass = 'btn-success btn-sm';

    if (email.folder === 'removed') {
        removeButtonClass = 'btn-danger btn-sm';
    }

    return (
        <div className="row">
            <div className="col-sm-12">
                <Panel>
                    <PanelBody className={'panel-small'}>
                        <div className="col-md-4">
                            <div className="btn-group margin-small margin-10-right" role="group">
                                <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                            </div>
                            <div className="btn-group margin-small" role="group">
                                <button
                                    type="button"
                                    title="Beantwoorden"
                                    className={'btn btn-success btn-sm'}
                                    onClick={() => {
                                        hashHistory.push(`/email/${id}/beantwoorden`);
                                    }}
                                >
                                    <Icon icon={mailReply} size={13} />
                                </button>
                                <button
                                    type="button"
                                    title="Allen beantwoorden"
                                    className={'btn btn-success btn-sm'}
                                    onClick={() => {
                                        hashHistory.push(`/email/${id}/allenbeantwoorden`);
                                    }}
                                >
                                    <Icon icon={mailReplyAll} size={13} />
                                </button>
                                <button
                                    type="button"
                                    title="Doorsturen"
                                    className={'btn btn-success btn-sm'}
                                    onClick={() => {
                                        hashHistory.push(`/email/${id}/doorsturen`);
                                    }}
                                >
                                    <Icon icon={mailForward} size={13} />
                                </button>
                            </div>
                            <div className="btn-group margin-small margin-10-left" role="group">
                                <ButtonIcon
                                    iconName={'glyphicon-trash'}
                                    onClickAction={removeEmail}
                                    buttonClassName={removeButtonClass}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h4 className="text-center text-success margin-small">
                                <strong>{from ? 'E-mail van: ' + from : ''}</strong>
                            </h4>
                        </div>
                        <div className="col-md-4" />
                    </PanelBody>
                </Panel>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        email: state.email,
        // permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(EmailDetailsToolbar);
