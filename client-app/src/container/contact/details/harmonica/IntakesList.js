import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
moment.locale('nl');

import IntakesAPI from '../../../../api/intake/IntakesAPI';

// Functionele wrapper voor de class component
const IntakesListWrapper = props => {
    const navigate = useNavigate();
    return <IntakesList {...props} navigate={navigate} />;
};

class IntakesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            intakes: '',
            loading: true,
        };
    }

    componentDidMount() {
        IntakesAPI.fetchIntakesByContact(this.props.contactDetailsId).then(payload => {
            this.setState({ intakes: payload, loading: false });
        });
    }

    openItem = id => {
        this.props.navigate(`/intake/${id}`);
    };

    render() {
        const { intakes, loading } = this.state;

        return (
            <div>
                {loading && <div>Laden...</div>}

                {intakes == '' && !loading && <div>Geen intakes bekend.</div>}

                {intakes != '' && !loading && (
                    <table className="table">
                        <tbody>
                            {intakes.map((intake, i) => {
                                return (
                                    <tr key={i} onClick={() => this.openItem(intake.id)}>
                                        <td className="col-xs-4 clickable">
                                            {intake.createdAt ? moment(intake.createdAt).format('DD-MM-Y') : ''}
                                        </td>
                                        <td className="col-xs-8 clickable">
                                            {intake.campaignName}
                                            <br />
                                            {intake.addressName}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactDetailsId: state.contactDetails.id,
    };
};

export default connect(mapStateToProps, null)(IntakesListWrapper);
