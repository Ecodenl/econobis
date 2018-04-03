import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
    const {buttonClassName, buttonCancelText, buttonConfirmText, children, closeModal, confirmAction, title} = props;

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{title}</h4>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={closeModal}>{buttonCancelText}</button>
                        { props.showConfirmAction &&
                            <button type="button" className={`btn ${buttonClassName}`} onClick={confirmAction}>
                                {buttonConfirmText}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.defaultProps = {
    buttonClassName: 'btn-success',
    buttonConfirmText: 'Opslaan',
    buttonCancelText: 'Annuleren',
    showConfirmAction: true,
    confirmAction: () => {},
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
};

export default Modal;