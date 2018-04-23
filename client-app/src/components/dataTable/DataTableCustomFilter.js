import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTableCustomFilterSelectString from "./DataTableCustomFilterSelectString";
import DataTableCustomFilterSelectNumber from "./DataTableCustomFilterSelectNumber";

class DataTableCustomFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.fields[Object.keys(props.fields)[0]].type,
            filter: {
                field: Object.keys(props.fields)[0],
                type: 'eq',
                data: '',
            }
        };
    };

    handleFieldChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const type = this.props.fields[value].type;

        this.setState({
            type: type,
            filter: {
                ...this.state.filter,
                [name]: value
            },
        });

        setTimeout(() => {
            this.props.handleFilterChange(this.state.filter.field, this.state.filter.type, this.state.filter.data, this.props.filterNumber);
        }, 250);
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

        const fieldList = Object.entries(fields).map(([key, value], i) => {
            return (
                <option key={i} value={key}>{value.name}</option>
            );
        });

        return (
            <tr>
                <td className="col-md-4">
                    <select className="form-control input-sm" name={'field'} onChange={this.handleFieldChange}>
                        {fieldList}
                    </select></td>
                <td className="col-md-4">
                    {this.state.type === 'string' &&
                    <DataTableCustomFilterSelectString
                        handleInputChange={this.handleInputChange}
                    />
                    }
                    {this.state.type === 'number' &&
                        <DataTableCustomFilterSelectNumber
                            handleInputChange={this.handleInputChange}
                        />
                    }
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