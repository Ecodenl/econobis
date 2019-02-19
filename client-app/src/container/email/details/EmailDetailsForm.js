import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import EmailFormGeneral from './general/EmailFormGeneral';
import EmailDetailsAttachments from './attachments/EmailDetailsAttachments';
import PanelDeletedItem from '../../../components/panel/PanelDeletedItem';

class EmailDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return isEmpty(this.props.email) ? (
            <div>Geen gegevens gevonden.</div>
        ) : (
            <div>
                {this.props.email.folder === 'removed' && (
                    <PanelDeletedItem
                        text={'Deze e-mail is verwijderd.'}
                        restoreAction={this.props.restoreEmail}
                        restoreText={'Klik hier om verwijderen ongedaan te maken.'}
                    />
                )}
                <EmailFormGeneral />
                <EmailDetailsAttachments />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.email,
    };
};

export default connect(mapStateToProps)(EmailDetailsForm);
