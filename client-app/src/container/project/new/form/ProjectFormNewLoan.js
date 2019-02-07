import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../../../components/form/InputText';

const ProjectFormNewLoan = ({ amountOfLoanNeeded, handleInputChange, projectTypes, projectTypeId }) => {
    const showNewLoan = projectTypes.find(projectType => projectType.codeRef === 'loan').id == projectTypeId;

    if (showNewLoan) {
        return (
            <React.Fragment>
                <hr style={{ margin: '10px 0' }} />
                <h4>Lening</h4>
                <div className="row">
                    <InputText
                        label={'Lening nodig'}
                        name={'amountOfLoanNeeded'}
                        value={amountOfLoanNeeded}
                        onChangeAction={handleInputChange}
                    />
                    <InputText label={'Lening opgehaald'} name={'code'} value={'Nog maken'} readOnly={true} />
                </div>

                <div className="row">
                    <div className={'form-group col-md-6'} />
                    <InputText label={'Lening opgehaald in optie'} name={'code'} value={'Nog maken'} readOnly={true} />
                </div>

                <div className="row">
                    <div className={'form-group col-md-6'} />
                    <InputText label={'Lening uit te geven'} name={'code'} value={'Nog maken'} readOnly={true} />
                </div>
            </React.Fragment>
        );
    } else return null;
};

const mapStateToProps = state => {
    return {
        projectTypes: state.systemData.projectTypes,
    };
};

export default connect(mapStateToProps)(ProjectFormNewLoan);
