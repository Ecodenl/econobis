import React, { Component } from 'react';
import { browserHistory, hashHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import ButtonText from '../../../../components/button/ButtonText';

class FinancialOverviewContactToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let { id, definitive, statusId } = this.props.financialOverview;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        {definitive && statusId === 'definitive' ? (
                            <>
                                <ButtonText
                                    buttonText={`Preview e-mail waardestaten`}
                                    onClickAction={() => hashHistory.push(`/waardestaat/${id}/aanmaken/email`)}
                                />
                                <ButtonText
                                    buttonText={`Preview post waardestaten`}
                                    onClickAction={() => hashHistory.push(`/waardestaat/${id}/aanmaken/post`)}
                                />
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default FinancialOverviewContactToolbar;
