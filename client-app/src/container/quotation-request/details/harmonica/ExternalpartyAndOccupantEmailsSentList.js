import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class ExternalpartyAndOccupantEmailsSentList extends Component {
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
        const { relatedExternalpartyAndOccupantEmailsSent } = this.props;
        return (
            <div>
                {relatedExternalpartyAndOccupantEmailsSent == '' && <div>Geen e-mails gevonden.</div>}

                {relatedExternalpartyAndOccupantEmailsSent != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedExternalpartyAndOccupantEmailsSent.map((item, i) => {
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
        relatedExternalpartyAndOccupantEmailsSent: state.quotationRequestDetails.relatedExternalpartyAndOccupantEmailsSent,
    };
};

export default connect(mapStateToProps)(ExternalpartyAndOccupantEmailsSentList);
