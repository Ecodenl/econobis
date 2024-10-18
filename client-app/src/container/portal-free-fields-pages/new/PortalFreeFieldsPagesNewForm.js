import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import validator from 'validator';

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import InputToggle from '../../../components/form/InputToggle';
import PortalFreeFieldsAPI from '../../../api/portal-free-fields/PortalFreeFieldsPageAPI';
import axios from 'axios';
import InputReactSelect from '../../../components/form/InputReactSelect';
// import { checkFieldRecord } from '../../../helpers/PortalFreeFieldsHelpers';
import ViewText from '../../../components/form/ViewText';
import moment from 'moment';

class PortalFreeFieldsPagesNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalFreeFieldsPage: {
                name: '',
                isActive: false,
                description: '',
                urlPageRef: '',
            },
            errors: {
                name: false,
                isActive: false,
                description: false,
                urlPageRef: false,
            },
            errorsMessage: {
                name: '',
                isActive: '',
                description: '',
                urlPageRef: '',
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            portalFreeFieldsPage: {
                ...this.state.portalFreeFieldsPage,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { portalFreeFieldsPage } = this.state;

        // Validation
        let errors = {};
        let errorsMessage = {};
        let hasErrors = false;

        if (validator.isEmpty(portalFreeFieldsPage.name + '')) {
            errors.name = true;
            errorsMessage.name = 'verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(portalFreeFieldsPage.description + '')) {
            errors.description = true;
            errorsMessage.description = 'verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty(portalFreeFieldsPage.urlPageRef + '')) {
            errors.urlPageRef = true;
            errorsMessage.urlPageRef = 'verplicht';
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorsMessage: errorsMessage });

        // If no errors send form
        if (!hasErrors) {
            PortalFreeFieldsAPI.newPortalFreeFieldsPage(portalFreeFieldsPage)
                .then(payload => {
                    hashHistory.push(`/vrije-velden-portaal-pagina/${payload.data.id}`);
                })
                .catch(function(error) {
                    console.log(error);
                    alert('Er is iets mis gegaan met opslaan!');
                });
        }
    };

    render() {
        const { name, isActive, description, urlPageRef } = this.state.portalFreeFieldsPage;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Pagina naam"
                                name={'name'}
                                value={name}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.name}
                                errorMessage={this.state.errorsMessage.name}
                            />
                            <InputToggle
                                label={'Actief'}
                                name={'isActive'}
                                value={isActive}
                                onChangeAction={this.handleInputChange}
                                // required={'required'}
                                error={this.state.errors.isActive}
                                errorMessage={this.state.errorsMessage.isActive}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Pagina beschrijving"
                                name={'description'}
                                value={description}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.description}
                                errorMessage={this.state.errorsMessage.description}
                            />
                            <InputText
                                label={'Portaal url: https://xxxx.mijnenergiesamen.nl/#/vrije-velden/'}
                                name={'urlPageRef'}
                                value={urlPageRef}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.urlPageRef}
                                errorMessage={this.state.errorsMessage.urlPageRef}
                            />
                        </div>

                        <hr />
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

export default PortalFreeFieldsPagesNewForm;
