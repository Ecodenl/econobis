import React, { createContext, useState, useEffect } from 'react';

const ThemeSettingsContext = createContext({
    defaultThemeSettings: {},
    setInitialThemeSettings: () => {},
    setCurrentThemeSettings: () => {},
    switchToDefaultThemeSettings: () => {},
});

const ThemeSettingsProvider = function(props) {
    const [defaultThemeSettings, setDefaultThemeSettings] = useState({});
    const [currentThemeSettings, setCurrentThemeSettings] = useState({});

    useEffect(
        function() {
            if (currentThemeSettings.id) {
                handleChangeCurrentThemeSettings();
            }
        },
        [currentThemeSettings.id]
    );

    function setInitialThemeSettings(payload) {
        setDefaultThemeSettings(payload);
        setCurrentThemeSettings(payload);
    }

    function switchToDefaultThemeSettings() {
        setCurrentThemeSettings(defaultThemeSettings);
    }

    function handleChangeCurrentThemeSettings() {
        document.documentElement.style.setProperty(
            '--main-primary-color',
            currentThemeSettings.portal_background_color
        );
        document.documentElement.style.setProperty(
            '--main-primary-text-color',
            currentThemeSettings.portal_background_text_color
        );
        document.documentElement.style.setProperty(
            '--main-primary-rgba',
            currentThemeSettings.login_header_background_color
        );
        document.documentElement.style.setProperty(
            '--main-primary-rgba-text-color',
            currentThemeSettings.login_header_background_text_color
        );
        document.documentElement.style.setProperty(
            '--main-header-portal-icon-color',
            currentThemeSettings.header_icons_color
        );
        document.documentElement.style.setProperty(
            '--main-secondary-color',
            currentThemeSettings.login_field_background_color
        );
        document.documentElement.style.setProperty(
            '--main-secondary-text-color',
            currentThemeSettings.login_field_background_text_color
        );
        document.documentElement.style.setProperty('--button-primary-color', currentThemeSettings.button_color);
        document.documentElement.style.setProperty(
            '--button-primary-text-color',
            currentThemeSettings.button_text_color
        );
    }

    return (
        <ThemeSettingsContext.Provider
            value={{
                defaultThemeSettings,
                setInitialThemeSettings,
                setCurrentThemeSettings,
                switchToDefaultThemeSettings,
                currentThemeSettings,
            }}
        >
            {props.children}
        </ThemeSettingsContext.Provider>
    );
};

const ThemeSettingsConsumer = ThemeSettingsContext.Consumer;

export { ThemeSettingsProvider, ThemeSettingsConsumer, ThemeSettingsContext };
