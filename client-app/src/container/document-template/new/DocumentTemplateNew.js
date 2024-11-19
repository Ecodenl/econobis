import React from 'react';

import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import InputTinyMCE from '../../../components/form/InputTinyMCE';
import InputSelect from '../../../components/form/InputSelect';
import InputMultiSelect from '../../../components/form/InputMultiSelect';
import InputText from '../../../components/form/InputText';
import InputToggle from '../../../components/form/InputToggle';

const DocumentTemplateNew = props => {
    const {
        name,
        documentGroupId,
        documentTemplateTypeId,
        roleIds,
        roleIdsSelected,
        characteristic,
        htmlBody,
        allowChangeHtmlBody,
        initialHtmlBody,
        baseTemplateId,
        headerTemplateId,
        footerTemplateId,
        active,
    } = props.documentTemplate;

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputText
                    label={'Naam'}
                    size={'col-sm-6'}
                    name={'name'}
                    value={name}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.name}
                />
            </div>

            <div className="row">
                <InputSelect
                    label="Documentgroep"
                    name={'documentGroupId'}
                    value={documentGroupId}
                    options={props.documentGroups}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.group}
                />
                <InputSelect
                    label="Documenttype"
                    name={'documentTemplateTypeId'}
                    value={documentTemplateTypeId}
                    options={props.documentTemplateTypes}
                    onChangeAction={props.handleDocumentTemplateType}
                    required={'required'}
                    error={props.errors.type}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Kenmerk'}
                    size={'col-sm-6'}
                    name={'characteristic'}
                    value={characteristic}
                    onChangeAction={props.handleInputChange}
                />
                {props.isGeneral && (
                    <InputMultiSelect
                        label="Rollen"
                        name="roleIds"
                        value={roleIdsSelected}
                        options={props.roles}
                        onChangeAction={props.handleRoleIds}
                    />
                )}
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <InputTinyMCE
                            label={'Tekst'}
                            initialValue={initialHtmlBody}
                            value={htmlBody}
                            onChangeAction={props.handleTextChange}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <InputToggle
                    label={'Tekst wijzigbaar bij document'}
                    name={'allowChangeHtmlBody'}
                    value={allowChangeHtmlBody}
                    onChangeAction={props.handleInputChange}
                    id={'allowChangeHtmlBody'}
                />
            </div>

            {props.isGeneral && (
                <div className="row">
                    <InputSelect
                        label="Basis template"
                        name={'baseTemplateId'}
                        value={baseTemplateId}
                        options={props.baseTemplates}
                        onChangeAction={props.handleInputChange}
                    />
                </div>
            )}
            {props.isGeneral && (
                <div className="row">
                    <InputSelect
                        label="Koptekst"
                        name={'headerTemplateId'}
                        value={headerTemplateId}
                        options={props.headerTemplates}
                        onChangeAction={props.handleInputChange}
                    />
                </div>
            )}
            {props.isGeneral && (
                <div className="row">
                    <InputSelect
                        label="Footer template"
                        name={'footerTemplateId'}
                        value={footerTemplateId}
                        options={props.footerTemplates}
                        onChangeAction={props.handleInputChange}
                    />
                </div>
            )}

            <div className="row">
                <InputToggle
                    label={'Actief'}
                    name={'active'}
                    value={active}
                    onChangeAction={props.handleInputChange}
                    id={'active'}
                />
            </div>

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText
                        buttonText={'Opslaan'}
                        onClickAction={props.handleSubmit}
                        type={'submit'}
                        value={'Submit'}
                    />
                </div>
            </PanelFooter>
        </form>
    );
};

export default DocumentTemplateNew;
