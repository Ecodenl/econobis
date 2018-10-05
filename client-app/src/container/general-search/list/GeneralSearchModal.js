import React, {Component} from 'react';

import GeneralSearchModalModelList from "./GeneralSearchModalModelList";
import Draggable from 'react-draggable';

class GeneralSearchModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeDrags: 0,
        };

        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
    };

    onStart() {
        this.setState({activeDrags: ++this.state.activeDrags});
    };

    onStop() {
        this.setState({activeDrags: --this.state.activeDrags});
    };

    render() {
        return (
            <Draggable handle=".modal-header" onStart={this.onStart} onStop={this.onStop}>
                <div className="modal search-modal">
                    <div className="modal-dialog search-modal-dialog">
                        <div className="modal-content">
                            <div className={`modal-header draggable-header`}>
                                <h4 className="modal-title">Zoekresultaten<span className="close-modal" onClick={this.props.closeModal}>X</span></h4>
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
                                <button type="button" className="btn btn-default"
                                        onClick={this.props.closeModal}>Sluit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    }
}

export default GeneralSearchModal;