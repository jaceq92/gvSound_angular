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
var playlist_1 = require('../Model/playlist');
var playlist_service_1 = require('../Services/playlist.service');
var data_service_1 = require('../Services/data.service');
var ng2_toasty_1 = require('ng2-toasty/ng2-toasty');
var AddPlaylistComponent = (function () {
    function AddPlaylistComponent(playlistService, dataService, toastyService) {
        var _this = this;
        this.playlistService = playlistService;
        this.dataService = dataService;
        this.toastyService = toastyService;
        this.playlists = [];
        this.dataService.playlists$.subscribe(function (playlists) { _this.playlists = playlists; });
    }
    AddPlaylistComponent.prototype.showAddPlaylistModal = function () {
        this.AddPlaylistModalIsVisible = true;
    };
    AddPlaylistComponent.prototype.hideAddPlaylistModal = function () {
        this.AddPlaylistModalIsVisible = false;
    };
    AddPlaylistComponent.prototype.addNewPlaylist = function (event) {
        var _this = this;
        event.preventDefault();
        this.newPlaylist = new playlist_1.Playlist();
        this.newPlaylist.playlist_name = this.playlistName;
        this.playlistService.insertPlaylist(this.newPlaylist, "JSK").then(function (res) {
            _this.newPlaylist = res;
            _this.addToast("success", "Playlist Added", _this.newPlaylist.playlist_name);
            _this.playlists.push(_this.newPlaylist);
            _this.dataService.announcePlaylists(_this.playlists);
            _this.hideAddPlaylistModal();
        }, function (error) { _this.addToast("error", "Error", "Something went wrong, try again!"); });
    };
    AddPlaylistComponent.prototype.addToast = function (type, title, message) {
        var toastOptions = {
            title: title,
            msg: message,
            showClose: false,
            timeout: 5000,
            theme: 'bootstrap'
        };
        if (type == "success") {
            this.toastyService.success(toastOptions);
        }
        if (type == "error") {
            this.toastyService.error(toastOptions);
        }
    };
    AddPlaylistComponent = __decorate([
        core_1.Component({
            selector: 'add-playlist-modal',
            templateUrl: 'app/Components/add_playlist.component.html',
            styleUrls: ['app/Components/add_playlist.component.css'],
            providers: [playlist_service_1.PlaylistService],
            directives: [ng2_toasty_1.Toasty]
        }), 
        __metadata('design:paramtypes', [playlist_service_1.PlaylistService, data_service_1.DataService, ng2_toasty_1.ToastyService])
    ], AddPlaylistComponent);
    return AddPlaylistComponent;
}());
exports.AddPlaylistComponent = AddPlaylistComponent;
//# sourceMappingURL=add_playlist.component.js.map