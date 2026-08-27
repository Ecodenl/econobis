import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import MoneyPresenter from '../../../../helpers/MoneyPresenter';

// Functionele wrapper voor de class component
const ParticipationslistWrapper = props => {
    const navigate = useNavigate();
    return <Participationslist {...props} navigate={navigate} />;
};

class Participationslist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedParticipations: '',
        };
    }

    openItem = id => {
        this.props.navigate(`/project/deelnemer/${id}`);
    };

    render() {
        const { relatedParticipations } = this.props;
        return (
            <div>
                {relatedParticipations == '' && <div>Geen deelnames gevonden.</div>}

                {relatedParticipations != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedParticipations.map((item, i) => {
                                return (
                                    <tr onClick={() => this.openItem(item.id)} key={i}>
                                        <td className="col-xs-5 clickable">{moment(item.createdAt).format('L')}</td>
                                        <td className="col-xs-6 clickable">
                                            {item.projectTypeCodeRef === 'loan'
                                                ? `${MoneyPresenter(item.amountDefinitive)} in ${item.projectName} `
                                                : `${item.participationsDefinitive} in ${item.projectName} `}
                                            {item.participationPostalCodeNumberAddition
                                                ? ` (${item.participationPostalCodeNumberAddition})`
                                                : ''}
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
        relatedParticipations: state.contactDetails.relatedParticipations,
    };
};

export default connect(mapStateToProps)(ParticipationslistWrapper);
