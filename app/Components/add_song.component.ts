import {Component, Input, SimpleChanges }from '@angular/core'; 
import {Song }from '../Model/song'; 
import {Playlist}from '../Model/playlist'; 
import {PlaylistService }from '../Services/playlist.service'; 


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
    selectedPlaylist:Playlist; 
    searchResults:Array < Song >  = []; 
    playlists:Array < Playlist >  = []; 
    width:string; 
    @Input()currentPlaylist:Playlist; 

    constructor (private playlistService:PlaylistService) {}

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
             this.selectedPlaylist = playlists[0];
            }); 
    }
    insertSong(event) {
        event.preventDefault(); 
        this.playlistService.addSong(this.selectedResult, "JSK", this.selectedPlaylist.playlist_id); 
    }
    playlistSelect(playlist) {
        this.selectedPlaylist = playlist; 
    }
}