import React from 'react';
import { connect } from 'react-redux';
import ViewText from '../../../../../components/form/ViewText';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';

const ProjectFormViewLoan = ({ amountOfLoanNeeded, projectTypes, projectTypeId }) => {
    const showViewLoan = projectTypes.find(projectType => projectType.codeRef === 'loan').id == projectTypeId;

    if (showViewLoan) {
        return (
            <React.Fragment>
                <hr style={{ margin: '10px 0' }} />
                <h4>Lening</h4>
                <div className="row">
                    <ViewText label={'Lening nodig'} value={MoneyPresenter(amountOfLoanNeeded)} />
                    <ViewText label={'Lening opgehaald'} value={'Nog maken'} />
                </div>

                <div className="row">
                    <div className={'form-group col-md-6'} />
                    <ViewText label={'Lening opgehaald in optie'} value={'Nog maken'} />
                </div>

                <div className="row">
                    <div className={'form-group col-md-6'} />
                    <ViewText label={'Lening uit te geven'} value={'Nog maken'} />
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

export default connect(mapStateToProps)(ProjectFormViewLoan);
