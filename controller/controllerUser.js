import { UserModel } from "../model/modelUser.js";

export class ControllerUser{
    constructor(){
        this.user ={}
        this.userModel = new UserModel();
    }

    createUser = function(){
        const userData = {
            fullName: $('#fullName').val(),
            email: $('#emailS').val(),
            password: $('#passwordS').val(),
            rol: $('.rol').val()
        };
        
        this.user = userData;
        console.log(this.user);
        this.userModel.saveToLocalStorage(this.user);
        console.log(this.userModel.getFromLocalStorage());
    };

    getUsers(){
        return this.userModel.getFromLocalStorage();
    }
    
    // loginUser(){
        
    // }

}



