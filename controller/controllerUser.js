import { UserModel } from "../model/modelUser";

export class ControllerUser{
    constructor(){
        this.user ={}
        this.userModel = new UserModel();
    }

    createUser(userData){
        this.user = userData;
        this.userModel.saveToLocalStorage(this.user);
        
    }

    userData = function(){
        var $fullNameRegistration = $('#fullName'),
            $emailRegistration = $('#emailS'),
            $passwordRegistration = $('#passwordS'),
            $rolRegistration = $('.rol');
        
    }
    
    loginUser(){
        
    }



}

console.log(userData)