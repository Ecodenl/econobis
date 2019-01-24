import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class Participationslist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedParticipations: '',
        };
    }

    openItem = id => {
        hashHistory.push(`/project/participant/${id}`);
    };

    render() {
        const { relatedParticipations } = this.props;
        return (
            <div>
                {relatedParticipations == '' && <div>Geen participaties gevonden.</div>}

                {relatedParticipations != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedParticipations.map((item, i) => {
                                return (
                                    <tr onClick={() => this.openItem(item.id)} key={i}>
                                        <td className="col-xs-5 clickable">
                                            {moment(item.createdAt.date).format('L')}
                                        </td>
                                        <td className="col-xs-6 clickable">
                                            {item.participationsCurrent} in {item.project.name}{' '}
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

export default connect(mapStateToProps)(Participationslist);
