import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';

import MeasureAPI from '../../../../api/measure/MeasureAPI';
import Modal from '../../../../components/modal/Modal';
import {fetchMeasure} from "../../../../actions/measure/MeasureDetailsActions";

class UploadFileModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMaxSize: false,
        };

        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
    }

    onDropAccepted(files) {
        let data = new FormData();
        data.set('file', files[0]);

        MeasureAPI.uploadMeasureFile(this.props.id, data).then((payload) => {
            setTimeout(() => {
                this.props.fetchMeasure(this.props.id);
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
    fetchMeasure: (id) => {
        dispatch(fetchMeasure(id));
    },
});

export default connect(null, mapDispatchToProps)(UploadFileModal);