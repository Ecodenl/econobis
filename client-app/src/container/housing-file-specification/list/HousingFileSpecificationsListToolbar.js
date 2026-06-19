import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';

const HousingFileSpecificationsListToolbar = props => {
    const { meta = {} } = props.housingFileSpecifications;

    const maxRecordsForDownload = 15000;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    {!props.showCheckboxList && (
                        <>
                            <ButtonIcon
                                iconName={'refresh'}
                                onClickAction={props.resetHousingFileSpecificationFilters}
                            />
                            <ButtonIcon
                                iconName={'filter'}
                                onClickAction={props.toggleShowExtraFilters}
                                title="Extra filters"
                            />
                        </>
                    )}
                    {!props.showCheckboxList && meta.total <= maxRecordsForDownload ? (
                        <ButtonIcon
                            iconName="download"
                            onClickAction={props.getExcelSpecifications}
                            title="Download woningdossiers specificaties"
                        />
                    ) : (
                        <ButtonIcon
                            iconName="download"
                            disabled={true}
                            title={
                                'Download woningdossiers specificaties, niet mogelijk voor meer dan ' +
                                maxRecordsForDownload.toLocaleString('nl-NL') +
                                ' regels'
                            }
                        />
                    )}

                    {props.permissions.manageHousingFile && (
                        <>
                            <ButtonText
                                buttonText={props.showCheckboxList ? 'Selectie sluiten' : 'Selectie maken'}
                                onClickAction={props.toggleShowCheckboxList}
                            />
                            {props.showCheckboxList ? (
                                <>
                                    {' '}
                                    <ButtonText
                                        buttonText={'Maak kans(en) (' + props.numberOfSelected + ')'}
                                        onClickAction={props.showModalCreateOpportunity}
                                        disabled={props.numberOfSelected == 0}
                                    />
                                </>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Woningdossier specificaties</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        housingFileSpecifications: state.housingFileSpecifications.list,
    };
};

export default connect(mapStateToProps)(HousingFileSpecificationsListToolbar);
