import React from 'react';
import FilterHelper from '../FilterHelper';
import { isEmpty } from 'lodash';

const ContactGroupExtraFilterView = props => {
    const { field, comperator, dataName } = props.extraFilter;
    let dataNameReadable = dataName;
    if (
        isEmpty(dataName) &&
        (field === 'energySupplier' ||
            field === 'orderStatus' ||
            field === 'product' ||
            field === 'opportunity' ||
            field === 'occupationPrimary' ||
            field === 'occupation' ||
            field === 'staticContactGroup' ||
            field === 'country') &&
        (comperator === 'eq' || comperator === 'neq' || comperator === 'rel' || comperator === 'nrel')
    ) {
        dataNameReadable = '--Willekeurige waarde--';
    }

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
                <div className="col-sm-3">{dataNameReadable}</div>
            </div>
        </div>
    );
};

export default ContactGroupExtraFilterView;
