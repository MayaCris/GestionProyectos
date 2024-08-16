import { ControllerUser } from "./controller/controllerUser.js";
import { ValidationMessage } from "./helpers/ValidationMessage.js";


class Main {
    constructor() {
        this.$loginMsg = $('.loginMsg');
        this.$login = $('.login');
        this.$signupMsg = $('.signupMsg');
        this.$signup = $('.signup');
        this.$frontbox = $('.frontbox');
        this.$inputs = $('input');

        this.emailRegexRFC5322 = /^(?:(?:[a-zA-Z0-9_'^&amp;/+-])+(?:\.(?:[a-zA-Z0-9_'^&amp;/+-])+)*|"(?:(?:(?:\\[^\r\n]|[^\\"])*))")@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\]))$/;
        this.passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
        this.fullNameRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:['-]?[A-Za-záéíóúñ]+)?\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:['-]?[A-Za-záéíóúñ]+)?$/;

        this.bindEvents();
    }

    bindEvents() {
        $('#signup').on('click', () => {
            if(this.$inputs.hasClass('cumple')){
            controllerUser.createUser()}});
        $('#validateUsers').on('click', () => console.log(controllerUser.getUsers()));
        // $('#login').on('click', ControllerUser.loginUser);
        this.$inputs.on('keyup', (e) => this.validateForm(e));

        $('#switch1').on('click', () => this.switchToSignup());
        $('#switch2').on('click', () => this.switchToLogin());
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

    validateForm(e) {
        switch (e.target.name) {
            case "email":
                this.validateEmail(e.target);
                break;
            case "password":
                this.validatePassword(e.target);
                break;
            case "fullName":
                this.validateFullName(e.target);
                break;
            case "rol":
                this.validateRole(e.target);
                break;
        }
    }

    validateEmail(input) {
        if (this.emailRegexRFC5322.test($(input).val())) {
            console.log("email valido");
            $('.email').removeClass('no-cumple').addClass('cumple');
            $('#signup').prop('disabled', false).css('opacity', 1);
            $('#login').prop('disabled', false).css('opacity', 1);
            validationMessage.clearMessage(input);
        } else if ($(input).val() === "") {
            console.log("email vacio");
            $('.email').removeClass('cumple');
            $('#signup').prop('disabled', true).css('opacity', 0.5);
            $('#login').prop('disabled', true).css('opacity', 0.5);
            validationMessage.clearMessage(input);
        } else {
            console.log("email invalido");
            $('.email').removeClass('cumple').addClass('no-cumple');
            $('#signup').prop('disabled', true).css('opacity', 0.5);
            $('#login').prop('disabled', true).css('opacity', 0.5);
            validationMessage.showMessage(input, "Ingresa un email válido");
        }
    }

    validatePassword(input) {
        if (this.passwordRegex.test($(input).val())) {
            console.log("password valido");
            $('.password').removeClass('no-cumple').addClass('cumple');
            $('#signup').prop('disabled', false).css('opacity', 1);
            $('#login').prop('disabled', false).css('opacity', 1);
            validationMessage.clearMessage(input);
        } else if ($(input).val() === "") {
            console.log("password vacio");
            $('.password').removeClass('cumple');
            $('#signup').prop('disabled', true).css('opacity', 0.5);
            $('#login').prop('disabled', true).css('opacity', 0.5);
            validationMessage.clearMessage(input);
        } else {
            console.log("password invalido");
            $('.password').removeClass('cumple').addClass('no-cumple');
            $('#signup').prop('disabled', true).css('opacity', 0.5);
            $('#login').prop('disabled', true).css('opacity', 0.5);
            validationMessage.showMessage(input, "La contraseña debe contener al menos 5 caracteres, una mayúscula y un número");

        }
    }

    validateFullName(input) {
        if (this.fullNameRegex.test($(input).val())) {
            console.log("nombre valido");
            $('#fullName').removeClass('no-cumple').addClass('cumple');
            validationMessage.clearMessage(input);
        } else if ($(input).val() === "") {
            console.log("nombre vacio");
            $('#fullName').removeClass('cumple');
            validationMessage.clearMessage(input);
        } else {
            console.log("nombre invalido");
            $('#fullName').removeClass('cumple').addClass('no-cumple');
            validationMessage.showMessage(input, "Ingresa un nombre y apellido");
        }
    }

    validateRole(input) {
        if ($(input).val() === "Developer" || $(input).val() === "Project manager") {
            console.log("rol valido");
            $('.rol').removeClass('no-cumple').addClass('cumple');
        } else {
            console.log("rol invalido");
            $('.rol').removeClass('cumple').addClass('no-cumple');
            $('#signup').prop('disabled', true).css('opacity', 0.5);

        }
    }
}

// Instancia de la clase
const controllerUser = new ControllerUser();
const validationMessage = new ValidationMessage();
const main = new Main();