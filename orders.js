"use strict";

// HTML - Elements
let renderEl = document.getElementById("render");

// Hämta data firebase
 fetch("https://firestore.googleapis.com/v1/projects/fir-firebas-92e56/databases/(default)/documents/buyers")
    .then(res => res.json())
    .then(data => orderview(data));



// test
function orderview(data) {   
    console.log(data);
    let buyerArray = data.documents;

    for (let buyer of buyerArray) {
        console.log(buyer.fields.name.stringValue);
        // console.log(buyer.fields.email.stringValue);
        //console.log(buyer.name)
        
        renderEl.innerHTML += `
        <article>
        <h1> ${buyer.fields.name.stringValue} </h1>
        <p> Email: ${buyer.fields.email.stringValue} </p>
        <p> Product: ${buyer.fields.product.stringValue} </p>
        <p> Shipment: ${buyer.fields.shipment.stringValue} </p>

        <button class="btn btn-danger" onclick="deletebuyer('${buyer.name}')">Tabort order för ${buyer.fields.name.stringValue}</button>
        </article>
        <br>
        <hr>
        `
    }
}

// CRUD/REST Functions
function getdata() {

 }

function inputdata() {

 }

function patchdata() {

 }

function deletebuyer(name) {
    console.log(name);

    fetch("https://firestore.googleapis.com/v1/" + name, {
        method: 'DELETE'
    })
    location.reload()
 }

