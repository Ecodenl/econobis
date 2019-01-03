import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdministrationDetailsAPI from '../../../../api/administration/AdministrationDetailsAPI';
import {newLedger} from '../../../../actions/administration/AdministrationDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import validator from "validator";
import ErrorModal from "../../../../components/modal/ErrorModal";

class AdministrationLedgerFormNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ledgers: [],
            ledger: {
                administrationId: this.props.id,
                code: '',
                name: '',
            },
            errors: {
                code: false,
                name: false,
            },
        };
    };

    componentDidMount() {
        AdministrationDetailsAPI.fetchLedgers(this.props.id).then(payload => {
            this.setState({
                ledgers: payload
            });
        });
    }

    toggleErrorModal = () => {
        this.setState({
            showModalError: !this.state.showModalError
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            ledger: {
                ...this.state.ledger,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { ledger } = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(ledger.code)){
            errors.code = true;
            hasErrors = true;
        }
        else{
            if (this.state.ledgers.includes(ledger.code)) {
                this.setState({
                    showModalError: !this.state.showModalError,
                    modalErrorTitle: 'Waarschuwing',
                    modalErrorMessage: 'Dit grootboeknummer bestaat al.',
                });

                errors.code = true;
                hasErrors = true;
            }
        }


        if(validator.isEmpty(ledger.name)){
            errors.name = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
        AdministrationDetailsAPI.newLedger(ledger).then((payload) => {
                this.props.newLedger(payload);
                this.props.toggleShowNew();
            });
    };

    render() {
        const { code, name } = this.state.ledger;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>

                        <div className="row">
                            <InputText
                                label={"Code"}
                                id={"code"}
                                name={"code"}
                                value={code}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.code}
                            />
                            <InputText
                                label={"Naam"}
                                id={"name"}
                                name={"name"}
                                value={name}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.name}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>

                        { this.state.showModalError &&
                        <ErrorModal
                            closeModal={this.toggleErrorModal}
                            title={this.state.modalErrorTitle}
                            errorMessage={this.state.modalErrorMessage}
                        />
                        }

                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        id: state.administrationDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newLedger: (ledger) => {
        dispatch(newLedger(ledger));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministrationLedgerFormNew);
