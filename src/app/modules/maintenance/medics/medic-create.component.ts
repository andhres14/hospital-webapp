import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../core/services/hospital.service';
import { MedicService } from '../../../core/services/medic.service';
import { Hospital } from '../../../shared/models/hospital.model';
import { Medic } from '../../../shared/models/medic.model';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medic-create',
  templateUrl: './medic-create.component.html',
  styles: []
})
export class MedicCreateComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public medicForm: FormGroup;
  public selectedMedic: Medic;
  public selectedHospital: Hospital;

  constructor(private fb: FormBuilder,
              private medicService: MedicService,
              private hospitalService: HospitalService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => this.getMedicById(id));

    this.medicForm = this.fb.group({
      name: [ '', Validators.required ],
      hospital: [ '', Validators.required ]
    });
    this.loadHospitals();
    this.medicForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.selectedHospital = this.hospitals.find(hosp => hosp._id === hospitalId);
      });
  }

  getMedicById(id: string): void {
    if (id === 'create') {
      return;
    }
    this.medicService.getMedicById(id)
      .pipe(
        delay(100)
      )
      .subscribe(medic => {
        if (!medic) {
          return this.router.navigateByUrl(`/dashboard/medics`);
        }

        const { name, hospital: { _id } } = medic;
        this.selectedMedic = medic;
        this.medicForm.setValue({ name, hospital: _id });
      }, error => {
        return this.router.navigateByUrl(`/dashboard/medics`);
      });
  }

  loadHospitals(): void {
    this.hospitalService.getHospitals()
      .subscribe((resp: Hospital[]) => {
        this.hospitals = resp;
      });
  }

  saveMedic(): void {
    const { name } = this.medicForm.value;
    if (this.selectedMedic) {
      const data = {
        ...this.medicForm.value,
        _id: this.selectedMedic._id
      };
      this.medicService.updateMedic(data)
        .subscribe(resp => {
          Swal.fire('Updated', `${ name } updated with success`, 'success');
        });
    } else {
      this.medicService.createMedic(this.medicForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Created', `${ name } created with success`, 'success');
          this.router.navigateByUrl(`/dashboard/medics/${ resp.medicCreated._id }`);
        });
    }
  }

}
