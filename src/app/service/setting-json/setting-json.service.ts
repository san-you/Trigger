import { Injectable } from '@angular/core';

const fs = require('fs');
const Store = require('electron-store');
const store = new Store();

@Injectable({
  providedIn: 'root'
})
export class SettingJsonService {

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

  constructor () { }

   initialConfig (){
    this.config = new Array<{
      name: string,
      path: string,
    }>();
 
    if(!this.check(store.path)){
      this.config.push({
        name: "",
        path: "",
      });
      store.set(this.config);
      return this.config;
    }

    this.tmpConfig = JSON.parse(fs.readFileSync(store.path, 'utf8'));
    for (var i = 0; i < Object.keys(this.tmpConfig).length; i++) {
      if(typeof this.tmpConfig[i] !== 'undefined'){
        this.config.push(this.tmpConfig[i]);
      }
    }
    
    return this.config;
  }

  check(filePath) {
    var isExist = false;
    try {
      fs.statSync(filePath);
      isExist = true;
    } catch(err) {
      isExist = false;
    }
    return isExist;
  }
}
