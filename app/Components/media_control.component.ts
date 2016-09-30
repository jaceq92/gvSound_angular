import {Component, Output, EventEmitter }from '@angular/core'; 
import {YoutubeService }from '../Services/youtube.service';
import {SoundCloudService }from '../Services/soundcloud.service';

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
  playButtonToggle:string;
  currentSong:Song;
  playingPlaylist: Playlist;
  isHidden:EventEmitter < boolean >  = new EventEmitter < boolean > ();
  _isHidden: boolean = true;
  indexOfNext: number;
  shuffleState: boolean = false;
  youtubeState: number;
  soundcloudState: number;
  disableButtons: boolean;

  constructor(private youtubeService:YoutubeService, private dataService: DataService, private soundCloudService: SoundCloudService) {
    this.youtubeService.state$.subscribe(
      state =>  { this.youtubeState = state;
                if (state == 1 || this.soundcloudState == 1){
                  this.playButtonToggle = "pause_circle_outline";}
                else {
                  this.playButtonToggle = "play_circle_outline"; 
                }
              });

    this.soundCloudService.scPlayerState$.subscribe(
      scPlayerState => { this.soundcloudState = scPlayerState;
                          if (this.youtubeState == 1 || this.soundcloudState == 1){
                              this.playButtonToggle = "pause_circle_outline";}
                              else{
                                this.playButtonToggle = "play_circle_outline"; }});

    this.dataService.currentSong$.subscribe(
      currentSong => { this.currentSong = currentSong;});

    this.dataService.playingPlaylist$.subscribe(
      playingPlaylist =>{ this.playingPlaylist = playingPlaylist;});

    this.dataService.register$.subscribe(
      register => { this.disableButtons = register; }
    )
  }
  ngOnLoaded(){
    this.isHidden.emit(this._isHidden);
  }
  togglePlay() {
    if (this.currentSong != undefined){
      if (this.currentSong.source == "youtube"){
          this.youtubeService.togglePlay();
      }
      if (this.currentSong.source == "soundcloud"){
        this.soundCloudService.togglePlay();
      }
    }
  }
  nextSong(){
    if (this.playingPlaylist == undefined){
      return;
    }
    if (this.shuffleState == true) {
      this.indexOfNext = Math.floor(Math.random() * (this.playingPlaylist.songs.length - 0 + 1)) + 0;
    }
    else{
      this.indexOfNext = this.playingPlaylist.songs.indexOf(this.currentSong) + 1;
    }
    if (this.indexOfNext >= this.playingPlaylist.songs.length){
      this.indexOfNext = 0;
    }
    if (this.playingPlaylist.songs[this.indexOfNext].source == 'youtube') {
        this.youtubeService.playSong(this.playingPlaylist.songs[this.indexOfNext].song_url);
        if(this.soundCloudService.scPlayer != undefined){
            this.soundCloudService.pause();}
    }
    else {
        this.soundCloudService.playNewSong(this.playingPlaylist.songs[this.indexOfNext]);
        this.youtubeService.stopSong();
    }
    
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
    if (this.playingPlaylist.songs[this.indexOfNext].source == 'youtube') {
        this.youtubeService.playSong(this.playingPlaylist.songs[this.indexOfNext].song_url);
        if(this.soundCloudService.scPlayer != undefined){
            this.soundCloudService.pause();}
    }
    else {
        this.soundCloudService.playNewSong(this.playingPlaylist.songs[this.indexOfNext]);
        this.youtubeService.stopSong();
    }

    this.dataService.announceCurrentSong(this.playingPlaylist.songs[this.indexOfNext]);
  }
  togglePlayer(){
    if (this.disableButtons == true){
      return;
    }
    if (this._isHidden == true){
      this._isHidden = false
      this.isHidden.emit(this._isHidden);
    }
    else{
      this._isHidden = true;
      this.isHidden.emit(this._isHidden);
    }
  }
  toggleShuffle(){
    if (this.shuffleState == false){
      this.dataService.announceShuffle(true);
      this.shuffleState = true;
    }
    else{
      this.dataService.announceShuffle(false);
      this.shuffleState = false;
    }
  }
  openSoundCloud(){
    window.open("https://www.soundcloud.com");
  }
  openYoutube(){
    window.open("https://www.youtube.com");
  }
}
