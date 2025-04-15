import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import HousingFileDetailsDelete from './HousingFileDetailsDelete';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

// Functionele wrapper voor de class component
const HousingFileDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <HousingFileDetailsToolbar {...props} navigate={navigate} />;
};

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
        const { housingFileAddress = {}, navigate } = this.props;
        const fullStreet = `${housingFileAddress.street || ''} ${housingFileAddress.number || ''}`;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-2">
                                <div className="btn-group" role="group">
                                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                                    {this.props.permissions.manageHousingFile && (
                                        <ButtonIcon iconName={'trash'} onClickAction={this.toggleDelete} />
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

export default connect(mapStateToProps)(HousingFileDetailsToolbarWrapper);
