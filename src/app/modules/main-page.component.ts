import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../core/services/settings.service';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: []
})
export class MainPageComponent implements OnInit {

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    customInitFunctions();
  }

}
