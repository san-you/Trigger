import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingJsonService } from '../service/setting-json.service';

const fs = require('fs');
const Store = require('electron-store');
const store = new Store();

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

export class SettingComponent implements OnInit {

  config: Array<{
    name: string,
    path: string,
  }> = new Array<{
    name: string,
    path: string,
  }>();
  tmpConfig: {[key: string]:{
    name: string,
    path: string,
  }};
  disabledEdit :boolean = true;
  showEdit: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private settingJsonService: SettingJsonService) {    
    this.config = this.settingJsonService.initialConfig();
  }

  ngOnInit() {

  }

  save() {
    console.log(store.path);
    fs.unlinkSync(store.path);
    store.set(this.config);
    this.toggleEdit();
    this.snackBar.open(
			'Save successfull!!',
			'Close',
			{
				'duration': 5000,	
        'direction': 'ltr',
        'horizontalPosition': 'right',
        'verticalPosition': 'top',
        'panelClass': ['save-snack-bar'],
			}
		);
  }

  toggleEdit(){
    if(this.disabledEdit){
      this.disabledEdit = false;
      this.showEdit = true;
    }
    else {
      this.disabledEdit = true;
      this.showEdit = false;
      this.config = this.settingJsonService.initialConfig();
    }
  }

  add(){
    this.config.push({
      name: "",
      path: "",
    });
  }

  remove(i){
    this.snackBar.open(
			'Deleted ' + this.config[i].name+ ' setting.',
			'Close',
			{
				'duration': 5000,	
        'direction': 'ltr',
        'horizontalPosition': 'right',
        'verticalPosition': 'top',
        'panelClass': ['delete-snack-bar'],
			}
    );
    console.log(i);
    this.config.splice(i, 1);
  }
}

