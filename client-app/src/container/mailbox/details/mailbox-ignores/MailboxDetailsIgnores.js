import React, { Component } from 'react';

import MailboxDetailsIgnoresList from './MailboxDetailsIgnoresList';
import MailboxDetailsIgnoresNew from './MailboxDetailsIgnoresNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

class MailboxDetailsIgnores extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">
                        Welke e-mailadressen en of domeinnamen moeten niet gekoppeld worden aan contacten
                    </span>
                    {this.props.permissions.createMailbox && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <span className="glyphicon glyphicon-plus" />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <MailboxDetailsIgnoresList />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <MailboxDetailsIgnoresNew toggleShowNew={this.toggleShowNew} />}
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(MailboxDetailsIgnores);
