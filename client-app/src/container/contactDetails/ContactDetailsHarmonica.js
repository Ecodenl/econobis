import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import RegistrationList from './harmonica/RegistrationList';
import OpportunityList from './harmonica/OpportunityList';
import TaskList from './harmonica/TaskList';

class ContactDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowRegistrations: false,
            toggleShowOpportunities: false,
            toggleShowTasks: false,
        }
    }

    newRegistration = () => {
        const address = this.props.contactDetails.addresses.find((address) => {
            return address.primary
        });

        hashHistory.push(`/aanmelding/nieuw/contact/${this.props.contactDetails.id}/adres/${address.id}`);
    };

    toggleRegistration = () => {
        this.setState({
           toggleShowRegistrations: !this.state.toggleShowRegistrations
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

    render(){
        return (
            <div className="col-md-12 extra-space-above">
                <div className="panel panel-default harmonica-button">
                    <div className="panel-body">
                        <div className="col-sm-9" onClick={this.toggleRegistration}>
                            <span className="">AANMELDINGEN <span className="badge">{ this.props.contactDetails.registrationCount }</span></span>
                        </div>
                        <div className="col-sm-3">
                                <a role="button" className="pull-right" onClick={this.newRegistration}><span className="glyphicon glyphicon-plus glyphicon-white"/></a>
                        </div>
                        { this.state.toggleShowRegistrations && <RegistrationList /> }
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