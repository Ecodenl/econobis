import React, {Component} from 'react';

import MeasureDetailsSupplierView from './MeasureDetailsSupplierView';
import MeasureDetailsSupplierItemDelete from "./MeasureDetailsSupplierItemDelete";

class MeasureDetailsSupplierItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            supplier: {
                ...props.supplier,
            },
        };
    };

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

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div>
                <MeasureDetailsSupplierView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    supplier={this.state.supplier}
                />
                {
                    this.state.showDelete &&
                    <MeasureDetailsSupplierItemDelete
                        toggleDelete={this.toggleDelete}
                        supplierId={this.state.supplier.id}
                    />
                }
            </div>
        );
    }
};

export default MeasureDetailsSupplierItem;
