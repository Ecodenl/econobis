import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import {connect} from 'react-redux';

import PanelBody from '../../components/panel/PanelBody'
import SignUpList from './harmonica/SignUpList';
import OpportunityList from './harmonica/OpportunityList';
import TaskList from './harmonica/TaskList';
import ContactGroupList from './harmonica/ContactGroupList';
import AddContactToGroup from './harmonica/AddContactToGroup';

class ContactDetailsHarmonica extends Component {
    constructor(){
        super();

        this.state = {
            toggleShowSignUps: false,
            toggleShowOpportunities: false,
            toggleShowTasks: false,
            toggleShowGroups: false,
            showModalAddGroup: false,
        }
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.id !== nextProps.id) {
            this.setState({
                toggleShowSignUps: false,
                toggleShowOpportunities: false,
                toggleShowTasks: false,
                toggleShowGroups: false,
                showModalAddGroup: false,
            })
        }
    };

    newSignup = () => {
        hashHistory.push(`/aanmelding/nieuw`);
    };

    toggleSignup = () => {
        this.setState({
           toggleShowSignUps: !this.state.toggleShowSignUps
        });
    };

    newOpportunity = () => {
        hashHistory.push(`/kans/nieuw`);
    };

    toggleOpportunity = () => {
        this.setState({
            toggleShowOpportunities: !this.state.toggleShowOpportunities
        });
    };

    newTask = () => {
        hashHistory.push(`/taak/nieuw`);
    };

    toggleTask = () => {
        this.setState({
            toggleShowTasks: !this.state.toggleShowTasks
        });
    };

    toggleAddGroup = () => {
        this.setState({
            showModalAddGroup: !this.state.showModalAddGroup
        });
    };

    toggleGroup = () => {
        this.setState({
            toggleShowGroups: !this.state.toggleShowGroups
        });
    };

    render(){
        return (
            <div className="col-md-12 extra-space-above">
                <div className="panel panel-default harmonica-button">
                    <div className="panel-body">
                        <div className="col-sm-12" onClick={this.toggleSignup}>
                            <span className="">AANMELDINGEN <span className="badge">2</span></span>
                            <a role="button" className="pull-right" onClick={this.newSignup}><span className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            { this.state.toggleShowSignUps && <SignUpList /> }
                        </div>
                    </div>
                </div>
                <div className="panel panel-default harmonica-button">
                    <div className="panel-body">
                        <div className="col-sm-12" onClick={this.toggleOpportunity}>
                            <span className="">KANSEN <span className="badge">4</span></span>
                            <a role="button" className="pull-right" onClick={this.newOpportunity}><span className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            { this.state.toggleShowOpportunities && <OpportunityList /> }
                        </div>
                    </div>
                </div>
                <div className="panel panel-default harmonica-button">
                    <div className="panel-body">
                        <div className="col-sm-12" onClick={this.toggleTask}>
                            <span className="">TAKEN <span className="badge">1</span></span>
                            <a role="button" className="pull-right" onClick={this.newTask}><span className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            { this.state.toggleShowTasks && <TaskList /> }
                        </div>
                    </div>
                </div>
                <div className="panel panel-default harmonica-button">
                    <PanelBody>
                        <div className="col-sm-12">
                            <span onClick={this.toggleGroup} className="">GROEPEN <span className="badge">{ this.props.contactDetails.groupCount }</span></span>
                            <a role="button" className="pull-right" onClick={this.toggleAddGroup}><span className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            { this.state.toggleShowGroups && <ContactGroupList /> }
                        </div>
                    </PanelBody>
                </div>

                { this.state.showModalAddGroup &&
                    <AddContactToGroup
                        toggleAddGroup={this.toggleAddGroup}
                        toggleGroup={this.toggleGroup}
                    />
                }
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsHarmonica);
