import { CSSProperties } from 'react';

/**
 * Interface for the Primary Button Style Attributes..
 */
export interface ButtonStyleAttributesInterface {
  /**
     * Button Background.
     */
  background: BackgroundStyleAttributesInterface;
  /**
     * Button Border.
     */
  border: Pick<BorderStyleAttributesInterface, 'borderRadius'>;
  /**
     * Button Text.
     */
  font: FontStyleAttributesInterface;
}

/**
 * Color styles interface.
 * @remarks Extend with contrast, alpha. whenever necessary.
 */
export type ColorStyleAttributesInterface = Pick<CSSProperties, 'color'>;

/**
 * Font styles interface.
 * @remarks Extend with font size, weight. whenever necessary.
 */
export type FontStyleAttributesInterface = ColorStyleAttributesInterface;

/**
 * Border styles interface.
 * @remarks Extend with borderStyle, etc. whenever necessary.
 */
export type BorderStyleAttributesInterface = Pick<CSSProperties, 'borderColor'>
& Pick<CSSProperties, 'borderRadius'>
& Pick<CSSProperties, 'borderWidth'>;

/**
 * Background styles interface.
 * @remarks Extend with backgroundImage, backgroundSize, etc. whenever necessary.
 */
export type BackgroundStyleAttributesInterface = Pick<CSSProperties, 'backgroundColor'>;

/**
 * Generic interface for element states.
 * @remarks Extend with hover, active & other possible element states.
 */
export interface ElementStateInterface<T> {
  base: T;
}
