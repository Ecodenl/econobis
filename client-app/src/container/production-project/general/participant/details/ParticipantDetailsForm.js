import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ParticipantFormGeneral from './form/ParticipantFormGeneral';
import TransactionForm from './transaction/TransactionForm';
import ObligationNumberForm from './obligation-number/ObligationNumberForm';
import moment from "moment/moment";
import PanelDeletedItem from "../../../../../components/panel/PanelDeletedItem";

class ParticipantDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {

        return (
            isEmpty(this.props.participantProductionProject) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    { this.props.participantProductionProject.deletedAt &&
                    <PanelDeletedItem
                        text={`Deze participatie is verwijderd op ${moment(this.props.participantProductionProject.deletedAt).format('L')}.`}
                    />
                    }
                    <ParticipantFormGeneral />
                    <TransactionForm />
                    <ObligationNumberForm />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        participantProductionProject: state.participantProductionProjectDetails,
    }
};

export default connect(mapStateToProps)(ParticipantDetailsForm);
