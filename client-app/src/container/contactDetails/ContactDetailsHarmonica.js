import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import RegistrationList from './harmonica/RegistrationList';
import Panel from "../../components/panel/Panel";
import PanelBody from '../../components/panel/PanelBody';
import OpportunityList from './harmonica/OpportunityList';
import TaskList from './harmonica/TaskList';
import ContactGroupList from './harmonica/ContactGroupList';
import AddContactToGroup from './harmonica/AddContactToGroup';
import ErrorModal from '../../components/modal/ErrorModal';

class ContactDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowRegistrations: false,
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
                showModalError: false,
            })
        }
    };

    newRegistration = () => {
        let address = this.props.contactDetails.addresses.find((address) => {
            return address.primary
        });
        if (typeof address === 'undefined') {
            address = this.props.contactDetails.addresses[0];
            if (typeof address === 'undefined') {
                this.setState({
                    showModalError: !this.state.showModalError,
                    modalErrorTitle: 'Waaschuwing',
                    modalErrorMessage: 'Dit contact heeft nog geen adres.',
                });
            }
            else
                {
                    hashHistory.push(`/aanmelding/nieuw/contact/${this.props.contactDetails.id}/adres/${address.id}`);
                }
            }
        else {
            hashHistory.push(`/aanmelding/nieuw/contact/${this.props.contactDetails.id}/adres/${address.id}`);
        }
    };

    toggleErrorModal = () => {
        this.setState({
            showModalError: !this.state.showModalError
        });
    };
    toggleRegistration = () => {
        this.setState({
           toggleShowRegistrations: !this.state.toggleShowRegistrations
        });
    };

    newOpportunity = () => {
        hashHistory.push(`/kans/nieuw/contact/${this.props.id}`);
    };

    toggleOpportunity = () => {
        this.setState({
            toggleShowOpportunities: !this.state.toggleShowOpportunities
        });
    };

    newTask = () => {
        hashHistory.push(`/taak/nieuw/contact/${this.props.contactDetails.id}`);
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
        const { permissions = {} } = this.props;
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
                <Panel className={"harmonica-button"}>
                    <PanelBody>
                        <div className="col-sm-12" onClick={this.toggleOpportunity}>
                                <span className="">KANSEN <span
                                    className="badge">{this.props.contactDetails.opportunityCount}</span></span>
                            {
                                permissions.manageOpportunity &&
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
                            <span className="">TAKEN <span className="badge">{ this.props.contactDetails.taskCount }</span></span>
                            {permissions.manageTask &&
                            <a role="button" className="pull-right" onClick={this.newTask}><span
                                className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            } { this.state.toggleShowTasks && <TaskList /> }
                        </div>
                    </PanelBody>
                </Panel>

                <div className="panel panel-default harmonica-button">
                    <PanelBody>
                        <div className="col-sm-12">
                            <span onClick={this.toggleGroup} className="">GROEPEN <span className="badge">{ this.props.contactDetails.groupCount }</span></span>
                                <a role="button" className="pull-right" onClick={this.toggleAddGroup}><span
                                    className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            { this.state.toggleShowGroups && <ContactGroupList /> }
                        </div>
                    </PanelBody>
                </div>

                { this.state.showModalError &&
                <ErrorModal
                    closeModal={this.toggleErrorModal}
                    title={this.state.modalErrorTitle}
                    errorMessage={this.state.modalErrorMessage}
                />
                }
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
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(ContactDetailsHarmonica);
