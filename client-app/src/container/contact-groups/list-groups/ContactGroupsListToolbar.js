import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const ContactGroupsListToolbar = (props) => {
    const newContactGroup = () => {
        hashHistory.push('/contact-groep/nieuw');
    };

    const { permissions = {} } = props;

    return (
      <div className="row">
          <div className="col-md-4">
          <div className="btn-group" role="group">
                  <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.resetContactGroupsFilters} />
              {
                  permissions.manageGroup &&
                  <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newContactGroup} />
              }

                </div>
            </div>
          <div className="col-md-4"><h3 className="text-center table-title">Groepen</h3></div>
          <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(ContactGroupsListToolbar);

