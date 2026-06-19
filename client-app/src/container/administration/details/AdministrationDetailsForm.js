import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import AdministrationDetailsFormGeneral from './general/AdministrationDetailsFormGeneral';
import AdministrationDetailsUsers from './administration-users/AdministrationDetailsUsers';
import moment from 'moment';
import AdministrationDetailsFormConclusion from './conclusion/AdministrationDetailsFormConclusion';
import AdministrationDetailsSepas from './sepas/AdministrationDetailsSepas';
import Panel from '../../../components/panel/Panel';
import PanelHeader from '../../../components/panel/PanelHeader';
import InvoicePostApp from './invoices-post/InvoicePostApp';
moment.locale('nl');

class AdministrationDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van administratie.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.administrationDetails)) {
            loadingText = 'Geen gegevens gevonden.';
        } else {
            loading = false;
        }
        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                {this.props.administrationDetails.twinfieldIsValid == false &&
                    this.props.administrationDetails.usesTwinfield == true && (
                        <Panel>
                            <PanelHeader>
                                <span className="h5" style={{ color: '#e64a4a' }}>
                                    Twinfield is onjuist geconfigureerd. Pas de configuratie aan om Twinfield te
                                    gebruiken.
                                </span>
                            </PanelHeader>
                        </Panel>
                    )}
                <AdministrationDetailsFormGeneral />
                <AdministrationDetailsUsers />
                <AdministrationDetailsSepas />
                <InvoicePostApp administrationId={this.props.administrationDetails.id} />
                <AdministrationDetailsFormConclusion />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        administrationDetails: state.administrationDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(AdministrationDetailsForm);
