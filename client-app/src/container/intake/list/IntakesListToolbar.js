import React, { Component } from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

class IntakesListToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { meta = {} } = this.props.intakes;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'refresh'} onClickAction={this.props.resetIntakeFilters} />
                        <ButtonIcon
                            iconName={'check'}
                            onClickAction={this.props.toggleMultiSelectEnabled}
                            title="Intake selectie maken"
                        />
                        <ButtonIcon
                            iconName={'download'}
                            title="Download unieke intakes"
                            onClickAction={this.props.getExcel}
                        />
                        <ButtonIcon
                            iconName={'download'}
                            title="Download intakes met kansen"
                            onClickAction={this.props.getExcelWithOpportunities}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <h3 className="text-center table-title">Intakes</h3>
                </div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: {meta.total || 0}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        intakes: state.intakes.list,
    };
};

export default connect(mapStateToProps)(IntakesListToolbar);
