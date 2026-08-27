import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMailgunDomainDetails } from '../../../actions/mailgun-domain/MailgunDomainDetailsActions';
import MailgunDomainDetailsToolbar from './MailgunDomainDetailsToolbar';
import MailgunDomainDetailsForm from './MailgunDomainDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import MailgunDomainDetailsBounces from './MailgunDomainDetailsBounces';
import MailgunDomainDetailsComplaints from './MailgunDomainDetailsComplaints';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const MailgunDomainDetailsAppWrapper = props => {
    const params = useParams();
    return <MailgunDomainDetailsApp {...props} params={params} />;
};

class MailgunDomainDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchMailgunDomainDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <MailgunDomainDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <MailgunDomainDetailsForm />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <MailgunDomainDetailsBounces mailgunDomainId={this.props.params.id} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <MailgunDomainDetailsComplaints mailgunDomainId={this.props.params.id} />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mailgunDomainDetails: state.mailgunDomainDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMailgunDomainDetails: id => {
        dispatch(fetchMailgunDomainDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MailgunDomainDetailsAppWrapper);
