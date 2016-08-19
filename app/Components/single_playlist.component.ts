import {Component, Input, OnChanges, SimpleChanges, EventEmitter }from '@angular/core'; 
import {PlaylistService }from '../Services/playlist.service'; 
import {DND_PROVIDERS, DND_DIRECTIVES}from 'ng2-dnd/ng2-dnd'; 
import { Playlist, Song } from '../Model/playlist';
import {YoutubeService}from '../Services/youtube.service';
import {Subscription}from 'rxjs/Subscription';
import { DataService } from '../Services/data.service';
import {ToastyService, ToastyConfig, Toasty, ToastOptions, ToastData} from 'ng2-toasty/ng2-toasty';
import { ContextMenuComponent, ContextMenuService } from 'angular2-contextmenu/angular2-contextmenu';


@Component( {
  selector:'single-playlist', 
  templateUrl:'app/Components/single_playlist.component.html', 
  styleUrls:['app/Components/single_playlist.component.css'], 
  directives:[DND_DIRECTIVES, Toasty, ContextMenuComponent],  
  providers:[PlaylistService, DND_PROVIDERS, ContextMenuService], 
})

export class PlaylistComponent implements OnChanges {
    componentName:'PlaylistComponent'; 
    selectedSong:Song;
    playlist :Array < Song >  = [];
    playingPlaylist:Playlist;
    selectedPlaylist: Playlist;
    @Input()playerHidden: boolean;
    state:number;
    indexOfNextSong:any;
    height: string;

    constructor (private playlistService:PlaylistService,private contextMenuService: ContextMenuService, private dataService:DataService, private toastyService: ToastyService, private youtubeService: YoutubeService) {
       this.youtubeService.state$.subscribe(
      state =>  {this.state = state; 
                if (state == 0) {
                  this.indexOfNextSong = this.playingPlaylist.songs.indexOf(this.selectedSong) + 1;
                  this.youtubeService.playSong(this.playingPlaylist.songs[this.indexOfNextSong].song_url);
                  this.selectedSong = this.playingPlaylist.songs[this.indexOfNextSong];}
                });
      this.dataService.currentSong$.subscribe(
        currentSong => {this.selectedSong = currentSong;});
      this.dataService.playingPlaylist$.subscribe(
        playingPlaylist => {this.playingPlaylist = playingPlaylist;});
      this.dataService.selectedPlaylist$.subscribe(
          selectedPlaylist => {
            this.selectedPlaylist = selectedPlaylist;
            this.getPlaylist(this.selectedPlaylist.playlist_id);
            }
      )
    }
    addToast(type:string, title:string, message:string) {
        var toastOptions:ToastOptions = {
            title: title,
            msg: message,
            showClose: false,
            timeout: 5000,
            theme: 'material'};

        if (type == "success"){
        this.toastyService.success(toastOptions);
        }
        if (type == "error"){
          this.toastyService.error(toastOptions);
        }
    }
    onSelect(song:Song) {
       this.selectedSong = song; 
       this.youtubeService.playSong(this.selectedSong.song_url);
       this.dataService.announceCurrentSong(this.selectedSong);
       this.dataService.announcePlayingPlaylist(this.selectedPlaylist);
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

    getPlaylist(id:number) {
          this.playlistService.getPlaylist(id).subscribe(
            playlist => {
              if(this.selectedPlaylist != undefined){
                this.selectedPlaylist.songs = playlist;
                this.playlist = this.selectedPlaylist.songs;}
            });
    }
    deleteSong(song:Song){
      this.playlistService.deleteSong(song.id).then(
        res => { this.addToast("success","Song deleted", song.song_artist + " - " + song.song_name);
                 this.playlist.splice(this.playlist.indexOf(song), 1);
       },
       error => { this.addToast("error", "Error", "Song deletation failed, try again")});
    }

    public onContextMenu($event: MouseEvent, item: any): void {
    this.contextMenuService.show.next({
      actions: [
        {
          html: () => `Delete ` + item.song_artist + " - " + item.song_name,
          click: (item) => { if(item.username == "JSK"){
                                this.deleteSong(item)
                              }else{
                                this.addToast("error", "Error", "Delete denied");
                              }
        }},
      ],
      event: $event,
      item: item,
    });
    $event.preventDefault();
  }
}
