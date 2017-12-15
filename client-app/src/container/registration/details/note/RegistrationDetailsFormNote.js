import React, { Component} from 'react';

import RegistrationDetailsFormNoteList from './RegistrationDetailsFormNoteList';
import RegistrationDetailsFormNoteNew from './RegistrationDetailsFormNoteNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import {connect} from "react-redux";

class RegistrationDetailsFormNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }


    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        })
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opmerkingen</span>
                    {this.props.permissions.manageRegistration &&
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}><span className="glyphicon glyphicon-plus"/></a>
                    }
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <RegistrationDetailsFormNoteList />
                    </div>
                    <div className="col-md-12 extra-space-above">
                        { this.state.showNew && <RegistrationDetailsFormNoteNew toggleShowNew={this.toggleShowNew} /> }
                    </div>
                </PanelBody>
            </Panel>

        );
    }
};
const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(RegistrationDetailsFormNote);
