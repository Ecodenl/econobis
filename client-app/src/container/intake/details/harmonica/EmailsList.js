import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class EmailsList extends Component {
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
        const {relatedEmails} = this.props;
        return (
            <div>
                {relatedEmails == '' &&
                <div>Geen e-mails gevonden</div>
                }

                {relatedEmails != '' &&
                <table className="table harmonica-table">
                    <tbody>
                    {relatedEmails.map((item, i) => {
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
        relatedEmails: state.intakeDetails.relatedEmails,
    };
};

export default connect(mapStateToProps)(EmailsList);
