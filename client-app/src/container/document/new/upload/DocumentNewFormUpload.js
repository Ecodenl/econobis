import React, {Component} from 'react';
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
    };

    toggleUploadModal() {
      this.setState({showUploadModal: !this.state.showUploadModal});
    };

    render() {
        const {document, errors, handleInputChange, documentGroups, measures, campaigns, onDropAccepted, onDropRejected} = this.props;
        const {documentGroup, measureId, campaignId, attachment} = document;

        return (
            <div>
                <div className="row">
                    <InputSelect
                        label="Maatregel"
                        name={"measureId"}
                        value={measureId}
                        options={measures}
                        onChangeAction={handleInputChange}
                    />
                    <InputSelect
                        label="Campagne"
                        name={"campaignId"}
                        value={campaignId}
                        options={campaigns}
                        onChangeAction={handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputSelect
                        label="Documentgroep"
                        name={"documentGroup"}
                        value={documentGroup}
                        options={documentGroups}
                        onChangeAction={handleInputChange}
                        required={"required"}
                        error={errors.documentGroup}
                    />
                </div>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <label className="col-sm-6">Kies bestand</label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className="form-control input-sm col-sm-6"
                                value={attachment && attachment.name}
                                onClick={this.toggleUploadModal}
                            />
                        </div>
                    </div>
                </div>
                {
                    this.state.showUploadModal &&
                        <UploadModal
                            onDropAccepted={onDropAccepted.bind(this)}
                            onDropRejected={onDropRejected.bind(this)}
                            toggleModal={this.toggleUploadModal}
                            multiple={false}
                            errors={errors}
                        />
                }

            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        documentGroups: state.systemData.documentGroups,
    };
};

export default connect(mapStateToProps, null)(DocumentNewFormUpload);
