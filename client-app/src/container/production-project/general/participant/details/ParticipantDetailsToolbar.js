import React, {Component} from 'react';
import { connect } from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import ButtonIcon from '../../../../../components/button/ButtonIcon';
import ParticipantDetailsDelete from './ParticipantDetailsDelete';
import ButtonText from "../../../../../components/button/ButtonText";


class ParticipantDetailsToolbar extends Component {
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
        const { participantProductionProject }  = this.props;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={"panel-small"}>
                            <div className="col-md-3">
                                <div className="btn-group margin-small" role="group">
                                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />

                                    <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>

                                    <ButtonText buttonText={`Participaties overdragen`}  onClickAction={() => hashHistory.push(`/productie-project/participant/${participantProductionProject.id}/overdragen`)} />
                                </div>
                            </div>
                            <div className="col-md-6"><h4 className="text-center text-success margin-small">
                                <strong>
                                    {participantProductionProject.contact ? participantProductionProject.contact.fullName : ''}
                                    /
                                    {participantProductionProject.productionProject ? participantProductionProject.productionProject.name : ''}
                                </strong></h4>
                            </div>
                            <div className="col-md-3" />
                        </PanelBody>
                    </Panel>
                </div>

                {
                    this.state.showDelete &&
                    <ParticipantDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        id={participantProductionProject.id}
                        productionProjectid={participantProductionProject.productionProject.id}
                    />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        participantProductionProject: state.participantProductionProjectDetails,
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(ParticipantDetailsToolbar);
