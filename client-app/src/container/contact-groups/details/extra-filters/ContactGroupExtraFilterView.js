import React from 'react';
import FilterHelper from '../FilterHelper';

const ContactGroupExtraFilterView = props => {
    const { field, comperator, dataName } = props.extraFilter;
    const fieldReadable = FilterHelper('field', field);
    const comperatorReadable = FilterHelper('comperator', comperator);

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-3">{fieldReadable}</div>
                <div className="col-sm-3">{comperatorReadable}</div>
                <div className="col-sm-3">{dataName}</div>
            </div>
        </div>
    );
};

export default ContactGroupExtraFilterView;
