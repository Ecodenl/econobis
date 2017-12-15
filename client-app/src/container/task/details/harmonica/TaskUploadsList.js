import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {connect} from "react-redux";
import moment from "moment";
import TaskDetailsAPI from "../../../../api/task/TaskDetailsAPI";

class TaskUploadsList extends Component {

    downloadItem = (id) => {
        TaskDetailsAPI.downloadAttachment(id);
    };

    render() {
        const {taskAttachments} = this.props;
        return (
            <div>
                {taskAttachments == '' &&
                <div>Geen uploads gevonden</div>
                }

                {taskAttachments != '' &&
                <table className="table harmonica-table">
                    <tbody>
                    {taskAttachments.map((taskAttachment, i) => {
                        return (
                            <tr onClick={() => this.downloadItem(taskAttachment.id)} key={i}>
                                <td className='col-xs-5 clickable'>{moment(taskAttachment.created_at).format('L')}</td>
                                <td className='col-xs-1 clickable'>-</td>
                               <td className='col-xs-6 clickable'>{taskAttachment.name}</td>
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
};

const mapStateToProps = (state) => {
    return {
        taskAttachments: state.taskDetails.attachments,
    };
};

export default connect(mapStateToProps)(TaskUploadsList);
