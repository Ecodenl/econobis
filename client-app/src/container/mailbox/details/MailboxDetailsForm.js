import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchMailboxDetails } from '../../../actions/mailbox/MailboxDetailsActions';
import MailboxDetailsFormGeneral from './general/MailboxDetailsFormGeneral';
import MailboxDetailsUsers from './mailbox-users/MailboxDetailsUsers';
import Panel from "../../../components/panel/Panel";
import PanelHeader from "../../../components/panel/PanelHeader";

class MailboxDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.mailboxDetails) ?
                <div>Geen gegevens gevonden.</div>
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
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        mailboxDetails: state.mailboxDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMailboxDetails: (id) => {
        dispatch(fetchMailboxDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MailboxDetailsForm);
