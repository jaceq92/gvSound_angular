import { Component, Input } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {NgIf} from '@angular/common';

import { PlaylistComponent } from '../Components/single_playlist.component';
import { PlaylistsComponent} from '../Components/all_playlists.component';
import { NavigationComponent } from '../Components/navigation.component';
import { YoutubeService } from '../Services/youtube.service';
import { MediaControlComponent } from '../Components/media_control.component';
import { Playlist } from '../Model/playlist';
import { Song } from '../Model/song';

@Component({
  selector: 'my-app',
  templateUrl: 'app/Components/app.html',
  styleUrls:['app/Components/app.css'],
  directives: [PlaylistComponent, PlaylistsComponent, MediaControlComponent, NavigationComponent],
  providers:[YoutubeService]
})
export class AppComponent {
  componentName: 'AppComponent'
  currentPlaylist: Playlist;
  playerVisible: boolean;
  constructor (private youtubeService:YoutubeService) {}

  ngOnInit(){
    this.youtubeService.setupPlayer();
  }

  playlistChanged(val: any)
  {
    this.currentPlaylist = val;
  }
  playerVisibilityChanged(val: any){
    this.playerVisible = val;
  }
}