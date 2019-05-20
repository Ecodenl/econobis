import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import moment from 'moment';
moment.locale('nl');

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import CostCenterDetailsAPI from '../../../../api/cost-center/CostCenterDetailsAPI';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';

class CostCenterDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            costCenter: {
                ...props.costCenter,
            },
            errors: {
                description: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            costCenter: {
                ...this.state.costCenter,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { costCenter } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(costCenter.description)) {
            errors.description = true;
            hasErrors = true;
        }
        if (costCenter.twinfieldCostCenterCode && costCenter.twinfieldCostCenterCode !== this.props.costCenter.twinfieldCostCenterCode) {
            this.props.costCenters.map(costCenterFromMap => {
                if(costCenterFromMap.twinfieldCostCenterCode == costCenter.twinfieldCostCenterCode) {
                    hasErrors = true;
                    errors.twinfieldCostCenterCode = true;
                }
            })
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
        CostCenterDetailsAPI.updateCostCenter(costCenter)
                .then(payload => {
                    this.props.updateState(costCenter);
                    this.props.fetchSystemData();
                    this.props.switchToView();
                })
                .catch(error => {
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const { description, twinfieldCostCenterCode } = this.state.costCenter;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Omschrijving"
                                name={'description'}
                                value={description}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.description}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Twinfield kostenplaats code"
                                name={'twinfieldCostCenterCode'}
                                value={twinfieldCostCenterCode}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.twinfieldCostCenterCode}
                                errorMessage={'Deze kostenplaats code wordt al gebruikt.'}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.props.switchToView}
                            />
                            <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(CostCenterDetailsFormGeneralEdit);
