import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import HousingFileDetailsAPI from '../../../../api/housing-file/HousingFileDetailsAPI';
import { fetchHousingFileDetails } from '../../../../actions/housing-file/HousingFileDetailsActions';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import InputToggle from '../../../../components/form/InputToggle';
import ViewText from '../../../../components/form/ViewText';

class HousingFileDetailsFormUseEdit extends Component {
    constructor(props) {
        super(props);

        const { id, pitchedRoofHeating, flatRoofHeating } = props.housingFileDetails;

        this.state = {
            housingFile: {
                id,
                pitchedRoofHeating: pitchedRoofHeating ? pitchedRoofHeating : '',
                flatRoofHeating: flatRoofHeating ? flatRoofHeating : '',
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            housingFile: {
                ...this.state.housingFile,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { housingFile } = this.state;

        HousingFileDetailsAPI.updateHousingFile(housingFile).then(() => {
            this.props.fetchHousingFileDetails(housingFile.id);
            this.props.switchToView();
        });
    };

    render() {
        const { pitchedRoofHeating, flatRoofHeating } = this.state.housingFile;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    {/*<ViewText label="Hellend dak ruimtes verwarming" value={pitchedRoofHeating} />*/}
                    {/*<ViewText label="Platte dak ruimtes verwarming" value={flatRoofHeating} />*/}
                    <InputText
                        label="Hellend dak ruimtes verwarming"
                        name={'pitchedRoofHeating'}
                        value={pitchedRoofHeating}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label="Platte dak ruimtes verwarming"
                        name={'flatRoofHeating'}
                        value={flatRoofHeating}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Sluiten'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        housingFileDetails: state.housingFileDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchHousingFileDetails: id => {
        dispatch(fetchHousingFileDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileDetailsFormUseEdit);
