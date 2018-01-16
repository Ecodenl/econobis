import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import EmailFormGeneral from './general/EmailFormGeneral';
import EmailDetailsAttachments from './attachments/EmailDetailsAttachments';

class EmailDetailsForm extends Component {
    constructor(props){
        super(props);
    };


    render() {

        return (
            isEmpty(this.props.email) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <EmailFormGeneral />
                    <EmailDetailsAttachments/>
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        email: state.email,
    }
};

export default connect(mapStateToProps)(EmailDetailsForm);
