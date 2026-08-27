import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import PortalFreeFieldsAPI from '../../../api/portal-free-fields/PortalFreeFieldsPageAPI';

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import InputToggle from '../../../components/form/InputToggle';
import InputTextArea from '../../../components/form/InputTextArea';

// Functionele wrapper voor de class component
const PortalFreeFieldsPagesNewFormWrapper = props => {
    const navigate = useNavigate();
    return <PortalFreeFieldsPagesNewForm {...props} navigate={navigate} />;
};

class PortalFreeFieldsPagesNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalFreeFieldsPage: {
                name: '',
                isActive: true,
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

        if (validator.isEmpty(portalFreeFieldsPage.urlPageRef + '')) {
            errors.urlPageRef = true;
            errorsMessage.urlPageRef = 'verplicht';
            hasErrors = true;
        }

        if (
            portalFreeFieldsPage.urlPageRef != null &&
            !validator.isEmpty(portalFreeFieldsPage.urlPageRef) &&
            !portalFreeFieldsPage.urlPageRef.match(/^[a-z-1-9]+$/)
        ) {
            errors.urlPageRef = true;
            errorsMessage.urlPageRef = 'Waarde ongeldig. Alleen kleine letters, cijfers en koppelteken (-) toegestaan.';
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorsMessage: errorsMessage });

        // If no errors send form
        if (!hasErrors) {
            PortalFreeFieldsAPI.newPortalFreeFieldsPage(portalFreeFieldsPage)
                .then(payload => {
                    this.props.navigate(`/vrije-velden-portaal-pagina`);
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
                                error={this.state.errors.isActive}
                                errorMessage={this.state.errorsMessage.isActive}
                            />
                        </div>
                        <div className="row">
                            <InputTextArea
                                label="Pagina beschrijving"
                                name={'description'}
                                value={description}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.description}
                                errorMessage={this.state.errorsMessage.description}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                size={'col-sm-5'}
                                label={`Pagina referentie voor portaal url`}
                                name={'urlPageRef'}
                                value={urlPageRef}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.urlPageRef}
                                errorMessage={this.state.errorsMessage.urlPageRef}
                                textToolTip={
                                    'Te gebruiken pagina referentie voor portaal url. Alleen kleine letters en koppelteken (-) toegestaan.'
                                }
                            />
                        </div>
                        <div className="row">
                            <div className="form-group col-sm-12">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <label htmlFor="urlPageRefView" className="col-sm-12">
                                            Portaal url
                                        </label>
                                    </div>
                                    <div className="col-sm-9" id="urlPageRefView">
                                        {`https://${this.props.portalUrl}/#/vrije-velden/${urlPageRef}`}
                                    </div>
                                </div>
                            </div>
                        </div>{' '}
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

export default PortalFreeFieldsPagesNewFormWrapper;
