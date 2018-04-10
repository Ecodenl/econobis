import React, { Component } from 'react';

import CampaignDetailsConclusionView from './CampaignDetailsConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import CampaignDetailsConclusionEdit from "./CampaignDetailsConclusionEdit";
import {connect} from "react-redux";

class CampaignDetailsConclusionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        })
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        })
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    };

    onDivLeave() {
        if(!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    };

    render() {
        return (
            <Panel className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()}
                   onMouseLeave={() => this.onDivLeave()}>
                <PanelBody>
                    {
                        this.state.showEdit && this.props.permissions.manageMarketing ?
                            <CampaignDetailsConclusionEdit switchToView={this.switchToView}/>
                            :
                            <CampaignDetailsConclusionView switchToEdit={this.switchToEdit}/>
                    }
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(CampaignDetailsConclusionForm);