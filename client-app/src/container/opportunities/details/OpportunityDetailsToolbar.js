import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import OpportunityDetailsDelete from './OpportunityDetailsDelete';


class OpportunityDetailsToolbar extends Component {
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
        const { measure, contact, id }  = this.props.opportunity;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={"panel-small"}>
                            <div className="col-md-2">
                                <div className="btn-group margin-small" role="group">
                                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                                        <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                                </div>
                            </div>
                            <div className="col-md-8"><h4 className="text-center text-success margin-small"><strong>{measure ? 'Kans: ' + measure.name : ''} {contact ? 'voor ' + contact.fullName : ''}</strong></h4></div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>

                {
                    this.state.showDelete &&
                    <OpportunityDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        id={id}
                    />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        opportunity: state.opportunity,
    }
};

export default connect(mapStateToProps)(OpportunityDetailsToolbar);
