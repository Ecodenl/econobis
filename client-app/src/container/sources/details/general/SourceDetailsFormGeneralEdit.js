import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import moment from 'moment';
moment.locale('nl');

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import SourceDetailsAPI from '../../../../api/source/SourceDetailsAPI';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';

class SourceDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            source: {
                ...props.source,
            },
            errors: {
                name: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            source: {
                ...this.state.source,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { source } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(source.name)) {
            errors.name = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            SourceDetailsAPI.updateSource(source)
                .then(payload => {
                    this.props.updateState(source);
                    this.props.fetchSystemData();
                    this.props.switchToView();
                })
                .catch(error => {
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const { name, nameCustom } = this.state.source;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Naam"
                                name={'name'}
                                value={name}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.name}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Aangepaste naam"
                                name={'nameCustom'}
                                value={nameCustom}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
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

export default connect(null, mapDispatchToProps)(SourceDetailsFormGeneralEdit);
