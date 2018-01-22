import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';

import TaskDetailsAPI from '../../../../api/task/TaskDetailsAPI';
import Modal from '../../../../components/modal/Modal';
import {fetchTaskDetails} from "../../../../actions/task/TaskDetailsActions";

class TaskUploadFile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          error: false,
            errorMaxSize: false,
        };

        this.onDrop = this.onDrop.bind(this);
    }

    onDropAccepted(files) {
        let data = new FormData();
        data.set('file', files[0]);

        TaskDetailsAPI.uploadTaskFile(this.props.id, data).then((payload) => {
            setTimeout(() => {
                this.props.fetchTaskDetails(this.props.id);
                this.props.toggleUploadfile();
            }, 100);
        })
        .catch((error) => {
            this.setState({error: true});
        });
    };

    onDropRejected() {
        this.setState({
            errorMaxSize: true,
        });
    };

    render() {
        return (
            <Modal
                closeModal={this.props.toggleUploadfile}
                showConfirmAction={false}
                title="Upload file"
            >
                <div className="upload-file-content">
                    <Dropzone className="dropzone" onDropAccepted={this.onDropAccepted.bind(this)} onDropRejected={this.onDropRejected.bind(this)} maxSize={2000000}>
                        <p>Klik hier voor het uploaden van een file</p>
                        <p><strong>of</strong> sleep het bestand hierheen</p>
                    </Dropzone>
                </div>
                {
                    this.state.error && <p className="has-error-message">Uploaden mislukt. Probeer nogmaals een bestand te uploaden.</p>
                }
                {
                    this.state.errorMaxSize && <p className="has-error-message">Uploaden mislukt. Het bestand mag maximaal 2MB groot zijn.</p>
                }
            </Modal>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    fetchTaskDetails: (id) => {
        dispatch(fetchTaskDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(TaskUploadFile);
