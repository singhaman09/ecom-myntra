export const ORDER = {
  DELIVERED :'delivered',
  CDELIVERED: 'DELIVERED',
  CCANCELLED:'CANCELLED',
  RETURNED:'RETURNED',
  CANCELLED:'canceled',
  PLACED:'placed',
  WRITE:'write',
SEARCH :'searchQuery',
NA:'N/A'

} as const;

export type ORDER = typeof ORDER[keyof typeof ORDER];