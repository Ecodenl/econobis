import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ParticipantFormGeneral from './form/ParticipantFormGeneral';

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
                    <ParticipantFormGeneral />
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
