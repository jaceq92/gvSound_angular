import {Component, Output, EventEmitter }from '@angular/core'; 
import {bootstrap }from '@angular/platform-browser-dynamic'; 
import {YoutubeService }from '../Services/youtube.service'; 
import {Subscription}from 'rxjs/Subscription'; 

@Component( {
  selector:'media-control', 
  templateUrl:'app/Components/media_control.component.html', 
  styleUrls:['app/Components/media_control.component.css'],
  outputs:['isHidden']
})
export class MediaControlComponent {
  componentName:'MediaControlComponent'; 
  state:number; 
  subscription: Subscription; 
  playButtonToggle:string;
  isHidden:EventEmitter < boolean >  = new EventEmitter < boolean > ();
  _isHidden: boolean = true;

  constructor(private youtubeService:YoutubeService) {
     this.subscription = this.youtubeService.state$.subscribe(
      state =>  {this.state = state; 
                if (state == 1) {
                  this.playButtonToggle = "pause_circle_outline"; }
                else {
                  this.playButtonToggle = "play_circle_outline"; }
                }); 
  }
  ngOnLoaded(){
    this.isHidden.emit(this._isHidden);
  }
  togglePlay() {
    this.youtubeService.togglePlay(); 
  }
  nextSong(){

  }
  previousSong(){

  }
  togglePlayer(){
    if (this._isHidden == true){
      this._isHidden = false
      this.isHidden.emit(this._isHidden);
    }
    else{
      this._isHidden = true;
      this.isHidden.emit(this._isHidden);
    }
  }
}
