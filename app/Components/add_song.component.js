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
var data_service_1 = require('../Services/data.service');
var AddSongComponent = (function () {
    function AddSongComponent(playlistService, dataService) {
        var _this = this;
        this.playlistService = playlistService;
        this.dataService = dataService;
        this.searchResults = [];
        this.playlists = [];
        this.dataService.currentPlaylist$.subscribe(function (currentPlaylist) { _this.currentPlaylist = currentPlaylist; });
    }
    AddSongComponent.prototype.onSelect = function (song) {
        this.selectedResult = song;
        if (this.selectedResult.title.includes("-")) {
            this.selectedResult.song_artist = this.selectedResult.title.substring(0, this.selectedResult.title.indexOf('-')).trim();
            this.selectedResult.song_name = this.selectedResult.title.substring(this.selectedResult.title.indexOf('-') + 1).trim();
        }
        else {
            this.selectedResult.song_artist = this.selectedResult.title.substring(0, this.selectedResult.title.indexOf(':')).trim();
            this.selectedResult.song_name = this.selectedResult.title.substring(this.selectedResult.title.indexOf(':') + 1).trim();
        }
    };
    AddSongComponent.prototype.showAddSongModal = function (keyword) {
        this.keyword = keyword;
        this.getSearchResults(keyword);
        this.getPlaylists();
        this.AddSongModalIsVisible = true;
    };
    AddSongComponent.prototype.hideAddSongModal = function () {
        this.AddSongModalIsVisible = false;
        this.selectedResult = undefined;
    };
    AddSongComponent.prototype.getSearchResults = function (keyword) {
        var _this = this;
        this.playlistService.getYoutubeSearchResults(keyword).subscribe(function (searchResults) { _this.searchResults = searchResults; });
    };
    AddSongComponent.prototype.getPlaylists = function () {
        var _this = this;
        this.playlistService.getPlaylists().subscribe(function (playlists) {
            _this.playlists = playlists;
            if (_this.currentPlaylist != undefined) {
                for (var i = 0; i < _this.playlists.length; i++) {
                    if (_this.playlists[i].playlist_id == _this.currentPlaylist.playlist_id) {
                        _this.selectedPlaylist = _this.playlists[i];
                    }
                }
            }
            else {
                _this.selectedPlaylist = _this.playlists[0];
            }
        });
    };
    AddSongComponent.prototype.insertSong = function (event) {
        var _this = this;
        event.preventDefault();
        this.playlistService.addSong(this.selectedResult, "JSK", this.selectedPlaylist.playlist_id).then(function (res) {
            if (_this.selectedPlaylist.playlist_id == _this.currentPlaylist.playlist_id) {
                _this.date = new Date();
                _this.selectedResult.song_added = _this.date;
                _this.currentPlaylist.songs.push(_this.selectedResult);
                _this.selectedResult = undefined;
            }
            else {
                _this.selectedResult = undefined;
            }
        });
    };
    AddSongComponent.prototype.playlistSelect = function (playlist) {
        this.selectedPlaylist = playlist;
    };
    AddSongComponent = __decorate([
        core_1.Component({
            selector: 'add-song-modal',
            templateUrl: 'app/Components/add_song.component.html',
            styleUrls: ['app/Components/add_song.component.css'],
            providers: [playlist_service_1.PlaylistService],
        }), 
        __metadata('design:paramtypes', [playlist_service_1.PlaylistService, data_service_1.DataService])
    ], AddSongComponent);
    return AddSongComponent;
}());
exports.AddSongComponent = AddSongComponent;
//# sourceMappingURL=add_song.component.js.map