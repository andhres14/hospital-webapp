import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../shared/models/user.model';

import { UserService } from '../../core/services/user.service';
import { FileUploadService } from '../../core/services/file-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public profile: User;
  public imageToUpload: File;
  public imageTemp: any;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private fileUploadService: FileUploadService) {
    this.profile = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [ this.profile.name, Validators.required ],
      email: [ this.profile.email, [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ] ]
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value)
      .subscribe(() => {
        const { name, email } = this.profileForm.value;
        this.profile.name = name;
        this.profile.email = email;
        Swal.fire('Saved', 'Changes saved', 'success');
      }, err => {
        Swal.fire('Error', err.error.message, 'error');
      });
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
    this.fileUploadService
      .updateImg(this.imageToUpload, 'users', this.profile.uid)
      .then(img => {
        this.profile.img = img;
        Swal.fire('Updated', 'Image updated!', 'success');
      }).catch(err => Swal.fire('Error', 'Error to upload image', 'error'));
  }

}
