import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const ContactGroupNewToolbar = () => {
    return (
        <div className="row">
            <div className="col-sm-12">
                <Panel>
                    <PanelBody className={'panel-small'}>
                        <div className="col-md-4">
                            <div className="btn-group" role="group">
                                <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h4 className="text-center">Nieuwe groep</h4>
                        </div>
                        <div className="col-md-4" />
                    </PanelBody>
                </Panel>
            </div>
        </div>
    );
};

export default ContactGroupNewToolbar;
