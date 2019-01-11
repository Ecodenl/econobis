import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMailgunDomains, clearMailgunDomains } from '../../../actions/mailgun-domain/MailgunDomainsActions';
import MailgunDomainsList from './MailgunDomainsList';
import MailgunDomainsListToolbar from './MailgunDomainsListToolbar';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";

class MailgunDomainsListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchMailgunDomains();
    };

    componentWillUnmount() {
        this.props.clearMailgunDomains();
    };

    refreshMailgunDomainsData = () => {
        this.props.clearMailgunDomains();
        this.props.fetchMailgunDomains();
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <MailgunDomainsListToolbar
                            refreshMailgunDomainsData={() => this.refreshMailgunDomainsData()}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <MailgunDomainsList
                            mailgunDomains={this.props.mailgunDomains}
                        />
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mailgunDomains: state.mailgunDomains,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMailgunDomains: () => {
        dispatch(fetchMailgunDomains());
    },
    clearMailgunDomains: () => {
        dispatch(clearMailgunDomains());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MailgunDomainsListApp);