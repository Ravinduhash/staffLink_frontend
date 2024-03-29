document.addEventListener("DOMContentLoaded", function () {
    let passengerEmail = "passenger@gmail.com";
    let vehicleNo = "CBA7357";

    const form = document.querySelector("form");

    let data = { vehicleNo: vehicleNo, passengerEmail: passengerEmail };

    fetch('http://localhost:8080/try2_war_exploded/getRequest',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                form.querySelector(".id").value = data.Request.id;
                form.querySelector(".vehicleNo").value = data.Request.vehicleNo;
                // form.querySelector(".model").value = data.Request.model;
                // form.querySelector(".type").value = data.Request.type;
                form.querySelector(".passengerEmail").value = data.Request.passengerEmail;
                form.querySelector(".amount").value = data.Request.amount;
                form.querySelector(".startingDate").value = data.Request.startingDate;
                form.querySelector(".endingDate").value = data.Request.endingDate;
                form.querySelector(".status").value = data.Request.status;
                fetch('http://localhost:8080/try2_war_exploded/getVehicle?vehicleNo='+data.Request.vehicleNo,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        form.querySelector(".model").value = data.vehicle.model;
                        form.querySelector(".type").value = data.vehicle.type;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });


function updatefunction(){
    const form = document.querySelector("form");
    let data = { 
        id: form.querySelector(".id").value, 
        vehicleNo: form.querySelector(".vehicleNo").value, 
        passengerEmail: form.querySelector(".passengerEmail").value, 
        amount: form.querySelector(".amount").value, 
        startingDate: form.querySelector(".startingDate").value, 
        endingDate: form.querySelector(".endingDate").value, 
        status: form.querySelector(".status").value };

    fetch('http://localhost:8080/try2_war_exploded/requestEdit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message === "Update successfully") {
                Swal.fire({
                    title: "Updated Successfully!",
                    icon: "success"
                }).then(()=>
                window.location.href = "./index.html"
                )
                // window.location.href = "./index.html";
            } else {
                Swal.fire({
                    title: "Update Failed!",
                    icon: "error"
                })
                .then(()=>
                window.location.href = "./index.html"
                )
                // alert("Request update failed");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}