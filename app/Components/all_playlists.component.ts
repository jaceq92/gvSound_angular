import {Component, OnInit, Output, EventEmitter, Input, SimpleChanges, ViewChild }from '@angular/core'; 

import {PlaylistService }from '../Services/playlist.service';
import {DataService} from '../Services/data.service';

import {Playlist }from '../Model/playlist';
import { AddPlaylistComponent } from '../Components/add_playlist.component';

import { ContextMenuComponent, ContextMenuService } from 'angular2-contextmenu/angular2-contextmenu';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {DND_PROVIDERS, DND_DIRECTIVES} from 'ng2-dnd';


@Component( {
  selector:'all-playlists', 
  templateUrl:'app/Components/all_playlists.component.html', 
  styleUrls:['app/Components/all_playlists.component.css'], 
  providers:[PlaylistService, ContextMenuService],
})

export class PlaylistsComponent implements OnInit {
    playlists:Array < Playlist >  = []; 
    selectedPlaylist:Playlist;
    height: string;
    @Input()playerHidden: boolean;
    @ViewChild(AddPlaylistComponent) addPlaylist: AddPlaylistComponent;

    constructor (private playlistService:PlaylistService, private dataService: DataService, private contextMenuService: ContextMenuService, private toastyService: ToastyService) {
            this.dataService.playlists$.subscribe(
              playlists => {this.playlists = playlists;}
            );
    }
    
    onSelect(playlist:Playlist) {
       this.selectedPlaylist = playlist; 
       this.dataService.announceSelectedPlaylist(this.selectedPlaylist);
    }
    ngOnInit() {
        this.getPlaylists(); 
    }
     ngOnChanges(changes:SimpleChanges) {
        if(changes['playerHidden'] != undefined){
          this.playerHidden = changes['playerHidden'].currentValue;
          if (this.playerHidden == true){
            this.height="72vh";
          }
          else{
            this.height="35vh";
          }
        }
    }
    onLoaded() {
        this.selectedPlaylist = this.playlists[0]; 
        this.dataService.announceSelectedPlaylist(this.playlists[0]);
    }
    getPlaylists() {
          this.playlistService.getPlaylists().subscribe(playlists =>  {
             this.playlists = playlists; 
             this.onLoaded();
             this.dataService.announcePlaylists(this.playlists);
            }); 
    }

    showAddPlaylistModal(){
          this.addPlaylist.showAddPlaylistModal();
    }

     public onContextMenu($event: MouseEvent, item: any): void {
    this.contextMenuService.show.next({
      actions: [
        {
          html: () => `Delete ` + item.playlist_name,
          click: (item) => {if (item.deletable == false){
                            this.addToast("error", "Error", "This Playlist cannot be deleted");
          }
          else{
          this.playlistService.deletePlaylist(item.playlist_id, "JSK").then(
                                res => {
                                  this.addToast("success","Playlist deleted!", item.playlist_name);
                                  this.playlists.splice(this.playlists.indexOf(item), 1);
                                  this.dataService.announcePlaylists(this.playlists);
                                },
                                error =>{
                                  this.addToast("error", "Error", "Playlist delete failed, try again!");
                                }
          )}},
        },
      ],
      event: $event,
      item: item,
    });
    $event.preventDefault();
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
