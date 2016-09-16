/// <reference path="../../typings/globals/youtube/index.d.ts" />
import { Injectable }     from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Playlist, Song } from '../Model/playlist';

@Injectable()
export class YoutubeService {
    constructor () {}
    public player:YT.Player;

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
    stopSong(){
        this.player.stopVideo();
    }
    togglePlay(){
        if (this.player.getPlayerState() === 1){
            this.player.pauseVideo();
        }
        else{
            this.player.playVideo();
        }
    }
}