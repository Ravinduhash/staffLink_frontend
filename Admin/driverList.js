document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
  
    let row ="";

    fetch('http://localhost:8080/try2_war_exploded/viewAllDriver',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(driver => {
                row += `<tr>
                        <td scope="email">`+ driver.email +`</td>
                        <td class="Name">`+ driver.name +`</td>
                        <td class="NIC">`+ driver.NIC +`</td>
                        <td class="age">`+ driver.age +`</td>
                        <td class="contact">`+ driver.contact +`</td>
                        <td class="ownerEmail">`+ driver.ownerEmail +`</td>
                        
                        <td class="Action">
                            <a href="#moredetails"><button class="moredetails">MORE</button></a>
                            <a href="editDriver.html?email=`+ driver.email +`" onclick="updatefunction(driver.email, driver.name, driver.NIC, driver.age, driver.contact, driver.ownerEmail)"><button class="edit">EDIT</button></a>
                            <a href="deleteDriver.html?email=`+ driver.email +`" onclick=""><button class="delete">DELETE</button></a>
                        </td>
                    </tr>`
                });

                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });


function AddDriver() {
    window.location.href = "./addDriver.html";
}

//   function updatefunction(vehicleNo){
//         window.location.href = "http://localhost:5501/Owner/editVehical.html?vehicleNo="+vehicleNo;
//   }
  







// function fetchAllData() {
//     fetch('http://localhost:15000/ecoswapperbackend_war/admin/centers', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 console.error('Error:', response.status);
//             }
//         })
//         .then(data => {
//             displayDataAsTable(data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }


// fetchAllData();

// function displayDataAsTable(data) {
//     const tableBody = document.querySelector("#dataTable tbody");

//     data.forEach(center => {
//         const row = document.createElement("tr");

//         row.innerHTML = `
//             <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
//             <td>${center.center_id}</td>
//             <td>${center.business_name}</td>
//             <td>${center.business_reg_no}</td>
//             <td>${center.business_type}</td>
//             <td>${center.center_bio}</td>
//             <td>${center.center_location_link}</td>
//             <td>
//                 <span class="icon-container">
//                     <i class="fas fa-pencil-alt" style="color: #ff0202"></i>
//                 </span>
//                 <span class="icon-container" style="margin-left: 10px;"> <!-- Adjust the margin as needed -->
//                     <i class="fas fa-trash-alt" style="color: #ff0202"></i>
//                 </span>
//             </td>
//         `;

//         tableBody.appendChild(row);
//     });
// }