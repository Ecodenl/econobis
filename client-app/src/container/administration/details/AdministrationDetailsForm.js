import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import AdministrationDetailsFormGeneral from './general/AdministrationDetailsFormGeneral';
import AdministrationDetailsUsers from './administration-users/AdministrationDetailsUsers';
import moment from "moment/moment";
import AdministrationDetailsFormConclusion from "./conclusion/AdministrationDetailsFormConclusion";
import AdministrationDetailsSepas from "./sepas/AdministrationDetailsSepas";
import Panel from "../../../components/panel/Panel";
import PanelHeader from "../../../components/panel/PanelHeader";
import AdministrationLedgerForm from "./ledgers/AdministrationLedgerForm";
moment.locale('nl');

class AdministrationDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.administrationDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    {this.props.administrationDetails.twinfieldIsValid == false && this.props.administrationDetails.usesTwinfield == true &&
                    <Panel>
                        <PanelHeader>
                            <span className="h5" style={{color: '#e64a4a'}}>Twinfield is onjuist geconfigureerd. Pas de configuratie aan om Twinfield te gebruiken.</span>
                        </PanelHeader>
                    </Panel>
                    }
                    <AdministrationDetailsFormGeneral />
                    {this.props.administrationDetails.twinfieldIsValid == true && this.props.administrationDetails.usesTwinfield == true &&
                    <AdministrationLedgerForm/>
                    }
                    <AdministrationDetailsUsers />
                    <AdministrationDetailsSepas />
                    <AdministrationDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        administrationDetails: state.administrationDetails,
    };
};

export default connect(mapStateToProps)(AdministrationDetailsForm);
