import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const RegistrationDetailsFormConclusionView = props => {
    //const { createdBy = {}, updatedBy = {},  owner = {} } = props.registrationDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={"Ingevoerd door"}
                    value={'Admin'}
                />
                <ViewText
                    label={"Laatst bewerkt door"}
                    value={''}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Eigenaar"
                    value={''}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        registrationDetails: state.registrationDetails,
    };
};

export default connect(mapStateToProps)(RegistrationDetailsFormConclusionView);