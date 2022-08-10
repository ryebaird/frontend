
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


function filter(){
    console.log(document.getElementById("search").value)
  
   
        fetch('http://localhost:8080/filter', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({'filter': document.getElementById("search").value,})
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            var htm = `<table id = "table" style="align-items: center;justify-content: center; width:100%;height:50px; background-color: #bbb;stroke: #eee; ">
    <tbody>
        <tr style="width:5%;border-bottom:2px solid black;">
            <td style="width:15%; border-bottom:2px solid black;"><b>Customer name</b></td>
            <td style="width:15%;border-bottom:2px solid black;"><b>Contact name</b></td>
            <td style="width:15%;border-bottom:2px solid black;"><b>Contact info</b></td>
            <td style="width:45%;border-bottom:2px solid black;"><b>Description</b></td>
            <td style="width:5%;border-bottom:2px solid black;"></td>
            <td style="width:5%;border-bottom:2px solid black;"></td>
        </tr>`
        data.forEach(element => {
            htm += `<tr><td>${element.customerName}</td>
            <td>${element.contactName}</td>
            <td>${element.contactInfo}</td>
            <td>${element.description}</td>
            <td><button onclick="updateCustomer(${element.cid})" style="width:100%;" >Update</button></td>
            <td><button onclick="deleteCustomer(${element.cid})" style="width:100%;" >Delete</button></td>`
        });
        htm += `</tbody></table>`;
        document.getElementById("main").innerHTML=htm;
        });
    
}

function updateCustomer(id){
    localStorage.setItem("cmCus", id);
    window.location.replace("http://localhost:5500/update.html");
    
}

function deleteCustomer(id)
{
        fetch(`http://localhost:8080/deleteCustomer/${id}`, {
            method: 'delete',
        }).then(res => {
            alert("Customer deleted succesfully");
            location.reload();
        });
}

function addCustomer(){
    window.location.replace("http://localhost:5500/add.html");
}

function authenticate()
{
    var sesKey = localStorage.getItem("cmSesKey");
    var sesUser = localStorage.getItem("cmSesUser");
    console.log(sesKey);
    console.log(sesUser);
    fetch('http://localhost:8080/authenticate', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            'sessionKey': sesKey,
            'email': sesUser})
        })
        .then(res => {
            if (res.status != 200)
                {
                   localStorage.removeItem("cmSesKey");
                    localStorage.removeItem("cmSesUser");
                    window.location.replace("http://localhost:5500/login.html");
                }
        })
        .catch(error => {
            console.log(error)
        });    
        console.log("Trying to fetch username")
        fetch(`http://localhost:8080/getUser/${localStorage.getItem("cmSesUser")}`)
       .then(res => {
        return res.json()})
        .then(data => {
            document.getElementById("user").textContent=data.name;
        });

        populateTable();
        
       

}

function logout() {

    fetch(`http://localhost:8080/logout/${localStorage.getItem("cmSesKey")}`);
        localStorage.removeItem("cmSesKey");
        localStorage.removeItem("cmSesUser");
        window.location.replace("http://localhost:5500/login.html");

    
}

function populateTable()
{
    fetch("http://localhost:8080/getAll")
    .then(res => {
        return res.json();
    })
    .then (data => {

    var htm = `<table style="align-items: center;justify-content: center; width:100%;height:50px; background-color: #bbb;stroke: #eee; ">
    <tbody>
        <tr style="width:5%;border-bottom:2px solid black;">
            <td style="width:15%; border-bottom:2px solid black;"><b>Customer name</b></td>
            <td style="width:15%;border-bottom:2px solid black;"><b>Contact name</b></td>
            <td style="width:15%;border-bottom:2px solid black;"><b>Contact info</b></td>
            <td style="width:45%;border-bottom:2px solid black;"><b>Description</b></td>
            <td style="width:5%;border-bottom:2px solid black;"></td>
            <td style="width:5%;border-bottom:2px solid black;"></td>
        </tr>`
        data.forEach(element => {
            htm += `<tr><td>${element.customerName}</td>
            <td>${element.contactName}</td>
            <td>${element.contactInfo}</td>
            <td>${element.description}</td>
            <td><button onclick="updateCustomer(${element.cid})" style="width:100%;" >Update</button></td>
            <td><button onclick="deleteCustomer(${element.cid})" style="width:100%;" >Delete</button></td>`
        });
        htm += `</tbody></table>`;
        document.getElementById("main").innerHTML=htm;
})
}