import { Component, Input, ViewChild } from '@angular/core';
import { AddSongComponent } from '../Components/add_song.component';
import { DataService } from '../Services/data.service';
import { User } from '../Model/user';

@Component({
    selector: 'navigation-component',
  templateUrl: 'app/Components/navigation.component.html',
  styleUrls: ['app/Components/navigation.component.css'],
})
export class NavigationComponent {
      componentName:'NavigationComponent';
      @ViewChild(AddSongComponent) addSong: AddSongComponent;
      keyword = '';
      username = '';
      password = '';
      buttonText = '';
      user: User;
      result: String;
      showLogIn: boolean;

      constructor(private dataService: DataService ){
        this.dataService.user$.subscribe(
        user =>  { if (localStorage.getItem("token") != "dGVzdA==" ) {
                  this.buttonText = "Log Out";
                  this.showLogIn = false;
                  user = this.user;
                  }
                  else{
                  this.buttonText = "Log In";
                  this.showLogIn = true;
                  user = this.user;
                  }
        }); 
      }
      showAddSongModal(){
        if (this.keyword == undefined || this.keyword == ""){

        }
        else{
        this.addSong.showAddSongModal(this.keyword);
        }
      }

      ngOnInit(){
        this.user = new User();

        if (localStorage.getItem("token") != "dGVzdA=="){
            this.buttonText = "Log Out";
            this.showLogIn = false;
            this.user.username = localStorage.getItem("username");
        }
        else{
          this.buttonText = "Log In";
          this.showLogIn = true;
        }
      }

      logIn(){
        if (localStorage.getItem("token") != "dGVzdA=="){
          this.showLogIn = true;
          this.user.username = "test";
          this.user.password = "test";
          this.dataService.authUser(this.user);
        }
        else
        {
          this.user.username = this.username;
          this.user.password = this.password;
          this.dataService.authUser(this.user);
          this.username = "";
          this.password = "";
        }
      }
}