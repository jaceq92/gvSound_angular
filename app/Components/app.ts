import { Component, Input, ViewChild } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData}from 'ng2-toasty'; 

import { PlaylistComponent } from '../Components/single_playlist.component';
import { PlaylistsComponent} from '../Components/all_playlists.component';
import { NavigationComponent } from '../Components/navigation.component';

import { YoutubeService } from '../Services/youtube.service';
import { SoundCloudService } from '../Services/soundcloud.service';
import { DataService} from '../Services/data.service';

import { MediaControlComponent } from '../Components/media_control.component';
import { User } from '../Model/user';

import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app/Components/app.html',
  styleUrls:['app/Components/app.css'],
  providers:  [YoutubeService, DataService, SoundCloudService],

  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      animate(1000, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 0, transform: 'translateX(15px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ]),
    transition('* => void', [
      animate(1000, keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 0, transform: 'translateX(-15px)', offset: 0.7}),
        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
      ]))
    ])
  ])
]
})

export class AppComponent {
  componentName: 'AppComponent';
  playerHidden: boolean = true;
  playlistHidden: boolean = false;
  registerHidden: boolean = true;
  user: User;
  constructor (private youtubeService:YoutubeService, private soundCloudService: SoundCloudService, 
               private toastyService:ToastyService, private dataService: DataService) {

        this.dataService.error$.subscribe(
        error =>  { this.addErrorToast(error)}); 
               
        this.dataService.success$.subscribe(
        success =>  { this.addSuccessToast(success)});

        this.dataService.register$.subscribe(
          register => { 
            this.playlistHidden = register;
          }
        )
  }

  ngOnInit(){
    this.youtubeService.setupPlayer();
    this.soundCloudService.setupPlayer();
    if (localStorage.getItem("token") == undefined){
        this.user = new User();
        this.user.username = "test";
        this.user.password = "test";
        this.dataService.authUser(this.user);
    }
  }

  playerVisibilityChanged(val: any){
    this.playerHidden = val;
  }

  addErrorToast(message:string) {
    var toastOptions:ToastOptions =  {
        title:"Error", 
        msg:message, 
        showClose:false, 
        timeout:5000, 
        theme:'material'}; 
        this.toastyService.error(toastOptions); 
    }
  addSuccessToast(message:string) {
    var toastOptions:ToastOptions =  {
        title:"Success", 
        msg:message, 
        showClose:false, 
        timeout:5000, 
        theme:'material'}; 
        this.toastyService.success(toastOptions); 
    }
}