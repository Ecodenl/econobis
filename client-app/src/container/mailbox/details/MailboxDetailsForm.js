import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchMailboxDetails } from '../../../actions/mailbox/MailboxDetailsActions';
import MailboxDetailsFormGeneral from './general/MailboxDetailsFormGeneral';
import MailboxDetailsUsers from './mailbox-users/MailboxDetailsUsers';
import Panel from "../../../components/panel/Panel";
import PanelHeader from "../../../components/panel/PanelHeader";
import MailboxDetailsIgnores from "./mailbox-ignores/MailboxDetailsIgnores";

class MailboxDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van mailbox.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (isEmpty(this.props.mailboxDetails)) {
            loadingText = 'Geen mailbox gevonden!';
        }
        else {
            loading = false;
        }

        return (
            loading ?
                <div>{loadingText}</div>
                :
                <div>
                    {!this.props.mailboxDetails.valid &&
                        <Panel>
                            <PanelHeader>
                                <span className="h5" style={{color: '#e64a4a'}}>Deze mailbox is onjuist geconfigureerd. Hierdoor zal er geen mail uit deze mailbox gehaald worden. Update de configuratie om de mailbox werkend te krijgen.</span>
                            </PanelHeader>
                        </Panel>
                    }
                    <MailboxDetailsFormGeneral />
                    <MailboxDetailsUsers />
                    <MailboxDetailsIgnores />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        mailboxDetails: state.mailboxDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMailboxDetails: (id) => {
        dispatch(fetchMailboxDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MailboxDetailsForm);
