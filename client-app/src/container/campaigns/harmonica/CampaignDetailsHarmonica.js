import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Panel from "../../../components/panel/Panel";
import PanelBody from '../../../components/panel/PanelBody';
import TaskList from "./TaskList";

class CampaignDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowTasks: false,
        }
    };

    newTask = () => {
        hashHistory.push(`/taak/nieuw/campagne/${this.props.id}`);
    };

    toggleTask = () => {
        this.setState({
            toggleShowTasks: !this.state.toggleShowTasks
        });
    };

    newDocument = () => {
        hashHistory.push(`/document/nieuw/`);
    };

    render(){
        const { permissions = {} } = this.props;
        return (
            <div className="col-md-12 extra-space-above">
                <Panel className={"harmonica-button"}>
                    <PanelBody>
                        <div className="col-sm-12" onClick={this.toggleTask}>
                            <span className="">TAKEN <span className="badge">{ this.props.campaign.taskCount }</span></span>
                            {permissions.manageTask &&
                            <a role="button" className="pull-right" onClick={this.newTask}><span
                                className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            }
                            { this.state.toggleShowTasks && <TaskList /> }
                        </div>
                    </PanelBody>
                </Panel>
                <Panel className={"harmonica-button"}>
                    <PanelBody>
                        <div className="col-sm-12">
                            <span className="">DOCUMENTEN <span className="badge">3</span></span>
                                <a role="button" className="pull-right" onClick={this.newDocument}><span
                                    className="glyphicon glyphicon-plus glyphicon-white"/></a>
                        </div>
                    </PanelBody>
                </Panel>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        campaign: state.campaignDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(CampaignDetailsHarmonica);
