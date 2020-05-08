import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { addAdministrationUser } from '../../../../actions/administration/AdministrationDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class AdministrationDetailsUsersNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            errors: {
                userId: false,
                hasErrors: true,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({ userId: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const administrationUser = {
            administrationId: this.props.administrationId,
            userId: this.state.userId,
        };

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(administrationUser.userId)) {
            errors.userId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            this.props.addAdministrationUser(administrationUser);
            this.props.toggleShowNew();
        }
    }

    render() {
        let administrationUsers = [];
        if (this.props.usersExtraAdministration) {
            administrationUsers = [...this.props.users, ...this.props.usersExtraAdministration];
        } else {
            administrationUsers = [...this.props.users];
        }

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Administratie'}
                                name={'administration'}
                                value={this.props.administrationName}
                                readOnly={true}
                            />
                            <InputSelect
                                label={'Gebruiker'}
                                size={'col-sm-6'}
                                name={'userId'}
                                options={administrationUsers}
                                optionName={'fullName'}
                                value={this.state.userId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.userId}
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
        administrationId: state.administrationDetails.id,
        administrationName: state.administrationDetails.name,
        users: state.systemData.users,
        usersExtraAdministration: state.systemData.usersExtraAdministration,
    };
};

const mapDispatchToProps = dispatch => ({
    addAdministrationUser: administrationUser => {
        dispatch(addAdministrationUser(administrationUser));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdministrationDetailsUsersNew);
