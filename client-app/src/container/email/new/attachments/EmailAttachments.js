import React, { Component } from 'react';

import EmailAttachmentsList from './EmailAttachmentsList';
import EmailAttachmentsNew from './EmailAttachmentsNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import {connect} from "react-redux";

class EmailAttachments extends Component {
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
            <div>
                <PanelHeader>
                    <span className="h5 text-bold">Bijlages</span>
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}><span
                        className="glyphicon glyphicon-plus"/>
                    </a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <EmailAttachmentsList attachments={this.props.attachments}/>
                    </div>
                    <div className="col-md-12 extra-space-above">
                        {this.state.showNew &&
                        <EmailAttachmentsNew toggleShowNew={this.toggleShowNew} onDrop={this.props.onDrop}/>}
                    </div>
                </PanelBody>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(EmailAttachments);