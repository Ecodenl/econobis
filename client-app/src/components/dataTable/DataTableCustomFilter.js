import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DataTableCustomFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
           filter: {
               field: Object.keys(props.fields)[0],
               type: 'eq',
               data: '',
           }
        };
    };


    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            filter: {
                ...this.state.filter,
                [name]: value
            },
        });

        setTimeout(() => {
            this.props.handleFilterChange(this.state.filter.field, this.state.filter.type, this.state.filter.data, this.props.filterNumber);
        }, 250);
    };

    render() {
        const {fields} = this.props;

        const fieldList = Object.entries(fields).map(([key, value]) => {
            return (
                <option value={key}>{value}</option>
            );
        });

        return (
            <tr>
                <td className="col-md-4">
                    <select className="form-control input-sm" name={'field'} onChange={this.handleInputChange}>
                        {fieldList}
                    </select></td>
                <td className="col-md-4">
                    <select className="form-control input-sm" name={'type'} onChange={this.handleInputChange}>
                    <option value='eq'>gelijk aan</option>
                    <option value='neq'>niet gelijk aan</option>
                    <option value='ct'>bevat</option>
                    <option value='lt'>kleiner dan</option>
                    <option value='lte'>kleiner of gelijk aan</option>
                    <option value='gt'>groter dan</option>
                    <option value='bw'>begint met</option>
                    <option value='nbw'>begint niet met</option>
                    <option value='ew'>eindigd met</option>
                    <option value='new'>eindigd niet met</option>
                    <option value='nl'>is leeg</option>
                    <option value='nnl'>is niet leeg</option>
                </select>
                </td>
                <td className="col-md-4">
                    <input
                        className={'form-control input-sm'}
                        type='text'
                        id='data'
                        name='data'
                        value={this.state.value}
                        onChange={this.handleInputChange}
                    />
                </td>
            </tr>
        )
    }
};

DataTableCustomFilter.propTypes = {
    fields: PropTypes.object.isRequired,
};

export default DataTableCustomFilter;