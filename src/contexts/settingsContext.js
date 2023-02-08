import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    state: {
      id: '25',
      name: 'Massachusetts'
    },
    city: []
  });
  return (
    <SettingsContext.Provider value={[settings, setSettings]}>{children}</SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node
};
