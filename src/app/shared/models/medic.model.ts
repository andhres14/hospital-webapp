import { MedicUserInterface } from '../interfaces/medic.interface';
import { Hospital } from './hospital.model';


export class Medic {
  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public createdBy?: MedicUserInterface,
    public hospital?: Hospital
  ) {
  }
}
