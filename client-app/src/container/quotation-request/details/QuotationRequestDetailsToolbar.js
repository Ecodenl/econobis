import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, hashHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import QuotationRequestDetailsDelete from './QuotationRequestDetailsDelete';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class QuotationRequestDetailsToolbar extends Component {
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
        hashHistory.push(
            `/email/nieuw/offerteverzoek/${this.props.quotationRequestDetails.id}/${this.props.quotationRequestDetails.organisationOrCoachId}`
        );
    };

    render() {
        const { opportunity = {}, status, opportunityAction } = this.props.quotationRequestDetails;
        const { measureCategory = {}, intake = {} } = opportunity;

        let opportunityActionName = opportunityAction ? opportunityAction.name : 'actie';
        let isPendingStatus = status ? status.isPendingStatus : true;
        let measureCategoryName = measureCategory ? measureCategory.name : '';
        let fullName = intake && intake.contact ? intake.contact.fullName : '';
        let fullAddress = intake ? intake.fullAddress : '';

        let quotationToolbarText =
            opportunityActionName != undefined &&
            measureCategoryName != undefined &&
            fullName != undefined &&
            fullAddress != undefined
                ? `${opportunityActionName} ${measureCategoryName} voor ${fullName} op ${fullAddress}`
                : '';

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-2">
                                <div className="btn-group" role="group">
                                    <ButtonIcon
                                        iconName={'glyphicon-arrow-left'}
                                        onClickAction={browserHistory.goBack}
                                    />
                                    {this.props.permissions.manageQuotationRequest && !isPendingStatus && (
                                        <ButtonIcon iconName={'glyphicon-trash'} onClickAction={this.toggleDelete} />
                                    )}
                                    <ButtonIcon iconName={'glyphicon-envelope'} onClickAction={this.sendMail} />
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
                        closeDeleteItemModal={this.toggleDelete}
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

export default connect(mapStateToProps)(QuotationRequestDetailsToolbar);
