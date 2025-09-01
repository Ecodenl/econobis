import React, { useState, useEffect, useRef, useContext } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { AuthConsumer } from '../../context/AuthContext';
import { Link, withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
// import { PortalUserConsumer } from '../../context/PortalUserContext';
import { PortalUserContext } from '../../context/PortalUserContext';
import { ThemeSettingsConsumer } from '../../context/ThemeSettingsContext';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FaHome, FaUser } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import ReactHtmlParser from 'react-html-parser';
import { Button } from 'react-bootstrap';
import DashboardSettingsAPI from '../../api/dashboard/DashboardSettingsAPI';
import LoadingView from '../general/LoadingView';

function Header({ location, history }) {
    const { user, currentSelectedContact, switchCurrentContact, resetCurrentUserToDefault } = useContext(
        PortalUserContext
    );

    const [isLoading, setLoading] = useState(true);
    // const [dashboardSettings, setDashboardSettings] = useState({});
    const [menuOpen, updateStateMenu] = useState(false);
    const [imageHash, setImageHash] = useState(Date.now());
    const [dashboardSettings, setDashboardSettings] = useState({});

    const widgets = dashboardSettings?.widgets || [];
    // const staticWidgets = ['over-ons', 'project-schrijf-je-in', 'huidige-deelnames'];
    const buttonTextOverOns = getWidgetButtonTextByCodeRef(widgets, 'over-ons');
    const buttonTextInschrijvenProjecten = getWidgetButtonTextByCodeRef(widgets, 'project-schrijf-je-in');
    const buttonTextHuidigeDeelnames = getWidgetButtonTextByCodeRef(widgets, 'huidige-deelnames');
    const buttonTextGroepenBeheer = getWidgetButtonTextByCodeRef(widgets, 'groepen-beheer');

    useEffect(() => {
        if (!currentSelectedContact || !currentSelectedContact.id) return;

        setLoading(true);
        const id = 1;

        DashboardSettingsAPI.fetchDashboardSettings(id, currentSelectedContact.id)
            .then(payload => {
                setDashboardSettings(payload.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                setLoading(false);
            });
    }, [currentSelectedContact]);

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    function handleStateChange(state) {
        updateStateMenu(state.isOpen);
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    function openMenu() {
        updateStateMenu(true);
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    function closeMenu() {
        updateStateMenu(false);
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    function toggleMenu() {
        updateStateMenu(!menuOpen);
    }

    function formatProfilePicName(currentSelectedContact) {
        if (currentSelectedContact.typeId === 'person') {
            return (
                currentSelectedContact.firstName +
                (currentSelectedContact.lastNamePrefix ? ' ' + currentSelectedContact.lastNamePrefix : '') +
                (currentSelectedContact.firstName || currentSelectedContact.lastNamePrefix ? '<br>' : '') +
                currentSelectedContact.lastName
            );
        } else if (currentSelectedContact.typeId === 'organisation') {
            return currentSelectedContact.fullNameFnf.replace(/\s(?=\S*$)/, '<br>');
        } else {
            return '?';
        }
    }

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref) {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                updateStateMenu(false);
            }
        }

        useEffect(() => {
            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside);
            };
        });
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function redirect(to) {
        history.push(`/${to}`);
    }

    function getWidgetButtonTextByCodeRef(widgets, codeRef) {
        return widgets.find(widget => widget.codeRef === codeRef)?.buttonText || '';
    }

    return (
        <>
            <header>
                <div className="header-portal">
                    <div className="profile-pic">
                        {!user.occupationsActive || user.occupationsActive.length < 1 ? (
                            <>{ReactHtmlParser(formatProfilePicName(currentSelectedContact))}</>
                        ) : (
                            <Dropdown alignRight>
                                <Dropdown.Toggle style={{ marginTop: '0' }}>
                                    {ReactHtmlParser(formatProfilePicName(currentSelectedContact))}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Header>Beheren van</Dropdown.Header>
                                    <Dropdown.Item
                                        onClick={() => {
                                            switchCurrentContact(user);
                                            redirect('dashboard');
                                        }}
                                        active={currentSelectedContact.id === user.id ? true : false}
                                    >
                                        {user.fullNameFnf}
                                    </Dropdown.Item>
                                    {user.occupationsActive && user.occupationsActive.length > 0
                                        ? user.occupationsActive.map(occupationContact =>
                                              occupationContact.allowManageInPortal ? (
                                                  <Dropdown.Item
                                                      key={occupationContact.id}
                                                      onClick={() => {
                                                          switchCurrentContact(occupationContact.primaryContact);
                                                          redirect('dashboard');
                                                      }}
                                                      active={
                                                          currentSelectedContact.id ===
                                                          occupationContact.primaryContact.id
                                                      }
                                                  >
                                                      {occupationContact.primaryContact.fullNameFnf}
                                                  </Dropdown.Item>
                                              ) : null
                                          )
                                        : null}
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </div>

                    <div className={'content-container w-container'}>
                        <Row>
                            <Col xs={6}>
                                <ThemeSettingsConsumer>
                                    {({ currentThemeSettings }) => (
                                        <div className="header-logo">
                                            {currentThemeSettings.portal_logo_file_name_header !== undefined && (
                                                <Image
                                                    src={`images/${currentThemeSettings.portal_logo_file_name_header}?${imageHash}`}
                                                />
                                            )}
                                        </div>
                                    )}
                                </ThemeSettingsConsumer>
                            </Col>
                            <Col xs={6}>
                                <div className="d-flex justify-content-end">
                                    {/* Hambuger menu */}
                                    <div className="bm-burger-button text-center" onClick={openMenu}>
                                        <span>
                                            <span className="bm-burger-bars bm-burger-bar-1" />
                                            <span className="bm-burger-bars bm-burger-bar-2" />
                                            <span className="bm-burger-bars bm-burger-bar-3" />
                                        </span>
                                        <br />
                                        <small style={{ fontSize: '10px', marginLeft: '-3.5px' }}>MENU</small>
                                    </div>
                                    {/* User switch menu */}
                                    <AuthConsumer>
                                        {({ logout }) => {
                                            return (
                                                <Dropdown alignRight>
                                                    <Dropdown.Toggle
                                                        id={'account-dropdown'}
                                                        style={{ padding: '0', marginTop: '14px' }}
                                                    >
                                                        <FaUser />
                                                        <br />
                                                        <small
                                                            className={'account-dropdown-text'}
                                                            style={{ fontSize: '10px' }}
                                                        >
                                                            ACCOUNT
                                                        </small>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Header>Ingelogd als</Dropdown.Header>
                                                        <Dropdown.Item disabled>{user.fullNameFnf}</Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <Link
                                                                to={'/wijzig-inloggegevens'}
                                                                className={'dropdown-link'}
                                                            >
                                                                Wijzig inloggegevens
                                                            </Link>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <Link
                                                                to={'/wijzig-inloggegevens'}
                                                                className={'dropdown-link'}
                                                            >
                                                                Twee factor authenticatie
                                                            </Link>
                                                        </Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                logout(true);
                                                                resetCurrentUserToDefault();
                                                            }}
                                                        >
                                                            Log uit
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            );
                                        }}
                                    </AuthConsumer>
                                </div>
                            </Col>
                        </Row>
                        {location.pathname !== '/' && location.pathname !== '/dashboard' ? (
                            <div className="header-dashboard-button">
                                <Button className={'w-button btn-sm'} onClick={() => history.push('/dashboard')}>
                                    <FaHome />
                                    &nbsp;Dashboard
                                </Button>
                            </div>
                        ) : null}
                    </div>
                </div>
                {/* Sidebar menu */}
                <Menu
                    right
                    width={'300px'}
                    // noOverlay
                    isOpen={menuOpen}
                    onStateChange={state => handleStateChange(state)}
                    customBurgerIcon={false}
                >
                    <div className={'sidebar-menu'}>
                        <>
                            <h6 className="heading in-menu">MENU</h6>
                            {isLoading ? (
                                <LoadingView />
                            ) : (
                                <>
                                    <Link
                                        to={'/inschrijvingen-projecten'}
                                        className={`nav-link w-nav-link w--nav-link-open ${
                                            location.pathname === '/inschrijvingen-projecten' ? 'w--current' : ''
                                        }`}
                                        onClick={closeMenu}
                                    >
                                        {buttonTextHuidigeDeelnames || 'Huidige deelnames'}
                                    </Link>
                                    <Link
                                        to={'/gegevens'}
                                        className={`nav-link w-nav-link w--nav-link-open ${
                                            location.pathname === '/gegevens' ? 'w--current' : ''
                                        }`}
                                        onClick={closeMenu}
                                    >
                                        Gegevens
                                    </Link>
                                    <Link
                                        to={'/inschrijven-projecten'}
                                        className={`nav-link w-nav-link w--nav-link-open ${
                                            location.pathname === '/inschrijven-projecten' ? 'w--current' : ''
                                        }`}
                                        onClick={closeMenu}
                                    >
                                        {buttonTextInschrijvenProjecten || 'Inschrijven projecten'}
                                    </Link>
                                    <Link
                                        to={'/groepen-beheer'}
                                        className={`nav-link w-nav-link w--nav-link-open ${
                                            location.pathname === '/groepen-beheer' ? 'w--current' : ''
                                        }`}
                                        onClick={closeMenu}
                                    >
                                        {buttonTextGroepenBeheer || 'Groepen beheer'}
                                    </Link>
                                    {currentSelectedContact && currentSelectedContact.hasFinancialOverviews ? (
                                        <Link
                                            to={'/waardestaat-documenten'}
                                            className={`nav-link w-nav-link w--nav-link-open ${
                                                location.pathname === '/waardestaat-documenten' ? 'w--current' : ''
                                            }`}
                                            onClick={closeMenu}
                                        >
                                            Waardestaat
                                        </Link>
                                    ) : null}
                                    <Link
                                        to={'/over-ons'}
                                        className={`nav-link w-nav-link w--nav-link-open ${
                                            location.pathname === '/over-ons' ? 'w--current' : ''
                                        }`}
                                        onClick={closeMenu}
                                    >
                                        {buttonTextOverOns || 'Over ons'}
                                    </Link>
                                </>
                            )}
                        </>
                    </div>
                </Menu>
            </header>
            {location.pathname !== '/' && location.pathname !== '/dashboard' ? (
                <div className={'floating-action-button'}>
                    <Button className={'w-button'} onClick={() => history.push('/dashboard')}>
                        <FaHome />
                        &nbsp;Dashboard
                    </Button>
                </div>
            ) : null}
        </>
    );
}

export default withRouter(Header);
