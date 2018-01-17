import React from 'react';
import { connect } from 'react-redux';

import InputSelect from "../../../../components/form/InputSelect";
import InputText from "../../../../components/form/InputText";

const DocumentNewFormGeneral = ({document, errors, contacts = [], contactGroups = [], registrations = [], opportunities = [], handleInputChange, documentTypes}) => {
    const { contactId, contactGroupId, registrationId, opportunityId, documentType, description } = document;
    const documentTypeName = documentTypes.find((item) => {return item.id == documentType}).name;
    const oneOfFieldRequired = contactId === '' && contactGroupId === '' && registrationId === '' && opportunityId === '';

    return (
        <div className={'margin-30-bottom'}>
            <div className="row">
                <InputSelect
                    label="Contact"
                    name={"contactId"}
                    value={contactId}
                    options={contacts}
                    optionName={'fullName'}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && "required"}
                    error={errors.docLinkedAtAny}
                />
                <InputText
                    label="Type"
                    name={"documentTypeName"}
                    value={documentTypeName}
                    readOnly={true}
                />
            </div>
            <div className="row">
                <InputSelect
                    label="Groep"
                    name={"contactGroupId"}
                    value={contactGroupId}
                    options={contactGroups}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && "required"}
                    error={errors.docLinkedAtAny}
                />
                <InputSelect
                    label="Aanmelding"
                    name={"registrationId"}
                    value={registrationId}
                    options={registrations}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && "required"}
                    error={errors.docLinkedAtAny}
                />
            </div>
            <div className="row">
                <InputSelect
                    label="Kans"
                    name={"opportunityId"}
                    value={opportunityId}
                    options={opportunities}
                    onChangeAction={handleInputChange}
                    required={oneOfFieldRequired && "required"}
                    error={errors.docLinkedAtAny}
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
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        documentTypes: state.systemData.documentTypes,
    };
};

export default connect(mapStateToProps, null)(DocumentNewFormGeneral);
