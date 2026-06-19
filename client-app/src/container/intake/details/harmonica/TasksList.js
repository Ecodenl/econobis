import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

const TasksList = ({ relatedTasks }) => {
    const navigate = useNavigate();

    function openItem(id) {
        navigate(`/taak/${id}`);
    }

    return (
        <div>
            {relatedTasks == '' && <div>Geen taken gevonden.</div>}

            {relatedTasks != '' && (
                <table className="table harmonica-table">
                    <tbody>
                        {relatedTasks.map((relatedTasks, i) => {
                            return (
                                <tr onClick={() => openItem(relatedTasks.id)} key={i}>
                                    <td className="col-xs-12 clickable">
                                        {moment(relatedTasks.createdAt).format('L')} - {relatedTasks.noteSummary}
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
        relatedTasks: state.intakeDetails.relatedTasks,
    };
};

export default connect(mapStateToProps)(TasksList);
