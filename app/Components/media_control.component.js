"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var youtube_service_1 = require('../Services/youtube.service');
var soundcloud_service_1 = require('../Services/soundcloud.service');
var data_service_1 = require('../Services/data.service');
var MediaControlComponent = (function () {
    function MediaControlComponent(youtubeService, dataService, soundCloudService) {
        var _this = this;
        this.youtubeService = youtubeService;
        this.dataService = dataService;
        this.soundCloudService = soundCloudService;
        this.isHidden = new core_1.EventEmitter();
        this._isHidden = true;
        this.youtubeService.state$.subscribe(function (state) {
            _this.youtubeState = state;
            if (state == 1 || _this.soundcloudState == 1) {
                _this.playButtonToggle = "pause_circle_outline";
            }
            else {
                _this.playButtonToggle = "play_circle_outline";
            }
        });
        this.soundCloudService.scPlayerState$.subscribe(function (scPlayerState) {
            _this.soundcloudState = scPlayerState;
            if (_this.youtubeState == 1 || _this.soundcloudState == 1) {
                _this.playButtonToggle = "pause_circle_outline";
            }
            else {
                _this.playButtonToggle = "play_circle_outline";
            }
        });
        this.dataService.currentSong$.subscribe(function (currentSong) { _this.currentSong = currentSong; });
        this.dataService.playingPlaylist$.subscribe(function (playingPlaylist) { _this.playingPlaylist = playingPlaylist; });
    }
    MediaControlComponent.prototype.ngOnLoaded = function () {
        this.isHidden.emit(this._isHidden);
    };
    MediaControlComponent.prototype.togglePlay = function () {
        if (this.currentSong.source == "youtube") {
            this.youtubeService.togglePlay();
        }
        if (this.currentSong.source == "soundcloud") {
            this.soundCloudService.togglePlay();
        }
    };
    MediaControlComponent.prototype.nextSong = function () {
        if (this.playingPlaylist == undefined) {
            return;
        }
        this.indexOfNext = this.playingPlaylist.songs.indexOf(this.currentSong) + 1;
        if (this.indexOfNext >= this.playingPlaylist.songs.length) {
            this.indexOfNext = 0;
        }
        if (this.playingPlaylist.songs[this.indexOfNext].source == 'youtube') {
            this.youtubeService.playSong(this.playingPlaylist.songs[this.indexOfNext].song_url);
            if (this.soundCloudService.scPlayer != undefined) {
                this.soundCloudService.pause();
            }
        }
        else {
            this.soundCloudService.playNewSong(this.playingPlaylist.songs[this.indexOfNext]);
            this.youtubeService.stopSong();
        }
        this.dataService.announceCurrentSong(this.playingPlaylist.songs[this.indexOfNext]);
    };
    MediaControlComponent.prototype.previousSong = function () {
        if (this.playingPlaylist == undefined) {
            return;
        }
        this.indexOfNext = this.playingPlaylist.songs.indexOf(this.currentSong) - 1;
        if (this.indexOfNext < 0) {
            this.indexOfNext = 0;
        }
        if (this.playingPlaylist.songs[this.indexOfNext].source == 'youtube') {
            this.youtubeService.playSong(this.playingPlaylist.songs[this.indexOfNext].song_url);
            if (this.soundCloudService.scPlayer != undefined) {
                this.soundCloudService.pause();
            }
        }
        else {
            this.soundCloudService.playNewSong(this.playingPlaylist.songs[this.indexOfNext]);
            this.youtubeService.stopSong();
        }
        this.dataService.announceCurrentSong(this.playingPlaylist.songs[this.indexOfNext]);
    };
    MediaControlComponent.prototype.togglePlayer = function () {
        if (this._isHidden == true) {
            this._isHidden = false;
            this.isHidden.emit(this._isHidden);
        }
        else {
            this._isHidden = true;
            this.isHidden.emit(this._isHidden);
        }
    };
    MediaControlComponent.prototype.openSoundCloud = function () {
        window.open("https://www.soundcloud.com");
    };
    MediaControlComponent.prototype.openYoutube = function () {
        window.open("https://www.youtube.com");
    };
    MediaControlComponent = __decorate([
        core_1.Component({
            selector: 'media-control',
            templateUrl: 'app/Components/media_control.component.html',
            styleUrls: ['app/Components/media_control.component.css'],
            outputs: ['isHidden']
        }), 
        __metadata('design:paramtypes', [youtube_service_1.YoutubeService, data_service_1.DataService, soundcloud_service_1.SoundCloudService])
    ], MediaControlComponent);
    return MediaControlComponent;
}());
exports.MediaControlComponent = MediaControlComponent;
//# sourceMappingURL=media_control.component.js.map