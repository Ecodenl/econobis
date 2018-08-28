import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import AdministrationDetailsFormGeneral from './general/AdministrationDetailsFormGeneral';
import AdministrationDetailsUsers from './administration-users/AdministrationDetailsUsers';
import moment from "moment/moment";
import AdministrationDetailsFormConclusion from "./conclusion/AdministrationDetailsFormConclusion";
import AdministrationDetailsSepas from "./sepas/AdministrationDetailsSepas";
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
                    <AdministrationDetailsFormGeneral />
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
