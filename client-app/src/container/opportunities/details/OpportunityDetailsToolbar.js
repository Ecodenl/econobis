import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import OpportunityDetailsDelete from './OpportunityDetailsDelete';

// Functionele wrapper voor de class component
const OpportunityDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <OpportunityDetailsToolbar {...props} navigate={navigate} />;
};

class OpportunityDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    sendMail = () => {
        this.props.navigate(
            `/email/nieuw/kans/${this.props.opportunity.id}/${this.props.opportunity.intake.contact.id}`
        );
    };

    render() {
        const { measureCategory, intake, id } = this.props.opportunity;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-2">
                                <div className="btn-group btn-group-flex margin-small" role="group">
                                    <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                                    {this.props.permissions.manageOpportunity && (
                                        <ButtonIcon iconName={'trash'} onClickAction={this.toggleDelete} />
                                    )}
                                    <ButtonIcon iconName={'envelopeO'} onClickAction={this.sendMail} />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h4 className="text-center text-success margin-small">
                                    <strong>
                                        {measureCategory ? 'Kans: ' + measureCategory.name : ''}{' '}
                                        {intake ? 'voor ' + intake.contact.fullName : ''}
                                    </strong>
                                </h4>
                            </div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>

                {this.state.showDelete && (
                    <OpportunityDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        id={id}
                        contactId={intake ? intake.contact.id : 0}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        opportunity: state.opportunityDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(OpportunityDetailsToolbarWrapper);
