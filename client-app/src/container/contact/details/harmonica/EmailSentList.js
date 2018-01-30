import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class EmailSent extends Component {
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
        const {relatedEmailSent} = this.props;
        return (
            <div>
                {relatedEmailSent == '' &&
                <div>Geen e-mails gevonden</div>
                }

                {relatedEmailSent != '' &&
                <table className="table harmonica-table">
                    <tbody>
                    {relatedEmailSent.map((item, i) => {
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
        relatedEmailSent: state.contactDetails.relatedEmailSent,
    };
};

export default connect(mapStateToProps)(EmailSent);
