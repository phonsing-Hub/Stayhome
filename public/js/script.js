function togglePasswordIn(){
    var checkboxIn = document.getElementById("gridCheckIn");
    var passwordInputIn = document.getElementById('inputPasswordIn');
    passwordInputIn.type = checkboxIn.checked ? "text" : "password";
}

function togglePasswordUp(){
    var checkboxUp = document.getElementById("gridCheckUp");
    var passwordInputUp1 = document.getElementById('inputPasswordUp1');
    var passwordInputUp2 = document.getElementById('inputPasswordUp2');
    passwordInputUp1.type = checkboxUp.checked ? "text" : "password";
    passwordInputUp2.type = checkboxUp.checked ? "text" : "password";
}

    var registerUp = document.getElementById("SignUp");
    var registerIn = document.getElementById("SignIn");
    const container = document.getElementById('table');

    const In = document.getElementById('in');
    const Up = document.getElementById('up');
   
    registerUp.addEventListener('click', () => {
        container.classList.add("active");
        In.classList.add("active");
        Up.classList.add("active");

    });
    
    registerIn.addEventListener('click', () => {
        container.classList.remove("active");
        In.classList.remove("active");
        Up.classList.remove("active");
    });