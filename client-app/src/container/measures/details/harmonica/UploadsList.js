import React, { Component } from 'react';
import {connect} from "react-redux";
import moment from "moment";
import fileDownload from 'js-file-download';

import MeasureAPI from "../../../../api/measure/MeasureAPI";

class UploadsList extends Component {
    downloadItem = (id, name) => {
        MeasureAPI.downloadAttachment(id).then((payload) => {
            fileDownload(payload.data, name);
        });
    };

    render() {
        const {measureAttachments} = this.props;

        return (
            <div>
                {measureAttachments == '' &&
                <div>Geen uploads gevonden</div>
                }

                {measureAttachments != '' &&
                <table className="table harmonica-table">
                    <tbody>
                    {measureAttachments.map((measureAttachment, i) => {
                        return (
                            <tr onClick={() => this.downloadItem(measureAttachment.id, measureAttachment.name)} key={i}>
                                <td className='col-xs-12 clickable'>{moment(measureAttachment.created_at).format('L')} - {measureAttachment.name}</td>
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
        measureAttachments: state.measureDetails.attachments,
    };
};

export default connect(mapStateToProps)(UploadsList);