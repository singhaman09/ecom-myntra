// store enum

export const TOGGLE_BUTTONS = {
  LIST: 'list',
 MAP: 'map',
} as const;


export type TOGGLE_BUTTONS_TYPE = typeof TOGGLE_BUTTONS[keyof typeof TOGGLE_BUTTONS];
