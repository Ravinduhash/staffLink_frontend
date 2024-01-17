document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    sub = document.querySelector(".sub");
    const searchInput = document.querySelector("[vehicle-search]")
    
    let email = "rhatu2000@gmail.com"
    let data = { email: email };
    let row ="";
    let users = []

    

    fetch('http://localhost:8080/try2_war_exploded/getVehicleList',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data)})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(vehical => {
                row += `<div class="vehicle-card vehicle-card-blue" id="${vehical.vehicleNo}" style="--vehicle-card-color: #F5AF41;">
                <div class="vehicle-card-innerbox">
                    <img class="vehicle-card-img" src="../images/Bus/bus4.jpg" />
                    <div class="vehicle-card-textbox">
                        <div class="vehicle-card-title">`+ vehical.vehicleNo +`</div>
                        <div class="vehicle-card-subtitle">`+ vehical.type +`</div>
                        <div class="vehicle-card-bar"></div>
                        <div class="vehicle-card-description">
                            <b>Vehicle Brand : </b>`+ vehical.vehicleBrand +`<br>
                            <b>Vehicle Model : </b> `+ vehical.model +`<br>
                            <b>Vehicle Trips : </b> `+ vehical.trips +`<br>
                            <b>Vehicle Seat Count : </b>`+vehical.seatsCount+`<br>
                            <b>Vehicle Starting Point : </b> `+ vehical.startingPoint +`<br>
                            <b>Vehicle Ending Point : </b>`+vehical.endingPoint+`<br>
                            <div class="group">
                            <a href="#moredetails"><button class="moredetails">MORE</button></a>
                            <a href="Owner/editVehical.html?vehicleNo=`+ vehical.vehicleNo +`" onclick="updatefunction(vehical.ownerEmail,vehical.vehicleNo,vehical.regNo,vehical.vehicleBrand,vehical.type,vehical.driverEmail,vehical.seatsCount,vehical.trips,vehical.startingPoint,vehical.endingPoint)"><button class="edit">EDIT</button></a>
                            <a href="deleteVehicle.html?vehicleNo=`+ vehical.vehicleNo +`" onclick=""><button class="delete">DELETE</button></a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>`
                });

                users = data.list;

                document.querySelector(".vehicleSet").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });

            searchInput.addEventListener("input", e => {
                const value = e.target.value.toLowerCase()
                users.forEach(data => {
                  const isVisible =
                      data.vehicleNo.toLowerCase().includes(value) ||
                      data.type.toLowerCase().includes(value) ||
                      data.vehicleBrand.toLowerCase().includes(value) ||
                      data.model.toLowerCase().includes(value) ||
                      data.startingPoint.toLowerCase().includes(value) ||
                      data.endingPoint.toLowerCase().includes(value) ||
                      data.trips.toLowerCase().includes(value)
                  document.getElementById(data.vehicleNo).classList.toggle("hide", !isVisible)
                })
              })
    
  });
