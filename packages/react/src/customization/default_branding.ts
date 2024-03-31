import {
  BrandingPreferenceAPIResponseInterface,
  BrandingPreferenceTypes,
  PredefinedLayouts,
  PredefinedThemes,
} from "../models/branding-preferences";
import DARK_THEME from "./dark-theme";
import LIGHT_THEME from "./light-theme";

const DEFAULT_BRANDING: BrandingPreferenceAPIResponseInterface = {
  preference: {
    theme: {
      activeTheme: PredefinedThemes.LIGHT,
      LIGHT: LIGHT_THEME,
      DARK: DARK_THEME,
    },
    configs: {
      isBrandingEnabled: false,
    },
    layout: {
      activeLayout: PredefinedLayouts.CENTERED,
    },
    organizationDetails: {
      displayName: "",
      supportEmail: "",
    },
    urls: {
      cookiePolicyURL: "",
      privacyPolicyURL: "",
      termsOfUseURL: "",
    },
  },
  locale: "",
  name: "",
  type: BrandingPreferenceTypes.ORG,
};

export default DEFAULT_BRANDING;
