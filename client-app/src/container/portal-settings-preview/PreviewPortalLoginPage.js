import React from 'react';

const PreviewPortalLoginPage = ({
    closeModal,
    customStyles,
    logoUrl,
    fullHeightJustifyAlignContentCenterRow,
    justifyContentCenterRow,
}) => {
    return (
        <div
            style={customStyles.modal}
            onClick={closeModal}
            title={'Klik om preview te sluiten'}
            className="preview-portal"
        >
            <div id="root" style={customStyles.root}>
                <div style={customStyles.closePreview}>
                    <button style={customStyles.closePreviewButton} onClick={closeModal}>
                        Sluiten preview
                    </button>
                </div>
                <div className="authorization-container container-fluid" style={customStyles.authorizationContainer}>
                    <div style={fullHeightJustifyAlignContentCenterRow}>
                        <div style={customStyles.col}>
                            <img src={logoUrl} alt="" className="image logo-container" />
                            <form>
                                <input
                                    type="text"
                                    className="text-input w-input   "
                                    id="username"
                                    name="username"
                                    placeholder="E-mailadres"
                                    value=""
                                    readOnly={true}
                                />
                                <input
                                    type="password"
                                    className="text-input w-input   "
                                    id="password"
                                    name="password"
                                    placeholder="Wachtwoord"
                                    value=""
                                    readOnly={true}
                                />
                                <button className="authorization-button btn btn-primary btn-sm">
                                    <span>Log in</span>
                                </button>
                            </form>
                            <div style={justifyContentCenterRow}>
                                <a className="authorization-link">Wachtwoord vergeten?</a>
                            </div>
                            <div style={justifyContentCenterRow}>
                                <a className="authorization-link">Nieuw bij ...</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPortalLoginPage;
