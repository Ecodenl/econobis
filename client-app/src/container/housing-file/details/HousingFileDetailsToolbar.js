import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import HousingFileDetailsDelete from './HousingFileDetailsDelete';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class HousingFileDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        const { housingFileAddress = {} } = this.props;
        const fullStreet = `${housingFileAddress.street || ''} ${housingFileAddress.number || ''}`;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-2">
                                <div className="btn-group" role="group">
                                    <ButtonIcon
                                        iconName={'glyphicon-arrow-left'}
                                        onClickAction={browserHistory.goBack}
                                    />
                                    {this.props.permissions.manageHousingFile && (
                                        <ButtonIcon iconName={'glyphicon-trash'} onClickAction={this.toggleDelete} />
                                    )}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h4 className="text-center">{`Woningdossier voor: ${fullStreet}`}</h4>
                            </div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>
                {this.state.showDelete && (
                    <HousingFileDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        fullStreet={fullStreet}
                        id={this.props.id}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        housingFileAddress: state.housingFileDetails.address,
        id: state.housingFileDetails.id,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(HousingFileDetailsToolbar);
