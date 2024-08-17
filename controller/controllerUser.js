import { UserModel } from "../model/modelUser.js";

export class ControllerUser{
    constructor(){
        this.user ={}
        this.userModel = new UserModel();
    }

    createUser(){
        this.user = {
            fullName: $('#fullName').val(),
            email: $('#emailS').val(),
            password: $('#passwordS').val(),
            rol: $('.rol').val()
        };
        
        this.userModel.saveToLocalStorage(this.user);
    };

    getUsers(){
        return this.userModel.getFromLocalStorage();
    }

    deleteAllUsers(){
        this.userModel.clearLocalStorage();
    }
    
    // loginUser(){
        
    // }

}



