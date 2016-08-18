import {Component, Input, SimpleChanges }from '@angular/core'; 
import {Playlist, Song}from '../Model/playlist'; 
import {PlaylistService }from '../Services/playlist.service'; 
import { DataService} from '../Services/data.service';

@Component( {
    selector:'add-song-modal', 
    templateUrl:'app/Components/add_song.component.html', 
    styleUrls:['app/Components/add_song.component.css'], 
    providers:[PlaylistService], 
})
export class AddSongComponent {
    public AddSongModalIsVisible:boolean; 
    keyword:string; 
    selectedResult:Song;
    searchResults:Array < Song >  = []; 
    playlists:Array < Playlist >  = [];
    selectedPlaylist: Playlist; 
    currentPlaylist: Playlist;
    private date;

    constructor (private playlistService:PlaylistService , private dataService: DataService) {
        this.dataService.currentPlaylist$.subscribe(
            currentPlaylist => {this.currentPlaylist = currentPlaylist;});
    }

    onSelect(song:Song) {
       this.selectedResult = song;
       if (this.selectedResult.title.includes("-")) {
       this.selectedResult.song_artist = this.selectedResult.title.substring(0, this.selectedResult.title.indexOf('-')).trim(); 
       this.selectedResult.song_name = this.selectedResult.title.substring(this.selectedResult.title.indexOf('-') + 1).trim(); 
       }
       else {
        this.selectedResult.song_artist = this.selectedResult.title.substring(0, this.selectedResult.title.indexOf(':')).trim(); 
        this.selectedResult.song_name = this.selectedResult.title.substring(this.selectedResult.title.indexOf(':') + 1).trim(); 
       }
    }

    showAddSongModal(keyword:string) {
        this.keyword = keyword; 
        this.getSearchResults(keyword); 
        this.getPlaylists(); 
        this.AddSongModalIsVisible = true;
    }

    hideAddSongModal() {
        this.AddSongModalIsVisible = false; 
        this.selectedResult = undefined;
    }
    getSearchResults(keyword:string) {
        this.playlistService.getYoutubeSearchResults(keyword).subscribe(
            searchResults =>  {this.searchResults = searchResults; })
    }
    getPlaylists() {
          this.playlistService.getPlaylists().subscribe(playlists =>  {
          this.playlists = playlists;
          if (this.currentPlaylist != undefined){

            for (var i = 0; i < this.playlists.length; i++) {

                if (this.playlists[i].playlist_id == this.currentPlaylist.playlist_id ){
                    this.selectedPlaylist = this.playlists[i];
                }
            }
          }
          else{
              this.selectedPlaylist = this.playlists[0];
              this.currentPlaylist = this.playlists[0];
          }
        });
    }
    insertSong(event) {
        event.preventDefault();
        this.playlistService.addSong(this.selectedResult, "JSK", this.selectedPlaylist.playlist_id).then(
            res => {
                if (this.selectedPlaylist.playlist_id == this.currentPlaylist.playlist_id){
                this.date = new Date();
                this.selectedResult.song_added = this.date;
                this.currentPlaylist.songs.push(this.selectedResult);
                this.selectedResult = undefined;
                }
                else{
                this.selectedResult = undefined;
                }
            }
        );
    }
    playlistSelect(playlist) {
        this.selectedPlaylist = playlist; 
    }
}