import React from 'react';
import { hashHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const ContactGroupsListToolbar = (props) => {
    const newContactGroup = () => {
        hashHistory.push('/contact-groep/nieuw');
    };

    return (
      <div className="row">
          <div className="col-md-4">
          <div className="btn-group" role="group">
                  <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.refreshContactGroupsData} />
                  <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newContactGroup} />
                </div>
            </div>
          <div className="col-md-4"><h3 className="text-center table-title">Groepen</h3></div>
          <div className="col-md-4" />
        </div>
    );
};

export default ContactGroupsListToolbar;
