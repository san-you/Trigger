import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingJsonService } from '../service/setting-json/setting-json.service';
import { AppJsonService } from '../service/app-json/app-json.service';

const Store = require('electron-store');
const store = new Store( { name:  'app'} );

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  config: Array<{
    name: string,
    path: string,
  }> = new Array<{
    name: string,
    path: string,
  }>();
  app: {[key: string]:{
    launchTime: string,
  }};
  show: boolean = true;

  constructor(
    private snackBar: MatSnackBar,
    private settingJsonService: SettingJsonService,
    private appJsonService: AppJsonService) { 
    }

  ngOnInit() { 
    this.config = this.settingJsonService.initialConfig();
    this.app = this.appJsonService.initialConfig();
    console.log(this.config[0].name);
    if(this.config === null ||
      this.config[0].name === ''){
      this.show = false;
      return;
    }
    else{
      this.show = true;
    }
    
    if(this.app === null){
      for(var i = 0; i < this.config.length; i++){
        store.set(this.config[i].name, "none")
      }
      this.app = this.appJsonService.initialConfig();
    }
  }

  launchApp(iName : string, iPath : string, iIndex: string){

    store.set(iName.toString(), new Date().toLocaleString());
    this.app = this.appJsonService.initialConfig();
    this.snackBar.open(
			iName + ' launching now.',
			'Close',
			{
				'duration': 5000,	
        'direction': 'ltr',
        'horizontalPosition': 'right',
        'verticalPosition': 'top',
        'panelClass': ['launch-snack-bar'],
			}
    );
    var lastSeparatorIndex = iPath.lastIndexOf(iName);
    var appFolder = iPath.slice(0, lastSeparatorIndex);
    const { execFile } = require('child_process'); 
    const child = execFile(iPath, {cwd: appFolder}, 
      (error, stdout, stderr) => { 
        if (error) { 
          console.log(error); 
          throw error; 
        } 
      }); 
  }

  getLaunchTime(i :string){
    return this.app[i];
  }
}

