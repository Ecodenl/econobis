import React, { Component } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PanelHeader from '../../../components/panel/PanelHeader';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import PortalDashboardWidgetOrderTable from './PortalDashboardWidgetOrderTable';
import ButtonText from '../../../components/button/ButtonText';
import { hashHistory } from 'react-router';

class PortalSettingsDashboardWidgetApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dashboardSettings: props.dashboardSettings,
            showEditSort: false,
            isLoading: false,
            hasError: false,
            imageHash: Date.now(),
        };
    }

    newWidget = () => {
        hashHistory.push(`/portal-instellingen-dashboard-widget/nieuw`);
    };

    deletePortalSettingsDashboardWidget = id => {
        PortalSettingsDashboardAPI.deletePortalSettingsDashboardWidget(id)
            .then(payload => {
                this.setState({
                    ...this.state,
                    dashboardSettings: payload.data.data,
                });
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

    setShowEditSort = () => {
        this.setState({
            showEditSort: true,
        });
    };
    closeShowEditSort = () => {
        this.props.updateState(this.state.dashboardSettings);
        this.setState({
            showEditSort: false,
        });
    };
    updateSortWidgets = event => {
        // event.preventDefault();
        // todo WM: opschonen
        console.log('updateSortWidgets');
        PortalSettingsDashboardAPI.updatePortalSettingsDashboard(this.state.dashboardSettings)
            .then(payload => {
                this.setState({
                    ...this.state,
                    dashboardSettings: payload.data.data,
                });
                this.closeShowEditSort();
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
        const showEditSort = this.state.showEditSort;
        const widgets = this.state.dashboardSettings.widgets;

        const columns = [
            {
                Header: 'Order',
                textToolTip: '',
                fieldName: 'order',
                accessor: 'order',
            },
            {
                Header: 'Titel',
                textToolTip: '',
                fieldName: 'title',
                accessor: 'title',
            },
            {
                Header: 'Afbeelding',
                textToolTip: '',
                fieldName: 'widgetImageFileName',
                accessor: 'widgetImageFileName',
            },
            {
                Header: 'Actief',
                textToolTip: '',
                fieldName: 'active',
                accessor: 'active',
            },
            {
                Header: '',
                textToolTip: '',
                fieldName: 'codeRef',
                accessor: 'codeRef',
            },
        ];

        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Widgets</span>
                    {!showEditSort && (
                        <a role="button" className="pull-right" onClick={this.newWidget}>
                            <span className="glyphicon glyphicon-plus" title="Toevoegen widget" />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    {!showEditSort && (
                        <div className="col-md-12">
                            <div className="row">
                                <div className="btn-group btn-group-flex" role="group">
                                    <div className="col-md-6">
                                        <ButtonText
                                            buttonText={'Sorteren widgets'}
                                            onClickAction={this.setShowEditSort}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="col-md-12 margin-10-top">
                        {widgets ? (
                            <PortalDashboardWidgetOrderTable
                                columns={columns}
                                data={widgets.sort((a, b) => (a.order > b.order ? 1 : -1))}
                                showEditSort={showEditSort}
                                // handleInputChange={this.props.handleWidgetInputChange}
                                deletePortalSettingsDashboardWidget={this.deletePortalSettingsDashboardWidget}
                                imageHash={this.state.imageHash}
                            />
                        ) : (
                            <p>Laden widgets...</p>
                        )}
                    </div>
                </PanelBody>
                {showEditSort && (
                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.closeShowEditSort}
                            />
                            <ButtonText buttonText={'Opslaan'} onClickAction={this.updateSortWidgets} />
                        </div>
                    </PanelBody>
                )}
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PortalSettingsDashboardWidgetApp);
