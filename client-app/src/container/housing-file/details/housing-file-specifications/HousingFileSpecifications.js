import React, { Component } from 'react';

import HousingFileSpecificationList from './HousingFileSpecificationList';
import HousingFileSpecificationNew from './HousingFileSpecificationNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import HousingFileSpecificationCreateOpportunity from './HousingFileSpecificationCreateOpportunity';
import ButtonText from '../../../../components/button/ButtonText';

class HousingFileSpecifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
            showCheckboxList: false,
            showCreateOpportunitiesFromSpecifications: false,
            checkedAll: false,
            specificationIds: [],
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

    toggleCreateOpportunity = () => {
        this.setState({
            showCreateOpportunitiesFromSpecifications: !this.state.showCreateOpportunitiesFromSpecifications,
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
                                buttonText={
                                    this.state.showCheckboxList ? 'Contactselectie sluiten' : 'Contactselectie maken'
                                }
                                onClickAction={this.toggleShowCheckboxList}
                            />
                            {this.state.showCheckboxList ? (
                                <>
                                    {' '}
                                    <ButtonText
                                        buttonText={'Maak kans(en)'}
                                        onClickAction={this.toggleCreateOpportunity}
                                    />
                                </>
                            ) : null}
                        </div>
                    )}
                    {this.props.permissions.manageHousingFile && !this.props.hasHoomDossierLink && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <span className="glyphicon glyphicon-plus" />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <HousingFileSpecificationList
                            showCheckboxList={this.state.showCheckboxList}
                            toggleCheckedAll={this.toggleCheckedAll}
                            toggleSpecificationCheck={this.toggleSpecificationCheck}
                            specificationIds={this.state.specificationIds}
                        />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <HousingFileSpecificationNew toggleShowNew={this.toggleShowNew} />}
                    </div>

                    {this.state.showCreateOpportunitiesFromSpecifications && (
                        <HousingFileSpecificationCreateOpportunity
                            toggleCreateOpportunity={this.toggleCreateOpportunity}
                            toggleShowCheckboxList={this.toggleShowCheckboxList}
                            specificationIds={this.state.specificationIds}
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
