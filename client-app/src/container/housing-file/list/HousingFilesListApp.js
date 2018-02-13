import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchHousingFiles, clearHousingFiles } from '../../../actions/housing-file/HousingFilesActions';
import { clearFilterHousingFiles } from '../../../actions/housing-file/HousingFilesFiltersActions';
import { setHousingFilesPagination } from '../../../actions/housing-file/HousingFilesPaginationActions';
import HousingFilesList from './HousingFilesList';
import HousingFilesListToolbar from './HousingFilesListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from "../../../components/panel/PanelBody";

class HousingFilesListApp extends Component {
    constructor(props) {
        super(props);

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchHousingFilesData();
    };

    componentWillUnmount() {
        this.props.clearHousingFiles();
    };

    fetchHousingFilesData = () => {
        setTimeout(() => {
            const filters = filterHelper(this.props.housingFilesFilters);
            const sorts = this.props.housingFilesSorts.reverse();
            const pagination = { limit: 20, offset: this.props.housingFilesPagination.offset };

            this.props.fetchHousingFiles(filters, sorts, pagination);
        },100 );
    };

    resetHousingFileFilters = () => {
        this.props.clearFilterHousingFiles();

        this.fetchHousingFilesData();
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.housingFilesFilters);
        const sorts = this.props.housingFilesSorts.reverse();

        this.props.setHousingFilesPagination({page: 0, offset: 0});

        setTimeout(() => {
            this.fetchHousingFilesData();
        },100 );
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setHousingFilesPagination({page, offset});

        setTimeout(() => {
            this.fetchHousingFilesData();
        },100 );
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <HousingFilesListToolbar
                            resetHousingFileFilters={() => this.resetHousingFileFilters()}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <HousingFilesList
                            housingFiles={this.props.housingFiles}
                            housingFilesPagination={this.props.housingFilesPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshHousingFilesData={() => this.fetchHousingFilesData()}
                            handlePageClick={this.handlePageClick}
                        />
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        housingFiles: state.housingFiles.list,
        housingFilesFilters: state.housingFiles.filters,
        housingFilesSorts: state.housingFiles.sorts,
        housingFilesPagination: state.housingFiles.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchHousingFiles, clearHousingFiles, setHousingFilesPagination, clearFilterHousingFiles }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HousingFilesListApp);
