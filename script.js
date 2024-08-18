import { ControllerUser } from "./controller/controllerUser.js";


class Main {
    constructor() {
        this.$loginMsg = $('.loginMsg');
        this.$login = $('.login');
        this.$signupMsg = $('.signupMsg');
        this.$signup = $('.signup');
        this.$frontbox = $('.frontbox');
        this.$inputs = $('input');

        this.controllerUser = new ControllerUser();

        this.emailRegex = /^(?:(?:[a-zA-Z0-9_'^&amp;/+-])+(?:\.(?:[a-zA-Z0-9_'^&amp;/+-])+)*|"(?:(?:(?:\\[^\r\n]|[^\\"])*))")@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\]))$/;
        this.passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
        this.fullNameRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:['-]?[A-Za-záéíóúñ]+)?\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:['-]?[A-Za-záéíóúñ]+)?$/;

        this.bindEvents();
    }

    bindEvents() {
        $('#switch1').on('click', () => this.switchToSignup());
        $('#switch2').on('click', () => this.switchToLogin());

        $('#formLogin input').on('input', () => this.validateLoginForm());
        $('#formRegister input').on('input', () => this.validateRegisterForm());



        $('#signup').on('click', () => this.controllerUser.createUser());
        $('#validateUsers').on('click', () => console.log(this.controllerUser.getUsers())); //Boton para validar usuarios registrados
        $('#validateUsers').on('click', () => console.log(this.controllerUser.getSession())); //Boton para validar usuarios registrados
        $('#deleteUsers').on('click', () => console.log(this.controllerUser.deleteAllUsers())); //Boton para borrar todos los usuarios registrados
        $('#login').on('click', () => {this.controllerUser.loginUser()});

    }


    switchToSignup() {
        this.$loginMsg.toggleClass("visibility");
        this.$frontbox.addClass("moving");
        this.$signupMsg.toggleClass("visibility");
        this.$signup.toggleClass('hide');
        this.$login.toggleClass('hide');
    }

    switchToLogin() {
        this.$loginMsg.toggleClass("visibility");
        this.$frontbox.removeClass("moving");
        this.$signupMsg.toggleClass("visibility");
        this.$signup.toggleClass('hide');
        this.$login.toggleClass('hide');
    }


    validateLoginForm() {
        const emailValid = this.validateEmail($('#emailL'));
        const passwordValid = this.validatePassword($('#passwordL'));

        this.toggleButtonState($('#login'), emailValid && passwordValid);
    }

    validateRegisterForm() {
        const fullNameValid = this.validateFullName($('#fullName'));
        const emailValid = this.validateEmail($('#emailS'));
        const passwordValid = this.validatePassword($('#passwordS'));
        const roleValid = this.validateRole($('.rol'));
        this.toggleButtonState($('#signup'), fullNameValid && emailValid && passwordValid && roleValid);
    }

    validateEmail($input) {
        const value = $input.val();
        if (this.emailRegex.test(value)) {
            this.markAsValid($input);
            return true;
        } else {
            this.markAsInvalid($input);
            return false;
        }
    }

    validatePassword($input) {
        const value = $input.val();
        if (this.passwordRegex.test(value)) {
            this.markAsValid($input);
            return true;
        } else {
            this.markAsInvalid($input);
            return false;
        }
    }

    validateFullName($input) {
        const value = $input.val();
        if (this.fullNameRegex.test(value)) {
            this.markAsValid($input);
            return true;
        } else {
            this.markAsInvalid($input);
            return false;
        }
    }

    validateRole($input) {
        const value = $input.val();
        if (value === "Developer" || value === "Project manager") {
            this.markAsValid($input);
            return true;
        } else {
            this.markAsInvalid($input);
            return false;
        }
    }

    
    toggleButtonState($button, isValid) {
        $button.prop('disabled', !isValid).css('opacity', isValid ? 1 : 0.5);
    }

    markAsValid($input) {
        $input.removeClass('no-cumple').addClass('cumple');
    }

    markAsInvalid($input) {
        $input.removeClass('cumple').addClass('no-cumple');
    }

}

$(document).ready(() => new Main());


