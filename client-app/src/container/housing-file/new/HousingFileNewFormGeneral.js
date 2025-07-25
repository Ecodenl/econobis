import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

moment.locale('nl');

import HousingFileDetailsAPI from '../../../api/housing-file/HousingFileDetailsAPI';
import InputSelect from '../../../components/form/InputSelect';
import ButtonText from '../../../components/button/ButtonText';
import InputText from '../../../components/form/InputText';
import InputToggle from '../../../components/form/InputToggle';

// Functionele wrapper voor de class component
const HousingFileNewFormGeneralWrapper = props => {
    const navigate = useNavigate();
    return <HousingFileNewFormGeneral {...props} navigate={navigate} />;
};

class HousingFileNewFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            housingFile: {
                contactId: props.contactId,
                addressId: props.addressId,
                buildingTypeId: '',
                buildYear: '',
                isHouseForSale: '2',
                surface: '',
                roofTypeId: '',
                energyLabelId: '',
                floors: 0,
                energyLabelStatusId: '',
                isMonument: '2',
                numberOfResidents: 0,
            },
            noYesUnknownOptions: [
                {
                    id: '0',
                    name: 'Nee',
                },
                {
                    id: '1',
                    name: 'Ja',
                },
                {
                    id: '2',
                    name: 'Onbekend',
                },
            ],
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            housingFile: {
                ...this.state.housingFile,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { housingFile } = this.state;

        HousingFileDetailsAPI.newHousingFile(housingFile).then(payload => {
            this.props.navigate(`/woningdossier/${payload.data.id}`);
        });
    };

    render() {
        const {
            addressId,
            buildingTypeId,
            buildYear,
            isHouseForSale,
            surface,
            roofTypeId,
            energyLabelId,
            floors,
            energyLabelStatusId,
            isMonument,
            numberOfResidents,
        } = this.state.housingFile;
        const { addresses = [], fullName } = this.props.contactDetails;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={'Contact'}
                        name={'fullName'}
                        value={fullName}
                        onChangeAction={() => {}}
                        readOnly={true}
                    />
                    <div className="form-group col-sm-6">
                        <label htmlFor="addressId" className="col-sm-6">
                            Adres
                        </label>
                        <div className="col-sm-6">
                            <select
                                className="form-control input-sm"
                                id="addressId"
                                name="addressId"
                                value={addressId}
                                onChange={this.handleInputChange}
                            >
                                {addresses.map((address, i) => {
                                    let addressFormatted =
                                        address.street +
                                        ' ' +
                                        address.number +
                                        (address.addition ? '-' + address.addition : '');
                                    return (
                                        <option key={i} value={address.id}>
                                            {`${addressFormatted}`}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <InputSelect
                        label={'Woningtype'}
                        size={'col-sm-6'}
                        name="buildingTypeId"
                        value={buildingTypeId}
                        options={this.props.buildingTypes}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={'number'}
                        label={'Bouwjaar'}
                        name={'buildYear'}
                        value={buildYear}
                        min={'1500'}
                        max={'3000'}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Gebruiksoppervlakte'}
                        name="surface"
                        value={surface}
                        min={'0'}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelect
                        label={'Daktype'}
                        size={'col-sm-6'}
                        name="roofTypeId"
                        value={roofTypeId}
                        options={this.props.roofTypes}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Energielabel'}
                        size={'col-sm-6'}
                        name="energyLabelId"
                        value={energyLabelId}
                        options={this.props.energyLabels}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={'number'}
                        label={'Aantal bouwlagen'}
                        name={'floors'}
                        value={floors}
                        min={'0'}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Status energielabel'}
                        size={'col-sm-6'}
                        name="energyLabelStatusId"
                        value={energyLabelStatusId}
                        options={this.props.energyLabelStatus}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelect
                        label={'Monument'}
                        name={'isMonument'}
                        value={isMonument}
                        options={this.state.noYesUnknownOptions}
                        emptyOption={false}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Aantal bewoners'}
                        name={'numberOfResidents'}
                        value={numberOfResidents}
                        min={0}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelect
                        label={'Koophuis'}
                        name={'isHouseForSale'}
                        value={isHouseForSale}
                        options={this.state.noYesUnknownOptions}
                        emptyOption={false}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        buildingTypes: state.systemData.buildingTypes,
        roofTypes: state.systemData.roofTypes,
        energyLabels: state.systemData.energyLabels,
        energyLabelStatus: state.systemData.energyLabelStatus,
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps, null)(HousingFileNewFormGeneralWrapper);
