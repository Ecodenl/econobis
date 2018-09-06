import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTableCustomFilterSelectString from "./DataTableCustomFilterSelectString";
import DataTableCustomFilterSelectNumber from "./DataTableCustomFilterSelectNumber";
import DataTableCustomFilterSelectDropdown from "./DataTableCustomFilterSelectDropdown";
import DataTableCustomFilterSelectDate from "./DataTableCustomFilterSelectDate";

import moment from 'moment';
import DataTableDateFilter from "./DataTableDateFilter";
import DataTableCustomFilterSelectDropdownHas from "./DataTableCustomFilterSelectDropdownHas";

moment.locale('nl');

class DataTableCustomFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comperator: props.filter.type,
            readOnly: props.filter.readOnly ? props.filter.readOnly : false,
            type: props.fields[props.filter.field].type,
            dropDownOptions: props.fields[props.filter.field].dropDownOptions ? props.fields[props.filter.field].dropDownOptions : '',
            optionName: props.fields[props.filter.field].optionName ? props.fields[props.filter.field].optionName : 'name',
        };
    };

    handleFieldChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const type = this.props.fields[value].type;
        const dropDownOptions = this.props.fields[value].dropDownOptions ? this.props.fields[value].dropDownOptions : '';
        const optionName = this.props.fields[value].optionName ? this.props.fields[value].optionName : 'name';

        this.setState({
            type,
            dropDownOptions,
            optionName,
        });

        this.props.handleFilterChange(name, value, this.props.filterNumber);
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        //hides input field for is empty/ is not empty
        if(name === 'type'){
            this.setState({
                comperator: value
            });
        }

        this.props.handleFilterChange(name, value, this.props.filterNumber);
    };

    handleInputChangeDate = (value, name) => {
        this.props.handleFilterChange('data', value, this.props.filterNumber);
    };

    render() {
        const {fields} = this.props;
        const {field} = this.props.filter;
        const {type} = this.props.filter;

        const fieldList = Object.entries(fields).map(([key, value], i) => {
            if(key === 'dateStart' || key === 'dateFinish' || key === 'orderStatus') return;

            return (
                <option key={i} value={key}>{value.name}</option>
            );
        });

        return (
            <tr>
                <td className="col-md-4">
                    {
                        (field == 'dateStart' || field == 'dateFinish' || field == 'orderStatus') ?
                            <select disabled={true} className="form-control input-sm" name={'field'} value={field}>
                                <option key={0} value={field}>{fields[field].name}</option>
                            </select>
                            :
                            <select disabled={this.state.readOnly} className="form-control input-sm" name={'field'} value={field} onChange={this.handleFieldChange}>
                                {fieldList}
                            </select>
                    }
                </td>
                <td className="col-md-4">
                    {this.state.type === 'string' &&
                    <DataTableCustomFilterSelectString
                        handleInputChange={this.handleInputChange}
                        type={type}
                        readOnly={this.state.readOnly}
                    />
                    }
                    {this.state.type === 'number' &&
                        <DataTableCustomFilterSelectNumber
                            handleInputChange={this.handleInputChange}
                            type={type}
                            readOnly={this.state.readOnly}
                        />
                    }
                    {this.state.type === 'dropdown' &&
                    <DataTableCustomFilterSelectDropdown
                        handleInputChange={this.handleInputChange}
                        type={type}
                        readOnly={this.state.readOnly}
                    />
                    }
                    {this.state.type === 'dropdownHas' &&
                    <DataTableCustomFilterSelectDropdownHas
                        handleInputChange={this.handleInputChange}
                        type={type}
                        readOnly={this.state.readOnly}
                    />
                    }
                    {this.state.type === 'date' &&
                    <DataTableCustomFilterSelectDate
                        handleInputChange={this.handleInputChange}
                        type={type}
                        readOnly={this.state.readOnly}
                    />
                    }
                </td>
                {(this.state.comperator !== 'nl' && this.state.comperator !== 'nnl') &&
                <td className="col-md-4">
                {(this.state.type === 'number' || this.state.type === 'string') &&
                    <input
                        className={'form-control input-sm'}
                        type='text'
                        id='data'
                        name='data'
                        value={this.props.filter.data}
                        onChange={this.handleInputChange}
                        readOnly={this.state.readOnly}
                    />
                }
                {(this.state.type === 'dropdown' ||  this.state.type === 'dropdownHas') &&
                    <select
                        className={`form-control input-sm`}
                        id='data'
                        name='data'
                        value={this.props.filter.data}
                        onChange={this.handleInputChange}
                        disabled={this.state.readOnly}
                        >
                        <option></option>
                        { this.state.dropDownOptions.map((option) => {
                            return <option key={ option.id } value={ option.id }>{ option[this.state.optionName] }</option>
                        }) }
                    </select>
                }
                {this.state.type === 'date' &&
                    <DataTableDateFilter
                        id='data'
                        value={this.props.filter.data}
                        onChangeAction={this.handleInputChangeDate}
                        readOnly={this.state.readOnly}
                    />
                }
                </td>
                }
            </tr>
        )
    }
};

DataTableCustomFilter.propTypes = {
    fields: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
};

export default DataTableCustomFilter;