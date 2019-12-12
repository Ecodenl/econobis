import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchIntakes, clearIntakes, setCheckedIntakeAll } from '../../../actions/intake/IntakesActions';
import { clearFilterIntakes } from '../../../actions/intake/IntakesFiltersActions';
import { setIntakesPagination } from '../../../actions/intake/IntakesPaginationActions';
import IntakesList from './IntakesList';
import IntakesListToolbar from './IntakesListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import fileDownload from 'js-file-download';
import IntakesAPI from '../../../api/intake/IntakesAPI';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';
import moment from 'moment/moment';

class IntakesListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCheckboxList: false,
            checkedAllCheckboxes: false,
        };

        this.handlePageClick = this.handlePageClick.bind(this);
        this.getExcel = this.getExcel.bind(this);
    }

    componentDidMount() {
        this.fetchIntakesData();
    }

    componentWillUnmount() {
        this.props.clearIntakes();
    }

    getExcel = () => {
        this.props.blockUI();
        setTimeout(() => {
            const filters = filterHelper(this.props.intakesFilters);
            const sorts = this.props.intakesSorts;

            IntakesAPI.getExcel({ filters, sorts })
                .then(payload => {
                    fileDownload(payload.data, 'Intakes-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx');
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    fetchIntakesData = () => {
        setTimeout(() => {
            const filters = filterHelper(this.props.intakesFilters);
            const sorts = this.props.intakesSorts;
            const pagination = { limit: 20, offset: this.props.intakesPagination.offset };

            this.props.fetchIntakes(filters, sorts, pagination);
        }, 100);
    };

    resetIntakeFilters = () => {
        this.props.clearFilterIntakes();

        this.fetchIntakesData();
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.intakesFilters);
        const sorts = this.props.intakesSorts;

        this.props.setIntakesPagination({ page: 0, offset: 0 });

        setTimeout(() => {
            this.fetchIntakesData();
        }, 100);
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setIntakesPagination({ page, offset });

        setTimeout(() => {
            this.fetchIntakesData();
        }, 100);
    }

    toggleShowCheckboxList = () => {
        this.setState({
            showCheckboxList: !this.state.showCheckboxList,
        });
    };

    selectAllCheckboxes = () => {
        this.setState({
            checkedAllCheckboxes: !this.state.checkedAllCheckboxes,
        });

        this.props.setCheckedIntakeAll(!this.state.checkedAllCheckboxes);
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <IntakesListToolbar
                            toggleShowCheckboxList={() => this.toggleShowCheckboxList()}
                            resetIntakeFilters={() => this.resetIntakeFilters()}
                            getExcel={this.getExcel}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <IntakesList
                            intakes={this.props.intakes}
                            intakesPagination={this.props.intakesPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshIntakesData={() => this.fetchIntakesData()}
                            handlePageClick={this.handlePageClick}
                            showCheckboxList={this.state.showCheckboxList}
                            selectAllCheckboxes={() => this.selectAllCheckboxes()}
                            checkedAllCheckboxes={this.state.checkedAllCheckboxes}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        intakes: state.intakes.list,
        intakesFilters: state.intakes.filters,
        intakesSorts: state.intakes.sorts,
        intakesPagination: state.intakes.pagination,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchIntakes,
            clearIntakes,
            setIntakesPagination,
            clearFilterIntakes,
            setCheckedIntakeAll,
            blockUI,
            unblockUI,
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntakesListApp);
