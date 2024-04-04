import {
  BrandingPreferenceAPIResponseInterface,
  BrandingPreferenceInterface,
} from "@asgardeo/js-ui-core";

export type Customization = Omit<
  BrandingPreferenceAPIResponseInterface,
  "preference"
> &
  PreferenceWithText;

export interface PreferenceWithText {
  preference: NewPreference;
}

export type NewPreference = BrandingPreferenceInterface & {
  text: RecursiveStringObject;
};

export interface RecursiveStringObject {
  [key: string]: string | RecursiveStringObject;
}
