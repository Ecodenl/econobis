import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import IntakeDetailsDelete from './IntakeDetailsDelete';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

// Functionele wrapper voor de class component
const IntakeDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <IntakeDetailsToolbar {...props} navigate={navigate} />;
};

class IntakeDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        const { intakeAddress = {} } = this.props;
        let fullStreet = '';
        intakeAddress &&
            (fullStreet = `${intakeAddress.street || ''} ${intakeAddress.number || ''}${intakeAddress.addition || ''}`);

        const { campaign = {} } = this.props;
        let campaignName = '';
        campaignName = campaign.name;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-2">
                                <div className="btn-group" role="group">
                                    <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                                    {this.props.permissions.manageIntake && (
                                        <ButtonIcon iconName={'trash'} onClickAction={this.toggleDelete} />
                                    )}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h4 className="text-center">{`Intake voor: ${campaignName ? campaignName : '...'}`}</h4>
                            </div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>
                {this.state.showDelete && (
                    <IntakeDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        fullStreet={fullStreet}
                        id={this.props.id}
                        contactId={this.props.contact.id}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        intakeAddress: state.intakeDetails.address,
        id: state.intakeDetails.id,
        campaign: state.intakeDetails.campaign,
        permissions: state.meDetails.permissions,
        contact: state.intakeDetails.contact,
    };
};

export default connect(mapStateToProps)(IntakeDetailsToolbarWrapper);
