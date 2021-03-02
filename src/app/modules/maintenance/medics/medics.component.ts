import { Component, OnDestroy, OnInit } from '@angular/core';

import { MedicService } from '../../../core/services/medic.service';
import { SearchService } from '../../../core/services/search.service';
import { ModalImageService } from '../../../core/services/modal-image.service';

import { Medic } from '../../../shared/models/medic.model';

import Swal from 'sweetalert2';
import { Hospital } from '../../../shared/models/hospital.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: []
})
export class MedicsComponent implements OnInit, OnDestroy {

  public wordToSearch: string;
  public loading: boolean;
  public medics: Medic[] = [];
  public medicsTemp: Medic[] = [];
  public imgSubs: Subscription;


  constructor(private medicService: MedicService,
              private searchService: SearchService,
              private modalImageService: ModalImageService) {
  }

  ngOnInit(): void {
    this.getMedics();

    this.imgSubs = this.modalImageService.imageUploaded
      .pipe(delay(100))
      .subscribe(img => {
        this.getMedics();
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  openModal(medic: Medic): void {
    this.modalImageService.openModal('medics', medic._id, medic.img);
  }

  getMedics(): void {
    this.loading = true;
    this.medicService.getMedics()
      .subscribe(medics => {
        this.loading = false;
        this.medics = medics;
        this.medicsTemp = medics;
      });
  }

  deleteMedic(medic: Medic): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicService.deleteMedic(medic._id)
          .subscribe(resp => {
            Swal.fire('Deleted!!', medic.name, 'success');
            this.getMedics();
          });
      }
    });
  }

  search(term: string): void {
    if (term.length === 0) {
      this.medics = this.medicsTemp;
      return;
    }
    this.searchService.generalSearch('medics', term)
      .subscribe((resp: Hospital[]) => {
        this.medics = resp;
      });
  }

}
