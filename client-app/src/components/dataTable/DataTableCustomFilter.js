import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTableCustomFilterSelectString from "./DataTableCustomFilterSelectString";
import DataTableCustomFilterSelectNumber from "./DataTableCustomFilterSelectNumber";

class DataTableCustomFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.fields[Object.keys(props.fields)[0]].type,
        };
    };

    handleFieldChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const type = this.props.fields[value].type;

        this.setState({
            type: type,
        });

        this.props.handleFilterChange(name, value, this.props.filterNumber);
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.props.handleFilterChange(name, value, this.props.filterNumber);
    };

    render() {
        const {fields} = this.props;
        const {field} = this.props.filter;
        const {type} = this.props.filter;

        const fieldList = Object.entries(fields).map(([key, value], i) => {
            return (
                <option key={i} value={key}>{value.name}</option>
            );
        });

        return (
            <tr>
                <td className="col-md-4">
                    <select className="form-control input-sm" name={'field'} value={field} onChange={this.handleFieldChange}>
                        {fieldList}
                    </select></td>
                <td className="col-md-4">
                    {this.state.type === 'string' &&
                    <DataTableCustomFilterSelectString
                        handleInputChange={this.handleInputChange}
                        type={type}
                    />
                    }
                    {this.state.type === 'number' &&
                        <DataTableCustomFilterSelectNumber
                            handleInputChange={this.handleInputChange}
                            type={type}
                        />
                    }
                </td>
                <td className="col-md-4">
                    <input
                        className={'form-control input-sm'}
                        type='text'
                        id='data'
                        name='data'
                        value={this.props.filter.data}
                        onChange={this.handleInputChange}
                    />
                </td>
            </tr>
        )
    }
};

DataTableCustomFilter.propTypes = {
    fields: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
};

export default DataTableCustomFilter;