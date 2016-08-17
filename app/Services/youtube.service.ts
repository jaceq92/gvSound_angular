/// <reference path="../../typings/globals/youtube/index.d.ts" />
import { Injectable }     from '@angular/core';
import { window }from '@angular/platform-browser/src/facade/browser';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Song }from '../Model/song'; 
import { Playlist } from '../Model/playlist';


@Injectable()
export class YoutubeService {
    constructor () {}
    public player:YT.Player;
    public state:number;
    currentPlaylist:Array < Song >  = [];
    currentSong: Song;
    private _stateSource = new BehaviorSubject<number>(-1);
    state$ = this._stateSource.asObservable();

      setupPlayer() {
          window['onYouTubeIframeAPIReady'] = () =>  {if (window['YT']) {
        this.player = this.createPlayer(() =>  {}); 
        }}; 
        if (window.YT && window.YT.Player) {
        this.player = this.createPlayer(() =>  {}); 
        }
        this.player.addEventListener('onStateChange', e => this.onStateChanged(e)); 
        }
        createPlayer (callback) {
         return new window.YT.Player('player',  {
        height: '100%', 
        width:'100%', 
        videoId:'', 
        playerVars: {
            'modestbranding':1, 
            'autoplay':0, 
            'controls':0, 
            'rel':0, 
            'showinfo':0
        }
    }); 
    }
    playSong(song_url:string) {
        this.player.loadVideoById(song_url, 0, "highres"); 
    }
    onStateChanged(event) {
            this._stateSource.next(event.data);
    }
    togglePlay(){
        this.state = this.player.getPlayerState();
        if (this.state === 1){
            this.player.pauseVideo();
        }
        else{
            this.player.playVideo();
        }
    }
    nextSong(){
        
    }
}