import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchHousingFileDetails } from '../../../actions/housing-file/HousingFileDetailsActions';
import HousingFileDetailsToolbar from './HousingFileDetailsToolbar';
import HousingFileDetailsForm from './HousingFileDetailsForm';
import HousingFileDetailsHarmonica from './harmonica/HousingFileDetailsHarmonica';

import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const HousingFileDetailsAppWrapper = props => {
    const params = useParams();
    return <HousingFileDetailsApp {...props} params={params} />;
};

class HousingFileDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchHousingFileDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <HousingFileDetailsToolbar />
                    </div>

                    <div className="col-md-12">
                        <HousingFileDetailsForm />
                    </div>
                </div>
                <Panel className="col-md-3 harmonica">
                    <PanelBody>
                        <HousingFileDetailsHarmonica id={this.props.params.id} />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchHousingFileDetails: id => {
        dispatch(fetchHousingFileDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(HousingFileDetailsAppWrapper);
