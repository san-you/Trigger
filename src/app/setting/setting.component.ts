import { Component, OnInit } from '@angular/core';

var fs = require('fs');

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
  constructor() {    
    this.tmpConfig = JSON.parse(fs.readFileSync(store.path, 'utf8'));
    for (var i = 0; i < 100; i++) {
      if(typeof this.tmpConfig[i] !== 'undefined'){
        this.config.push(this.tmpConfig[i]);
      }else{
        break;
      }
    }
  }

  ngOnInit() {

  }

  save() {
    store.set(this.config);
    alert('Save successful!!');
  }
}

