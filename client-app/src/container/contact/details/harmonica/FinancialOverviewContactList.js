import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

// Functionele wrapper voor de class component
const FinancialOverviewContactListWrapper = props => {
    const navigate = useNavigate();
    return <FinancialOverviewContactList {...props} navigate={navigate} />;
};

class FinancialOverviewContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedFinancialOverviewContacts: '',
        };
    }

    openItem = id => {
        this.props.navigate(`/waardestaat-contact/inzien/${id}`);
    };

    render() {
        const { relatedFinancialOverviewContacts } = this.props;
        return (
            <div>
                {relatedFinancialOverviewContacts == '' && <div>Geen waardestaten gevonden.</div>}

                {relatedFinancialOverviewContacts != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedFinancialOverviewContacts.map((item, i) => {
                                return (
                                    <tr onClick={() => this.openItem(item.id)} key={i}>
                                        <td className="col-xs-5 clickable">{moment(item.dateSent).format('L')}</td>
                                        <td className="col-xs-6 clickable">{item.name}</td>
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
        relatedFinancialOverviewContacts: state.contactDetails.relatedFinancialOverviewContacts,
    };
};

export default connect(mapStateToProps)(FinancialOverviewContactListWrapper);
