import {axiosBackend, axiosBackendMultipart} from '../../config/axios.config';
import { IContact } from '../../interface/contact.interface';
import { IGroupedContactSection } from '../../interface/section.interface';
import {CONTACTS_API_ENDPOINTS, TEndpointKeys} from './contact.endpoints';

const getEnpoint = (method: TEndpointKeys, id: string = ''): string => {
  return CONTACTS_API_ENDPOINTS(id)[method];
};

export class ContactService {
  static getAll = async (req: string| undefined): Promise<IGroupedContactSection[]> => {
    const endpoint = getEnpoint('GET_ALL');
    return (await axiosBackend.get<IGroupedContactSection[]>(endpoint, {params: {name: req}})).data;
  };

  static getById = async (id: string): Promise<IContact> => {
    const endpoint = getEnpoint('GET_BY_ID', id);
    return (await axiosBackend.get<IContact>(endpoint)).data;
  };

  static create = async (contact: FormData): Promise<IContact> => {
    const endpoint = getEnpoint('POST');
    return (await axiosBackendMultipart.post<IContact>(endpoint, contact)).data;
  };

  static update = async (contact: FormData, id: string): Promise<{success: boolean, message: string}> => {
    const endpoint = getEnpoint('PATCH', id);
    return (await axiosBackendMultipart.patch<{success: boolean, message: string}>(endpoint, contact)).data;
  };

  static delete = async (id: string): Promise<{success: boolean, message: string}> => {
    const endpoint = getEnpoint('DELETE', id);
    return (await axiosBackend.delete<{success: boolean, message: string}>(endpoint)).data;
  };
}

