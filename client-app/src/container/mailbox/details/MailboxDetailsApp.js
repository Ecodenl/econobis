import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMailboxDetails } from '../../../actions/mailbox/MailboxDetailsActions';
import MailboxDetailsToolbar from './MailboxDetailsToolbar';
import MailboxDetailsForm from './MailboxDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const MailboxDetailsAppWrapper = props => {
    const params = useParams();
    return <MailboxDetailsApp {...props} params={params} />;
};

class MailboxDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchMailboxDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <MailboxDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <MailboxDetailsForm />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mailboxDetails: state.mailboxDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMailboxDetails: id => {
        dispatch(fetchMailboxDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MailboxDetailsAppWrapper);
