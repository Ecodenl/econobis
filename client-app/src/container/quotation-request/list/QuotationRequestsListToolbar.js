import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';
import Icon from 'react-icons-kit';
import { check } from 'react-icons-kit/fa/check';
import { download } from 'react-icons-kit/fa/download';

const QuotationRequestsListToolbar = props => {
    const { meta = {} } = props.quotationRequests;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.resetQuotationRequestFilters} />
                    <span>
                        <button className="btn btn-success btn-sm" data-toggle="dropdown">
                            <Icon size={15} icon={download} />
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <a onClick={() => props.getCSV()}>Kansacties</a>
                            </li>
                            <li>
                                <a onClick={() => props.getSpuk('lai')}>Spuk rapport LAI</a>
                            </li>
                        </ul>
                    </span>
                    {props.opportunityActionType === 'all' ? (
                        <>
                            <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                <Icon size={15} icon={check} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a onClick={() => props.setOpportunityActionType('quotation-request')}>
                                        Offerteverzoek selectie maken
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => props.setOpportunityActionType('visit')}>Bezoek selectie maken</a>
                                </li>
                                <li>
                                    <a onClick={() => props.setOpportunityActionType('subsidy-request')}>
                                        Budgetaanvraag selectie maken
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => props.setOpportunityActionType('redirection')}>
                                        Doorverwijzing selectie maken
                                    </a>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <ButtonIcon
                            iconName={'check'}
                            onClickAction={() => props.setOpportunityActionType('all')}
                            title="Geen selectie maken"
                        />
                    )}
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
