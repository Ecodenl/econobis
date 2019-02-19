import React from 'react';
import { connect } from 'react-redux';
import EmailDetailsAPI from '../../../../api/email/EmailAPI';
import fileDownload from 'js-file-download';

const EmailAnswerAttachmentsView = props => {
    const { id, name } = props.attachment;

    const downloadItem = (id, name) => {
        EmailDetailsAPI.downloadAttachment(id).then(payload => {
            fileDownload(payload.data, name);
        });
    };

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={() => downloadItem(id, name)} className="col-sm-11">
                {name}
            </div>
            <div className="col-sm-1">
                {props.showActionButtons ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
                    </a>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(EmailAnswerAttachmentsView);
