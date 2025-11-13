import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

function PortalFreeFieldsPagesListToolbar({
    portalFreeFieldsPagesTotal,
    refreshPortalFreeFieldsPageFields,
    getExcelLogMutations,
    permissions,
}) {
    const navigate = useNavigate();

    const newPortalFreeFieldsPage = () => {
        navigate(`/vrije-velden-portaal-pagina/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group btn-group-flex" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={refreshPortalFreeFieldsPageFields} />
                    {permissions.viewFreeFieldsFieldLog && (
                        <ButtonIcon
                            iconName={'download'}
                            onClickAction={getExcelLogMutations}
                            title="Downloaden mutaties vrije velden"
                        />
                    )}
                    {permissions.manageFreeFields && (
                        <ButtonIcon iconName={'plus'} onClickAction={newPortalFreeFieldsPage} />
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Vrije velden portaal pagina's</h3>
            </div>
            <div className="col-md-4">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="pull-right">Resultaten: {portalFreeFieldsPagesTotal}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(PortalFreeFieldsPagesListToolbar);
