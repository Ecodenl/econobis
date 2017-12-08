import React from 'react';
import PropTypes from 'prop-types';

const ErrorModal = (props) => {
    const {title, errorMessage, closeModal, buttonText} = props;

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{title}</h4>
                    </div>
                    <div className="modal-body">
                        {errorMessage}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={closeModal}>{buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ErrorModal.defaultProps = {
    buttonText: 'Ok',
    title: 'Waarschuwing',
    errorMessage: 'Er is een onbekende fout opgetreden'
};

ErrorModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    errorMessage: PropTypes.string,
    buttonText: PropTypes.string,
};

export default ErrorModal;