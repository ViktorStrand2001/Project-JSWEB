"use strict";
// HTML - Elements
// header
let productEl = document.getElementById("product");
let buyernameEl = document.getElementById("buyername");
let emailEl = document.getElementById("email");
let shipmentEl = document.getElementById("shipment")
let submitbuttonEl = document.getElementById("submitbutton"); 
// main
let headerEl = document.getElementById("headers");
let mainEl = document.getElementById("mains");
let footerEl = document.getElementById("footers");





// Get data from API
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(fakedata => view(fakedata));

// Event listener
// if (!buyername || ) {
//     alert("fill all forms")
// } else {

// }

// Function main
function view(output) {
    console.log(output);

    for (let i = 0; i < output.length; i++){
        mainEl.innerHTML += `
        <articale>
        <h1> ${output[i].category} </h1>
        <h2> ${output[i].title} </h2>
        <img class='img' alt=Bilder på våra produkter src= ${output[i].image}>
        <p> ${output[i].description} </p>
        <p> Average rating: ${output[i].rating.rate} of: ${output[i].rating.count} customer.</p>
        <p> Pris: ${output[i].price}kr </p>
        <button type="button" class="btn btn-primary btn-lg" id="product" ${output[i].id}>Buy</button>
        
        <hr>
        </articale>
        `
    }

    
}

// Function header
function createBuyer(){
    let buyername = buyernameEl.value;
    let email = emailEl.value;
    let shipment = shipmentEl.value;
    // let product = output.id;

    // Buyer value to JSON
    let body = JSON.stringify({
        
        "fields": {
            "name": {
                "stringValue": buyername
            },
            "shipment": {
                "stringValue": shipment
            },
            "product": {
                "stringValue": product
            },
            "email": {
                "stringValue": email
            }
        }
    })

    fetch("https://firestore.googleapis.com/v1/projects/fir-firebas-92e56/databases/(default)/documents/buyers", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
        .then(res => res.json)
        .then(data => console.log(data));
}

submitbuttonEl.addEventListener("click", createBuyer);