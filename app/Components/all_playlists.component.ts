import {Component, OnInit, Output, EventEmitter, Input, SimpleChanges }from '@angular/core'; 
import {PlaylistService }from '../Services/playlist.service'; 
import {Playlist }from '../Model/playlist'; 
import { DataService} from '../Services/data.service';


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
    height: string;
    currentPlaylist:EventEmitter < Playlist >  = new EventEmitter < Playlist > ();
    @Input()playerHidden: boolean;

    constructor (private playlistService:PlaylistService, private dataService: DataService) {}
    
    onSelect(playlist:Playlist) {
       this.selectedPlaylist = playlist; 
       this.currentPlaylist.emit(this.selectedPlaylist);
       this.dataService.announceCurrentPlaylist(this.selectedPlaylist);
    }
    ngOnInit() {
        this.getPlaylists(); 
    }
     ngOnChanges(changes:SimpleChanges) {
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
    onLoaded() {
        this.selectedPlaylist = this.playlists[0]; 
        this.currentPlaylist.emit(this.playlists[0]);
        this.dataService.announceCurrentPlaylist(this.playlists[0]);
    }
    getPlaylists() {
          this.playlistService.getPlaylists().subscribe(playlists =>  {
             this.playlists = playlists; 
             this.onLoaded(); 
            }); 
    }
    
}
