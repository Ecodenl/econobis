import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
    render() {
        const {
            modalClassName,
            modalMainClassName,
            buttonClassName,
            buttonCancelText,
            buttonConfirmText,
            children,
            closeModal,
            confirmAction,
            title,
            draggableDisabled,
            showConfirmAction,
        } = this.props;
        return (
            <div className={`modal ${modalMainClassName}`} style={{ display: 'block' }}>
                <div className={`modal-dialog ${modalClassName}`}>
                    <div className="modal-content">
                        <div className={`modal-header` + (draggableDisabled ? '' : ' draggable-header')}>
                            <h4 className="modal-title">{title}</h4>
                        </div>
                        <div className="modal-body">{children}</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={closeModal}>
                                {buttonCancelText}
                            </button>
                            {showConfirmAction && (
                                <button type="button" className={buttonClassName} onClick={confirmAction}>
                                    {buttonConfirmText}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.defaultProps = {
    buttonClassName: 'btn-success btn-sm',
    modalClassName: '',
    modalMainClassName: '',
    buttonConfirmText: 'Opslaan',
    buttonCancelText: 'Annuleren',
    showConfirmAction: true,
    confirmAction: () => {},
    draggableDisabled: false,
    loading: false,
};

Modal.propTypes = {
    buttonCancelText: PropTypes.string,
    buttonConfirmText: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.array.isRequired]),
    closeModal: PropTypes.func.isRequired,
    confirmAction: PropTypes.func,
    showConfirmAction: PropTypes.bool,
    title: PropTypes.string,
    draggableDisabled: PropTypes.bool,
    loading: PropTypes.bool,
};

export default Modal;
