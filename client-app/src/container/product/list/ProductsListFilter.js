import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    setProductCodeFilter,
    setProductFilter,
    setActiveProductFilter,
    clearFilterProducts,
} from '../../../actions/product/ProductsFiltersActions';

const ProductsListFilter = props => {
    const onProductCodeChange = e => {
        props.setProductCodeFilter(e.target.value);
    };

    const onProductChange = e => {
        props.setProductFilter(e.target.value);
    };

    const onActiveProductChange = e => {
        props.setActiveProductFilter(e.target.value);
    };

    return (
        <tr className="thead-filter">
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.code.data}
                    onChange={onProductCodeChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.name.data}
                    onChange={onProductChange}
                />
            </th>
            <th />
            <th />
            <th />
            <th />
            <th>
                <select
                    className="form-control input-sm"
                    defaultValue={!props.filters.active.data}
                    onChange={onActiveProductChange}
                >
                    <option />
                    <option key={1} value={1}>
                        Nee
                    </option>
                    <option key={0} value={0}>
                        Ja
                    </option>
                </select>
            </th>
            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.products.filters,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setProductCodeFilter,
            setProductFilter,
            setActiveProductFilter,
            clearFilterProducts,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListFilter);
