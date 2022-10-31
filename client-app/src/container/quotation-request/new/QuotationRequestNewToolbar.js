import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import { connect } from 'react-redux';

const QuotationRequestNewToolbar = props => {
    const opportunityAction = props.opportunityActions.find(function(opportunityAction) {
        return opportunityAction.id == props.opportunityActionId;
    });

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                </div>
            </div>
            <div className="col-md-4">
                <h4 className="text-center">Nieuw {opportunityAction ? opportunityAction.name : 'actie'}</h4>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        opportunityActions: state.systemData.opportunityActions,
    };
};

export default connect(mapStateToProps, null)(QuotationRequestNewToolbar);
