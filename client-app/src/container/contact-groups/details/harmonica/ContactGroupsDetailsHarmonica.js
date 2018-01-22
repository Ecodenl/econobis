import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Panel from "../../../../components/panel/Panel";
import PanelBody from '../../../../components/panel/PanelBody';
import TaskList from './TaskList';

class RegistrationDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowOpportunities: false,
            toggleShowTasks: false,
        }
    };

    newTask = () => {
        hashHistory.push(`/taak/nieuw/contact-groep/${this.props.id}`);
    };

    toggleTask = () => {
        this.setState({
            toggleShowTasks: !this.state.toggleShowTasks
        });
    };
    render(){
        const { permissions = {} } = this.props;
        return (
            <div className="col-md-12 margin-10-top">
                <Panel className={"harmonica-button"}>
                    <PanelBody>
                        <div className="col-sm-12" onClick={this.toggleTask}>
                            <span className="">TAKEN <span className="badge">{ this.props.contactGroupDetails.taskCount }</span></span>
                            {permissions.manageTask &&
                            <a role="button" className="pull-right" onClick={this.newTask}><span
                                className="glyphicon glyphicon-plus glyphicon-white"/></a>

                            }{ this.state.toggleShowTasks && <TaskList /> }
                        </div>
                    </PanelBody>
                </Panel>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        contactGroupDetails: state.contactGroupDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(RegistrationDetailsHarmonica);
