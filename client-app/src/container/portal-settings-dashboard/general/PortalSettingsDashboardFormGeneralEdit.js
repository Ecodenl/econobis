import React, { Component } from 'react';
import { getApiUrl } from '../../../api/utils/ApiUrl';

import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ButtonText from '../../../components/button/ButtonText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { setError } from '../../../actions/general/ErrorActions';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import InputTextArea from '../../../components/form/InputTextArea';
import PreviewPortalDashboardPagePcModal from '../../portal-settings-preview/PreviewPortalDashboardPagePcModal';
import PreviewPortalDashboardPageMobileModal from '../../portal-settings-preview/PreviewPortalDashboardPageMobileModal';
import InputTextColorPicker from '../../../components/form/InputTextColorPicker';

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
            errors: {
                welcomeTitle: '',
                welcomeMessage: '',
            },
            errorMessage: {},
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true, hasError: false });
        // todo WM: check / anders
        //
        const id = 1;
        PortalSettingsDashboardAPI.fetchPortalSettingsDashboardDetails(id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    dashboardSettings: {
                        ...payload.data.data,
                    },
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
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
        if (this.state.showPreviewPortalDashboardPagePc) {
            document.documentElement.removeAttribute('style');
        }
        this.setState({ showPreviewPortalDashboardPagePc: !this.state.showPreviewPortalDashboardPagePc });
    };

    togglePreviewPortalDashboardPageMobile = () => {
        if (this.state.showPreviewPortalDashboardPageMobile) {
            document.documentElement.removeAttribute('style');
        }
        this.setState({ showPreviewPortalDashboardPageMobile: !this.state.showPreviewPortalDashboardPageMobile });
    };

    setShowMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { dashboardSettings } = this.state;

        // Validation
        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        // If no errors send form
        !hasErrors &&
            PortalSettingsDashboardAPI.updatePortalSettingsDashboard(dashboardSettings)
                .then(payload => {
                    this.props.updateState(payload.data.data);
                    this.props.switchToView();
                })
                .catch(error => {
                    if (error.response) {
                        this.props.setError(error.response.status, error.response.data.message);
                    } else {
                        console.log(error);
                        alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                    }
                });
    };

    render() {
        const {
            welcomeTitle,
            welcomeMessage,
            defaultWidgetBackgroundColor,
            defaultWidgetTextColor,
        } = this.state.dashboardSettings;

        const logoHeaderUrl = `${getApiUrl()}/portal/images/logo-header.png?${this.props.imageHash}`;
        const imageBgHeaderUrl = `${getApiUrl()}/portal/images/background-header.png?${this.props.imageHash}`;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="btn-group btn-group-flex" role="group">
                                    <ButtonText
                                        buttonText="Preview dashboard pagina PC"
                                        onClickAction={this.togglePreviewPortalDashboardPagePc}
                                    />
                                    <ButtonText
                                        buttonText="Preview dashboard pagina mobiel"
                                        onClickAction={this.togglePreviewPortalDashboardPageMobile}
                                    />
                                </div>
                            </div>
                        </div>
                    </PanelBody>
                </Panel>

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
                        <div className="row">
                            <InputTextColorPicker
                                label="Default widget achtergrond kleur"
                                divSize={'col-sm-8'}
                                name={'defaultWidgetBackgroundColor'}
                                value={defaultWidgetBackgroundColor}
                                // size={'col-sm-4'}
                                // textToolTip={`Let op: geen donkere achtergrond kleur kiezen dan wordt zwarte titel slecht leesbaar.`}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: defaultWidgetBackgroundColor,
                                    color: defaultWidgetTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '150px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Algemene tekst
                            </span>
                        </div>
                        <div className="row">
                            <InputTextColorPicker
                                label="Default widget tekst kleur"
                                divSize={'col-sm-8'}
                                name={'defaultWidgetTextColor'}
                                value={defaultWidgetTextColor}
                                onChangeAction={this.handleInputChange}
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
                            <ButtonText
                                buttonText={'Opslaan'}
                                type={'submit'}
                                value={'Submit'}
                                onClickAction={this.handleSubmit}
                            />
                        </div>
                    </PanelBody>
                </Panel>
                {this.state.showPreviewPortalDashboardPagePc && (
                    <PreviewPortalDashboardPagePcModal
                        closeModal={this.togglePreviewPortalDashboardPagePc}
                        setShowMenu={this.setShowMenu}
                        showMenu={this.state.showMenu}
                        imageHash={this.state.imageHash}
                        attachmentLogoHeader={''}
                        logoHeaderUrl={logoHeaderUrl}
                        attachmentImageBgHeader={''}
                        imageBgHeaderUrl={imageBgHeaderUrl}
                        portalMainBackgroundColor={this.props.defaultPortalSettingsLayout.portalMainBackgroundColor}
                        portalMainTextColor={this.props.defaultPortalSettingsLayout.portalMainTextColor}
                        portalBackgroundColor={this.props.defaultPortalSettingsLayout.portalBackgroundColor}
                        portalBackgroundTextColor={this.props.defaultPortalSettingsLayout.portalBackgroundTextColor}
                        loginHeaderBackgroundColor={this.props.defaultPortalSettingsLayout.loginHeaderBackgroundColor}
                        loginHeaderBackgroundTextColor={
                            this.props.defaultPortalSettingsLayout.loginHeaderBackgroundTextColor
                        }
                        headerIconsColor={this.props.defaultPortalSettingsLayout.headerIconsColor}
                        loginFieldBackgroundColor={this.props.defaultPortalSettingsLayout.loginFieldBackgroundColor}
                        loginFieldBackgroundTextColor={
                            this.props.defaultPortalSettingsLayout.loginFieldBackgroundTextColor
                        }
                        buttonColor={this.props.defaultPortalSettingsLayout.buttonColor}
                        buttonTextColor={this.props.defaultPortalSettingsLayout.buttonTextColor}
                        dashboardSettings={this.state.dashboardSettings}
                    />
                )}
                {this.state.showPreviewPortalDashboardPageMobile && (
                    <PreviewPortalDashboardPageMobileModal
                        closeModal={this.togglePreviewPortalDashboardPageMobile}
                        setShowMenu={this.setShowMenu}
                        showMenu={this.state.showMenu}
                        imageHash={this.state.imageHash}
                        attachmentLogoHeader={''}
                        logoHeaderUrl={logoHeaderUrl}
                        attachmentImageBgHeader={''}
                        imageBgHeaderUrl={imageBgHeaderUrl}
                        portalMainBackgroundColor={this.props.defaultPortalSettingsLayout.portalMainBackgroundColor}
                        portalMainTextColor={this.props.defaultPortalSettingsLayout.portalMainTextColor}
                        portalBackgroundColor={this.props.defaultPortalSettingsLayout.portalBackgroundColor}
                        portalBackgroundTextColor={this.props.defaultPortalSettingsLayout.portalBackgroundTextColor}
                        loginHeaderBackgroundColor={this.props.defaultPortalSettingsLayout.loginHeaderBackgroundColor}
                        loginHeaderBackgroundTextColor={
                            this.props.defaultPortalSettingsLayout.loginHeaderBackgroundTextColor
                        }
                        headerIconsColor={this.props.defaultPortalSettingsLayout.headerIconsColor}
                        loginFieldBackgroundColor={this.props.defaultPortalSettingsLayout.loginFieldBackgroundColor}
                        loginFieldBackgroundTextColor={
                            this.props.defaultPortalSettingsLayout.loginFieldBackgroundTextColor
                        }
                        buttonColor={this.props.defaultPortalSettingsLayout.buttonColor}
                        buttonTextColor={this.props.defaultPortalSettingsLayout.buttonTextColor}
                        dashboardSettings={this.state.dashboardSettings}
                    />
                )}
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
