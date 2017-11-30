import React, { Component } from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';
moment.locale('nl');

import RegistrationsAPI from '../../../api/registration/RegistrationsAPI';

class RegistrationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registrations: '',
            loading: true,
        };
    };

    componentDidMount() {
        RegistrationsAPI.fetchRegistrationsByContact(this.props.contactDetailsId).then((payload) => {
            this.setState({registrations: payload, loading: false});
        });
    }

    openItem = (id) => {
        hashHistory.push(`/aanmelding/${id}`);
    };

    render() {
        const {registrations, loading} = this.state;

        return (
            <div>
                { loading &&
                <div>Laden...</div>
                }

                {registrations == '' && !loading &&
                <div>Geen aanmeldingen bekend</div>
                }

                {registrations != '' && !loading &&

                <table className="table">
                    <tbody>
                    {registrations.map((registration, i) => {
                        return (
                            <tr key={i} onClick={() => this.openItem(registration.id)}>
                                <td className='col-xs-4 clickable'>
                                    { registration.createdAt ? moment(registration.createdAt.date).format('d-M-Y') : '' }
                                </td>
                                <td className='col-xs-8 clickable'>
                                    {registration.addressName}
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        contactDetailsId: state.contactDetails.id,
    };
};

export default connect(mapStateToProps, null)(RegistrationList);