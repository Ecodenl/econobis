import React, {Component} from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import PostalCodeLinkListItem from './PostalCodeLinkListItem';
import PostalCodeLinkDeleteItem from "./PostalCodeLinkDeleteItem";
import PostalCodeLinkNewForm from "./PostalCodeLinkNewForm";

class PostalCodeLinkList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                postalCodeMain: '',
                postalCodeLink: '',
            }
        };
    }

    showDeleteItemModal = (id, postalCodeMain, postalCodeLink) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
                ...this.state.deleteItem,
                id,
                postalCodeMain,
                postalCodeLink
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
                postalCodeMain: '',
                postalCodeLink: '',
            }
        });
    };

    render() {
        return (
            <div>
                {
                    this.props.showNew &&
                    <PostalCodeLinkNewForm
                        toggleShowNew={this.props.toggleShowNew}
                        refreshPostalCodeLinksData={this.props.refreshPostalCodeLinksData}
                        {...this.state.deleteItem}
                    />
                }

                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Kern postcode'} width={"47%"}/>
                            <DataTableHeadTitle title={'Link postcode'} width={"47%"}/>
                            <DataTableHeadTitle title={''} width={"6%"}/>
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            this.props.postalCodeLinks.length === 0 ? (
                                <tr>
                                    <td colSpan={11}>Geen postcodes gevonden!</td>
                                </tr>
                            ) : (
                                this.props.postalCodeLinks.map((postalCodeLink) => {
                                    return <PostalCodeLinkListItem
                                        key={postalCodeLink.id}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        refreshPostalCodeLinksData={this.props.refreshPostalCodeLinksData}
                                        {...postalCodeLink}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>

                {
                    this.state.showDeleteItem &&
                    <PostalCodeLinkDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                    />
                }
            </div>
        );
    }
};

export default PostalCodeLinkList;