import { Medic } from '../models/medic.model';

export class MedicUserInterface {
  _id: string;
  name: string;
  img: string;
}

export class MedicResponseGetInterface {
  success: boolean;
  medics: Medic[];
}

export class MedicResponseGetByIdInterface {
  success: boolean;
  medic: Medic;
}
