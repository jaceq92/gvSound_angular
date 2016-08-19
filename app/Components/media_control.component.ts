import {Component, Output, EventEmitter }from '@angular/core'; 
import {bootstrap }from '@angular/platform-browser-dynamic'; 
import {YoutubeService }from '../Services/youtube.service'; 
import { DataService } from '../Services/data.service';
import { Song, Playlist } from '../Model/playlist';


@Component( {
  selector:'media-control', 
  templateUrl:'app/Components/media_control.component.html', 
  styleUrls:['app/Components/media_control.component.css'],
  outputs:['isHidden']
})
export class MediaControlComponent {
  componentName:'MediaControlComponent'; 
  state:number; 
  playButtonToggle:string;
  currentSong:Song;
  playingPlaylist: Playlist;
  isHidden:EventEmitter < boolean >  = new EventEmitter < boolean > ();
  _isHidden: boolean = true;
  indexOfNext: number;

  constructor(private youtubeService:YoutubeService, private dataService: DataService) {
    this.youtubeService.state$.subscribe(
      state =>  {this.state = state;
                if (state == 1) {
                  this.playButtonToggle = "pause_circle_outline"; }
                else {
                  this.playButtonToggle = "play_circle_outline"; }
                });
    this.dataService.currentSong$.subscribe(
      currentSong => {
        this.currentSong = currentSong;
      });
    this.dataService.playingPlaylist$.subscribe(
      playingPlaylist =>{ this.playingPlaylist = playingPlaylist;
      });
  }
  ngOnLoaded(){
    this.isHidden.emit(this._isHidden);
  }
  togglePlay() {
    this.youtubeService.togglePlay(); 
  }
  nextSong(){
    if (this.playingPlaylist == undefined){
      return;
    }
    this.indexOfNext = this.playingPlaylist.songs.indexOf(this.currentSong) + 1;
    if (this.indexOfNext >= this.playingPlaylist.songs.length){
      this.indexOfNext = 0;
    }
    this.youtubeService.playSong(this.playingPlaylist.songs[this.indexOfNext].song_url);
    this.dataService.announceCurrentSong(this.playingPlaylist.songs[this.indexOfNext]);
  }
  previousSong(){
    if (this.playingPlaylist == undefined){
      return;
    }
    this.indexOfNext = this.playingPlaylist.songs.indexOf(this.currentSong) - 1;
    if (this.indexOfNext < 0){
      this.indexOfNext = 0;
    }
    this.youtubeService.playSong(this.playingPlaylist.songs[this.indexOfNext].song_url);
    this.dataService.announceCurrentSong(this.playingPlaylist.songs[this.indexOfNext]);
  }
  togglePlayer(){
    if (this._isHidden == true){
      this._isHidden = false
      this.isHidden.emit(this._isHidden);
    }
    else{
      this._isHidden = true;
      this.isHidden.emit(this._isHidden);
    }
  }
}
