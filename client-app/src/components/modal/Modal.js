import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
    const {buttonClassName, buttonConfirmText, children, closeModal, confirmAction, title} = props;

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={closeModal}><span>&times;</span></button>
                        <h4 className="modal-title">{title}</h4>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={closeModal}>Sluit</button>
                        <button type="button" className={`btn ${buttonClassName}`} onClick={confirmAction}>{buttonConfirmText}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.defaultProps = {
    buttonClassName: 'btn-success'
};

Modal.propTypes = {
    buttonConfirmText: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired
    ]),
    closeModal: PropTypes.func.isRequired,
    confirmAction: PropTypes.func.isRequired,
    title: PropTypes.string,
};

export default Modal;