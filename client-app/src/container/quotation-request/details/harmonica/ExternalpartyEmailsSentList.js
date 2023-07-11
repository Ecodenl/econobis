import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class ExternalpartyEmailsSentList extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     relatedEmailsSent: '',
        // };
    }

    openItem = id => {
        hashHistory.push(`/email/${id}`);
    };

    render() {
        const { relatedExternalpartyEmailsSent } = this.props;
        return (
            <div>
                {relatedExternalpartyEmailsSent == '' && <div>Geen e-mails gevonden.</div>}

                {relatedExternalpartyEmailsSent != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedExternalpartyEmailsSent.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="col-xs-4 clickable" onClick={() => this.openItem(item.id)}>
                                            {moment(item.date_sent).format('L')}
                                        </td>
                                        <td className="col-xs-8 clickable" onClick={() => this.openItem(item.id)}>
                                            {item.subject}
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
        relatedExternalpartyEmailsSent: state.quotationRequestDetails.relatedExternalpartyEmailsSent,
    };
};

export default connect(mapStateToProps)(ExternalpartyEmailsSentList);
