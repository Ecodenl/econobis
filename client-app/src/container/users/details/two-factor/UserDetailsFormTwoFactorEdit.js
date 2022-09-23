import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { updateUser } from '../../../../actions/user/UserDetailsActions';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import InputToggle from '../../../../components/form/InputToggle';

class UserDetailsFormTwoFactorEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                ...this.props.userDetails,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { user } = this.state;

        user.titleId = user.titleId ? user.titleId : '';
        user.lastNamePrefixId = user.lastNamePrefixId ? user.lastNamePrefixId : '';

        this.props.updateUser(user, this.props.switchToView);
    };

    render() {
        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputToggle
                        label="Verplicht"
                        name={'requireTwoFactorAuthentication'}
                        value={this.state.user.requireTwoFactorAuthentication}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Sluiten'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails,
        lastNamePrefixes: state.systemData.lastNamePrefixes,
        titles: state.systemData.titles,
    };
};

const mapDispatchToProps = dispatch => ({
    updateUser: (id, switchToView) => {
        dispatch(updateUser(id, switchToView));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsFormTwoFactorEdit);
