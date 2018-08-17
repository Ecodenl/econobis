import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ParticipantFormGeneral from './form/ParticipantFormGeneral';
import TransactionForm from './transaction/TransactionForm';
import ObligationNumberForm from './obligation-number/ObligationNumberForm';
import moment from "moment/moment";

class ParticipantDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {

        return (
            isEmpty(this.props.participantProductionProject) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
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
