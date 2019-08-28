import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import moneyPresenter from '../../../../helpers/MoneyPresenter';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const ProjectGeneralFormViewOther = ({ project }) => {
    const {
        name,
        dateStart,
        projectStatus,
        projectType,
        amountOfLoanNeeded,
        amountDefinitive,
        amountGranted,
        amountOptioned,
        amountInteressed,
    } = project;
    const amountAvailable = amountOfLoanNeeded - amountDefinitive;

    return (
        <Panel>
            <PanelBody>
                <div className="row">
                    <ViewText label={'Project'} value={name} />
                    <ViewText label={'Lening interesse'} value={moneyPresenter(amountInteressed)} />
                </div>

                <div className="row">
                    <ViewText label={'Type project'} value={projectType && projectType.name} />
                    <ViewText label={'Lening ingeschreven'} value={moneyPresenter(amountOptioned)} />
                </div>

                <div className="row">
                    <ViewText label={'Status'} value={projectStatus && projectStatus.name} />
                    <ViewText label={'Lening toegekend'} value={moneyPresenter(amountGranted)} />
                </div>

                <div className="row">
                    <ViewText label={'Start project'} value={dateStart ? moment(dateStart).format('L') : ''} />
                    <ViewText label={'Lening opgehaald'} value={moneyPresenter(amountDefinitive)} />
                </div>

                <div className="row">
                    <div className={'form-group col-md-6'} />
                    <ViewText label={'Lening uit te geven'} value={moneyPresenter(amountAvailable)} />
                </div>

                <div className="row">
                    <div className={'form-group col-md-6'} />
                    <ViewText label={'Lening nodig'} value={amountOfLoanNeeded && moneyPresenter(amountOfLoanNeeded)} />
                </div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
        projectTypes: state.systemData.projectTypes,
    };
};

export default connect(mapStateToProps)(ProjectGeneralFormViewOther);
