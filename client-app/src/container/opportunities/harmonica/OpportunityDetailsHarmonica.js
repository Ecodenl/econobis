import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Panel from "../../../components/panel/Panel";
import PanelBody from '../../../components/panel/PanelBody';
import RelatedOpportunitiesList from './RelatedOpportunitiesList';
import TaskList from './TaskList';

class OpportunityDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowTasks: false,
            toggleShowRelatedOpportunities: false,
        }
    };

    newTask = () => {
        hashHistory.push(`/taak/nieuw/kans/${this.props.id}`);
    };

    toggleTask = () => {
        this.setState({
            toggleShowTasks: !this.state.toggleShowTasks
        });
    };

    newRelatedOpportunity = () => {
        hashHistory.push(`/kans/nieuw/contact/${this.props.opportunity.contact.id}`);
    };

    toggleRelatedOpportunities = () => {
        this.setState({
            toggleShowRelatedOpportunities: !this.state.toggleShowRelatedOpportunities
        });
    };

    render(){
        const { permissions = {} } = this.props;
        return (
            <div className="col-md-12 margin-10-top">
                <Panel className={"harmonica-button"}>
                    <PanelBody>
                        <div className="col-sm-12" onClick={this.toggleTask}>
                            <span className="">TAKEN <span className="badge">{ this.props.opportunity.taskCount }</span></span>
                            {permissions.manageTask &&
                            <a role="button" className="pull-right" onClick={this.newTask}><span
                                className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            }{ this.state.toggleShowTasks && <TaskList /> }
                        </div>
                    </PanelBody>
                </Panel>
                <Panel className={"harmonica-button"}>
                    <PanelBody>
                        <div className="col-sm-12" onClick={this.toggleRelatedOpportunities}>
                            <span className="">ANDERE KANSEN <span className="badge">{ this.props.opportunity.amountRelatedOpportunities }</span></span>
                            {
                            permissions.manageOpportunity &&
                                <a role="button" className="pull-right" onClick={this.newRelatedOpportunity}><span
                                    className="glyphicon glyphicon-plus glyphicon-white"/></a>
                            }
                            { this.state.toggleShowRelatedOpportunities && <RelatedOpportunitiesList /> }
                        </div>
                    </PanelBody>
                </Panel>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        opportunity: state.opportunityDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(OpportunityDetailsHarmonica);
