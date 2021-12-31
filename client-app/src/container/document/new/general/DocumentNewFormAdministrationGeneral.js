import React from 'react';
import { connect } from 'react-redux';

import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';
import InputToggle from '../../../../components/form/InputToggle';

const DocumentNewFormAdministrationGeneral = ({
    document,
    errors = [],
    handleInputChange,
    documentTypes,
    administrations,
}) => {
    const { documentType, description, administrationId, showOnPortal } = document;
    const documentTypeName = documentTypes.find(item => {
        return item.id == documentType;
    }).name;

    return (
        <div className={'margin-30-bottom'}>
            <div className="row">
                <InputSelect
                    label="Administratie"
                    name={'administrationId'}
                    value={administrationId}
                    options={administrations}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.docLinkedAtAny}
                />
                <InputText label="Type" name={'documentTypeName'} value={documentTypeName} readOnly={true} />
            </div>

            <div className="row">
                <InputToggle
                    label="Tonen op portal"
                    name={'showOnPortal'}
                    value={showOnPortal}
                    onChangeAction={handleInputChange}
                />
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Omschrijving</label>
                        </div>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className="form-control input-sm"
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        documentTypes: state.systemData.documentTypes,
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps, null)(DocumentNewFormAdministrationGeneral);
