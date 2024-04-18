import React, { useState } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';

import OpportunitiesListItem from './OpportunitiesListItem';
import OpportunityDeleteItem from './OpportunityDeleteItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import OpportunitiesListHead from './OpportunitiesListHead';
import OpportunitiesListFilter from './OpportunitiesListFilter';
import { useSelector } from 'react-redux';
import ButtonIcon from '../../../components/button/ButtonIcon';
import Icon from 'react-icons-kit';
import { hashHistory } from 'react-router';
import { share } from 'react-icons-kit/fa/share';
import { setBulkEmailToContactIds } from '../../../actions/email/BulkMailActions';

function OpportunitiesList({
    onSubmitFilter,
    opportunities,
    fetchOpportunitiesData,
    showCheckboxList,
    handlePageClick,
    opportunitiesPagination,
}) {
    const [state, setState] = useState({
        showDeleteItem: false,
        deleteItem: {
            id: '',
            contactName: '',
            measureCategoryName: '',
        },
    });

    const [opportunityIds, setOpportunityIds] = useState([]);
    const isLoading = useSelector(state => state.loadingData.isLoading);
    const hasError = useSelector(state => state.loadingData.hasError);

    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            onSubmitFilter();
        }
    };

    const showDeleteItemModal = (id, contactName, measureCategoryName) => {
        setState({
            ...state,
            showDeleteItem: true,
            deleteItem: {
                ...state.deleteItem,
                id: id,
                contactName: contactName,
                measureCategoryName: measureCategoryName,
            },
        });
    };

    const closeDeleteItemModal = () => {
        setState({
            ...state,
            showDeleteItem: false,
            deleteItem: {
                ...state.deleteItem,
                id: '',
                contactName: '',
                measureCategoryName: '',
            },
        });
    };

    function toggleCheckedAll() {
        const isChecked = event.target.checked;
        let opportunityIds = [];

        if (isChecked) {
            opportunityIds = meta.opportunityIdsTotal;
        }
        setOpportunityIds(opportunityIds);
        setCheckedAll(isChecked);
    }

    function toggleOpportunityCheck(event) {
        const isChecked = event.target.checked;
        const opportunityId = Number(event.target.name);

        if (isChecked) {
            setOpportunityIds([...opportunityIds, opportunityId]);
            checkAllOpportunitiesAreChecked();
        } else {
            setOpportunityIds([...opportunityIds.filter(item => item !== opportunityId)]);
            setCheckedAll(false);
        }
    }

    function checkAllOpportunitiesAreChecked() {
        setCheckedAll(opportunityIds.length === meta.opportunityIdsTotal.length);
    }

    function updateSelection() {
        // todo WM: nog doen
        console.log('updateSelection goes here');
    }
    function deleteSelection() {
        // todo WM: nog doen
        console.log('updateSelection goes here');
    }

    const { data = [], meta = {} } = opportunities;

    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van kansen.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (data.length === 0) {
        loadingText = 'Geen kansen gevonden!';
    } else {
        loading = false;
    }

    let numberSelectedNumberTotal = 0;

    if (opportunityIds) {
        if (meta && meta.opportunityIdsTotal) {
            numberSelectedNumberTotal = opportunityIds.length + '/' + meta.opportunityIdsTotal.length;
        } else {
            numberSelectedNumberTotal = opportunityIds.length;
        }
    }
    function bulkEmailContacts() {
        let contactIds = [];
        opportunities.data.map(opportunity => opportunity.checked === true && contactIds.push(opportunity.contactId));

        setBulkEmailToContactIds(contactIds);

        hashHistory.push('/email/nieuw/bulk');
    }

    return (
        <div>
            <form onKeyUp={handleKeyUp}>
                {showCheckboxList && (
                    <>
                        <div className="col-md-12">
                            <div className="alert alert-success">Geselecteerde kansen: {numberSelectedNumberTotal}</div>
                        </div>

                        <div className="col-md-12 margin-10-bottom">
                            <div className="nav navbar-nav btn-group" role="group">
                                <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                    <Icon size={12} icon={share} />
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a onClick={bulkEmailContacts}>Contacten emailen</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="btn-group" role="group">
                                <ButtonIcon
                                    iconName={'pencil'}
                                    onClickAction={updateSelection}
                                    title="Bijwerken geselecteerde kansen"
                                />
                                <ButtonIcon
                                    iconName={'trash'}
                                    onClickAction={deleteSelection}
                                    title="Verwijderen geselecteerde kansen"
                                />
                            </div>
                        </div>
                    </>
                )}

                <DataTable>
                    <DataTableHead>
                        <OpportunitiesListHead fetchOpportunitiesData={() => fetchOpportunitiesData()} />

                        <OpportunitiesListFilter
                            onSubmitFilter={onSubmitFilter}
                            showCheckboxList={showCheckboxList}
                            toggleCheckedAll={toggleCheckedAll}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={8}>{loadingText}</td>
                            </tr>
                        ) : (
                            data.map(opportunities => (
                                <OpportunitiesListItem
                                    key={opportunities.id}
                                    {...opportunities}
                                    showDeleteItemModal={showDeleteItemModal}
                                    showCheckbox={showCheckboxList}
                                    toggleOpportunityCheck={toggleOpportunityCheck}
                                    opportunityIds={opportunityIds}
                                />
                            ))
                        )}
                    </DataTableBody>
                </DataTable>
                <div className="col-md-6 col-md-offset-3">
                    <DataTablePagination
                        onPageChangeAction={handlePageClick}
                        totalRecords={meta.total}
                        initialPage={opportunitiesPagination.page}
                    />
                </div>
                {state.showDeleteItem && (
                    <OpportunityDeleteItem
                        closeDeleteItemModal={closeDeleteItemModal}
                        fetchOpportunitiesData={fetchOpportunitiesData}
                        {...state.deleteItem}
                    />
                )}
            </form>
        </div>
    );
}

export default OpportunitiesList;
