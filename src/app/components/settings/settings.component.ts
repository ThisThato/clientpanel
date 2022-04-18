import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from '../../models/Settings';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(private router: Router,
    private settingsService: SettingsService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {

    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Settings saved', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

}
