import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import MailboxAPI from '../../../../api/mailbox/MailboxAPI';
import { newMailboxIgnore } from '../../../../actions/mailbox/MailboxDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class MailboxDetailsIgnoresNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ignore: {
                mailboxId: props.mailboxId,
                value: '',
                typeId: '',
            },
            ignoreId: '',
            errors: {
                value: false,
                typeId: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            ignore: {
                ...this.state.ignore,
                [name]: value,
            },
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const ignore = this.state.ignore;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(ignore.value)) {
            errors.value = true;
            hasErrors = true;
        }

        if (validator.isEmpty(ignore.typeId)) {
            errors.typeId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            MailboxAPI.newIgnore(ignore)
                .then(payload => {
                    this.props.newMailboxIgnore(payload.data.data);
                    this.props.toggleShowNew();
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Waarde'}
                                name={'value'}
                                value={this.state.ignore.value}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.value}
                            />
                            <InputSelect
                                label={'Type'}
                                size={'col-sm-6'}
                                name={'typeId'}
                                options={this.props.mailboxIgnoreTypes}
                                value={this.state.ignore.typeId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.typeId}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
                            />
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
        mailboxId: state.mailboxDetails.id,
        mailboxIgnoreTypes: state.systemData.mailboxIgnoreTypes,
    };
};

const mapDispatchToProps = dispatch => ({
    newMailboxIgnore: mailboxIgnore => {
        dispatch(newMailboxIgnore(mailboxIgnore));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MailboxDetailsIgnoresNew);
