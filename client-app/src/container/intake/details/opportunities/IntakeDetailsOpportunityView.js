import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const IntakeDetailsOpportunityView = props => {
    const navigate = useNavigate();

    const { id, number, createdAt, measureCategory, measures, status, quotationRequests } = props.opportunity;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={() => navigate(`/kans/${id}`)}>
                <div className="col-sm-2">{number}</div>
                <div className="col-sm-2">{createdAt ? moment(createdAt).format('L') : ''}</div>
                <div className="col-sm-2">{measureCategory ? measureCategory.name : ''}</div>
                <div className="col-sm-2 pre-wrap">
                    {measures.length
                        ? measures
                              .map(measure => {
                                  return measure.name;
                              })
                              .join(',\n')
                        : ''}
                </div>
                <div className="col-sm-2">{status ? status.name : ''}</div>
                <div className="col-sm-2">{quotationRequests.length}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(IntakeDetailsOpportunityView);
