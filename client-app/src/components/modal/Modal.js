import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import ButtonTextNormalSize from '../button/ButtonTextNormalSize';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeDrags: 0,
            offsetTop: 0,
            offsetBottom: 0,
            offsetLeft: 0,
            offsetRight: 0,
        };

        this.divModalDialog = React.createRef();

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        const offsetTop = Number(
            `-${this.divModalDialog.current.offsetParent.offsetTop + this.divModalDialog.current.offsetTop}`
        );
        const offsetBottom =
            this.divModalDialog.current.offsetParent.clientHeight -
            (this.divModalDialog.current.offsetHeight - offsetTop);

        this.setState({
            offsetTop,
            offsetBottom,
            offsetLeft: Number(`-${this.divModalDialog.current.offsetLeft}`),
            offsetRight: this.divModalDialog.current.offsetLeft,
        });
    }

    onStart() {
        this.setState({ activeDrags: ++this.state.activeDrags });
    }

    onStop() {
        this.setState({ activeDrags: --this.state.activeDrags });
    }

    render() {
        const {
            extraButtonLabel,
            extraButtonClass,
            extraButtonAction,
            modalClassName,
            modalMainClassName,
            modalBodyClassName,
            buttonClassName,
            buttonCancelText,
            buttonConfirmText,
            children,
            closeModal,
            confirmAction,
            title,
            draggableDisabled,
            loading,
            headerRight,
        } = this.props;
        const bounds = {
            left: this.state.offsetLeft,
            top: this.state.offsetTop,
            right: this.state.offsetRight,
            bottom: this.state.offsetBottom,
        };

        return (
            <Draggable
                handle=".modal-header"
                onStart={this.onStart}
                onStop={this.onStop}
                disabled={draggableDisabled}
                bounds={bounds}
            >
                <div className={`modal ${modalMainClassName}`}>
                    <div className={`modal-dialog ${modalClassName}`} ref={this.divModalDialog}>
                        <div className="modal-content">
                            <div className={`modal-header` + (draggableDisabled ? '' : ' draggable-header')}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <h4 className="modal-title">{title}</h4>
                                    { headerRight ? headerRight : null }
                                </div>
                            </div>
                            <div className={`modal-body ${modalBodyClassName}`}>{children}</div>
                            <div className="modal-footer">
                                {this.props.extraButtonLabel && (
                                    <ButtonTextNormalSize
                                        buttonClassName={extraButtonClass}
                                        onClickAction={extraButtonAction}
                                        buttonText={extraButtonLabel}
                                    />
                                )}
                                <button type="button" className="btn btn-default" onClick={closeModal}>
                                    {buttonCancelText}
                                </button>
                                {this.props.showConfirmAction && (
                                    <ButtonTextNormalSize
                                        buttonClassName={buttonClassName}
                                        onClickAction={confirmAction}
                                        buttonText={buttonConfirmText}
                                        loading={loading}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}

Modal.defaultProps = {
    buttonClassName: 'btn-success',
    modalClassName: '',
    modalMainClassName: '',
    modalBodyClassName: '',
    buttonConfirmText: 'Opslaan',
    buttonCancelText: 'Annuleren',
    showConfirmAction: true,
    confirmAction: () => {},
    draggableDisabled: false,
    loading: false,
    headerRight: null,
};

Modal.propTypes = {
    buttonCancelText: PropTypes.string,
    buttonConfirmText: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.array.isRequired]),
    closeModal: PropTypes.func.isRequired,
    confirmAction: PropTypes.func,
    showConfirmAction: PropTypes.bool,
    title: PropTypes.string,
    extraButtonLabel: PropTypes.string,
    extraButtonClass: PropTypes.string,
    extraButtonAction: PropTypes.func,
    draggableDisabled: PropTypes.bool,
    loading: PropTypes.bool,
    headerRight: PropTypes.any,
};

export default Modal;
