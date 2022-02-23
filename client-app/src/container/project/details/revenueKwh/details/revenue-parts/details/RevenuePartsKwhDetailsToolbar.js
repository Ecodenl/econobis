import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import Panel from '../../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../../components/panel/PanelBody';
import ButtonIcon from '../../../../../../../components/button/ButtonIcon';
import RevenuePartsKwhDetailsDelete from './RevenuePartsKwhDetailsDelete';
import { blockUI, unblockUI } from '../../../../../../../actions/general/BlockUIActions';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';
import fileDownload from 'js-file-download';
import RevenuePartsKwhAPI from '../../../../../../../api/project/RevenuePartsKwhAPI';

class RevenuePartsKwhDetailsToolbar extends Component {
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
            RevenuePartsKwhAPI.getCSV(this.props.revenuePartsKwh.id)
                .then(payload => {
                    fileDownload(
                        payload.data,
                        'Deelopbrengstverdeling-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.csv'
                    );
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    render() {
        const { revenuePartsKwh, revenuesKwh } = this.props;
        const pdfLink = `project/opbrengst-deelperiode-kwh/${revenuePartsKwh.id}/energieleverancier-rapport`;
        const excelLink = `project/opbrengst-deelperiode-kwh/${revenuePartsKwh.id}/energieleverancier-excel`;

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
                                    {/*todo WM: voorlopig niet deelperiodes afzonderlijk verwijderen */}
                                    {/*{this.props.permissions.manageFinancial &&*/}
                                    {/*    !revenuePartsKwh.status != 'confirmed' &&*/}
                                    {/*    !revenuePartsKwh.status != 'processed' && (*/}
                                    {/*        <ButtonIcon*/}
                                    {/*            iconName={'glyphicon-trash'}*/}
                                    {/*            onClickAction={this.toggleDelete}*/}
                                    {/*        />*/}
                                    {/*    )}*/}
                                    {/*todo WM: voorlopig alleen rapportage over hele periode */}
                                    {/*{revenuePartsKwh.confirmed ? (*/}
                                    {/*    <div className="nav navbar-nav btn-group" role="group">*/}
                                    {/*        <button className="btn btn-success btn-sm" data-toggle="dropdown">*/}
                                    {/*            Rapportage Energie leverancier*/}
                                    {/*        </button>*/}
                                    {/*        <ul className="dropdown-menu">*/}
                                    {/*            <li>*/}
                                    {/*                <Link to={pdfLink}>Ledenverklaring of productie specificatie</Link>*/}
                                    {/*            </li>*/}
                                    {/*            <li>*/}
                                    {/*                <Link to={excelLink}>Deelopbrengstverdelingen deelnemers</Link>*/}
                                    {/*            </li>*/}
                                    {/*        </ul>*/}
                                    {/*    </div>*/}
                                    {/*) : null}*/}
                                    <ButtonIcon iconName={'glyphicon-download-alt'} onClickAction={this.getCSV} />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h4 className="text-center text-success margin-small">
                                    <strong>
                                        Opbrengst kwh standen project{' '}
                                        {revenuesKwh.project ? revenuesKwh.project.name : ''}
                                    </strong>
                                </h4>
                            </div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>

                {this.state.showDelete && (
                    <RevenuePartsKwhDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        id={revenuePartsKwh.id}
                        revenueId={revenuesKwh.id}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        revenuePartsKwh: state.revenuePartsKwh,
        revenuesKwh: state.revenuesKwh,
        permissions: state.meDetails.permissions,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ blockUI, unblockUI }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RevenuePartsKwhDetailsToolbar);
