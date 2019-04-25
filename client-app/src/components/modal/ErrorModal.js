import React from 'react';
import PropTypes from 'prop-types';

const ErrorModal = props => {
    const { title, closeModal, buttonText, error } = props;
    let { errorMessage } = props;

    if (error.message) {
        if (error.message.includes(';')) {
            error.message = error.message.split(';');
        }
        errorMessage = error.message;
    } else if (error.httpCode) {
        switch (error.httpCode) {
            case 400:
                errorMessage = 'Foute aanvraag';
                break;
            case 401:
                errorMessage = 'Niet geautoriseerd';
                break;
            case 402:
                errorMessage = 'Betalende toegang';
                break;
            case 403:
                errorMessage = 'Verboden toegang';
                break;
            case 404:
                errorMessage = 'Niet gevonden';
                break;
            case 405:
                errorMessage = 'Methode niet toegestaan';
                break;
            case 406:
                errorMessage = 'Niet aanvaardbaar';
                break;
            case 408:
                errorMessage = 'Aanvraagtijd verstreken';
                break;
            case 409:
                errorMessage = 'Conflict';
                break;
            case 410:
                errorMessage = 'Verdwenen';
                break;
            case 411:
                errorMessage = 'Lengte benodigd';
                break;
            case 412:
                errorMessage = 'Niet voldaan aan vooraf gestelde voorwaarde';
                break;
            case 413:
                errorMessage = 'Aanvraag te groot';
                break;
            case 414:
                errorMessage = 'Aanvraag-URL te lang';
                break;
            case 415:
                errorMessage = 'Media-type niet ondersteund';
                break;
            case 416:
                errorMessage = 'Aangevraagd gedeelte niet opvraagbaar';
                break;
            case 417:
                errorMessage = 'Niet voldaan aan verwachting';
                break;
            case 422:
                errorMessage = 'Aanvraag kan niet verwerkt worden';
                break;
            case 423:
                errorMessage = 'Afgesloten';
                break;
            case 424:
                errorMessage = 'Gefaalde afhankelijkheid';
                break;
            case 426:
                errorMessage = 'Upgrade nodig';
                break;
            case 428:
                errorMessage = 'Voorwaarde nodig';
                break;
            case 429:
                errorMessage = 'Te veel requests';
                break;
            case 431:
                errorMessage = 'Headers van de aanvraag te lang';
                break;
            case 500:
                errorMessage = 'Interne serverfout';
                break;
            case 501:
                errorMessage = 'Niet geïmplementeerd';
                break;
            case 502:
                errorMessage = 'Bad Gateway';
                break;
            case 503:
                errorMessage = 'Dienst niet beschikbaar';
                break;
            case 504:
                errorMessage = 'Gateway Timeout';
                break;
            case 505:
                errorMessage = 'HTTP-versie wordt niet ondersteund';
                break;
            case 509:
                errorMessage = 'Bandbreedte overschreden';
                break;
            case 510:
                errorMessage = 'Niet verlengd';
                break;
            case 511:
                errorMessage = 'Netwerkauthenticatie vereist';
                break;
            default:
                break;
        }
    }
    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{title}</h4>
                    </div>
                    <div className="modal-body">
                        {typeof errorMessage === 'string' && errorMessage}
                        {typeof errorMessage === 'object' && (
                            <ul>
                                {errorMessage.map(message => (
                                    <li>{message}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={closeModal}>
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ErrorModal.defaultProps = {
    buttonText: 'Ok',
    title: 'Waarschuwing',
    errorMessage: 'Er is een onbekende fout opgetreden',
    error: {},
};

ErrorModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    errorMessage: PropTypes.string,
    buttonText: PropTypes.string,
    httpCode: PropTypes.number,
};

export default ErrorModal;
