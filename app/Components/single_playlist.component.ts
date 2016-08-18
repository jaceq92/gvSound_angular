import {Component, Input, OnChanges, SimpleChanges, EventEmitter }from '@angular/core'; 
import {PlaylistService }from '../Services/playlist.service'; 
import {DND_PROVIDERS, DND_DIRECTIVES}from 'ng2-dnd/ng2-dnd'; 
import { Playlist, Song } from '../Model/playlist';
import {YoutubeService}from '../Services/youtube.service';
import {Subscription}from 'rxjs/Subscription';
import { DataService } from '../Services/data.service';


@Component( {
  selector:'single-playlist', 
  templateUrl:'app/Components/single_playlist.component.html', 
  styleUrls:['app/Components/single_playlist.component.css'], 
  directives:[DND_DIRECTIVES],  
  providers:[PlaylistService, DND_PROVIDERS], 
})

export class PlaylistComponent implements OnChanges {
    componentName:'PlaylistComponent'; 
    selectedSong:Song;
    playlist :Array < Song >  = [];

    @Input()currentPlaylist: Playlist;
    @Input()playerHidden: boolean;
    state:number;
    indexOfNextSong:any;
    height: string;

    constructor (private playlistService:PlaylistService, private dataService:DataService, private youtubeService: YoutubeService) {
       this.youtubeService.state$.subscribe(
      state =>  {this.state = state; 
                if (state == 0) {
                  this.indexOfNextSong = this.currentPlaylist.songs.indexOf(this.selectedSong) + 1;
                  this.youtubeService.playSong(this.currentPlaylist.songs[this.indexOfNextSong].song_url);
                  this.selectedSong = this.currentPlaylist.songs[this.indexOfNextSong];
                  }
                });
    }
    onSelect(song:Song) {
       this.selectedSong = song; 
       this.youtubeService.playSong(this.selectedSong.song_url);
      }

    ngOnChanges(changes:SimpleChanges) {
      if (changes['currentPlaylist'] != undefined) {
        this.currentPlaylist = changes['currentPlaylist'].currentValue;
        if (this.currentPlaylist != undefined){
        this.getPlaylist(this.currentPlaylist.playlist_id);
        }}
        if(changes['playerHidden'] != undefined){
          this.playerHidden = changes['playerHidden'].currentValue;
          if (this.playerHidden == true){
            this.height="75vh";
          }
          else{
            this.height="35vh";
          }
        }
    }

    getPlaylist(id:number) {
          this.playlistService.getPlaylist(id).subscribe(
            playlist => {
              if(this.currentPlaylist != undefined){
                this.currentPlaylist.songs = playlist;
                this.playlist = this.currentPlaylist.songs;}
            });
    }
}
