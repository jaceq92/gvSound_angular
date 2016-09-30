import {Component }from '@angular/core'; 
import { User }from '../Model/user'; 
import { DataService} from '../Services/data.service';

@Component( {
    selector:'register', 
    templateUrl:'app/Components/register.component.html', 
    styleUrls:['app/Components/register.component.css'],
})
export class RegisterComponent {
    componentName:'RegisterComponent';
    email: string;
    username: string;
    password: string;
    verifypassword: string;
    user: User;
    constructor(private dataService: DataService){
    }

    RegisterUser(){
        this.user = new User();
        if (this.password == this.verifypassword){
            this.user.username = this.username;
            this.user.password = this.password;
            if (this.password.length < 6){
                this.dataService.announceError("Password must be 6 or more characters long");
                return;
            }
            this.user.email = this.email;
            if (this.email.indexOf("@") == -1){
                this.dataService.announceError("Email address must contain @ character");
                return;
            }
            this.dataService.createUser(this.user);
        }
        else{
            this.dataService.announceError("Password must match!");
        }
    }
    CancelRegister(){
        this.dataService.announceRegister(false);
    }
}