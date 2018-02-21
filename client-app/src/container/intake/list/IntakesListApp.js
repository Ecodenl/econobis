import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchIntakes, clearIntakes } from '../../../actions/intake/IntakesActions';
import { clearFilterIntakes } from '../../../actions/intake/IntakesFiltersActions';
import { setIntakesPagination } from '../../../actions/intake/IntakesPaginationActions';
import IntakesList from './IntakesList';
import IntakesListToolbar from './IntakesListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from "../../../components/panel/PanelBody";

class IntakesListApp extends Component {
    constructor(props) {
        super(props);

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchIntakesData();
    };

    componentWillUnmount() {
        this.props.clearIntakes();
    };

    fetchIntakesData = () => {
        setTimeout(() => {
            const filters = filterHelper(this.props.intakesFilters);
            const sorts = this.props.intakesSorts.reverse();
            const pagination = { limit: 20, offset: this.props.intakesPagination.offset };

            this.props.fetchIntakes(filters, sorts, pagination);
        },100 );
    };

    resetIntakeFilters = () => {
        this.props.clearFilterIntakes();

        this.fetchIntakesData();
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.intakesFilters);
        const sorts = this.props.intakesSorts.reverse();

        this.props.setIntakesPagination({page: 0, offset: 0});

        setTimeout(() => {
            this.fetchIntakesData();
        },100 );
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setIntakesPagination({page, offset});

        setTimeout(() => {
            this.fetchIntakesData();
        },100 );
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <IntakesListToolbar
                            resetIntakeFilters={() => this.resetIntakeFilters()}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <IntakesList
                            intakes={this.props.intakes}
                            intakesPagination={this.props.intakesPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshIntakesData={() => this.fetchIntakesData()}
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
        intakes: state.intakes.list,
        intakesFilters: state.intakes.filters,
        intakesSorts: state.intakes.sorts,
        intakesPagination: state.intakes.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchIntakes, clearIntakes, setIntakesPagination, clearFilterIntakes }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(IntakesListApp);
