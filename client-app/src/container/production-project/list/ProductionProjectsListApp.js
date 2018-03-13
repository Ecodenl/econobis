import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProductionProjects, clearProductionProjects } from '../../../actions/production-project/ProductionProjectsActions';
import { setProductionProjectsPagination } from '../../../actions/production-project/ProductionProjectsPaginationActions';
import ProductionProjectsListToolbar from './ProductionProjectsListToolbar';
import ProductionProjectsList from './ProductionProjectsList';

class ProductionProjectsListApp extends Component {
    constructor(props){
        super(props);

        this.fetchProductionProjectsData = this.fetchProductionProjectsData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    };

    componentDidMount() {
        this.fetchProductionProjectsData();
    };

    componentWillUnmount() {
        this.props.clearProductionProjects();
    };

    fetchProductionProjectsData() {
        setTimeout(() => {
            const pagination = { limit: 20, offset: this.props.productionProjectsPagination.offset };

            this.props.fetchProductionProjects(pagination);
        },100 );
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setProductionProjectsPagination({page, offset});

        this.fetchProductionProjectsData();
    };

    render() {
        return (
            <div>
                <div className="panel panel-default col-md-12">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <ProductionProjectsListToolbar/>
                        </div>
                        <div className="col-md-12 margin-10-top">
                            <ProductionProjectsList
                                handlePageClick={this.handlePageClick} fetchProductionProjectsData={this.fetchProductionProjectsData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        productionProjectsPagination: state.productionProjects.pagination,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchProductionProjects: (pagination) => {
        dispatch(fetchProductionProjects(pagination));
    },
    clearProductionProjects: () => {
        dispatch(clearProductionProjects());
    },
    setProductionProjectsPagination: (pagination) => {
        dispatch(setProductionProjectsPagination(pagination));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductionProjectsListApp);