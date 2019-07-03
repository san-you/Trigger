import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingJsonService } from '../service/setting-json/setting-json.service';

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
  disabledEdit :boolean = true;
  showEdit: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private settingJsonService: SettingJsonService) {    
    }

  ngOnInit() {
    this.config = this.settingJsonService.initialConfig();
  }

  save() {
    if(!this.checkName()){
      this.snackBar.open(
        'Name is required.',
        'Close',
        {
          'duration': 5000,	
          'direction': 'ltr',
          'horizontalPosition': 'right',
          'verticalPosition': 'top',
          'panelClass': ['red-snack-bar'],
        }
      );
      return;
    }
    var errorAppName = this.checkPath();
    if(errorAppName !== ''){
      this.snackBar.open(
        errorAppName + '\'s path does not exist.',
        'Close',
        {
          'duration': 5000,	
          'direction': 'ltr',
          'horizontalPosition': 'right',
          'verticalPosition': 'top',
          'panelClass': ['red-snack-bar'],
        }
      );
      return;
    }
    errorAppName = this.checkEXE();
    if(errorAppName !== ''){
      this.snackBar.open(
        errorAppName + ' is not exe.',
        'Close',
        {
          'duration': 5000,	
          'direction': 'ltr',
          'horizontalPosition': 'right',
          'verticalPosition': 'top',
          'panelClass': ['red-snack-bar'],
        }
      );
      return;
    }
    if(this.config.length === 0){
      this.config.push({
        name: "",
        path: "",
      });
    }
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
        'panelClass': ['green-snack-bar'],
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

  delete(i){
    this.snackBar.open(
			'Deleted ' + this.config[i].name+ ' setting.',
			'Close',
			{
				'duration': 5000,	
        'direction': 'ltr',
        'horizontalPosition': 'right',
        'verticalPosition': 'top',
        'panelClass': ['orange-snack-bar'],
			}
    );
    this.config.splice(i, 1);
  }

  checkName(){
    for (let index = 0; index < this.config.length; index++) {
      var name = this.config[index].name;
      if(name === ''){
        return false;
      }
    }
    return true;
  }
  checkPath (){
    for (let index = 0; index < this.config.length; index++) {
      var path = this.config[index].path;
      if(!this.settingJsonService.check(path)){
        return this.config[index].name;
      }
    }
    return '';
  }
  checkEXE (){
    for (let index = 0; index < this.config.length; index++) {
      var path = this.config[index].path;
      if(path.slice(-4) !== ".exe"){
        return this.config[index].name;
      }
    }
    return '';
  }
}

