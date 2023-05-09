import React, { Component } from 'react';

import HousingFileSpecificationList from './HousingFileSpecificationList';
import HousingFileSpecificationNew from './HousingFileSpecificationNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import HousingFileSpecificationCreateOpportunity from './HousingFileSpecificationCreateOpportunity';
import HousingFileSpecificationsCreateQuotationRequest from './HousingFileSpecificationsCreateQuotationRequest';
import ButtonText from '../../../../components/button/ButtonText';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class HousingFileSpecifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
            showCheckboxList: false,
            showCreateOpportunitiesFromSpecifications: false,
            showCreateQuotationRequestsFromSpecifications: false,
            checkedAll: false,
            specificationIds: [],
            campaignId: '',
            opportunityIds: [],
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    toggleShowCheckboxList = () => {
        this.setState({
            showCheckboxList: !this.state.showCheckboxList,
        });
    };

    toggleCheckedAll = event => {
        const isChecked = event.target.checked;
        let specificationIds = [];

        if (isChecked) {
            this.props.housingFileSpecifications.map(
                specification =>
                    specification &&
                    specification.status &&
                    specification.status.codeRef === 'desirable' &&
                    specificationIds.push(specification.id)
            );
        }

        this.setState({
            specificationIds: specificationIds,
            checkedAll: isChecked,
        });
    };

    toggleSpecificationCheck = event => {
        const isChecked = event.target.checked;
        const specificationId = Number(event.target.name);

        if (isChecked) {
            this.setState(
                {
                    specificationIds: [...this.state.specificationIds, specificationId],
                },
                this.checkAllSpecificationsAreChecked
            );
        } else {
            this.setState({
                specificationIds: this.state.specificationIds.filter(item => item !== specificationId),
                checkedAll: false,
            });
        }
    };

    checkAllSpecificationsAreChecked() {
        this.setState({
            checkedAll: this.state.specificationIds.length === this.props.housingFileSpecifications.length,
        });
    }

    showModalCreateOpportunity = () => {
        this.setState({
            showCreateOpportunitiesFromSpecifications: true,
        });
    };

    closeModalCreateOpportunity = () => {
        this.setState({
            showCreateOpportunitiesFromSpecifications: false,
        });
    };

    showModalCreateQuotationRequest = (campaignId, opportunityIds) => {
        this.setState({
            showCreateQuotationRequestsFromSpecifications: true,
            specificationIds: [],
            campaignId: campaignId,
            opportunityIds: opportunityIds,
        });
    };

    closeModalCreateQuotationRequest = () => {
        this.setState({
            showCreateQuotationRequestsFromSpecifications: false,
            specificationIds: [],
            campaignId: '',
            opportunityIds: [],
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Specificaties</span>
                    {this.props.permissions.manageHousingFile && (
                        <div>
                            <ButtonText
                                buttonText={this.state.showCheckboxList ? 'Selectie sluiten' : 'Selectie maken'}
                                onClickAction={this.toggleShowCheckboxList}
                            />
                            {this.state.showCheckboxList ? (
                                <>
                                    {' '}
                                    <ButtonText
                                        buttonText={'Maak kans(en) (' + this.state.specificationIds.length + ')'}
                                        onClickAction={this.showModalCreateOpportunity}
                                        disabled={this.state.specificationIds.length == 0}
                                    />
                                </>
                            ) : null}
                        </div>
                    )}
                    {this.props.permissions.manageHousingFile && !this.props.hasHoomDossierLink && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <Icon size={14} icon={plus} />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <HousingFileSpecificationNew toggleShowNew={this.toggleShowNew} />}
                    </div>
                    <div className="col-md-12">
                        <HousingFileSpecificationList
                            showCheckboxList={this.state.showCheckboxList}
                            toggleCheckedAll={this.toggleCheckedAll}
                            toggleSpecificationCheck={this.toggleSpecificationCheck}
                            specificationIds={this.state.specificationIds}
                        />
                    </div>

                    {this.state.showCreateOpportunitiesFromSpecifications && (
                        <HousingFileSpecificationCreateOpportunity
                            closeModalCreateOpportunity={this.closeModalCreateOpportunity}
                            specificationIds={this.state.specificationIds}
                            showModalCreateQuotationRequest={this.showModalCreateQuotationRequest}
                            // toggleShowCheckboxList={this.toggleShowCheckboxList}
                            fetchHousingFileSpecificationsData={this.fetchHousingFileSpecificationsData}
                        />
                    )}
                    {this.state.showCreateQuotationRequestsFromSpecifications && (
                        <HousingFileSpecificationsCreateQuotationRequest
                            closeModalCreateQuotationRequest={this.closeModalCreateQuotationRequest}
                            campaignId={this.state.campaignId}
                            opportunityIds={this.state.opportunityIds}
                            toggleShowCheckboxList={this.toggleShowCheckboxList}
                            // fetchHousingFileSpecificationsData={this.fetchHousingFileSpecificationsData}
                        />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        hasHoomDossierLink: state.housingFileDetails.hoomBuildingId != null ? true : false,
        housingFileSpecifications: state.housingFileDetails.housingFileSpecifications,
    };
};

export default connect(mapStateToProps)(HousingFileSpecifications);
