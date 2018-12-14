import React, {Component} from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import ProductsListItem from './ProductsListItem';
import ProductDeleteItem from "./ProductDeleteItem";
import {connect} from "react-redux";

class ProductsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                name: '',
            }
        };
    }

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
                ...this.state.deleteItem,
                id,
                name
            }
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem:{
                ...this.state.deleteItem,
                id: '',
                name: '',
            }
        });
    };

    render() {

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van producten.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (this.props.products.length === 0) {
            loadingText = 'Geen producten gevonden!';
        }
        else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Productcode'} width={"15%"}/>
                            <DataTableHeadTitle title={'Product'} width={"20%"}/>
                            <DataTableHeadTitle title={'Prijs ex. BTW'} width={"15%"}/>
                            <DataTableHeadTitle title={'BTW percentage'} width={"15%"}/>
                            <DataTableHeadTitle title={'Prijs incl. BTW'} width={"15%"}/>
                            <DataTableHeadTitle title={'Administratie'} width={"15%"}/>
                            <DataTableHeadTitle title={''} width={"5%"}/>
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            loading ? (
                                <tr>
                                    <td colSpan={7}>{loadingText}</td>
                                </tr>
                            ) : (
                                this.props.products.map((product) => {
                                    return <ProductsListItem
                                        key={product.id}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        {...product}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>

                {
                    this.state.showDeleteItem &&
                    <ProductDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    }
};

export default connect(mapStateToProps)(ProductsList);