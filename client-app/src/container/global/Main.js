import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import BlockUi from '@availity/block-ui';
import '@availity/block-ui/dist/index.css';
import { fetchMeDetails } from '../../actions/general/MeDetailsActions';
import { fetchSystemData } from '../../actions/general/SystemDataActions';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
import { EmailModalProvider } from '../../context/EmailModalContext';

// Dynamische imports voor de componenten
const NavHeader = React.lazy(() => import('../../components/navigationHeader/NavHeader'));
const Sidebar = React.lazy(() => import('../../components/navigationSidebar/Sidebar'));
const Content = React.lazy(() => import('./Content'));

const Main = ({ children }) => {
    const [menuActive, setMenuActive] = useState(false);
    const [menuStuck, setMenuStuck] = useState(false);
    const [changePasswordActive, setChangePasswordActive] = useState(false);
    const [twoFactorSettingsActive, setTwoFactorSettingsActive] = useState(false);
    const [showAboutUs, setShowAboutUs] = useState(false);

    const dispatch = useDispatch();
    const { authenticated } = useSelector(state => state.auth);

    const systemDataLoaded = useSelector(state => state.systemData.isLoaded);
    const systemDataHasError = useSelector(state => state.systemData.hasError);
    const meDetailsLoaded = useSelector(state => state.meDetails.isLoaded);
    const meDetailsHasError = useSelector(state => state.meDetails.hasError);

    const isBlocking = useSelector(state => state.blockUI.blocked);

    useEffect(() => {
        if (authenticated) {
            dispatch(fetchMeDetails());
            dispatch(fetchSystemData());
        }
    }, [authenticated, dispatch]);

    const toggleMenu = () => setMenuActive(prevState => !prevState);
    const toggleMenuStuck = () => setMenuStuck(prevState => !prevState);
    const toggleChangePassword = () => setChangePasswordActive(prevState => !prevState);
    const toggleTwoFactorSettings = () => setTwoFactorSettingsActive(prevState => !prevState);
    const toggleAboutUs = () => setShowAboutUs(prevState => !prevState);

    if (systemDataHasError || meDetailsHasError) {
        return <ErrorPage />;
    }

    if (!systemDataLoaded || !meDetailsLoaded) {
        return <LoadingPage />;
    }

    const contentClass = menuActive ? 'content open' : 'content';

    return (
        <BlockUi
            tag="div"
            blocking={isBlocking}
            className={'full-screen-loading'}
            message={'Moment geduld, de gegevens worden opgehaald'}
        >
            <EmailModalProvider>
                <div className="wrapper">
                    <div>
                        {/* Gebruik Suspense om dynamisch geladen componenten in te sluiten */}
                        <Suspense fallback={<LoadingPage />}>
                            <NavHeader
                                menuStuck={menuStuck}
                                toggleMenuStuck={toggleMenuStuck}
                                toggleChangePassword={toggleChangePassword}
                                toggleTwoFactorSettings={toggleTwoFactorSettings}
                                toggleAboutUs={toggleAboutUs}
                            />
                            <Sidebar
                                onMenuEnter={() => setMenuActive(true)}
                                onMenuLeave={() => setMenuActive(false)}
                                menuActive={menuActive}
                                menuStuck={menuStuck}
                            />
                        </Suspense>
                    </div>

                    <div className={contentClass}>
                        <div className="container-fluid">
                            <div className="col-md-12">
                                <Suspense fallback={<LoadingPage />}>
                                    <Content
                                        toggleChangePassword={toggleChangePassword}
                                        toggleTwoFactorSettings={toggleTwoFactorSettings}
                                        changePasswordActive={changePasswordActive}
                                        twoFactorSettingsActive={twoFactorSettingsActive}
                                        toggleAboutUs={toggleAboutUs}
                                        showAboutUs={showAboutUs}
                                    >
                                        <Outlet />
                                    </Content>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </EmailModalProvider>
        </BlockUi>
    );
};

export default Main;
