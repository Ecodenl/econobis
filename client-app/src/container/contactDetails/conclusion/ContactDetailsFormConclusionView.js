import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../components/form/ViewText';

const ContactDetailsFormConclusionView = props => {
    const { createdBy = {}, updatedBy = {},  owner = {} } = props.contactDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={"Ingevoerd door"}
                    value={createdBy.name}
                />
                <ViewText
                    label={"Laatst bewerkt door"}
                    value={updatedBy.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Eigenaar"
                    value={ owner && owner.name}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormConclusionView);