import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMailgunDomainDetails } from '../../../actions/mailgun-domain/MailgunDomainDetailsActions';
import MailgunDomainDetailsToolbar from './MailgunDomainDetailsToolbar';
import MailgunDomainDetailsForm from './MailgunDomainDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MailgunDomainDetailsApp);
