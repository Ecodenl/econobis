import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import moment from 'moment';

moment.locale('nl');

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import CostCenterDetailsAPI from '../../../api/cost-center/CostCenterDetailsAPI';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import InputSelect from '../../../components/form/InputSelect';

// Functionele wrapper voor de class component
const CostCenterNewFormWrapper = props => {
    const navigate = useNavigate();
    return <CostCenterNewForm {...props} navigate={navigate} />;
};

class CostCenterNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            costCenter: {
                description: '',
                twinfieldCostCenterCode: '',
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

    handleInputChangeDate = (value, name) => {
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
        if (costCenter.twinfieldCostCenterCode) {
            this.props.costCenters.map(costCenterFromMap => {
                if (costCenterFromMap.twinfieldCostCenterCode == costCenter.twinfieldCostCenterCode) {
                    hasErrors = true;
                    errors.twinfieldCostCenterCode = true;
                }
            });
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            CostCenterDetailsAPI.newCostCenter(costCenter)
                .then(payload => {
                    this.props.fetchSystemData();

                    this.props.navigate(`/kostenplaats/${payload.data.data.id}`);
                })
                .catch(function(error) {
                    alert('Er is iets mis gegaan met opslaan!');
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
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        costCenters: state.systemData.costCenters,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CostCenterNewFormWrapper);
