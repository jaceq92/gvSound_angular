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


@Component({
  selector: 'my-app',
  templateUrl: 'app/Components/app.html',
  styleUrls:['app/Components/app.css'],
  providers:  [YoutubeService, DataService, SoundCloudService]
})

export class AppComponent {
  componentName: 'AppComponent';
  playerHidden: boolean = true;
  user: User;
  error: string;
  constructor (private youtubeService:YoutubeService, private soundCloudService: SoundCloudService, 
               private toastyService:ToastyService, private dataService: DataService) {

                       this.dataService.error$.subscribe(
        error =>  {this.error = error;
                   this.addErrorToast(this.error)}); 
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
}