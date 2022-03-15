import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import ButtonIcon from '../../../../../components/button/ButtonIcon';
import RevenuesKwhdetailsDelete from './RevenuesKwhdetailsDelete';
import { blockUI, unblockUI } from '../../../../../actions/general/BlockUIActions';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';
import fileDownload from 'js-file-download';
import RevenuesKwhAPI from '../../../../../api/project/RevenuesKwhAPI';

class RevenuesKwhdetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    getCSV = () => {
        this.props.blockUI();
        setTimeout(() => {
            RevenuesKwhAPI.getCSV(this.props.revenuesKwh.id)
                .then(payload => {
                    fileDownload(payload.data, 'Opbrengstverdeling-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.csv');
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    render() {
        const { revenuesKwh } = this.props;
        const pdfLink = `project/opbrengst-kwh/${this.props.revenuesKwh.id}/energieleverancier-rapport`;
        const excelLink = `project/opbrengst-kwh/${this.props.revenuesKwh.id}/energieleverancier-excel`;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-2">
                                <div className="btn-group btn-group-flex margin-small" role="group">
                                    <ButtonIcon
                                        iconName={'glyphicon-arrow-left'}
                                        onClickAction={browserHistory.goBack}
                                    />
                                    {this.props.permissions.manageFinancial && !this.props.revenuesKwh.confirmed ? (
                                        <ButtonIcon iconName={'glyphicon-trash'} onClickAction={this.toggleDelete} />
                                    ) : null}
                                    {revenuesKwh.confirmed == 1 ? (
                                        <div className="nav navbar-nav btn-group" role="group">
                                            <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                                Rapportage Energie leverancier
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link to={pdfLink}>Ledenverklaring of productie specificatie</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : null}
                                    <ButtonIcon iconName={'glyphicon-download-alt'} onClickAction={this.getCSV} />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h4 className="text-center text-success margin-small">
                                    <strong>
                                        Opbrengst kwh project {revenuesKwh.project ? revenuesKwh.project.name : ''}
                                    </strong>
                                </h4>
                            </div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>

                {this.state.showDelete && (
                    <RevenuesKwhdetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        id={revenuesKwh.id}
                        projectId={revenuesKwh.project.id}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        revenuesKwh: state.revenuesKwh,
        permissions: state.meDetails.permissions,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ blockUI, unblockUI }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RevenuesKwhdetailsToolbar);
