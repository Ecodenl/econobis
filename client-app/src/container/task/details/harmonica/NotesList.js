import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

// Functionele wrapper voor de class component
const NoteListWrapper = props => {
    const navigate = useNavigate();
    return <NoteList {...props} navigate={navigate} />;
};

class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedNotes: '',
        };
    }

    openItem = id => {
        this.props.navigate(`/taak/${id}`);
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
        relatedNotes: state.taskDetails.relatedNotes,
    };
};

export default connect(mapStateToProps)(NoteListWrapper);
