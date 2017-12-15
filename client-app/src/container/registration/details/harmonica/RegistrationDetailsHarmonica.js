import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Panel from "../../../../components/panel/Panel";
import PanelBody from '../../../../components/panel/PanelBody';
import OpportunityList from './OpportunityList';
import TaskList from './TaskList';

class RegistrationDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowOpportunities: false,
            toggleShowTasks: false,
        }
    };

    newOpportunity = () => {
        hashHistory.push(`/kans/nieuw/aanmelding/${this.props.id}`);
    };

    toggleOpportunity = () => {
        this.setState({
            toggleShowOpportunities: !this.state.toggleShowOpportunities
        });
    };

    newTask = () => {
        hashHistory.push(`/taak/nieuw/aanmelding/${this.props.id}`);
    };

    toggleTask = () => {
        this.setState({
            toggleShowTasks: !this.state.toggleShowTasks
        });
    };
    render(){
        const { permissions = {} } = this.props;
        return (
            <div className="col-md-12 extra-space-above">
                <Panel className={"harmonica-button"}>
                    <PanelBody>
                        <div className="col-sm-12" onClick={this.toggleOpportunity}>
                            <span className="">KANSEN <span className="badge">{ this.props.registrationDetails.opportunityCount }</span></span>
                            {permissions.manageChanges &&
                                <a role="button" className="pull-right" onClick={this.newOpportunity}><span
                                    className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            }
                            { this.state.toggleShowOpportunities && <OpportunityList /> }
                        </div>
                    </PanelBody>
                </Panel>
                <Panel className={"harmonica-button"}>
                    <PanelBody>
                        <div className="col-sm-12" onClick={this.toggleTask}>
                            <span className="">TAKEN <span className="badge">{ this.props.registrationDetails.taskCount }</span></span>
                            {permissions.manageTask &&
                                <a role="button" className="pull-right" onClick={this.newTask}><span
                                    className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            }
                            { this.state.toggleShowTasks && <TaskList /> }
                        </div>
                    </PanelBody>
                </Panel>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        registrationDetails: state.registrationDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(RegistrationDetailsHarmonica);
