import React from 'react';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

const TasksList = ({relatedTasks}) => {
    function openItem(id) {
        hashHistory.push(`/taak/${id}`);
    };

    return (
        <div>
            {
                relatedTasks == '' &&
                <div>Geen taken gevonden</div>
            }

            {
                relatedTasks != '' &&
                <table className="table harmonica-table">
                    <tbody>
                    {relatedTasks.map((relatedTasks, i) => {
                        return (
                            <tr onClick={() => openItem(relatedTasks.id)} key={i}>
                                <td className='col-xs-12 clickable'>{moment(relatedTasks.createdAt.date).format('L')} - {relatedTasks.noteSummary}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        relatedTasks: state.intakeDetails.relatedTasks,
    };
};

export default connect(mapStateToProps)(TasksList);
