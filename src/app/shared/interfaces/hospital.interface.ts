import { Hospital } from '../models/hospital.model';

export class HospitalInterface {
  success: boolean;
  hospitals: Hospital[];
}

export class HospitalUserInterface {
  _id: string;
  name: string;
  img: string;
}
