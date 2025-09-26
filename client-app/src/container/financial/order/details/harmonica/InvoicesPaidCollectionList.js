import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

// Functionele wrapper voor de class component
const InvoicesPaidCollectionPaidCollectionListWrapper = props => {
    const navigate = useNavigate();
    return <InvoicesPaidCollectionPaidCollectionList {...props} navigate={navigate} />;
};

class InvoicesPaidCollectionPaidCollectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedInvoicesPaidCollection: '',
        };
    }

    openItem = id => {
        this.props.navigate(`/nota/${id}`);
    };

    render() {
        const { relatedInvoicesPaidCollection } = this.props;
        return (
            <div>
                {relatedInvoicesPaidCollection == '' && <div>Geen geïncasseerde incasso's gevonden.</div>}

                {relatedInvoicesPaidCollection != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedInvoicesPaidCollection.map((relatedInvoice, i) => {
                                return (
                                    <tr onClick={() => this.openItem(relatedInvoice.id)} key={i}>
                                        <td className="col-xs-12 clickable">
                                            {moment(relatedInvoice.createdAt).format('L')} - {relatedInvoice.number}
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
        relatedInvoicesPaidCollection: state.orderDetails.relatedInvoicesPaidCollection,
    };
};

export default connect(mapStateToProps)(InvoicesPaidCollectionPaidCollectionListWrapper);
