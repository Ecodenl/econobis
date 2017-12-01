import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ContactGroupDetailsFormGeneral from './general/ContactGroupDetailsFormGeneral';

class ContactGroupDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.contactGroupDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <ContactGroupDetailsFormGeneral />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        contactGroupDetails: state.contactGroupDetails,
    };
};

export default connect(mapStateToProps, null)(ContactGroupDetailsForm);
