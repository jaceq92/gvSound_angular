import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DND_PROVIDERS, DND_DIRECTIVES } from 'ng2-dnd';
import { HttpModule } from '@angular/http';
import { ToastyService, ToastyConfig, ToastyComponent, ToastComponent } from 'ng2-toasty';
import { ContextMenuComponent, ContextMenuService } from 'angular2-contextmenu/angular2-contextmenu';

import { AppComponent } from './Components/app';
import { PlaylistComponent } from './Components/single_playlist.component';
import { PlaylistsComponent} from './Components/all_playlists.component';
import { NavigationComponent } from './Components/navigation.component';
import { AddPlaylistComponent } from './Components/add_playlist.component';
import { AddSongComponent } from './Components/add_song.component';
import { MediaControlComponent } from './Components/media_control.component';

import { DataService } from './Services/data.service';
import { PlaylistService } from './Services/playlist.service';
import { SoundCloudService } from './Services/soundcloud.service';
import { YoutubeService } from './Services/youtube.service';

@NgModule({
imports: [ BrowserModule, FormsModule, HttpModule],
declarations: [ 
    AppComponent,
    PlaylistComponent,
    PlaylistsComponent,
    NavigationComponent,
    AddPlaylistComponent,
    AddSongComponent,
    MediaControlComponent,
    DND_DIRECTIVES,
    ContextMenuComponent,
    ToastComponent,
    ToastyComponent,
      ],
providers: [ 
    DND_PROVIDERS, 
    ToastyService,
    ToastyConfig,
    DataService,
    PlaylistService,
    SoundCloudService,
    YoutubeService,
    ToastyService,
    ],
bootstrap: [ AppComponent ]
})
export class AppModule { }