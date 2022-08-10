function fillCustomer()
{
    var cus = localStorage.getItem("cmCus");

    fetch(`http://localhost:8080/getCustomer/${cus}`)
    .then(res => {
        return res.json();
    }).then(data => {
        document.getElementById("cusName").value = data.customerName;
        document.getElementById("contName").value = data.contactName;
        document.getElementById("contInfo").value = data.contactInfo;
        document.getElementById("description").value = data.description;
    });
}

function cancel()
{
    localStorage.removeItem("cmCus");
    window.location.replace("http://localhost:5500/index.html");
}


function updateCustomer()
{
    var cus = localStorage.getItem("cmCus");
    fetch('http://localhost:8080/updateCustomer', {
            method: 'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'customerName': document.getElementById("cusName").value,
                'contactName': document.getElementById("contName").value,
                'contactInfo': document.getElementById("contInfo").value,
                'description': document.getElementById("description").value,
                'cid': cus
            })}) 
            .then(res => {
                if (res.status == 200)
                {
                    localStorage.removeItem("cmCus");
                    alert("Update was Succesful");
                    window.location.replace("http://localhost:5500/index.html");
                }
                else
                { 
                    alert("Something went wrong");
                }
            });

}