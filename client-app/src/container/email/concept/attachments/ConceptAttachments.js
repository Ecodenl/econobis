import React, { Component } from 'react';

import ConceptAttachmentsList from './ConceptAttachmentsList';
import ConceptAttachmentsNew from './ConceptAttachmentsNew';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import {connect} from "react-redux";

class ConceptAttachments extends Component {
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
                        <ConceptAttachmentsList attachments={this.props.attachments}/>
                    </div>
                    <div className="col-md-12 extra-space-above">
                        {this.state.showNew &&
                        <ConceptAttachmentsNew toggleShowNew={this.toggleShowNew} onDrop={this.props.onDrop}/>}
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

export default connect(mapStateToProps)(ConceptAttachments);