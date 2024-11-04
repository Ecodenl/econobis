import React, { Component } from 'react';
import validator from 'validator';
import PortalFreeFieldsAPI from '../../../../api/portal-free-fields/PortalFreeFieldsPageAPI';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputToggle from '../../../../components/form/InputToggle';
import InputTextArea from '../../../../components/form/InputTextArea';
import PortalFreeFieldsFields from '../portal-free-fields-fields/PortalFreeFieldsFields';

class PortalFreeFieldsPagesDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const { id, name, isActive, description, urlPageRef, portalFreeFieldsFields } = props.portalFreeFieldsPage;

        this.state = {
            portalFreeFieldsPage: {
                id,
                name,
                isActive,
                description,
                urlPageRef,
                portalFreeFieldsFields,
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
            !portalFreeFieldsPage.urlPageRef.match(/^[a-z-]+$/)
        ) {
            errors.urlPageRef = true;
            errorsMessage.urlPageRef = 'Waarde ongeldig. Alleen kleine letters en koppelteken (-) toegestaan.';
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorsMessage: errorsMessage });

        // If no errors send form
        if (!hasErrors) {
            PortalFreeFieldsAPI.updatePortalFreeFieldsPage(portalFreeFieldsPage)
                .then(() => {
                    this.props.fetchPortalFreeFieldsPage();
                    this.props.switchToView();
                })
                .catch(error => {
                    console.log(error);
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
        }
    };

    render() {
        const { id, name, isActive, description, urlPageRef, portalFreeFieldsFields } = this.state.portalFreeFieldsPage;

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
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.props.switchToView}
                            />
                            <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                        </div>
                    </PanelBody>
                </Panel>
                <PortalFreeFieldsFields
                    pageId={id}
                    portalFreeFieldsFields={portalFreeFieldsFields}
                    showEditPage={true}
                />
            </form>
        );
    }
}

export default PortalFreeFieldsPagesDetailsFormGeneralEdit;
