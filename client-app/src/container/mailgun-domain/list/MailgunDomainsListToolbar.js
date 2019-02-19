import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const MailgunDomainsListToolbar = props => {
    const newMailgunDomain = () => {
        hashHistory.push(`/mailgun-domein/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.refreshMailgunDomainsData} />
                    {props.permissions.manageMailgunDomain && (
                        <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newMailgunDomain} />
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Mailgun domeinen</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {props.mailgunDomains ? props.mailgunDomains.length : 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        mailgunDomains: state.mailgunDomains,
    };
};

export default connect(
    mapStateToProps,
    null
)(MailgunDomainsListToolbar);
