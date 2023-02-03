"use strict";

// HTML - Elements
let headerEl = document.getElementById("headers");
let mainEl = document.getElementById("mains");
let footerEl = document.getElementById("footers");

// Get data from API
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(fakedata => view(fakedata));

// Header Function
function headerfunction() {
    headerEl.innerHTML += `
    <form>
      <label for="name">Name:</label><br>
      <input type="text" name="buyername" id="buyername" class="forminput" placeholder="t ex Viktor Strand">
      <br>
      <label for="email">Email:</label><br>
      <input type="text" name="email" id="email" class="forminput" placeholder="t ex viktor@gmail.com">
      <br>
      <input type="text" id="showitem" class="forminput" disabled>
      <br>
      <select name="shipment" id="shipment" class="forminput">
        <option value="fast shipment">Fast Shipment</option> 
        <option value="standard shipment">Standard Shipment</option>
      </select>
      <br>
      <input type="submit" value="submit" id="submitbutton">
      </form>
      <hr>
    `
}
headerfunction();

// element - headers
let buyernameEl = document.getElementById("buyername");
let emailEl = document.getElementById("email");
let shipmentEl = document.getElementById("shipment")
let submitbuttonEl = document.getElementById("submitbutton"); 
let showitemEl = document.getElementById("showitem");
let forminputEl = document.getElementsByClassName("forminput");

//button disabled





// list item function
function listitem(item) {
    console.log(item);
    showitemEl.value = item;
}

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
        <button type="button" class="btn btn-primary btn-lg" id="item" onclick="listitem(${output[i].id})">Buy</button>
        
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
    let shopitem = showitemEl.value;

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
                "stringValue": shopitem
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