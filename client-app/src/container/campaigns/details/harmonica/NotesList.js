import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedNotes: '',
        };
    }

    openItem = id => {
        hashHistory.push(`/taak/${id}`);
    };

    render() {
        const { relatedNotes } = this.props;
        return (
            <div>
                {relatedNotes == '' && <div>Geen notities gevonden.</div>}

                {relatedNotes != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedNotes.map((relatedNote, i) => {
                                return (
                                    <tr onClick={() => this.openItem(relatedNote.id)} key={i}>
                                        <td className="col-xs-12 clickable">
                                            {moment(relatedNote.createdAt).format('L')} - {relatedNote.noteSummary}
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
        relatedNotes: state.campaignDetails.relatedNotes,
    };
};

export default connect(mapStateToProps)(NoteList);
