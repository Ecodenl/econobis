import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import moment from 'moment';
moment.locale('nl');

import ButtonText from '../../../components/button/ButtonText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import InputTextArea from '../../../components/form/InputTextarea';
import PortalSettingsDashboardWidgetList from '../widgets/PortalSettingsDashboardWidgetList';

class PortalSettingsDashboardFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dashboardSettings: {
                ...props.dashboardSettings,
            },
            widgets: [...props.dashboardSettings.widgets],
            errors: {
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

    handleSubmit = event => {
        event.preventDefault();

        const { dashboardSettings, widgets } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(dashboardSettings.welcomeMessage)) {
            errors.welcomeMessage = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PortalSettingsDashboardAPI.updateDashboardSettings({
                welcomeMessage: dashboardSettings.welcomeMessage,
                widgets: widgets,
            })
                .then(payload => {
                    this.props.updateState(payload.data);
                    this.props.switchToView();
                })
                .catch(error => {
                    console.log(error);
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
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
                console.log(error);
            });
    };

    render() {
        const { welcomeMessage } = this.state.dashboardSettings;
        const { widgets } = this.state;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputTextArea
                                label="Welkomstbericht"
                                divSize={'col-sm-8'}
                                name={'welcomeMessage'}
                                value={welcomeMessage}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={!!this.state.errors.welcomeMessage}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="row" style={{ margin: '0' }}>
                            <PortalSettingsDashboardWidgetList
                                widgets={widgets}
                                edit={true}
                                handleWidgetInputChange={this.handleWidgetInputChange}
                                addWidget={this.addWidget}
                                removeWidget={this.removeWidget}
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
                </Panel>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(null, mapDispatchToProps)(PortalSettingsDashboardFormGeneralEdit);
