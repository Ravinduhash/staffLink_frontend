function validateNIC(nic) {
  // Remove any spaces or non-alphanumeric characters
  nic = nic.replace(/[^a-zA-Z0-9]/g, '');

  if (nic.length === 12) {
    // New NIC: Should have 10 numeric characters
    return /^\d{12}$/.test(nic);
  } else if (nic.length === 10) {
    // Old NIC: Should have 9 characters followed by 'V' or 'v'
    return /^[0-9]{9}[Vv]$/.test(nic);
  } else {
    // Invalid length
    return false;
  }
}

function ValidateEmail(input) {

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {

    // alert("Valid email address!");

    // document.form1.text1.focus();

    return true;

  } else {

    // alert("Invalid email address!");

    // document.form1.text1.focus();

    return false;

  }

}

function validateContactNumber(contactNumber) {
  // Remove any spaces or non-numeric characters
  contactNumber = contactNumber.replace(/\D/g, '');

  // Check if the contact number starts with '0' and has exactly 10 digits
  return /^0\d{9}$/.test(contactNumber);
}

function ownerUsedEmail(email) {
  console.log(email);
  fetch('http://localhost:8080/try2_war_exploded/getOwner?email='+email,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        if(data.message === "No owner"){
          return false;
        }
        else{
          return true;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
     sub = document.querySelector(".sub");
  
    sub.addEventListener("click", () => {
    //   event.preventDefault(); // Prevent the default form submission
        console.log("form submitted");
      // Get form elements
      var email = form.querySelector('.email').value;
      var name = form.querySelector('.name').value;
      var NIC = form.querySelector('.NIC').value;
      var contact = form.querySelector('.contact').value;
      var password = form.querySelector('.password').value;
      console.log(contact);

      
      var checker = true;
        

      var emailError = document.querySelector(".email-error-message");
      var nameError = document.querySelector(".name-error-message");
      var passwordError = document.querySelector(".password-error-message");
      var contactError = document.querySelector(".contact-error-message");
      var NICError = document.querySelector(".NIC-error-message");

      emailError.style.display = "none";
      nameError.style.display = "none";
      passwordError.style.display = "none";
      contactError.style.display = "none";
      NICError.style.display = "none";
      

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Check if the email is valid
        

  
      // Validate form data (You can add more validation as needed)
      if(!email){
        emailError.innerText = "Please enter an email address.";
        emailError.style.display = "block";
        console.log("email error");
        checker = false;
      }
      else if (!ValidateEmail(email)) {
        emailError.innerText = "Please enter a valid email address.";
        emailError.style.display = "block";
        console.log("email error");
        checker = false;
    }
    else if(ownerUsedEmail(email)){
      emailError.innerText = "This email is already used.";
      emailError.style.display = "block";
      console.log("email error");
      checker = false;
    }
      if (!name) {
        nameError.innerText = "Please enter an owner name.";
        nameError.style.display = "block";
        console.log("name error");
        checker = false;
      }
      if (!NIC) {
        NICError.innerText = "Please enter an NIC number.";
        NICError.style.display = "block";
        console.log("NIC error");
        checker = false;
      }
      else if(validateNIC(NIC) === false){
        NICError.innerText = "Please enter a Valid NIC number.";
        NICError.style.display = "block";
        console.log("NIC error");
        checker = false;
      }
      if (!contact) {
        contactError.innerText = "Please enter a contact number.";
        contactError.style.display = "block";
        console.log("contact error");
        checker = false;
      }
      else if(validateContactNumber(contact) === false){
        contactError.innerText = "Please enter a Valid contact number.";
        contactError.style.display = "block";
        console.log("contact error");
        checker = false;
      }
      if (!password) {
        passwordError.innerText = "Please enter a password.";
        passwordError.style.display = "block";
        console.log("password error");
        checker = false;

      }
      else if(password.length < 6){
        passwordError.innerText = "Password should be at least 6 characters.";
        passwordError.style.display = "block";
        console.log("password error");
        checker = false;
      }
      if(checker === true) {
            // All form data are valid, so submit to the server
           
  
      // Prepare the data to send to the backend (You can structure it as needed)
      const data = {
        email:email,
        name:name,
        NIC:NIC,
        contact:contact,
        password:password,
      };
      console.log(data);
  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/ownerRegister',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                if(data.message === "Registration successfully"){
                  Swal.fire({
                    title: "Owner Registered Successfully!",
                    icon: "success"
                  }).then(()=>{
                    window.location.href = "ownerList.html";
                  })
                }
                else{
                  Swal.fire({
                    title: "Something went wrong!",
                    icon: "error"
                  }).then(()=>{
                    window.location.href = "ownerList.html";
                  })
                }
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    });

  });
  