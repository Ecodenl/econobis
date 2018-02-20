import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedTasks: '',
        };
    }

    openItem = (id) => {
        hashHistory.push(`/taak/${id}`);
    };

    render() {
        const {relatedTasks} = this.props;
        return (
            <div>
                {relatedTasks == '' &&
                <div>Geen taken gevonden</div>
                }

                {relatedTasks != '' &&
                <table className="table harmonica-table">
                    <tbody>
                    {relatedTasks.map((relatedTask, i) => {
                        return (
                            <tr onClick={() => this.openItem(relatedTask.id)} key={i}>
                                <td className='col-xs-12 clickable'>{moment(relatedTask.created_at).format('L')} - {relatedTask.noteSummary}</td>
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
        relatedTasks: state.intakeDetails.relatedTasks,
    };
};

export default connect(mapStateToProps)(TaskList);
