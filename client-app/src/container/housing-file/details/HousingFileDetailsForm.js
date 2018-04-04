import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import HousingFileDetailsFormGeneral from './general/HousingFileDetailsFormGeneral';
import HousingFileMeasuresTaken from "./measures-taken/HousingFileMeasuresTaken";
import HousingFileDetailsFormConclusion from "./conclusion/HousingFileDetailsFormConclusion";

class HousingFileDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.housingFileDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <HousingFileDetailsFormGeneral />
                     <HousingFileMeasuresTaken />
                    <HousingFileDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        housingFileDetails: state.housingFileDetails,
    };
};

export default connect(mapStateToProps, null)(HousingFileDetailsForm);
