import {Component, Input, OnChanges, SimpleChanges, EventEmitter }from '@angular/core'; 

import {PlaylistService}from '../Services/playlist.service'; 
import {YoutubeService}from '../Services/youtube.service'; 
import {DataService}from '../Services/data.service'; 
import {SoundCloudService}from '../Services/soundcloud.service'; 

import {Playlist, Song }from '../Model/playlist'; 

import {DND_PROVIDERS, DND_DIRECTIVES}from 'ng2-dnd'; 
import {ContextMenuComponent, ContextMenuService }from 'angular2-contextmenu/angular2-contextmenu'; 


@Component( {
  selector:'single-playlist', 
  templateUrl:'app/Components/single_playlist.component.html', 
  styleUrls:['app/Components/single_playlist.component.css'], 
  providers:[PlaylistService, DND_PROVIDERS, ContextMenuService], 
})

export class PlaylistComponent implements OnChanges {
    componentName:'PlaylistComponent'; 
    selectedSong:Song; 
    playlist:Array < Song >  = []; 
    playingPlaylist:Playlist; 
    selectedPlaylist:Playlist; 
    @Input()playerHidden:boolean; 
    indexOfNextSong:any; 
    height:string; 
    scPlayerState:number;
    shuffleState:boolean;

    constructor (private playlistService:PlaylistService, private contextMenuService:ContextMenuService, private dataService:DataService, 
                 private youtubeService:YoutubeService, private soundcloudService:SoundCloudService) {
      this.youtubeService.state$.subscribe(
      state =>  {
                  if (state == 0) {
                      if (this.shuffleState == false) {
                          this.indexOfNextSong = this.playingPlaylist.songs.indexOf(this.selectedSong) + 1; 
                      }
                      if (this.shuffleState == true) {
                        this.indexOfNextSong = Math.floor(Math.random() * (this.playingPlaylist.songs.length - 0 + 1)) + 0;
                      }                      if (this.playingPlaylist.songs[this.indexOfNextSong].source == 'youtube') {
                          this.youtubeService.playSong(this.playingPlaylist.songs[this.indexOfNextSong].song_url); 
                      }
                      else {
                          this.soundcloudService.playNewSong(this.playingPlaylist.songs[this.indexOfNextSong]); 
                      }
                      this.dataService.announceCurrentSong(this.playingPlaylist.songs[this.indexOfNextSong])}
                }); 

      this.soundcloudService.scPlayerState$.subscribe(
      scPlayerState =>  {
                  if (scPlayerState == 0) {
                      if (this.shuffleState == false) {
                          this.indexOfNextSong = this.playingPlaylist.songs.indexOf(this.selectedSong) + 1; 
                      }
                      if (this.shuffleState == true) {
                        this.indexOfNextSong = Math.floor(Math.random() * (this.playingPlaylist.songs.length - 0 + 1)) + 0;
                      }
                      if (this.playingPlaylist.songs[this.indexOfNextSong].source == 'youtube') {
                            this.youtubeService.playSong(this.playingPlaylist.songs[this.indexOfNextSong].song_url); 
                      }
                      else {
                      this.soundcloudService.playNewSong(this.playingPlaylist.songs[this.indexOfNextSong]); 
                      }
                      this.dataService.announceCurrentSong(this.playingPlaylist.songs[this.indexOfNextSong])}
                });

      this.dataService.currentSong$.subscribe(
        currentSong =>  {this.selectedSong = currentSong; }); 

      this.dataService.playingPlaylist$.subscribe(
        playingPlaylist =>  {this.playingPlaylist = playingPlaylist; }); 

      this.dataService.selectedPlaylist$.subscribe(
          selectedPlaylist =>  {
            this.selectedPlaylist = selectedPlaylist; 
            this.getPlaylist(this.selectedPlaylist.playlist_id); 
            }); 
      
      this.dataService.shuffle$.subscribe(
        shuffleState => {
          this.shuffleState = shuffleState;
        }
      )

      this.soundcloudService.scPlayerState$.subscribe(
          scPlayerState =>  {this.scPlayerState = scPlayerState; }); 
    }

    onSelect(song:Song) {
       this.selectedSong = song; 

       if (this.selectedSong.source == 'youtube') {
           if (this.scPlayerState == 1) {
             this.soundcloudService.pause(); 
           }
           this.youtubeService.playSong(this.selectedSong.song_url); 
       }
       if (this.selectedSong.source == 'soundcloud') {
          this.youtubeService.stopSong(); 
          this.soundcloudService.playNewSong(this.selectedSong);
       }
       this.dataService.announceCurrentSong(this.selectedSong); 
       this.dataService.announcePlayingPlaylist(this.selectedPlaylist); 
      }

    ngOnChanges(changes:SimpleChanges) {
        if (changes['playerHidden'] != undefined) {
          this.playerHidden = changes['playerHidden'].currentValue; 
          if (this.playerHidden == true) {
            this.height = "100%"; 
          }
          else {
            this.height = "50%"; 
          }
        }
    }

    getPlaylist(id:number) {
          this.playlistService.getPlaylist(id).subscribe(
            playlist =>  {
              if (this.selectedPlaylist != undefined) {
                this.selectedPlaylist.songs = playlist; 
                this.playlist = this.selectedPlaylist.songs; }
            }); 
    }
    openSourcePage(song:Song){
      if (song.source == 'soundcloud'){
      window.open(song.permaurl);
      }
      if (song.source == 'youtube'){
      window.open("https://www.youtube.com/watch?v=" + song.song_url);
      }
    }
    deleteSong(song:Song) {
      this.playlistService.deleteSong(song.id).then(
        res =>  {this.dataService.announceSuccess("Song deleted " + song.song_artist + " - " + song.song_name); 
                 this.playlist.splice(this.playlist.indexOf(song), 1); 
       }, 
       error =>  {this.dataService.announceError("Delete denied")}); 
    }

    public onContextMenu($event:MouseEvent, item:any):void {
    this.contextMenuService.show.next( {
      actions:[ 
      {
        html:() => "Sort by artist", 
          click:(item) =>  {this.selectedPlaylist.songs.sort((a, b) => {
              if (a.song_artist > b.song_artist) {
                return 1;
              }
              if (a.song_artist < b.song_artist) {
                return -1;
              }
              return 0;
          }); }
      },
       {
        html:() => "Sort by song", 
          click:(item) =>  {this.selectedPlaylist.songs.sort((a, b) => {
              if (a.song_name > b.song_name) {
                return 1;
              }
              if (a.song_name < b.song_name) {
                return -1;
              }
              return 0;
          }); }
      },
       {
        html:() => "Sort by date", 
          click:(item) =>  {this.selectedPlaylist.songs.sort((a, b) => {
              if (a.song_added < b.song_added) {
                return 1;
              }
              if (a.song_added > b.song_added) {
                return -1;
              }
              return 0;
          }); }
      },
      {
       html:() => `Delete ` + item.song_artist + " - " + item.song_name, 
        click:(item) =>  {
          if (item.username.toLowerCase() == (localStorage.getItem("username"))) { 
              this.deleteSong(item)
              }
              else {
              this.dataService.announceError("Delete denied"); 
              }
      }},
      
      ], 
      event:$event, 
      item:item, 
    }); 
    $event.preventDefault(); 
  }
}
