export const CONTACTS_API_ENDPOINTS = (id: string = '') => ({
  GET_ALL: '/contacts',
  GET_BY_ID: `/contacts/${id}`,
  POST: '/contacts',
  PATCH: `/contacts/${id}`,
  DELETE: `/contacts/${id}`,
});

export type TEndpointKeys =
  | 'GET_ALL'
  | 'GET_BY_ID'
  | 'POST'
  | 'PATCH'
  | 'DELETE';
