import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import moment from 'moment';

moment.locale('nl');

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import PortalSettingsLayoutDetailsAPI from '../../../api/portal-settings-layout/PortalSettingsLayoutDetailsAPI';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import ErrorUnauthorized from '../../global/ErrorUnauthorized';

// Functionele wrapper voor de class component
const PortalSettingsLayoutNewFormWrapper = props => {
    const navigate = useNavigate();
    return <PortalSettingsLayoutNewForm {...props} navigate={navigate} />;
};

class PortalSettingsLayoutNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalSettingsLayout: {
                description: '',
            },
            errors: {
                description: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            portalSettingsLayout: {
                ...this.state.portalSettingsLayout,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            portalSettingsLayout: {
                ...this.state.portalSettingsLayout,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { portalSettingsLayout } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(portalSettingsLayout.description)) {
            errors.description = true;
            hasErrors = true;
        }
        if (portalSettingsLayout.twinfieldPortalSettingsLayoutCode) {
            this.props.portalSettingsLayouts.map(portalSettingsLayoutFromMap => {
                if (
                    portalSettingsLayoutFromMap.twinfieldPortalSettingsLayoutCode ==
                    portalSettingsLayout.twinfieldPortalSettingsLayoutCode
                ) {
                    hasErrors = true;
                    errors.twinfieldPortalSettingsLayoutCode = true;
                }
            });
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PortalSettingsLayoutDetailsAPI.newPortalSettingsLayout(portalSettingsLayout)
                .then(payload => {
                    this.props.fetchSystemData();

                    this.props.navigate(`/portal-instellingen-layout/${payload.data.data.id}`);
                })
                .catch(function(error) {
                    alert('Er is iets mis gegaan met opslaan!');
                });
    };

    render() {
        const { description } = this.state.portalSettingsLayout;

        if (!this.props.permissions.managePortalSettings) {
            return <ErrorUnauthorized />;
        }

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Omschrijving"
                                name={'description'}
                                value={description}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.description}
                            />
                        </div>
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

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        portalSettingsLayouts: state.systemData.portalSettingsLayouts,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PortalSettingsLayoutNewFormWrapper);
