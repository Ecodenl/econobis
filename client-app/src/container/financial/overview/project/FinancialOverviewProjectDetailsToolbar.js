import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import { blockUI, unblockUI } from '../../../../actions/general/BlockUIActions';
import * as PropTypes from 'prop-types';
import FinancialOverviewProjectAPI from '../../../../api/financial/overview/FinancialOverviewProjectAPI';
import fileDownload from 'js-file-download';
import moment from 'moment/moment';

// Functionele wrapper voor de class component
const FinancialOverviewProjectDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <FinancialOverviewProjectDetailsToolbar {...props} navigate={navigate} />;
};

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
        let { financialOverviewDescription, navigate } = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                        <ButtonIcon iconName={'download'} onClickAction={this.getCSV} />
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

export default FinancialOverviewProjectDetailsToolbarWrapper;
