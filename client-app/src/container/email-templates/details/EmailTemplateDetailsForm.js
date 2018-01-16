import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchEmailTemplate } from '../../../actions/email-templates/EmailTemplateDetailsActions';
import EmailTemplateFormGeneral from './general/EmailTemplateFormGeneral';


class EmailTemplateDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.emailTemplate) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <EmailTemplateFormGeneral />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        emailTemplate: state.emailTemplate,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchEmailTemplate: (id) => {
        dispatch(fetchEmailTemplate(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplateDetailsForm);
