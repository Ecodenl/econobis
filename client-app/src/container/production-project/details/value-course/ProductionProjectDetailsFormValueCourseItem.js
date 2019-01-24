import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { isEqual } from 'lodash';

import ProductionProjectValueCourseAPI from '../../../../api/production-project/ProductionProjectValueCourseAPI';
import { updateValueCourse } from '../../../../actions/production-project/ProductionProjectDetailsActions';
import ProductionProjectDetailsFormValueCourseView from './ProductionProjectDetailsFormValueCourseView';
import ProductionProjectDetailsFormValueCourseEdit from './ProductionProjectDetailsFormValueCourseEdit';
import ProductionProjectDetailsFormValueCourseDelete from './ProductionProjectDetailsFormValueCourseDelete';

class ProductionProjectDetailsFormValueCourseItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            valueCourse: {
                ...props.valueCourse,
                bookWorth: props.valueCourse.bookWorth
                    ? props.valueCourse.bookWorth.toLocaleString('nl', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                      })
                    : '',
                transferWorth: props.valueCourse.transferWorth
                    ? props.valueCourse.transferWorth.toLocaleString('nl', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                      })
                    : '',
            },
            errors: {
                bookWorth: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.valueCourse, nextProps.valueCourse)) {
            this.setState({
                ...this.state,
                valueCourse: {
                    ...nextProps.valueCourse,
                    bookWorth: nextProps.valueCourse.bookWorth
                        ? nextProps.valueCourse.bookWorth.toLocaleString('nl', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          })
                        : '',
                    transferWorth: nextProps.valueCourse.transferWorth
                        ? nextProps.valueCourse.transferWorth.toLocaleString('nl', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          })
                        : '',
                },
            });
        }
    }

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    openEdit = () => {
        this.setState({ showEdit: true });
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            valueCourse: {
                ...this.props.valueCourse,
                bookWorth: this.props.valueCourse.bookWorth
                    ? this.props.valueCourse.bookWorth.toLocaleString('nl', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                      })
                    : '',
                transferWorth: this.props.valueCourse.transferWorth
                    ? this.props.valueCourse.transferWorth.toLocaleString('nl', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                      })
                    : '',
            },
        });

        this.closeEdit();
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            valueCourse: {
                ...this.state.valueCourse,
                [name]: value,
            },
        });
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            valueCourse: {
                ...this.state.valueCourse,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { valueCourse } = this.state;
        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(valueCourse.bookWorth + '')) {
            errors.bookWorth = true;
            hasErrors = true;
        } else {
            valueCourse.bookWorth = valueCourse.bookWorth.replace(/,/g, '.');
        }

        if (!validator.isEmpty(valueCourse.transferWorth + '')) {
            valueCourse.transferWorth = valueCourse.transferWorth.replace(/,/g, '.');
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            ProductionProjectValueCourseAPI.updateProductionProjectValueCourse(valueCourse.id, valueCourse).then(
                payload => {
                    this.props.updateValueCourse(payload);
                    this.closeEdit();
                }
            );
    };

    render() {
        return (
            <div>
                <ProductionProjectDetailsFormValueCourseView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    valueCourse={this.state.valueCourse}
                />
                {this.state.showEdit && this.props.permissions.manageFinancial && (
                    <ProductionProjectDetailsFormValueCourseEdit
                        valueCourse={this.state.valueCourse}
                        handleInputChange={this.handleInputChange}
                        handleInputChangeDate={this.handleInputChangeDate}
                        handleSubmit={this.handleSubmit}
                        bookWorthError={this.state.errors.bookWorth}
                        cancelEdit={this.cancelEdit}
                    />
                )}
                {this.state.showDelete && this.props.permissions.manageFinancial && (
                    <ProductionProjectDetailsFormValueCourseDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.valueCourse}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

const mapDispatchToProps = dispatch => ({
    updateValueCourse: id => {
        dispatch(updateValueCourse(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionProjectDetailsFormValueCourseItem);
