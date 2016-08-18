import { Component, Input, ViewChild } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {NgIf} from '@angular/common';

import { PlaylistComponent } from '../Components/single_playlist.component';
import { PlaylistsComponent} from '../Components/all_playlists.component';
import { NavigationComponent } from '../Components/navigation.component';
import { YoutubeService } from '../Services/youtube.service';
import { DataService} from '../Services/data.service';
import { MediaControlComponent } from '../Components/media_control.component';
import { Playlist, Song } from '../Model/playlist';

@Component({
  selector: 'my-app',
  templateUrl: 'app/Components/app.html',
  styleUrls:['app/Components/app.css'],
  directives: [PlaylistComponent, PlaylistsComponent, MediaControlComponent, NavigationComponent],
  providers:[YoutubeService, DataService]
})
export class AppComponent {
  componentName: 'AppComponent';
  currentPlaylist: Playlist;
  playerHidden: boolean = true;
  constructor (private youtubeService:YoutubeService) {}

  ngOnInit(){
    this.youtubeService.setupPlayer();
  }
  playlistChanged(val: any)
  {
    this.currentPlaylist = val;
  }
  playerVisibilityChanged(val: any){
    this.playerHidden = val;
  }
}