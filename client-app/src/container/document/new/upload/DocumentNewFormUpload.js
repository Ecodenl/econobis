import React, { Component } from 'react';
import { connect } from 'react-redux';

import InputSelect from '../../../../components/form/InputSelect';
import UploadModal from '../../../../components/modal/UploadModal';

class DocumentNewFormUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showUploadModal: false,
        };

        this.toggleUploadModal = this.toggleUploadModal.bind(this);
    }

    toggleUploadModal() {
        this.setState({ showUploadModal: !this.state.showUploadModal });
    }

    render() {
        const {
            document,
            errors,
            errorMessage,
            handleInputChange,
            documentGroups,
            onDropAccepted,
            onDropRejected,
        } = this.props;
        const { documentGroup, attachment } = document;

        return (
            <div>
                <div className="row">
                    <InputSelect
                        label="Documentgroep"
                        name={'documentGroup'}
                        value={documentGroup}
                        options={documentGroups}
                        onChangeAction={handleInputChange}
                        required={'required'}
                        error={errors.documentGroup}
                        errorMessage={errorMessage.documentGroup}
                    />
                    <div className="form-group col-sm-6">
                        <label className="col-sm-6">Kies bestand</label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={`form-control input-sm col-sm-6 ${errors.noDocument ? 'has-error' : ''}`}
                                value={attachment && attachment.name}
                                onClick={this.toggleUploadModal}
                            />
                        </div>
                        {errors && (
                            <div className="col-sm-offset-6 col-sm-6">
                                <span className="has-error-message"> {errorMessage.noDocument}</span>
                            </div>
                        )}
                    </div>
                </div>
                {this.state.showUploadModal && (
                    <UploadModal
                        onDropAccepted={onDropAccepted.bind(this)}
                        onDropRejected={onDropRejected.bind(this)}
                        toggleModal={this.toggleUploadModal}
                        multiple={false}
                        errors={errors}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        documentGroups: state.systemData.documentGroups,
    };
};

export default connect(mapStateToProps, null)(DocumentNewFormUpload);
