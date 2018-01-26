import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAuditTrail, clearAuditTrail } from '../../../actions/audit-trail/AuditTrailActions';
import { clearFilterAuditTrail } from '../../../actions/audit-trail/AuditTrailFiltersActions';
import { setAuditTrailPagination } from '../../../actions/audit-trail/AuditTrailPaginationActions';
import AuditTrailList from './AuditTrailList';
import AuditTrailListToolbar from './AuditTrailListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from "../../../components/panel/PanelBody";
import AuditTrailAPI from "../../../api/audit-trail/AuditTrailAPI";

class AuditTrailListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            models: [],
        };

        this.fetchAuditTrailData = this.fetchAuditTrailData.bind(this);
        this.resetAuditTrailFilters = this.resetAuditTrailFilters.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchAuditTrailData();

        AuditTrailAPI.fetchAuditTrailModels().then((payload) => {
            this.setState({ models: payload });
        });
    };

    componentWillUnmount() {
        this.props.clearAuditTrail();
    };

    fetchAuditTrailData() {
        setTimeout(() => {
            const filters = filterHelper(this.props.auditTrailFilters);
            const sorts = this.props.auditTrailSorts.reverse();
            const pagination = { limit: 20, offset: this.props.auditTrailPagination.offset };

            this.props.fetchAuditTrail(filters, sorts, pagination);
        },100 );
    };

    resetAuditTrailFilters() {
        this.props.clearFilterAuditTrail();

        this.fetchAuditTrailData();
    };

    onSubmitFilter() {
        this.props.clearAuditTrail();

        this.props.setAuditTrailPagination({page: 0, offset: 0});

        this.fetchAuditTrailData();
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setAuditTrailPagination({page, offset});

        this.fetchAuditTrailData();
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <AuditTrailListToolbar
                            resetAuditTrailFilters={() => this.resetAuditTrailFilters()}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <AuditTrailList
                            auditTrail={this.props.auditTrail}
                            models={this.state.models}
                            auditTrailPagination={this.props.auditTrailPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            fetchAuditTrailData={() => this.fetchAuditTrailData()}
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
        auditTrail: state.auditTrail.list,
        auditTrailFilters: state.auditTrail.filters,
        auditTrailSorts: state.auditTrail.sorts,
        auditTrailPagination: state.auditTrail.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchAuditTrail, clearAuditTrail, clearFilterAuditTrail, setAuditTrailPagination }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AuditTrailListApp);