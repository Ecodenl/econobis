import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';

function ContactToImportsListToolbar({
    ContactToImportsTotal,
    refreshContactToImports,
    permissions,
    getExcel,
    allowUpdateAction,
    selectAllNew,
    selectAllUpdate,
    actionSelectAllNew,
    actionSelectAllUpdate,
    updateContactMatches,
}) {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group btn-group-flex" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={refreshContactToImports} />
                    <ButtonIcon
                        iconName={'download'}
                        onClickAction={getExcel}
                        title="Downloaden contacten naar Excel"
                    />
                    <ButtonText
                        buttonText={selectAllNew ? 'Alles' : 'Alleen nieuw selectie'}
                        onClickAction={actionSelectAllNew}
                    />
                    {allowUpdateAction ? (
                        <>
                            {' '}
                            <ButtonText
                                buttonText={selectAllUpdate ? 'Alles' : 'Alleen bijwerken selectie'}
                                onClickAction={actionSelectAllUpdate}
                            />
                        </>
                    ) : null}
                    <ButtonText buttonText={'Actualiseren matches'} onClickAction={updateContactMatches} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Signaleringslijst importeren Energieklanten</h3>
            </div>
            <div className="col-md-4">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="pull-right">Resultaten: {ContactToImportsTotal}</div>
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

export default connect(mapStateToProps, null)(ContactToImportsListToolbar);
