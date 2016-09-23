import {Component }from '@angular/core'; 
import {Playlist}from '../Model/playlist'; 
import {PlaylistService }from '../Services/playlist.service'; 
import { DataService} from '../Services/data.service';

@Component( {
    selector:'add-playlist-modal', 
    templateUrl:'app/Components/add_playlist.component.html', 
    styleUrls:['app/Components/add_playlist.component.css']
})
export class AddPlaylistComponent {
    public AddPlaylistModalIsVisible: boolean;
    playlistName: string;
    newPlaylist: Playlist;
    playlists :Array < Playlist >  = [];

    constructor(private playlistService: PlaylistService, private dataService:DataService){
        this.dataService.playlists$.subscribe(
            playlists => {this.playlists = playlists;});
    }

    showAddPlaylistModal() {
                this.AddPlaylistModalIsVisible = true;
    }
    hideAddPlaylistModal(){
                this.AddPlaylistModalIsVisible = false;
    }
    addNewPlaylist(event){
        event.preventDefault();
        this.newPlaylist = new Playlist();
        this.newPlaylist.playlist_name = this.playlistName;
        this.playlistService.insertPlaylist(this.newPlaylist).then(
            res => {
                this.newPlaylist = res;
                this.dataService.announceSuccess("Playlist " + this.newPlaylist.playlist_name + " Added ");
                this.playlists.push(this.newPlaylist); 
                this.dataService.announcePlaylists(this.playlists);
                this.hideAddPlaylistModal();
            },
            error => {this.dataService.announceError("Adding the playlist failed, try again!");}
        );
    }
}