import React, { Component } from 'react';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PortalSettingsDashboardWidgetList from '../widgets/PortalSettingsDashboardWidgetList';
import PreviewPortalDashboardPagePcModal from '../../portal-settings-layout/preview/PreviewPortalDashboardPagePcModal';
import PreviewPortalDashboardPageMobileModal from '../../portal-settings-layout/preview/PreviewPortalDashboardPageMobileModal';
import ButtonText from '../../../components/button/ButtonText';

class PortalSettingsDashboardFormGeneralView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPreviewPortalDashboardPagePc: false,
            showPreviewPortalDashboardPageMobile: false,
            imageHash: Date.now(),
        };
    }

    togglePreviewPortalDashboardPagePc = () => {
        this.setState({ showPreviewPortalDashboardPagePc: !this.state.showPreviewPortalDashboardPagePc });
    };

    togglePreviewPortalDashboardPageMobile = () => {
        this.setState({ showPreviewPortalDashboardPageMobile: !this.state.showPreviewPortalDashboardPageMobile });
    };

    render() {
        const { welcomeTitle, welcomeMessage, widgets } = this.props.dashboardSettings;

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
                        </PanelBody>
                    </Panel>
                    <Panel>
                        <PanelBody>
                            <div className="row" style={{ margin: '0' }}>
                                <PortalSettingsDashboardWidgetList
                                    widgets={widgets}
                                    edit={false}
                                    imageHash={this.state.imageHash}
                                />
                            </div>
                        </PanelBody>
                        {this.state.showPreviewPortalDashboardPagePc && (
                            <PreviewPortalDashboardPagePcModal
                                previewFromLayout={false}
                                closeModal={this.togglePreviewPortalDashboardPagePc}
                                imageHash={this.state.imageHash}
                                attachmentLogoHeader={''}
                                logoHeaderUrl={logoHeaderUrl}
                                attachmentImageBgHeader={''}
                                imageBgHeaderUrl={imageBgHeaderUrl}
                            />
                        )}
                        {this.state.showPreviewPortalDashboardPageMobile && (
                            <PreviewPortalDashboardPageMobileModal
                                previewFromLayout={false}
                                closeModal={this.togglePreviewPortalDashboardPageMobile}
                                imageHash={this.state.imageHash}
                                attachmentLogoHeader={''}
                                logoHeaderUrl={logoHeaderUrl}
                                attachmentImageBgHeader={''}
                                imageBgHeaderUrl={imageBgHeaderUrl}
                            />
                        )}
                    </Panel>
                </div>
            </>
        );
    }
}

export default PortalSettingsDashboardFormGeneralView;
