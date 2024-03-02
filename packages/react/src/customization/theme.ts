import { Theme } from '@oxygen-ui/react';
import { extendTheme } from '@oxygen-ui/react/theme';
import { PredefinedThemes, ThemeConfigInterface } from '../models/branding-preferences';
import { BrandingPreferenceContextProps } from './branding-preference-context';

export const generateAsgardeoTheme: (branding: BrandingPreferenceContextProps) => Theme = (
  branding: BrandingPreferenceContextProps,
) => {
  const mode: string = branding?.brandingPreference?.preference?.theme?.activeTheme.toUpperCase() ?? 'LIGHT';
  // eslint-disable-next-line max-len
  const brandingTheme: ThemeConfigInterface = branding?.brandingPreference?.preference?.theme[mode as PredefinedThemes];

  return extendTheme({
    colorSchemes: {
      dark: {
        brand: {
          logo: {
            main: brandingTheme?.images?.myAccountLogo?.imgURL
                            ?? '../../assets/asgardeo-logo.svg',
          },
        },
        palette: {
          customComponents: {
            AppShell: {
              Main: {
                background:
                                    brandingTheme?.colors?.background?.body?.main
                                    ?? 'var(--oxygen-palette-background-paper)',
              },
              MainWrapper: {
                background:
                                    brandingTheme?.colors?.background?.surface?.dark
                                    ?? 'var(--oxygen-palette-background-paper)',
              },
            },
            Navbar: {
              background:
                                brandingTheme?.colors?.background?.surface?.dark
                                ?? 'var(--oxygen-palette-background-paper)',
            },
          },
          gradients: {
            primary: {
              stop1: '#EB4F63',
              stop2: '#FA7B3F',
            },
          },
          primary: {
            main: brandingTheme?.colors?.primary?.main ?? '#ff7300',
          },
        },
      },
      light: {
        brand: {
          logo: {
            main: brandingTheme?.images?.myAccountLogo?.imgURL
                            ?? '../assets/asgardeo-logo.svg',
          },
        },
        palette: {
          customComponents: {
            AppShell: {
              Main: {
                background: brandingTheme?.colors?.background?.body?.main ?? '#FAF9F8',
              },
              MainWrapper: {
                background: brandingTheme?.colors?.background?.surface?.dark ?? '#F6F4F2',
              },
            },
            Navbar: {
              background: brandingTheme?.colors?.background?.surface?.dark ?? '#F6F4F2',
            },
          },
          gradients: {
            primary: {
              stop1: '#EB4F63',
              stop2: '#FA7B3F',
            },
          },
          primary: {
            main: brandingTheme?.colors?.primary?.main ?? '#ff7300',
          },
        },
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: brandingTheme?.colors?.background?.surface?.dark ?? '#F6F4F2',
            borderBottom: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 'none',
            boxShadow: 'none',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            padding: '0.67857143em 1em',
          },
        },
      },
    },
    customComponents: {
      AppShell: {
        properties: {
          mainBorderTopLeftRadius: '24px',
          navBarTopPosition: '80px',
        },
      },
    },
    shape: {
      borderRadius: 4,
    },
    typography: {
      fontFamily: brandingTheme?.typography ?? 'Gilmer, sans-serif',
      h1: {
        fontWeight: 700,
      },
    },
  });
};
