var $loginMsg = $('.loginMsg'),
  $login = $('.login'),
  $signupMsg = $('.signupMsg'),
  $signup = $('.signup'),
  $frontbox = $('.frontbox');

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


$inputs.on('keyup', validateForm);

function validateForm(){
    switch(e.target.name){
        case "email":
            if(emailRegexRFC5322.test($(e.target).val())){
                console.log("email valido");
                $('#emailL').removeClass('no-cumple').addClass('cumple');
            } else {
                console.log("email invalido");
                $('#emailL').removeClass('cumple').addClass('no-cumple');
            }
            break;
        case "password":
            if(passwordRegex.test($(e.target).val())){
                console.log("password valido");
                $('#passwordL').removeClass('no-cumple').addClass('cumple');
            }else {
                console.log("password invalido");
                $('#passwordL').removeClass('cumple').addClass('no-cumple');
                $('#login').prop('disabled', true);
            }
    }
}
