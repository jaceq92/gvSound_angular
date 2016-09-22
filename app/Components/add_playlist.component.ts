import {Component, Input, SimpleChanges }from '@angular/core'; 
import {Playlist, Song}from '../Model/playlist'; 
import {PlaylistService }from '../Services/playlist.service'; 
import { DataService} from '../Services/data.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';


@Component( {
    selector:'add-playlist-modal', 
    templateUrl:'app/Components/add_playlist.component.html', 
    styleUrls:['app/Components/add_playlist.component.css'], 
    providers:[PlaylistService]
})
export class AddPlaylistComponent {
    public AddPlaylistModalIsVisible: boolean;
    playlistName: string;
    newPlaylist: Playlist;
    playlists :Array < Playlist >  = [];

    constructor(private playlistService: PlaylistService, private dataService:DataService, private toastyService: ToastyService){
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
                this.addToast("success", "Playlist Added", this.newPlaylist.playlist_name);
                this.playlists.push(this.newPlaylist);
                this.dataService.announcePlaylists(this.playlists);
                this.hideAddPlaylistModal();
            },
            error => {this.addToast("error", "Error", "Something went wrong, try again!");}
        );
    }

    addToast(type:string, title:string, message:string) {

        var toastOptions:ToastOptions = {
            title: title,
            msg: message,
            showClose: false,
            timeout: 5000,
            theme: 'bootstrap'
        };
        if (type == "success"){
        this.toastyService.success(toastOptions);
        }
        if (type == "error"){
          this.toastyService.error(toastOptions);
        }
    }
}