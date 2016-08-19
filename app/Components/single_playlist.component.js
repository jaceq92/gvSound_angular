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
var playlist_service_1 = require('../Services/playlist.service');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var youtube_service_1 = require('../Services/youtube.service');
var data_service_1 = require('../Services/data.service');
var ng2_toasty_1 = require('ng2-toasty/ng2-toasty');
var angular2_contextmenu_1 = require('angular2-contextmenu/angular2-contextmenu');
var PlaylistComponent = (function () {
    function PlaylistComponent(playlistService, contextMenuService, dataService, toastyService, youtubeService) {
        var _this = this;
        this.playlistService = playlistService;
        this.contextMenuService = contextMenuService;
        this.dataService = dataService;
        this.toastyService = toastyService;
        this.youtubeService = youtubeService;
        this.playlist = [];
        this.youtubeService.state$.subscribe(function (state) {
            _this.state = state;
            if (state == 0) {
                _this.indexOfNextSong = _this.playingPlaylist.songs.indexOf(_this.selectedSong) + 1;
                _this.youtubeService.playSong(_this.playingPlaylist.songs[_this.indexOfNextSong].song_url);
                _this.selectedSong = _this.playingPlaylist.songs[_this.indexOfNextSong];
            }
        });
        this.dataService.currentSong$.subscribe(function (currentSong) { _this.selectedSong = currentSong; });
        this.dataService.playingPlaylist$.subscribe(function (playingPlaylist) { _this.playingPlaylist = playingPlaylist; });
        this.dataService.selectedPlaylist$.subscribe(function (selectedPlaylist) {
            _this.selectedPlaylist = selectedPlaylist;
            _this.getPlaylist(_this.selectedPlaylist.playlist_id);
        });
    }
    PlaylistComponent.prototype.addToast = function (type, title, message) {
        var toastOptions = {
            title: title,
            msg: message,
            showClose: false,
            timeout: 5000,
            theme: 'material' };
        if (type == "success") {
            this.toastyService.success(toastOptions);
        }
        if (type == "error") {
            this.toastyService.error(toastOptions);
        }
    };
    PlaylistComponent.prototype.onSelect = function (song) {
        this.selectedSong = song;
        this.youtubeService.playSong(this.selectedSong.song_url);
        this.dataService.announceCurrentSong(this.selectedSong);
        this.dataService.announcePlayingPlaylist(this.selectedPlaylist);
    };
    PlaylistComponent.prototype.ngOnChanges = function (changes) {
        if (changes['playerHidden'] != undefined) {
            this.playerHidden = changes['playerHidden'].currentValue;
            if (this.playerHidden == true) {
                this.height = "75vh";
            }
            else {
                this.height = "35vh";
            }
        }
    };
    PlaylistComponent.prototype.getPlaylist = function (id) {
        var _this = this;
        this.playlistService.getPlaylist(id).subscribe(function (playlist) {
            if (_this.selectedPlaylist != undefined) {
                _this.selectedPlaylist.songs = playlist;
                _this.playlist = _this.selectedPlaylist.songs;
            }
        });
    };
    PlaylistComponent.prototype.deleteSong = function (song) {
        var _this = this;
        this.playlistService.deleteSong(song.id).then(function (res) {
            _this.addToast("success", "Song deleted", song.song_artist + " - " + song.song_name);
            _this.playlist.splice(_this.playlist.indexOf(song), 1);
        }, function (error) { _this.addToast("error", "Error", "Song deletation failed, try again"); });
    };
    PlaylistComponent.prototype.onContextMenu = function ($event, item) {
        var _this = this;
        this.contextMenuService.show.next({
            actions: [
                {
                    html: function () { return "Delete " + item.song_artist + " - " + item.song_name; },
                    click: function (item) {
                        if (item.username == "JSK") {
                            _this.deleteSong(item);
                        }
                        else {
                            _this.addToast("error", "Error", "Delete denied");
                        }
                    } },
            ],
            event: $event,
            item: item,
        });
        $event.preventDefault();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PlaylistComponent.prototype, "playerHidden", void 0);
    PlaylistComponent = __decorate([
        core_1.Component({
            selector: 'single-playlist',
            templateUrl: 'app/Components/single_playlist.component.html',
            styleUrls: ['app/Components/single_playlist.component.css'],
            directives: [ng2_dnd_1.DND_DIRECTIVES, ng2_toasty_1.Toasty, angular2_contextmenu_1.ContextMenuComponent],
            providers: [playlist_service_1.PlaylistService, ng2_dnd_1.DND_PROVIDERS, angular2_contextmenu_1.ContextMenuService],
        }), 
        __metadata('design:paramtypes', [playlist_service_1.PlaylistService, angular2_contextmenu_1.ContextMenuService, data_service_1.DataService, ng2_toasty_1.ToastyService, youtube_service_1.YoutubeService])
    ], PlaylistComponent);
    return PlaylistComponent;
}());
exports.PlaylistComponent = PlaylistComponent;
//# sourceMappingURL=single_playlist.component.js.map