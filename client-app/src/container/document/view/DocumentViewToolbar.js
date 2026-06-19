import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';

const DocumentViewToolbar = props => {
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                    <ButtonIcon iconName={'download'} onClickAction={props.download} />
                    <ButtonIcon
                        iconName={'envelopeO'}
                        onClickAction={() => navigate(`/email/nieuw/document/${props.documentId}`)}
                    />
                    <ButtonIcon iconName={'searchPlus'} onClickAction={props.zoomIn} />
                    <ButtonIcon iconName={'searchMinus'} onClickAction={props.zoomOut} />
                </div>
            </div>
            <div className="col-md-4">
                <h4 className="text-center">{'Document: ' + props.documentFilename}</h4>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        documentFilename: state.documentDetails.filename,
        documentId: state.documentDetails.id,
    };
};

export default connect(mapStateToProps, null)(DocumentViewToolbar);
