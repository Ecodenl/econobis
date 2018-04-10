import React, { Component } from 'react';

import GeneralSearchModalModelList from "./GeneralSearchModalModelList";

class GeneralSearchModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal search-modal">
                <div className="modal-dialog search-modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Zoekresultaten</h4>
                        </div>
                        <div className="modal-body search-modal-body">
                            <div className="col-md-12 margin-30-top">
                                <GeneralSearchModalModelList
                                    closeModal={this.props.closeModal}
                                    records={this.props.records}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this.props.closeModal}>Sluit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GeneralSearchModal;