'use client';
import { vars } from 'nativewind';

export const config = {
  light: vars({
    '--color-primary': '37 99 235',
    '--color-secondary': '255 255 255',
    '--color-background': '242 244 248',
    '--color-text': '15 23 42',
    '--color-success': '34 197 94',
    '--color-error': '239 68 68',
    '--color-warning': '234 179 8',
  }),

  dark: vars({
    '--color-primary': '93 156 255',
    '--color-secondary': '18 22 35',
    '--color-background': '0 0 0',
    '--color-text': '230 233 240',
    '--color-success': '74 222 128',
    '--color-error': '248 113 113',
    '--color-warning': '250 204 21',
  }),
};
