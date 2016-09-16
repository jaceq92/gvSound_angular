import { Component, Input, ViewChild } from '@angular/core';

import { PlaylistComponent } from '../Components/single_playlist.component';
import { PlaylistsComponent} from '../Components/all_playlists.component';
import { NavigationComponent } from '../Components/navigation.component';

import { YoutubeService } from '../Services/youtube.service';
import { SoundCloudService } from '../Services/soundcloud.service';
import { DataService} from '../Services/data.service';

import { MediaControlComponent } from '../Components/media_control.component';


@Component({
  selector: 'my-app',
  templateUrl: 'app/Components/app.html',
  styleUrls:['app/Components/app.css'],
  providers:  [YoutubeService, DataService, SoundCloudService]
})

export class AppComponent {
  componentName: 'AppComponent';
  playerHidden: boolean = true;
  constructor (private youtubeService:YoutubeService, private soundCloudService: SoundCloudService) {}

  ngOnInit(){
    this.youtubeService.setupPlayer();
    this.soundCloudService.setupPlayer();
  }

  playerVisibilityChanged(val: any){
    this.playerHidden = val;
  }
}