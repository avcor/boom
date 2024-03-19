import {GeneralBookType} from './generalBookType';

export type bookSealedType = {
  status: 'Success' | 'Failure' | 'Loading';
  data?: GeneralBookType[];
  error?: string;
};
