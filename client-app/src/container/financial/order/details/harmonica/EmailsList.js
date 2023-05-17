import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import EmailDetailsModal from "../../../../email/details-modal/EmailDetailsModal";

class EmailsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetailsModal: false,
            activeEmailId: null,
        };
    }

    openItem = id => {
        this.setState({
            showDetailsModal: true,
            activeEmailId: id,
        });
    };

    render() {
        const { relatedEmails } = this.props;
        return (
            <div>
                {relatedEmails == '' && <div>Geen e-mails gevonden.</div>}

                {relatedEmails != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedEmails.map((item, i) => {
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

                <EmailDetailsModal showModal={this.state.showDetailsModal} emailId={this.state.activeEmailId} setShowModal={(show) => this.setState({showDetailsModal: show})}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        relatedEmails: state.orderDetails.relatedEmails,
    };
};

export default connect(mapStateToProps)(EmailsList);
