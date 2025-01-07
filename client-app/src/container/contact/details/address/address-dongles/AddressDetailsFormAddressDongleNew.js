import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setError } from '../../../../../actions/general/ErrorActions';
import AddressDongleAPI from '../../../../../api/contact/AddressDongleAPI';
import { newStateAddressDongle } from '../../../../../actions/contact/ContactDetailsActions';
import { fetchContactDetails } from '../../../../../actions/contact/ContactDetailsActions';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from '../../../../../components/form/InputSelect';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputDate from '../../../../../components/form/InputDate';

class AddressDetailsFormAddressDongleNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressDongle: {
                addressId: this.props.addressId,
                typeReadOut: '',
                dateSigned: '',
                macNumber: '',
                dateStart: '',
                typeDongle: '',
                dateEnd: '',
                energieId: '',
            },
            errors: {
                dongleId: false,
                energySupplyTypeId: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            addressDongle: {
                ...this.state.addressDongle,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            addressDongle: {
                ...this.state.addressDongle,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { addressDongle } = this.state;

        let errors = {};
        let hasErrors = false;

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if (!hasErrors) {
            this.doNewAddressDongle(addressDongle);
        }
    };

    doNewAddressDongle = addressDongle => {
        AddressDongleAPI.newAddressDongle(addressDongle)
            .then(payload => {
                this.props.newStateAddressDongle(payload.data.addressDongle);

                this.props.toggleShowNewDongle();
                this.props.fetchContactDetails(this.props.contactId);
            })
            .catch(error => {
                if (error.response) {
                    this.props.setError(error.response.status, error.response.data.message);
                } else {
                    console.log(error);
                }
            });
    };

    render() {
        const {
            typeReadOut,
            dateSigned,
            macNumber,
            dateStart,
            typeDongle,
            dateEnd,
            energieId,
        } = this.state.addressDongle;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row"></div>

                        <div className="row">
                            <InputSelect
                                label={'Type uitlezing'}
                                id="typeReadOut"
                                name={'typeReadOut'}
                                options={this.props.typeReadOut}
                                value={typeReadOut}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputDate
                                label={'Datum ondertekening'}
                                id={'dateSigned'}
                                name={'dateSigned'}
                                value={dateSigned}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Mac nummer"
                                name="macNumber"
                                value={macNumber}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                            />
                            <InputDate
                                label={'Start datum'}
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={'Type dongel'}
                                id="typeDongle"
                                name={'typeDongle'}
                                options={this.props.typeDongle}
                                value={typeDongle}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputDate
                                label={'Eind datum'}
                                name="dateEnd"
                                value={dateEnd}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Koppeling Energie ID"
                                name="energieId"
                                value={energieId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                            />
                        </div>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNewDongle}
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
        typeReadOut: state.systemData.dongleTypeReadOut,
        typeDongle: state.systemData.dongleTypeDongle,
    };
};

const mapDispatchToProps = dispatch => ({
    newStateAddressDongle: addressDongle => {
        dispatch(newStateAddressDongle(addressDongle));
    },
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressDongleNew);
