import React, { Component } from 'react';
import { getApiUrl } from '../../api/utils/ApiUrl';

import axios from 'axios';

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }

    onSubmit(e) {
        e.preventDefault();
        const { email } = this.state;

        axios
            .post(`${getApiUrl()}/api/password/email`, {
                email,
            })
            .then(response => {
                this.refs.email.value = '';
                this.setState({ err: false });
            })
            .catch(error => {
                this.setState({ err: true });
                this.refs.email.value = '';
            });
    }

    onChange(e) {
        const email = e.target.value;
        this.setState({ email: email });
    }

    render() {
        let error = this.state.err;
        let msg = !error ? 'We hebben je een e-mail gestuurd met een wachtwoord reset link!' : 'E-mail bestaat niet.';
        let name = !error ? 'alert alert-success' : 'alert alert-danger';
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">Reset wachtwoord</div>
                                <div className="panel-body">
                                    <div className="col-md-offset-2 col-md-8 col-md-offset-2">
                                        {error != undefined && (
                                            <div className={name} role="alert">
                                                {msg}
                                            </div>
                                        )}
                                    </div>
                                    <form
                                        className="form-horizontal"
                                        role="form"
                                        method="POST"
                                        onSubmit={this.onSubmit.bind(this)}
                                    >
                                        <div className="form-group">
                                            <label htmlFor="email" className="col-md-4 control-label">
                                                E-mailadres
                                            </label>

                                            <div className="col-md-6">
                                                <input
                                                    id="email"
                                                    type="email"
                                                    ref="email"
                                                    className="form-control"
                                                    name="email"
                                                    onChange={this.onChange.bind(this)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-md-6 col-md-offset-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Verstuur wachtwoord reset link
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Forgot;
