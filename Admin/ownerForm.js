document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
     sub = document.querySelector(".sub");
  
    sub.addEventListener("click", () => {
    //   event.preventDefault(); // Prevent the default form submission
        console.log("form submitted");
      // Get form elements
      const email = form.querySelector('.email').value;
      const name = form.querySelector('.name').value;
      const NIC = form.querySelector('.NIC').value;
      const contact = form.querySelector('.contact').value;
      const password = form.querySelector('.password').value;
      

        

  
      // Validate form data (You can add more validation as needed)
      if (!email ) {
        alert("Please fill in all required fields.");
      }
      else if (!name) {
        alert("Please fill in all required fields.");
      }
      else if(!NIC){
        alert("Please fill in all required fields.");
      }
      else if(!contact){
        alert("Please fill in all required fields.");
      }
        else if(!password){
            alert("Please fill in all required fields.");
        }
        
        else {
            // All form data are valid, so submit to the server
           
  
      // Prepare the data to send to the backend (You can structure it as needed)
      const data = {
        email:email,
        name:name,
        NIC:NIC,
        contact:contact,
        password:password,
        
      };
  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/ownerRegister',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "http://127.0.0.1:5501/Admin/ownerList.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    });

  });
  