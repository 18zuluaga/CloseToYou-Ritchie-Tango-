import {Contact} from '../../interface/contact.interface';
import {role} from '../enum/role.enum';

export const defaultContacts: Contact[] = [
  {
    id: 1,
    name: 'Juan',
    role: role.Cliente,
    number: 43123241,
    email: 'juan@gmail.com',
    address: {
    latitude: 6.219574005345421,
    longitude: -75.5836361669855,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  },
  {
    id: 2,
    name: 'Maria',
    role: role.Empleado,
    number: 43123241,
    email: 'maria@gmail.com',
    address: {
    latitude: 6.219574005345421,
    longitude: -75.5836361669855,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  },
  {
    id: 3,
    name: 'Pepita',
    role: role.Cliente,
    number: 43123241,
    email: 'pepita@gmail.com',
    address: {
    latitude: 6.221591,
    longitude: -75.5836361669855,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  },
  {
    id: 4,
    name: 'Mama',
    role: role.Cliente,
    number: 43123241,
    email: 'mama@gmail.com',
    address: {
    latitude: 6.219574005345421,
    longitude: -75.5836361669855,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  },
  {
    id: 5,
    name: 'Jose',
    role: role.Empleado,
    number: 43123241,
    email: 'jose@gmail.com',
    address: {
    latitude: 6.219574005345421,
    longitude: -75.5836361669855,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  },
];
