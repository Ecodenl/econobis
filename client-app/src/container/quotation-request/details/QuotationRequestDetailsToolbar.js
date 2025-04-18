import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import QuotationRequestDetailsDelete from './QuotationRequestDetailsDelete';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

// Functionele wrapper voor de class component
const QuotationRequestDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <QuotationRequestDetailsToolbar {...props} navigate={navigate} />;
};

class QuotationRequestDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    showDeleteModal = () => {
        this.setState({ showDelete: true });
    };

    hideDeleteModal = () => {
        this.setState({ showDelete: false });
        this.props.navigate('/offerteverzoeken');
    };

    sendMail = () => {
        this.props.navigate(
            `/email/nieuw/offerteverzoek/${this.props.quotationRequestDetails.id}/${this.props.quotationRequestDetails.organisationOrCoachId}`
        );
    };

    render() {
        const { opportunity = {}, status, opportunityAction } = this.props.quotationRequestDetails;
        const { measureCategory = {}, intake = {} } = opportunity;

        let opportunityActionName = opportunityAction ? opportunityAction.name : 'actie';
        let isPendingStatus = status ? status.isPendingStatus : true;
        let measureCategoryName = measureCategory ? measureCategory.name : '';
        let fullName = intake && intake.contact ? intake.contact.fullNameFnf : '';
        let fullAddress = intake ? intake.fullAddress : '';

        let quotationToolbarText =
            opportunityActionName != undefined &&
            measureCategoryName != undefined &&
            fullName != undefined &&
            fullAddress != undefined
                ? `Kansactie ${opportunityActionName} ${measureCategoryName} voor ${fullName} op ${fullAddress}`
                : '';

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-2">
                                <div className="btn-group" role="group">
                                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => this.props.navigate(-1)} />
                                    {this.props.permissions.manageQuotationRequest && !isPendingStatus && (
                                        <ButtonIcon iconName={'trash'} onClickAction={this.showDeleteModal} />
                                    )}
                                    <ButtonIcon iconName={'envelopeO'} onClickAction={this.sendMail} />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h4 className="text-center">{quotationToolbarText}</h4>
                            </div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>
                {this.state.showDelete && (
                    <QuotationRequestDetailsDelete
                        closeDeleteItemModal={this.hideDeleteModal}
                        id={this.props.id}
                        opportunity={opportunity}
                        opportunityAction={opportunityAction}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        quotationRequestDetails: state.quotationRequestDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(QuotationRequestDetailsToolbarWrapper);
