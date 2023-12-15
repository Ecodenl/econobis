import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const EmailsInListToolbar = props => {
    const newMailbox = () => {
        hashHistory.push(`/email/nieuw`);
    };

    const { meta = {} } = props.emails;

    return (
        <div className="row">
            <div className="col-xs-12">
                <div className="alert alert-info" role="alert">
                    Uitvoeren mappen ontvangen wordt tijdelijk alleen 's ochtends rond 8.00 automatisch gedaan en niet
                    meer elke 10 minuten (tussen 08.00 en 20.00). Gebruik knop "Alle mappen ontvangen" op deze pagina om
                    nieuwe e-mails te ontvangen.
                </div>
            </div>
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon
                        iconName={'refresh'}
                        onClickAction={props.refreshData}
                        title={'Alle mappen ontvangen'}
                    />
                    <ButtonIcon iconName={'plus'} onClickAction={newMailbox} title={'Nieuwe e-mail'} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">
                    {props.me ? 'Eigen e-mail' : 'E-mail'} {props.folder}{' '}
                </h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        emails: state.emails.list,
    };
};

export default connect(mapStateToProps, null)(EmailsInListToolbar);
