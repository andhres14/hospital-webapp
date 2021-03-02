import { HospitalUserInterface } from '../interfaces/hospital.interface';

export class Hospital {
  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public createdBy?: HospitalUserInterface
  ) {
  }
}
