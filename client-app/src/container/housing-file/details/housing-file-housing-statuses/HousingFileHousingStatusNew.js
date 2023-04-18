import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';
moment.locale('nl');
import HousingFileDetailsAPI from '../../../../api/housing-file/HousingFileDetailsAPI';
import { addHousingFileHousingStatusToState } from '../../../../actions/housing-file/HousingFileDetailsActions';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class HousingFileHousingStatusNew extends Component {
    constructor(props) {
        super(props);

        let housingFileHoomLinksNoDups = [];
        let currentHousingFileHoomLinksIds = [];

        props.housingFileHousingStatuses.forEach(function(housingFileHousingStatus) {
            currentHousingFileHoomLinksIds.push(housingFileHousingStatus.housingFileHoomLink.id);
        });
        housingFileHoomLinksNoDups = props.housingFileHoomLinks.filter(
            housingFileHoomLink => !currentHousingFileHoomLinksIds.includes(housingFileHoomLink.key)
        );

        this.state = {
            statusOptions: [],
            housingFileHoomLinksNoDups: housingFileHoomLinksNoDups,
            housingFileHousingStatus: {
                housingFileId: this.props.housingFileId,
                housingFileHoomLinksId: '',
                status: '',
            },
            errors: {
                housingFileHoomLinksId: false,
                status: false,
            },
        };
    }

    handleHousingFileHoomLinksChange = event => {
        const target = event.target;
        const value = target.value;

        const housingFileHoomLink = this.props.housingFileHoomLinks.find(
            housingFileHoomLink => housingFileHoomLink.key === Number(value)
        );
        this.setState({
            ...this.state,
            statusOptions: housingFileHoomLink ? this.getStatusOptions(housingFileHoomLink.externalHoomShortName) : [],
            housingFileHousingStatus: {
                ...this.state.housingFileHousingStatus,
                housingFileHoomLinksId: value,
                status: '',
            },
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            housingFileHousingStatus: {
                ...this.state.housingFileHousingStatus,
                [name]: value,
            },
        });
    };

    getStatusOptions(externalHoomShortName) {
        switch (externalHoomShortName) {
            case 'current-wall-insulation':
                return this.props.currentWallInsulationSelection;
            case 'current-floor-insulation':
                return this.props.currentFloorInsulationSelection;
            case 'current-roof-insulation':
                return this.props.currentRoofInsulationSelection;
            case 'current-living-rooms-windows':
                return this.props.currentLivingRoomsWindowsSelection;
            case 'current-sleeping-rooms-windows':
                return this.props.currentSleepingRoomsWindowsSelection;
            case 'heat-source-warm-tap-water':
                return this.props.heatSourceWarmTapWaterSelection;
            case 'building-heating-application':
                return this.props.buildingHeatingApplicationSelection;
            case 'ventilation-type':
                return this.props.ventilationTypeSelection;
            case 'crack-sealing-type':
                return this.props.crackSealingTypeSelection;
            case 'has-cavity-wall':
                return this.props.hasCavityWallSelection;
            case 'has-solar-panels':
                return this.props.hasSolarPanelsSelection;
            default:
                return [];
        }
    }
    handleSubmit = event => {
        event.preventDefault();

        const { housingFileHousingStatus } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(housingFileHousingStatus.housingFileHoomLinksId)) {
            errors.housingFileHoomLinksId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(housingFileHousingStatus.status)) {
            errors.status = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            HousingFileDetailsAPI.addHousingFileHousingStatus(housingFileHousingStatus)
                .then(payload => {
                    this.props.addHousingFileHousingStatusToState(payload.data.data);
                    this.props.toggleShowNew();
                })
                .catch(function(error) {
                    alert(error);
                });
    };

    render() {
        const { housingFileHoomLinksId, status } = this.state.housingFileHousingStatus;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={'Kenmerk'}
                                name={'housingFileHoomLinksId'}
                                value={housingFileHoomLinksId}
                                options={this.state.housingFileHoomLinksNoDups}
                                optionValue={'key'}
                                onChangeAction={this.handleHousingFileHoomLinksChange}
                                required={'required'}
                                error={this.state.errors.housingFileHoomLinksId}
                            />
                            <InputSelect
                                label={'Status'}
                                size={'col-sm-6'}
                                name="status"
                                value={status}
                                options={this.state.statusOptions}
                                optionValue={'key'}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.status}
                            />
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
        housingFileHousingStatuses: state.housingFileDetails.housingFileHousingStatuses,
        housingFileId: state.housingFileDetails.id,
        housingFileHoomLinks: state.systemData.housingFileHoomLinks,
        currentWallInsulationSelection: state.systemData.currentWallInsulationSelection,
        currentFloorInsulationSelection: state.systemData.currentFloorInsulationSelection,
        currentRoofInsulationSelection: state.systemData.currentRoofInsulationSelection,
        currentLivingRoomsWindowsSelection: state.systemData.currentLivingRoomsWindowsSelection,
        currentSleepingRoomsWindowsSelection: state.systemData.currentSleepingRoomsWindowsSelection,
        heatSourceWarmTapWaterSelection: state.systemData.heatSourceWarmTapWaterSelection,
        buildingHeatingApplicationSelection: state.systemData.buildingHeatingApplicationSelection,
        ventilationTypeSelection: state.systemData.ventilationTypeSelection,
        crackSealingTypeSelection: state.systemData.crackSealingTypeSelection,
        hasCavityWallSelection: state.systemData.hasCavityWallSelection,
        hasSolarPanelsSelection: state.systemData.hasSolarPanelsSelection,
    };
};

const mapDispatchToProps = dispatch => ({
    addHousingFileHousingStatusToState: housingFileHousingStatus => {
        dispatch(addHousingFileHousingStatusToState(housingFileHousingStatus));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileHousingStatusNew);
