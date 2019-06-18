import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor() { }
  ngOnInit() { }

  title = 'Trigger';
  launchApp(iValue : string){
    if(iValue == 'Steam'){
      launchSteam();
    }
    else if(iValue == 'Epic'){
      launchEpic();
    }
    else if(iValue == 'Origin'){
      launchOrigin();
    }
    else if(iValue == 'BattleNet'){
      launchBattleNet();
    }
    else{
      alert('Failed launch');
    }
  }
}

function launchSteam(){
  const { execFile } = require('child_process'); 
  const child = execFile('C:\\Program Files (x86)\\Steam\\Steam.exe', 
  {cwd: 'C:\\Program Files (x86)\\Steam\\'}, 
  (error, stdout, stderr) => { if (error) { throw error; } console.log(stdout); }); 
}

function launchEpic(){
  const { execFile } = require('child_process'); 
  const child = execFile('C:\\Program Files (x86)\\Epic Games\\Launcher\\Engine\\Binaries\\Win64\\EpicGamesLauncher.exe', 
  {cwd: 'C:\\Program Files (x86)\\Epic Games\\Launcher\\Engine\\Binaries\\Win64\\'}, 
  (error, stdout, stderr) => { if (error) { throw error; } console.log(stdout); }); 
}

function launchOrigin(){
  const { execFile } = require('child_process'); 
  const child = execFile('C:\\Program Files (x86)\\Origin\\Origin.exe', 
  {cwd: 'C:\\Program Files (x86)\\Origin\\'}, 
  (error, stdout, stderr) => { if (error) { throw error; } console.log(stdout); }); 
}

function launchBattleNet(){
  const { execFile } = require('child_process'); 
  const child = execFile('C:\\Program Files (x86)\\Battle.net\\Battle.net Launcher.exe', 
  {cwd: 'C:\\Program Files (x86)\\Battle.net\\'}, 
  (error, stdout, stderr) => { if (error) { throw error; } console.log(stdout); }); 
}
