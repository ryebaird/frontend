function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


function authAndRedirect(){

    let emailPattern = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let passwordPattern = new RegExp('(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}');
    console.log(emailPattern.test(document.getElementById("email").value));
    console.log()
    if (emailPattern.test(document.getElementById("email").value) && passwordPattern.test(document.getElementById("password").value))
    {
        fetch('http://localhost:7001/customermanagement-0.0.1-SNAPSHOT/login', {
            method: 'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'email': document.getElementById("email").value,
                'password': document.getElementById("password").value})
            })
            .then(res => {
                return res.json();
            })
            .then(data => {    
                if (data.status == 200)
                {   
                    localStorage.setItem("cmSesKey", data.key);
                    localStorage.setItem("cmSesUser", document.getElementById("email").value);
                    sleep(500);
                    window.location.replace("http://localhost:5500/index.html");
                }

            })
            .catch(error => {
                console.log(error);
            });     
    }
    else{ 
        if (!emailPattern.test(document.getElementById("email").value))
        {
            document.getElementById("emailfail").textContent = "Email field must match a standard email format";
        }
        if (!passwordPattern.test(document.getElementById("password").value))
        {
            document.getElementById("passfail").textContent = "Password must be 8 characters long and contain at least one number";
        }
    }

}
