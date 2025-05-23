import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';

const MeasureDetailsToolbar = ({ measureDetails }) => {
    const navigate = useNavigate();

    const { measureCategory } = measureDetails;

    return (
        <div className="row">
            <div className="col-sm-12">
                <Panel>
                    <PanelBody className={'panel-small'}>
                        <div className="col-md-2">
                            <div className="btn-group btn-group-flex margin-small" role="group">
                                <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <h4 className="text-center text-success margin-small">
                                <strong>{measureCategory ? 'Maatregel: ' + measureCategory.name : ''}</strong>
                            </h4>
                        </div>
                        <div className="col-md-2" />
                    </PanelBody>
                </Panel>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        measureDetails: state.measureDetails,
    };
};

export default connect(mapStateToProps)(MeasureDetailsToolbar);
