import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { hashHistory, Link } from 'react-router';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import ButtonIcon from '../../../../../components/button/ButtonIcon';
import RevenueDetailsDelete from './RevenueDetailsDelete';


class RevenueDetailsToolbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDelete: false,
        }
    }

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        const { revenue }  = this.props;
        const pdfLink = `productie-project/opbrengst/${this.props.revenue.id}/energieleverancier-rapport`;
        const csvLink = `productie-project/opbrengst/${this.props.revenue.id}/energieleverancier-csv`;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={"panel-small"}>
                            <div className="col-md-2">
                                <div className="btn-group margin-small" role="group">
                                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                                    {this.props.permissions.manageFinancial && !this.props.revenue.confirmed &&
                                    <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                                    }
                                    {revenue.confirmed == 1 &&
                                    <div className="nav navbar-nav btn-group" role="group">
                                        <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                            <span className="glyphicon glyphicon-plus" />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link to={pdfLink}>PDF EM</Link></li>
                                            <li><Link to={csvLink}>CSV EM</Link></li>
                                        </ul>
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-8"><h4 className="text-center text-success margin-small">
                                <strong>
                                    Opbrengst productieproject {revenue.productionProject ? revenue.productionProject.name : ''}
                                </strong></h4>
                            </div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>

                {
                    this.state.showDelete &&
                    <RevenueDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        id={revenue.id}
                        productionProjectId={revenue.productionProject.id}
                    />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        revenue: state.productionProjectRevenue,
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(RevenueDetailsToolbar);
