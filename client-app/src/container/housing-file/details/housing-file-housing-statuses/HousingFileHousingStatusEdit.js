import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';
moment.locale('nl');
import HousingFileDetailsAPI from '../../../../api/housing-file/HousingFileDetailsAPI';
import { updateHousingFileHousingStatusToState } from '../../../../actions/housing-file/HousingFileDetailsActions';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class HousingFileHousingStatusEdit extends Component {
    constructor(props) {
        super(props);

        const { id, housingFileId, housingFileHoomLink, status } = props.housingFileHousingStatus;

        this.state = {
            statusOptions: housingFileHoomLink ? this.getStatusOptions(housingFileHoomLink.externalHoomShortName) : [],
            housingFileHousingStatus: {
                id,
                housingFileId,
                housingFileHoomLinkId: housingFileHoomLink ? housingFileHoomLink.id : '',
                status: status ? status.hoomStatusValue : '',
            },
            errors: {},
        };
    }

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

        if (validator.isEmpty(housingFileHousingStatus.status)) {
            errors.status = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            HousingFileDetailsAPI.updateHousingFileHousingStatus(housingFileHousingStatus)
                .then(payload => {
                    this.props.updateHousingFileHousingStatusToState(payload.data.data);
                    this.props.closeEdit();
                })
                .catch(function(error) {
                    alert(error);
                });
    };

    render() {
        const { housingFileHoomLinkId, status } = this.state.housingFileHousingStatus;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={'Kenmerk'}
                                name={'housingFileHoomLinksId'}
                                value={housingFileHoomLinkId}
                                options={this.props.housingFileHoomLinks}
                                optionValue={'key'}
                                onChangeAction={this.handleHousingFileHoomLinksChange}
                                readOnly={true}
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
                                onClickAction={this.props.cancelEdit}
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
    updateHousingFileHousingStatusToState: housingFileHousingStatus => {
        dispatch(updateHousingFileHousingStatusToState(housingFileHousingStatus));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileHousingStatusEdit);
