import React from 'react';
import { connect } from 'react-redux';

import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';
import InputToggle from '../../../../components/form/InputToggle';

const DocumentNewFormProjectGeneral = ({ document, errors, projects = [], handleInputChange, documentTypes }) => {
    const { documentType, description, projectId, showOnPortal } = document;
    const documentTypeName = documentTypes.find(item => {
        return item.id == documentType;
    }).name;

    return (
        <div className={'margin-30-bottom'}>
            <div className="row">
                <InputSelect
                    label="Project"
                    name={'projectId'}
                    value={projectId}
                    options={projects}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    readOnly={true}
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
                            <label className="col-sm-12 required">Omschrijving</label>
                        </div>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={'form-control input-sm ' + (errors && errors.description ? 'has-error' : '')}
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
    };
};

export default connect(mapStateToProps, null)(DocumentNewFormProjectGeneral);
