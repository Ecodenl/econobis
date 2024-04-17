import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const QuotationRequestsListToolbar = props => {
    const { meta = {} } = props.quotationRequests;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.resetQuotationRequestFilters} />
                    <ButtonIcon iconName={'download'} onClickAction={props.getCSV} />
                    <ButtonIcon
                        iconName={'check'}
                        onClickAction={props.setMultiSelectEnabled}
                        title="Taakselectie maken"
                    />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Kansacties</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        quotationRequests: state.quotationRequests.list,
    };
};

export default connect(mapStateToProps, null)(QuotationRequestsListToolbar);
