import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUserDetails, updateUser } from '../../../../actions/user/UserDetailsActions';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import MailboxAPI from '../../../../api/mailbox/MailboxAPI';
import InputSelect from '../../../../components/form/InputSelect';

class UserDetailsFormMailboxEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mailboxes: [],
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

        /**
         * Alleen id en defaultMailboxId meegeven omdat de gebruiker deze ook voor zichzelf mag wijzigen ongeacht zijn rechten.
         * Als we alle andere velden ook meegeven heeft de gebruiker meer rechten nodig.
         */
        this.props.updateUser(
            {
                id: user.id,
                defaultMailboxId: user.defaultMailboxId,
            },
            this.props.switchToView
        );
    };

    componentDidMount() {
        MailboxAPI.fetchMailboxesForUserPeek(this.state.user.id).then(payload => {
            this.setState({
                mailboxes: payload.data.data,
            });
        });
    }

    render() {
        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label={'Standaard afzender e-mail'}
                        id="defaultMailboxId"
                        size={'col-sm-6'}
                        name={'defaultMailboxId'}
                        options={this.state.mailboxes}
                        optionName={'email'}
                        value={this.state.user.defaultMailboxId}
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
    };
};

const mapDispatchToProps = dispatch => ({
    updateUser: (id, switchToView) => {
        dispatch(updateUser(id, switchToView));
    },
    fetchUserDetails: id => {
        dispatch(fetchUserDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsFormMailboxEdit);
