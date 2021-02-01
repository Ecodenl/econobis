import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import { blockUI, unblockUI } from '../../../../actions/general/BlockUIActions';
import * as PropTypes from 'prop-types';
import FinancialOverviewProjectAPI from '../../../../api/financial/overview/FinancialOverviewProjectAPI';
import fileDownload from 'js-file-download';
import moment from 'moment/moment';

class FinancialOverviewProjectDetailsToolbar extends Component {
    constructor(props) {
        super(props);
    }

    getCSV = () => {
        blockUI();
        setTimeout(() => {
            FinancialOverviewProjectAPI.getCSV(this.props.id)
                .then(payload => {
                    fileDownload(
                        payload.data,
                        'Waardestaat-' +
                            (this.props.projectName.length > 60
                                ? this.props.projectName.substring(0, 60)
                                : this.props.projectName) +
                            '-' +
                            moment().format('YYYY-MM-DD HH:mm:ss') +
                            '.csv'
                    );
                    unblockUI();
                })
                .catch(error => {
                    unblockUI();
                });
        }, 100);
    };

    render() {
        let { financialOverviewDescription } = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        <ButtonIcon iconName={'glyphicon-download-alt'} onClickAction={this.getCSV} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Waardestaat: {financialOverviewDescription}</h4>
                </div>
                <div className="col-md-4" />
            </div>
        );
    }
}

FinancialOverviewProjectDetailsToolbar.propTypes = {
    financialOverviewDescription: PropTypes.any,
};

// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({ blockUI, unblockUI }, dispatch);
// };

export default FinancialOverviewProjectDetailsToolbar;
