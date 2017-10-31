import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../../actions/ContactDetailsActions';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';

class ContactDetailsFormEnergyEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            energySupplierId: '',
            clientNrElectra: '',
            eanElectra: '',
            energySupplierGasId: '',
            clientNrGas: '',
            eanGas: '',
            clientSince: '',
            switchDate: '',
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        /*let updatedContactDetails = {
            id: this.props.id,
            person: {
                title: {
                    id: this.state.titleId
                },
                firstName: this.state.firstName,
                lastNamePrefix: this.state.lastNamePrefix,
                lastName: this.state.lastName,
            },
        };

        this.props.dispatch(actions.updatePerson(updatedContactDetails));*/

        this.props.switchToView();
    };

    render() {
        const {energySupplierId, clientNrElectra, eanElectra, energySupplierGasId, clientNrGas, eanGas, clientSince, switchDate, } = this.state;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label="Energiemaatschappij"
                        id="energy_supplier"
                        name={"energySupplierId"}
                        options={ [{id: 1, name: 'Van de bron'}, {id: 2, name: 'Nuon'} ] }
                        value={energySupplierId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelect
                        label="Energiemaatschappij gas"
                        id="energy_supplier_gas"
                        name={"energySupplierGasId"}
                        options={ [{id: 1, name: 'Van de bron'}, {id: 2, name: 'Nuon'} ] }
                        value={energySupplierGasId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="panel-footer">
                    <div className="pull-right">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </div>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormEnergyEdit);
