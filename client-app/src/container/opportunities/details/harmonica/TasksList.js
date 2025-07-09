import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

const TasksList = ({ relatedTasks }) => {
    const navigate = useNavigate();

    const openItem = id => {
        navigate(`/taak/${id}`);
    };

    return (
        <div>
            {relatedTasks == '' && <div>Geen taken gevonden.</div>}

            {relatedTasks != '' && (
                <table className="table harmonica-table">
                    <tbody>
                        {relatedTasks.map((relatedTask, i) => {
                            return (
                                <tr onClick={() => openItem(relatedTask.id)} key={i}>
                                    <td className="col-xs-12 clickable">
                                        {moment(relatedTask.createdAt).format('L')} - {relatedTask.noteSummary}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        relatedTasks: state.opportunityDetails.relatedTasks,
    };
};

export default connect(mapStateToProps)(TasksList);
