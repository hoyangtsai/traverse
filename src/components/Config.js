const DEFAULT_COLOR_MODE_CONFIG = {
  defaultMode: 'light',
  disableSwitch: false,
  respectPrefersColorScheme: false,
  switchConfig: {
    darkIcon: '🌜',
    darkIconStyle: {},
    lightIcon: '🌞',
    lightIconStyle: {},
  },
};

const DEFAULT_CONFIG = {
  colorMode: DEFAULT_COLOR_MODE_CONFIG,
  metadata: [],
  prism: {
    additionalLanguages: [],
  },
};


export { DEFAULT_CONFIG };
