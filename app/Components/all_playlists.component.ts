import {Component, OnInit, Output, EventEmitter }from '@angular/core'; 
import {PlaylistService }from '../Services/playlist.service'; 
import {Playlist }from '../Model/playlist'; 


@Component( {
  selector:'all-playlists', 
  templateUrl:'app/Components/all_playlists.component.html', 
  styleUrls:['app/Components/all_playlists.component.css'], 
  providers:[PlaylistService], 
  outputs:['currentPlaylist']
})

export class PlaylistsComponent implements OnInit {
    playlists:Array < Playlist >  = []; 
    selectedPlaylist:Playlist; 
    currentPlaylist:EventEmitter < Playlist >  = new EventEmitter < Playlist > (); 

    constructor (private playlistService:PlaylistService) {}
    
    onSelect(playlist:Playlist) {
       this.selectedPlaylist = playlist; 
       this.currentPlaylist.emit(this.selectedPlaylist); 
    }
    ngOnInit() {
        this.getPlaylists(); 
    }
    onLoaded() {
        this.selectedPlaylist = this.playlists[0]; 
        this.currentPlaylist.emit(this.playlists[0]); 
    }
    getPlaylists() {
          this.playlistService.getPlaylists().subscribe(playlists =>  {
             this.playlists = playlists; 
             this.onLoaded(); 
            }); 
    }
    
}
