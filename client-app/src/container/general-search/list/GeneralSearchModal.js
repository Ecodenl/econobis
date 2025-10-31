import React, { Component } from 'react';

import GeneralSearchModalModelList from './GeneralSearchModalModelList';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class GeneralSearchModal extends Component {
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
        const bounds = {
            left: this.state.offsetLeft,
            top: this.state.offsetTop,
            right: this.state.offsetRight,
            bottom: this.state.offsetBottom,
        };
        const { permissions = {} } = this.props.meDetails;

        return (
            <Draggable handle=".modal-header" onStart={this.onStart} onStop={this.onStop} bounds={bounds}>
                <div className="modal search-modal">
                    <div className="modal-dialog search-modal-dialog" ref={this.divModalDialog}>
                        <div className="modal-content">
                            <div className="modal-header draggable-header">
                                <h4 className="modal-title">
                                    Zoekresultaten
                                    <span className="close-modal" onClick={this.props.closeModal}>
                                        X
                                    </span>
                                </h4>
                            </div>
                            <div className="col-md-12">
                                <div className="nav navbar-nav btn-group" role="group">
                                    <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                        <Icon size={14} icon={plus} /> Nieuw contact
                                    </button>
                                    <ul className="dropdown-menu">
                                        {permissions.createPerson && (
                                            <li>
                                                <Link onClick={this.props.closeModal} to="contact/nieuw/persoon">
                                                    Persoon
                                                </Link>
                                            </li>
                                        )}
                                        {permissions.createOrganisation && (
                                            <li>
                                                <Link onClick={this.props.closeModal} to="contact/nieuw/organisatie">
                                                    Organisatie
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
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
                                <button type="button" className="btn btn-default" onClick={this.props.closeModal}>
                                    Sluit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps, null)(GeneralSearchModal);
