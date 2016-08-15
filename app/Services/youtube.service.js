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
/// <reference path="../../typings/globals/youtube/index.d.ts" />
var core_1 = require('@angular/core');
var browser_1 = require('@angular/platform-browser/src/facade/browser');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var YoutubeService = (function () {
    function YoutubeService() {
        this.currentPlaylist = [];
        this._stateSource = new BehaviorSubject_1.BehaviorSubject(-1);
        this.state$ = this._stateSource.asObservable();
    }
    YoutubeService.prototype.setupPlayer = function () {
        var _this = this;
        browser_1.window['onYouTubeIframeAPIReady'] = function () {
            if (browser_1.window['YT']) {
                _this.player = _this.createPlayer(function () { });
            }
        };
        if (browser_1.window.YT && browser_1.window.YT.Player) {
            this.player = this.createPlayer(function () { });
        }
        this.player.addEventListener('onStateChange', function (e) { return _this.onStateChanged(e); });
    };
    YoutubeService.prototype.createPlayer = function (callback) {
        return new browser_1.window.YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: 'TlZgiK6FiO0',
            playerVars: {
                'modestbranding': 1,
                'autoplay': 0,
                'controls': 0,
                'rel': 0,
                'showinfo': 0
            }
        });
    };
    YoutubeService.prototype.playSong = function (song_url) {
        this.player.loadVideoById(song_url);
    };
    YoutubeService.prototype.onStateChanged = function (event) {
        this._stateSource.next(event.data);
    };
    YoutubeService.prototype.togglePlay = function () {
        this.state = this.player.getPlayerState();
        if (this.state === 1) {
            this.player.pauseVideo();
        }
        else {
            this.player.playVideo();
        }
    };
    YoutubeService.prototype.nextSong = function () {
    };
    YoutubeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], YoutubeService);
    return YoutubeService;
}());
exports.YoutubeService = YoutubeService;
//# sourceMappingURL=youtube.service.js.map