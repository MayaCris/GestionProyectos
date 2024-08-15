import { ControllerUser } from "./controller/controllerUser";


var $loginMsg = $('.loginMsg'),
  $login = $('.login'),
  $signupMsg = $('.signupMsg'),
  $signup = $('.signup'),
  $frontbox = $('.frontbox');

$('#signup').on('click', ControllerUser.createUser);
$('#login').on('click', ControllerUser.loginUser);


  let $inputs = $('input');

$('#switch1').on('click', function() {
  $loginMsg.toggleClass("visibility");
  $frontbox.addClass("moving");
  $signupMsg.toggleClass("visibility");

  $signup.toggleClass('hide');
  $login.toggleClass('hide');
})

$('#switch2').on('click', function() {
  $loginMsg.toggleClass("visibility");
  $frontbox.removeClass("moving");
  $signupMsg.toggleClass("visibility");

  $signup.toggleClass('hide');
  $login.toggleClass('hide');
})

const emailRegexRFC5322 = /^(?:(?:[a-zA-Z0-9_'^&amp;/+-])+(?:\.(?:[a-zA-Z0-9_'^&amp;/+-])+)*|"(?:(?:(?:\\[^\r\n]|[^\\"])*))")@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\]))$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
const fullNameRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:['-]?[A-Za-záéíóúñ]+)?\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:['-]?[A-Za-záéíóúñ]+)?$/;



$inputs.on('keyup', validateForm);

function validateForm(e){
    console.log(e)
    
    switch(e.target.name){
        case "email":
            if(emailRegexRFC5322.test($(e.target).val())){
                console.log("email valido");
                $('.email').removeClass('no-cumple').addClass('cumple');
            }else if($(e.target).val() == ""){
                console.log("email vacio");
                $('.email').removeClass('cumple').removeClass('no-cumple');
            }else {
                console.log("email invalido");
                $('.email').removeClass('cumple').addClass('no-cumple');
            }
            break;
        case "password":
            if(passwordRegex.test($(e.target).val())){
                console.log("password valido");
                $('.password').removeClass('no-cumple').addClass('cumple');
            } else if($(e.target).val() == ""){
                console.log("password vacio");
                $('.password').removeClass('cumple').removeClass('no-cumple');
            }else {
                console.log("password invalido");
                $('.password').removeClass('cumple').addClass('no-cumple');
                $('#login').prop('disabled', true);
            }
            break;
        case "fullName":
            if(fullNameRegex.test($(e.target).val())){
                console.log("nombre valido");
                $('#fullName').removeClass('no-cumple').addClass('cumple');
            } else if($(e.target).val() == ""){
                console.log("nombre vacio");
                $('#fullName').removeClass('cumple').removeClass('no-cumple');
            }else {
                console.log("nombre invalido");
            $('#fullName').removeClass('cumple').addClass('no-cumple');
            }
            break;
        case "rol":
            if($(e.target).val() == "Developer" || $(e.target).val() == "Project manager"){
                console.log("rol valido");
                $('.rol').removeClass('no-cumple').addClass('cumple');
            }else {
                console.log("rol invalido");
                $('.rol').removeClass('cumple').addClass('no-cumple');
            }
    }
}
