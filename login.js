function login() {

    let email = document.getElementById("e-mail").value.trim();
    let password = document.getElementById("password").value.trim();

    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("loginError").innerHTML = "";

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    if(email == ""){
        document.getElementById("emailError").innerHTML = "Email is required";
        valid = false;
    }
    else if(!emailPattern.test(email)){
        document.getElementById("emailError").innerHTML = "Enter valid email";
        valid = false;
    }

    if(password == ""){
        document.getElementById("passwordError").innerHTML = "Password is required";
        valid = false;
    }
    else if(password.length < 8){
        document.getElementById("passwordError").innerHTML = "Minimum 8 characters";
        valid = false;
    }

    if(!valid){
        return;
    }

    if(email == "admin@gmail.com" && password == "Admin@123"){
        window.location.href = "students.html";
    }
    else{
        document.getElementById("loginError").innerHTML = "Invalid Email or Password";
    }
}