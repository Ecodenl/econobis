import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';

const MeasureDetailsSupplierView = props => {
    const navigate = useNavigate();

    const { id, name, address, contactId } = props.supplier;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={() => navigate(`/contact/${contactId}`)}>
                <div className="col-sm-5">{name}</div>
                <div className="col-sm-6">{address ? address.city : 'Niet bekend'}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons && props.permissions.manageMeasure ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <Icon className="mybtn-danger" size={14} icon={trash} />
                    </a>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(MeasureDetailsSupplierView);
