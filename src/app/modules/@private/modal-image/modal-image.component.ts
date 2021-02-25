import { Component, OnInit } from '@angular/core';

import { ModalImageService } from '../../../core/services/modal-image.service';
import { FileUploadService } from '../../../core/services/file-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: []
})
export class ModalImageComponent implements OnInit {

  public imageToUpload: File;
  public imageTemp: any;

  constructor(public modalImageService: ModalImageService,
              public fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.modalImageService.closeModal();
    this.imageTemp = null;
  }

  changeImage(file: File) {
    console.log(file);
    if (!file) {
      return this.imageTemp = null;
    }
    this.imageToUpload = file;
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageTemp = reader.result;
    };
  }

  uploadImage() {
    const id = this.modalImageService.id;
    const type = this.modalImageService.typeImage;

    this.fileUploadService
      .updateImg(this.imageToUpload, type, id)
      .then(img => {
        Swal.fire('Updated', 'Image updated!', 'success');
        this.modalImageService.imageUploaded.emit(img);
        this.closeModal();
      }).catch(err => Swal.fire('Error', 'Error to upload image', 'error'));
  }

}
