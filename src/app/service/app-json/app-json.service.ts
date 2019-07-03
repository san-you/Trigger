import { Injectable } from '@angular/core';

const fs = require('fs');
const Store = require('electron-store');
const store = new Store( { name:  'app'} );

@Injectable({
  providedIn: 'root'
})
export class AppJsonService {
  app: {[key: string]:{
    launchTime: string,
  }};

  constructor() { }

  initialConfig (){
 
    if(!this.check(store.path)){
      return null;
    }

    this.app = JSON.parse(fs.readFileSync(store.path, 'utf8'));
    return this.app;
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
