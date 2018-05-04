import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import AdministrationDetailsFormGeneral from './general/AdministrationDetailsFormGeneral';
import AdministrationDetailsUsers from './administration-users/AdministrationDetailsUsers';
import moment from "moment/moment";
import PanelDeletedItem from "../../../components/panel/PanelDeletedItem";
import AdministrationDetailsFormConclusion from "./conclusion/AdministrationDetailsFormConclusion";
moment.locale('nl');

class AdministrationDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        const { deletedAt } = this.props.administrationDetails;
        return (
            isEmpty(this.props.administrationDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    { deletedAt &&
                    <PanelDeletedItem
                        text={`Deze administratie is verwijderd op ${moment(deletedAt).format('L')}.`}
                    />
                    }
                    <AdministrationDetailsFormGeneral />
                    <AdministrationDetailsUsers />
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
