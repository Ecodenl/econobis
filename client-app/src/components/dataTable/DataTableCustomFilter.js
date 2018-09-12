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
            type: props.fields[props.filter.field].type,
            dropDownOptions: props.fields[props.filter.field].dropDownOptions ? props.fields[props.filter.field].dropDownOptions : '',
            optionName: props.fields[props.filter.field].optionName ? props.fields[props.filter.field].optionName : 'name',
        };

        this.deleteRow = this.deleteRow.bind(this);
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

        this.props.handleFilterFieldChange(name, value, this.props.filterNumber);
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

        this.props.handleFilterValueChange(name, value, this.props.filterNumber);
    };

    handleInputChangeDate = (value, name) => {
        this.props.handleFilterValueChange('data', value, this.props.filterNumber);
    };

    deleteRow() {
        this.props.deleteFilterRow(this.props.filterNumber);
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

        const isCustomProductField = (field == 'dateStart' || field == 'dateFinish' || field == 'orderStatus');

        return (
            <tr>
                <td className="col-md-4">
                    {
                        isCustomProductField ?
                            <select disabled={true} className="form-control input-sm" name={'field'} value={field}>
                                <option key={0} value={field}>{fields[field].name}</option>
                            </select>
                            :
                            <select disabled={this.props.filter.readOnly} className="form-control input-sm" name={'field'} value={field} onChange={this.handleFieldChange}>
                                {fieldList}
                            </select>
                    }
                </td>
                <td className="col-md-3">
                    {this.state.type === 'string' &&
                    <DataTableCustomFilterSelectString
                        handleInputChange={this.handleInputChange}
                        type={type}
                        readOnly={this.props.filter.readOnly}
                    />
                    }
                    {this.state.type === 'number' &&
                        <DataTableCustomFilterSelectNumber
                            handleInputChange={this.handleInputChange}
                            type={type}
                            readOnly={this.props.filter.readOnly}
                        />
                    }
                    {this.state.type === 'dropdown' &&
                    <DataTableCustomFilterSelectDropdown
                        handleInputChange={this.handleInputChange}
                        type={type}
                        readOnly={this.props.filter.readOnly}
                    />
                    }
                    {this.state.type === 'dropdownHas' &&
                    <DataTableCustomFilterSelectDropdownHas
                        handleInputChange={this.handleInputChange}
                        type={type}
                        readOnly={this.props.filter.readOnly}
                    />
                    }
                    {this.state.type === 'date' &&
                    <DataTableCustomFilterSelectDate
                        handleInputChange={this.handleInputChange}
                        type={type}
                        readOnly={this.props.filter.readOnly}
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
                        readOnly={this.props.filter.readOnly}
                    />
                }
                {(this.state.type === 'dropdown' ||  this.state.type === 'dropdownHas') &&
                    <select
                        className={`form-control input-sm`}
                        id='data'
                        name='data'
                        value={this.props.filter.data}
                        onChange={this.handleInputChange}
                        disabled={this.props.filter.readOnly}
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
                        readOnly={this.props.filter.readOnly}
                    />
                }
                </td>
                }
                { (isCustomProductField || this.props.filter.readOnly) ?
                    <td />
                    :
                    <td className="col-md-1"><span className="glyphicon glyphicon-trash mybtn-danger" role="button" onClick={this.deleteRow} /></td>
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