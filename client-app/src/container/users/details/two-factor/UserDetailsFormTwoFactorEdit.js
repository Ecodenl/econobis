import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchUserDetails, updateUser} from '../../../../actions/user/UserDetailsActions';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import InputToggle from '../../../../components/form/InputToggle';
import ViewText from "../../../../components/form/ViewText";
import UserAPI from "../../../../api/user/UserAPI";

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

        const {user} = this.state;

        user.titleId = user.titleId ? user.titleId : '';
        user.lastNamePrefixId = user.lastNamePrefixId ? user.lastNamePrefixId : '';

        this.props.updateUser(user, this.props.switchToView);
    };

    handleTwoFactorReset = event => {
        event.preventDefault();
        UserAPI.resetTwoFactor(this.state.user.id)
            .then(() => {
                this.props.fetchUserDetails(this.state.user.id);
            });

    };

    render() {
        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    {this.props.requiredByCooperation ? (
                        <ViewText label={'Verplicht'} value="Verplicht vanuit coöperatie"/>
                    ) : (
                        <InputToggle
                            label="Verplicht"
                            name={'requireTwoFactorAuthentication'}
                            value={this.state.user.requireTwoFactorAuthentication}
                            onChangeAction={this.handleInputChange}
                        />
                    )}
                    <div className="col-sm-6"><label className="col-sm-6">Geactiveerd</label>
                        <div className="col-sm-3">{this.state.user.hasTwoFactorActivated ? 'Ja' : 'Nee'}</div>
                        {this.state.user.hasTwoFactorActivated ? (
                            <a href="#" className="col-sm-3" onClick={this.handleTwoFactorReset}>reset</a>
                        ) : null }
                    </div>
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
    fetchUserDetails: (id) => {
        dispatch(fetchUserDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsFormTwoFactorEdit);
