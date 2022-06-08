import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import moment from 'moment';
moment.locale('nl');

import ButtonText from '../../../components/button/ButtonText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { setError } from '../../../actions/general/ErrorActions';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import InputTextArea from '../../../components/form/InputTextarea';
import PortalSettingsDashboardWidgetList from '../widgets/PortalSettingsDashboardWidgetList';
import PreviewPortalDashboardPagePcModal from '../../portal-settings-preview/PreviewPortalDashboardPagePcModal';
import PreviewPortalDashboardPageMobileModal from '../../portal-settings-preview/PreviewPortalDashboardPageMobileModal';

class PortalSettingsDashboardFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPreviewPortalDashboardPagePc: false,
            showPreviewPortalDashboardPageMobile: false,
            showMenu: false,
            imageHash: Date.now(),
            dashboardSettings: {
                ...props.dashboardSettings,
            },
            widgets: [...props.dashboardSettings.widgets],
            errors: {
                welcomeTitle: '',
                welcomeMessage: '',
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            dashboardSettings: {
                ...this.state.dashboardSettings,
                [name]: value,
            },
        });
    };

    togglePreviewPortalDashboardPagePc = () => {
        this.setState({ showPreviewPortalDashboardPagePc: !this.state.showPreviewPortalDashboardPagePc });
    };

    togglePreviewPortalDashboardPageMobile = () => {
        this.setState({ showPreviewPortalDashboardPageMobile: !this.state.showPreviewPortalDashboardPageMobile });
    };

    setShowMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { dashboardSettings, widgets } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        // if (validator.isEmpty(dashboardSettings.welcomeMessage)) {
        //     errors.welcomeMessage = true;
        //     hasErrors = true;
        // }
        //
        // if (validator.isEmpty(dashboardSettings.welcomeTitle)) {
        //     errors.welcomeTitle = true;
        //     hasErrors = true;
        // }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PortalSettingsDashboardAPI.updateDashboardSettings({
                welcomeTitle: dashboardSettings.welcomeTitle,
                welcomeMessage: dashboardSettings.welcomeMessage,
                widgets: widgets,
            })
                .then(payload => {
                    this.props.updateState(payload.data);
                    this.props.switchToView();
                })
                .catch(error => {
                    console.log(
                        'error PortalSettingsDashboardFormGeneralEdit - handleSubmit - updateDashboardSettings'
                    );
                    console.log(error);
                    // alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                    this.props.setError(error.response.status, error.response.data.message);
                });
    };

    handleWidgetInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.getAttribute('data-item-id');
        const name = target.name.replace(id + '-', '');

        const widgets = Object.assign([...this.state.widgets], {
            [this.state.widgets.findIndex(el => el.id === id)]: {
                ...this.state.widgets[this.state.widgets.findIndex(el => el.id === id)],
                [name]: value,
            },
        });

        this.setState({
            ...this.state,
            widgets: widgets,
        });
    };

    addWidget = widget => {
        this.setState({
            ...this.state,
            widgets: [...this.state.widgets, widget],
        });
    };

    removeWidget = id => {
        PortalSettingsDashboardAPI.removeDashboardWidget(id)
            .then(response => {
                this.setState({
                    ...this.state,
                    widgets: response.data,
                });
            })
            .catch(error => {
                console.log('error PortalSettingsDashboardFormGeneralEdit - removeWidget - removeDashboardWidget');
                console.log(error);
                // alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                this.props.setError(error.response.status, error.response.data.message);
            });
    };

    render() {
        const { welcomeTitle, welcomeMessage } = this.state.dashboardSettings;
        const { widgets } = this.state;

        const logoHeaderUrl = `${URL_API}/portal/images/logo.png?${this.props.imageHash}`;
        const imageBgHeaderUrl = `${URL_API}/portal/images/background-header.png?${this.props.imageHash}`;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                {/*<Panel>*/}
                {/*    <PanelBody>*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-md-6">*/}
                {/*                <div className="btn-group btn-group-flex" role="group">*/}
                {/*                    <ButtonText*/}
                {/*                        buttonText="Preview dashboard pagina PC"*/}
                {/*                        onClickAction={this.togglePreviewPortalDashboardPagePc}*/}
                {/*                    />*/}
                {/*                    <ButtonText*/}
                {/*                        buttonText="Preview dashboard pagina mobiel"*/}
                {/*                        onClickAction={this.togglePreviewPortalDashboardPageMobile}*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </PanelBody>*/}
                {/*</Panel>*/}

                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputTextArea
                                label="Welkomsttitel"
                                divSize={'col-sm-8'}
                                name={'welcomeTitle'}
                                value={welcomeTitle}
                                onChangeAction={this.handleInputChange}
                                error={!!this.state.errors.welcomeTitle}
                            />
                        </div>
                        <div className="row">
                            <InputTextArea
                                label="Welkomstbericht"
                                divSize={'col-sm-8'}
                                name={'welcomeMessage'}
                                value={welcomeMessage}
                                onChangeAction={this.handleInputChange}
                                error={!!this.state.errors.welcomeMessage}
                            />
                        </div>
                    </PanelBody>
                </Panel>
                <Panel>
                    <PanelBody>
                        <div className="row" style={{ margin: '0' }}>
                            <PortalSettingsDashboardWidgetList
                                widgets={widgets}
                                edit={true}
                                handleWidgetInputChange={this.handleWidgetInputChange}
                                addWidget={this.addWidget}
                                removeWidget={this.removeWidget}
                                imageHash={this.props.imageHash}
                            />
                        </div>
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
                    {this.state.showPreviewPortalDashboardPagePc && (
                        <PreviewPortalDashboardPagePcModal
                            previewFromLayout={false}
                            closeModal={this.togglePreviewPortalDashboardPagePc}
                            setShowMenu={this.setShowMenu}
                            showMenu={this.state.showMenu}
                            imageHash={this.state.imageHash}
                            attachmentLogoHeader={''}
                            logoHeaderUrl={logoHeaderUrl}
                            attachmentImageBgHeader={''}
                            imageBgHeaderUrl={imageBgHeaderUrl}
                            dashboardSettings={this.props.dashboardSettings}
                        />
                    )}
                    {this.state.showPreviewPortalDashboardPageMobile && (
                        <PreviewPortalDashboardPageMobileModal
                            previewFromLayout={false}
                            closeModal={this.togglePreviewPortalDashboardPageMobile}
                            setShowMenu={this.setShowMenu}
                            showMenu={this.state.showMenu}
                            imageHash={this.state.imageHash}
                            attachmentLogoHeader={''}
                            logoHeaderUrl={logoHeaderUrl}
                            attachmentImageBgHeader={''}
                            imageBgHeaderUrl={imageBgHeaderUrl}
                            dashboardSettings={this.props.dashboardSettings}
                        />
                    )}
                </Panel>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
    fetchSystemData: () => {
        dispatch(fetchSystemData());
    },
});

export default connect(null, mapDispatchToProps)(PortalSettingsDashboardFormGeneralEdit);
