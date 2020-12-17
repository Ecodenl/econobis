import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';

class FinancialOverviewContactPreviewToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        <ButtonIcon iconName={'glyphicon-zoom-in'} onClickAction={this.props.zoomIn} />
                        <ButtonIcon iconName={'glyphicon-zoom-out'} onClickAction={this.props.zoomOut} />
                    </div>
                </div>
                <div className="col-md-6">
                    <h4 className="text-center">
                        {'Contact: ' +
                            (this.props.financialOverviewContactDetails &&
                            this.props.financialOverviewContactDetails.contact
                                ? this.props.financialOverviewContactDetails.contact.full_name
                                : '')}
                        <br />
                        {'Waardestaat: ' +
                            (this.props.financialOverviewContactDetails &&
                            this.props.financialOverviewContactDetails.financialOverview
                                ? this.props.financialOverviewContactDetails.financialOverview.description
                                : '')}
                        <br />
                    </h4>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         financialOverviewContactDetails: state.financialOverviewContactDetails,
//     };
// };
//
// export default connect(mapStateToProps)(FinancialOverviewContactPreviewToolbar);
export default FinancialOverviewContactPreviewToolbar;
