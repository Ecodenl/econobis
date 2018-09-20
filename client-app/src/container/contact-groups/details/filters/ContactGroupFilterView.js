import React from 'react';
import FilterHelper from '../FilterHelper'
const ContactGroupFilterView = props => {
    const {field, dataName} = props.filter;
    const fieldReadable = FilterHelper('field', field);

    return (

        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div>
                <div className="col-sm-3">{fieldReadable}</div>
                <div className="col-sm-3">{dataName}</div>
            </div>
        </div>
    );
};

export default ContactGroupFilterView;
