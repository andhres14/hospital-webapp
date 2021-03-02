import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { HospitalService } from '../../../core/services/hospital.service';
import { ModalImageService } from '../../../core/services/modal-image.service';

import { Hospital } from '../../../shared/models/hospital.model';

import Swal from 'sweetalert2';
import { SearchService } from '../../../core/services/search.service';


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading: boolean;
  public imgSubs: Subscription;
  public wordToSearch: string;

  constructor(private hospitalService: HospitalService,
              private searchService: SearchService,
              private modalImageService: ModalImageService) {
  }

  ngOnInit(): void {
    this.loadHospitals();

    this.imgSubs = this.modalImageService.imageUploaded
      .pipe(delay(100))
      .subscribe(img => {
        this.loadHospitals();
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadHospitals(): void {
    this.loading = true;
    this.hospitalService.getHospitals()
      .subscribe(resp => {
        this.hospitals = resp;
        this.hospitalsTemp = resp;
        this.loading = false;
      });
  }

  updateHospital(hospital: Hospital): void {
    this.hospitalService.updateHospital(hospital._id, hospital.name)
      .subscribe(resp => {
        Swal.fire('Updated!!', hospital.name, 'success');
      });
  }

  deleteHospital(hospital: Hospital): void {
    this.hospitalService.deleteHospital(hospital._id)
      .subscribe(resp => {
        Swal.fire('Deleted!!', hospital.name, 'success');
        this.loadHospitals();
      });
  }

  async openSweetToCreateHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create Hospital',
      text: 'Write the Hospital name',
      input: 'text',
      inputPlaceholder: 'Hospital Name',
      showCancelButton: true
    });
    if (value.length > 0) {
      this.hospitalService.createHospital(value)
        .subscribe((resp: any) => this.hospitals.push(resp.hospitalSaved));
    }
  }

  openModal(hospital: Hospital): void {
    this.modalImageService.openModal('hospitals', hospital._id, hospital.img);
  }

  search(term: string): void {
    if (term.length === 0) {
      this.hospitals = this.hospitalsTemp;
      return;
    }
    this.searchService.generalSearch('hospitals', term)
      .subscribe((resp: Hospital[]) => {
        this.hospitals = resp;
      });
  }

}
