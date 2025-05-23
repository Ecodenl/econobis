import React, { Component } from 'react';
import { getApiUrl } from '../../api/utils/ApiUrl';

import { connect } from 'react-redux';
import axios from 'axios';

import Modal from '../../components/modal/Modal';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            err: null,
        };
    }

    confirmAction = () => {
        const email = this.props.email;

        axios
            .post(`${getApiUrl()}/api/password/email`, {
                email,
            })
            .then(response => {
                this.setState({ err: false });
                setTimeout(() => {
                    this.props.closeModal();
                }, 3000);
            })
            .catch(error => {
                this.setState({ err: true });
            });
    };

    render() {
        let error = this.state.err;
        let msg = !error ? 'We hebben je ge-e-maild met een wachtwoord wijzig link!' : 'Er is iets fout gegaan';
        let name = !error ? 'alert alert-success' : 'alert alert-danger';

        return (
            <Modal
                buttonConfirmText="Verzend"
                buttonClassName={'btn-success'}
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Verzenden"
            >
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-md-offset-2">
                        {error != null && (
                            <div className={name} role="alert">
                                {msg}
                            </div>
                        )}
                    </div>
                </div>
                Wijzig wachtwoord email verzenden naar <strong>{this.props.email}</strong>?
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.meDetails.email,
    };
};

export default connect(mapStateToProps)(ChangePassword);
