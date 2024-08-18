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
        window.location.href = '../index.html';
    };

    getUsers(){
        return this.userModel.getFromLocalStorage();
    }
    getSession(){
        return this.userModel.getFromSessionStorage();
    }

    deleteAllUsers(){
        this.userModel.clearLocalStorage();
    }

    searchUser(){
        let email = $('#emailL').val();
        let password = $('#passwordL').val();
        let users = this.getUsers();
        if(!Array.isArray(users)){
            return false;
        }
        let authentication = users.some((user) => user.email === email && user.password === password);
        return authentication;
    }
    
    loginUser(){
        console.log(this.searchUser());
        if(this.searchUser()){
            let user = this.getUsers().find((user) => user.email === $('#emailL').val());
            console.log(user);
            this.userModel.saveToSessionStorage(user);
            window.location.href = './views/dashboard.html';
        }else{
            console.log('Usuario no autenticado');
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Validate your email or password",
              });
        }

    }
    checkAuthentication(){
        let auth = this.userModel.getFromSessionStorage() ? true : false;
        if(!auth){
            window.location.href = '../index.html';
        }    
    }

    logout(){
        Swal.fire({
            title: "Are you sure?",
            text: "You're going to log out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
          }).then((result) => {
            if (result.isConfirmed) {
                this.userModel.clearSessionStorage();
                setTimeout(() => {
                    window.location.href = '../index.html'; 
                },700);
            }
          }).catch((error) => {
            console.error("SweetAlert2 error: ", error); // Captura cualquier error con SweetAlert2
        });
    }

}

