import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Panel from '../../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../../components/panel/PanelBody';
import ButtonIcon from '../../../../../../../components/button/ButtonIcon';
import RevenuePartsKwhDetailsDelete from './RevenuePartsKwhDetailsDelete';
import { blockUI, unblockUI } from '../../../../../../../actions/general/BlockUIActions';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';
import fileDownload from 'js-file-download';
import RevenuePartsKwhAPI from '../../../../../../../api/project/RevenuePartsKwhAPI';

// Functionele wrapper voor de class component
const RevenuePartsKwhDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <RevenuePartsKwhDetailsToolbar {...props} navigate={navigate} />;
};

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
        const { revenuePartsKwh, revenuesKwh, navigate } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-2">
                                <div className="btn-group btn-group-flex margin-small" role="group">
                                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                                    <ButtonIcon iconName={'download'} onClickAction={this.getCSV} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RevenuePartsKwhDetailsToolbarWrapper);
