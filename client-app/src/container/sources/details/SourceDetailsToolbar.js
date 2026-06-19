import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';

// Functionele wrapper voor de class component
const SourceDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <SourceDetailsToolbar {...props} navigate={navigate} />;
};

class SourceDetailsToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { name, id, navigate } = this.props;
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Aanmeldingsbron: {name}</h4>
                </div>
                <div className="col-md-4" />
            </div>
        );
    }
}

SourceDetailsToolbarWrapper.propTypes = { name: PropTypes.any };

export default SourceDetailsToolbarWrapper;
