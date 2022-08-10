function addCustomer(){
    fetch('http://localhost:8080/addNew', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'customerName': document.getElementById("cusName").value,
                'contactName': document.getElementById("contName").value,
                'contactInfo': document.getElementById("contInfo").value,
                'description': document.getElementById("description").value
            })}) 
            .then(res => {
                if (res.status == 200)
                {
                    alert("Customer added succesfully");
                    window.location.replace("http://localhost:5500/index.html");
                }
                else
                { 
                    alert("Something went wrong");
                }
            });
            
}

function cancel()
{
    window.location.replace("http://localhost:5500/index.html");
}
