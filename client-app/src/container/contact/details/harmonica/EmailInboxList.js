import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class EmailInboxList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedOpportunities: '',
        };
    }

    openItem = (id) => {
        hashHistory.push(`/email/${id}`);
    };

    render() {
        const {relatedEmailInbox} = this.props;
        return (
            <div>
                {relatedEmailInbox == '' &&
                <div>Geen e-mails gevonden</div>
                }

                {relatedEmailInbox != '' &&
                <table className="table harmonica-table">
                    <tbody>
                    {relatedEmailInbox.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td className='col-xs-4 clickable' onClick={() => this.openItem(item.id)}>
                                    {moment(item.date_sent).format('L')}
                                </td>
                                <td className='col-xs-8 clickable' onClick={() => this.openItem(item.id)}>
                                    {item.subject}
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
    };
}

const mapStateToProps = (state) => {
    return {
        relatedEmailInbox: state.contactDetails.relatedEmailInbox,
    };
};

export default connect(mapStateToProps)(EmailInboxList);
