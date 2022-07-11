import React, { Component } from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { setError } from '../../../actions/general/ErrorActions';
import PortalSettingsDashboardWidgetList from '../widgets/PortalSettingsDashboardWidgetList';
import PreviewPortalDashboardPagePcModal from '../../portal-settings-preview/PreviewPortalDashboardPagePcModal';
import PreviewPortalDashboardPageMobileModal from '../../portal-settings-preview/PreviewPortalDashboardPageMobileModal';
import ButtonText from '../../../components/button/ButtonText';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';

class PortalSettingsDashboardFormGeneralView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPreviewPortalDashboardPagePc: false,
            showPreviewPortalDashboardPageMobile: false,
            showMenu: false,
            imageHash: Date.now(),
        };
    }

    togglePreviewPortalDashboardPagePc = () => {
        this.setState({ showPreviewPortalDashboardPagePc: !this.state.showPreviewPortalDashboardPagePc });
    };

    togglePreviewPortalDashboardPageMobile = () => {
        this.setState({ showPreviewPortalDashboardPageMobile: !this.state.showPreviewPortalDashboardPageMobile });
    };

    setShowMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    };

    // todo WM: verplaatsen naar portal settings dashboard widget code
    // addWidget = widget => {
    //     this.setState({
    //         ...this.state,
    //         widgets: [...this.state.widgets, widget],
    //     });
    // };
    //
    // removeWidget = id => {
    //     // todo WM: opschonen
    //     // console.log('removeWidget: ' + id);
    //     PortalSettingsDashboardAPI.removePortalSettingsDashboardWidget(id)
    //         .then(response => {
    //             this.setState({
    //                 ...this.state,
    //                 widgets: response.data,
    //             });
    //         })
    //         .catch(error => {
    //             if (error.response) {
    //                 this.props.setError(error.response.status, error.response.data.message);
    //             } else {
    //                 console.log(error);
    //                 alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
    //             }
    //
    //             // console.log('error PortalSettingsDashboardFormGeneralEdit - removeWidget - removePortalSettingsDashboardWidget');
    //             // console.log(error);
    //             // alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
    //             // this.props.setError(error.response.status, error.response.data.message);
    //         });
    // };
    // closeShowEditSort = () => {
    //     console.log('closeShowEditSort');
    //     this.props.updateState(this.props.dashboardSettings);
    //     this.setState({
    //         showEditSort: false,
    //     });
    // };

    render() {
        const {
            welcomeTitle,
            welcomeMessage,
            defaultWidgetBackgroundColor,
            defaultWidgetTextColor,
            widgets,
        } = this.props.dashboardSettings;

        const logoHeaderUrl = `${URL_API}/portal/images/logo.png?${this.props.imageHash}`;
        const imageBgHeaderUrl = `${URL_API}/portal/images/background-header.png?${this.props.imageHash}`;

        return (
            <>
                <div>
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
                </div>
                <div onClick={this.props.switchToEdit}>
                    <Panel>
                        <PanelBody>
                            <div className="row">
                                <ViewText
                                    label={'Welkomsttitel'}
                                    divSize={'col-sm-8'}
                                    value={welcomeTitle}
                                    className={'col-sm-8 form-group'}
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Welkomstbericht'}
                                    divSize={'col-sm-8'}
                                    value={welcomeMessage}
                                    className={'col-sm-8 form-group'}
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label="Default widget achtergrond kleur"
                                    divSize={'col-sm-8'}
                                    value={defaultWidgetBackgroundColor}
                                    className={'col-sm-8 form-group'}
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
                                <ViewText
                                    label="Default widget tekst kleur"
                                    divSize={'col-sm-8'}
                                    value={defaultWidgetTextColor}
                                    className={'col-sm-8 form-group'}
                                />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
                <div>
                    <PortalSettingsDashboardWidgetList
                        widgets={widgets}
                        // showEditSort={false}
                        imageHash={this.state.imageHash}
                        addWidget={this.addWidget}
                        removeWidget={this.removeWidget}
                        closeShowEditSort={this.closeShowEditSort}
                    />
                </div>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(PortalSettingsDashboardFormGeneralView);
