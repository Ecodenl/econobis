import React, { useEffect, useReducer } from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import CooperationDetailsToolbar from './Toolbar';
import CooperationDetailsAPI from '../../../api/cooperation/CooperationDetailsAPI';
import CooperationDetailsFormEdit from './Edit';
import CooperationDetailsFormView from './View';
import { connect } from 'react-redux';
import ErrorUnauthorized from '../../global/ErrorUnauthorized';

// todo WM: opschonen inspection* velden
const INITIAL_STATE = {
    result: {
        id: null,
        name: '',
        address: '',
        postalCode: '',
        city: '',
        kvkNumber: '',
        btwNumber: '',
        iban: '',
        ibanAttn: '',
        email: '',
        website: '',
        logoFilename: '',
        logoName: '',
        hoomLink: '',
        hoomConnectCoachLink: '',
        hoomKey: '',
        hoomCampaigns: {},
        hoomEmailTemplateId: '',
        hoomGroupId: '',
        hoomMailboxId: '',
        useLaposta: false,
        lapostaKey: '',
        useExportAddressConsumption: false,
        requireTwoFactorAuthentication: false,
        inspectionPlannedEmailTemplateId: '',
        inspectionRecordedEmailTemplateId: '',
        inspectionReleasedEmailTemplateId: '',
        inspectionPlannedMailboxId: '',
        createContactsForReportTable: false,
        createContactsForReportTableLastCreated: '',
        emailReportTableProblems: '',
        createContactsForReportTableInProgress: false,
        fontFamilyDefault: '',
        fontSizeDefault: '',
        fontColorDefault: '',
    },
    isLoading: true,
    showEdit: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateIsLoading':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'updateResult':
            return {
                ...state,
                result: action.payload,
            };
        case 'updateShowEdit':
            return {
                ...state,
                showEdit: action.payload,
            };
        default:
            return INITIAL_STATE;
    }
};

function CooperationDetailsApp({ permissions }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(
        function() {
            if (permissions.manageCooperationSettings) {
                setIsLoading(true);
                CooperationDetailsAPI.fetchDetails()
                    .then(function(payload) {
                        if (payload.data && payload.data.data && payload.data.data.id) {
                            updateResult(payload.data.data);
                        }
                        setIsLoading(false);
                    })
                    .catch(function(error) {
                        alert('Er is iets misgegaan met het laden van de gegevens. Herlaad de pagina.');
                        setIsLoading(false);
                    });
            }
        },
        [state.filter]
    );

    function setIsLoading(isLoading) {
        dispatch({
            type: 'updateIsLoading',
            payload: isLoading,
        });
    }

    function updateResult(payload) {
        dispatch({
            type: 'updateResult',
            payload: payload,
        });
    }

    function toggleEdit() {
        dispatch({
            type: 'updateShowEdit',
            payload: !state.showEdit,
        });
    }

    return (
        <div className="row">
            <div className="col-md-9">
                {!permissions.manageCooperationSettings ? (
                    <ErrorUnauthorized />
                ) : state.isLoading ? (
                    'Laden...'
                ) : (
                    <>
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={'panel-small'}>
                                    <CooperationDetailsToolbar formData={state.result} />
                                </PanelBody>
                            </Panel>
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <>
                                {state.showEdit && permissions.manageCooperationSettings ? (
                                    <CooperationDetailsFormEdit
                                        formData={state.result}
                                        toggleEdit={toggleEdit}
                                        updateResult={updateResult}
                                    />
                                ) : (
                                    <CooperationDetailsFormView formData={state.result} toggleEdit={toggleEdit} />
                                )}
                            </>
                        </div>
                    </>
                )}
            </div>
            <div className="col-md-3" />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(CooperationDetailsApp);
