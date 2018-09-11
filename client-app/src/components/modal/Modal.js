import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

class Modal extends Component {
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
        const {extraButtonLabel, extraButtonClass, extraButtonAction, modalClassName, modalMainClassName,
            buttonClassName, buttonCancelText, buttonConfirmText, children, closeModal, confirmAction, title,
            draggableDisabled} = this.props;

        return (
            <Draggable handle=".modal-header" onStart={this.onStart} onStop={this.onStop} disabled={draggableDisabled}>
                <div className={`modal ${modalMainClassName}`}>
                    <div className={`modal-dialog ${modalClassName}`}>
                        <div className="modal-content">
                            <div className={`modal-header` + (draggableDisabled ? '' : ' draggable-header')}>
                                <h4 className="modal-title">{title}</h4>
                            </div>
                            <div className="modal-body">
                                {children}
                            </div>
                            <div className="modal-footer">
                                { this.props.extraButtonLabel &&
                                <button type="button" className={`btn ${extraButtonClass}`} onClick={extraButtonAction}>
                                    {extraButtonLabel}
                                </button>
                                }
                                <button type="button" className="btn btn-default" onClick={closeModal}>{buttonCancelText}</button>
                                { this.props.showConfirmAction &&
                                    <button type="button" className={`btn ${buttonClassName}`} onClick={confirmAction}>
                                        {buttonConfirmText}
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    };
};

Modal.defaultProps = {
    buttonClassName: 'btn-success',
    modalClassName: '',
    modalMainClassName: '',
    buttonConfirmText: 'Opslaan',
    buttonCancelText: 'Annuleren',
    showConfirmAction: true,
    confirmAction: () => {},
    draggableDisabled: false,
};

Modal.propTypes = {
    buttonCancelText: PropTypes.string,
    buttonConfirmText: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired
    ]),
    closeModal: PropTypes.func.isRequired,
    confirmAction: PropTypes.func,
    showConfirmAction: PropTypes.bool,
    title: PropTypes.string,
    extraButtonLabel: PropTypes.string,
    extraButtonClass: PropTypes.string,
    extraButtonAction: PropTypes.func,
    draggableDisabled: PropTypes.bool,
};

export default Modal;