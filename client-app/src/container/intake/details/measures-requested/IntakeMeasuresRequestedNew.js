import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import IntakeDetailsAPI from '../../../../api/intake/IntakeDetailsAPI';
import { newIntakeMeasureRequested } from '../../../../actions/intake/IntakeDetailsActions';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const IntakeMeasuresRequestedNewWrapper = props => {
    const navigate = useNavigate();
    return <IntakeMeasuresRequestedNew {...props} navigate={navigate} />;
};

class IntakeMeasuresRequestedNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measureId: '',
            measuresNoDups: [],
            errors: {
                measureId: false,
            },
        };
    }

    componentDidMount() {
        let measuresNoDups = [];
        let currentMeasureIds = [];

        this.props.intakeMeasuresRequested.forEach(function(measure) {
            currentMeasureIds.push(measure.id);
        });

        measuresNoDups = this.props.measureCategories;

        measuresNoDups = measuresNoDups.filter(measure => !currentMeasureIds.includes(measure.id));
        this.setState({
            measuresNoDups: measuresNoDups,
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            measureId: value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { measureId } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(measureId)) {
            errors.measureId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            IntakeDetailsAPI.attachMeasureRequested(this.props.intakeId, measureId)
                .then(payload => {
                    this.props.newIntakeMeasureRequested(payload);
                    this.props.toggleShowNew();
                })
                .catch(function(error) {
                    alert(error.response.data.message);
                });
    };

    render() {
        const { measureId } = this.state;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <div className={`form-group col-sm-8`}>
                                <label className={`col-sm-4`}>{'Maatregel'}</label>
                                <div className={'col-sm-8'}>
                                    <select
                                        className={`form-control input-sm`}
                                        name={'measureId'}
                                        value={measureId}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="" />
                                        {this.state.measuresNoDups.map(option => {
                                            return (
                                                <option key={option.id} value={option.id}>
                                                    {option['name']}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
                            />
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
        measureCategories: state.systemData.measureCategories,
        energyLabels: state.systemData.energyLabels,
        intakeId: state.intakeDetails.id,
        intakeMeasuresRequested: state.intakeDetails.measuresRequested,
    };
};

const mapDispatchToProps = dispatch => ({
    newIntakeMeasureRequested: measure => {
        dispatch(newIntakeMeasureRequested(measure));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IntakeMeasuresRequestedNewWrapper);
