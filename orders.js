"use strict";

// HTML - Elements
let renderEl = document.getElementById("render");
let adminnameEl = document.getElementById("adminname");
let adminshipmentEl = document.getElementById("adminshipment");
let adminshopitemEl = document.getElementById("adminshopitem");
let adminemailEl = document.getElementById("adminemail");
let adminaddressEl = document.getElementById("adminaddress")

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
        <h1> Name: ${buyer.fields.name.stringValue} </h1>
        <p> Email: ${buyer.fields.email.stringValue} </p>
        <p> Product: ${buyer.fields.product.stringValue} </p>
        <p> Address: ${buyer.fields.address.stringValue} </p>
        <p> Shipment: ${buyer.fields.shipment.stringValue} </p>

        <button class="btn btn-danger" onclick="deletebuyer('${buyer.name}')">Drop order for ${buyer.fields.name.stringValue}</button>
        <button class="btn btn-primary" onclick="patchdata('${buyer.name}')">update order for ${buyer.fields.name.stringValue}</button>
        </article>
        <br>
        <hr>
        `
    }
}

function patchdata(name) {
    let adminbuyername = adminnameEl.value;
    let adminemail = adminemailEl.value;
    let adminshipment = adminshipmentEl.value;
    let adminshopitem = adminshopitemEl.value;
    let adminaddress = adminaddressEl.value;

    let body = JSON.stringify({
        
        "fields": {
            "name": {
                "stringValue": adminbuyername
            },
            "shipment": {
                "stringValue": adminshipment
            },
            "product": {
                "stringValue": adminshopitem
            },
            "email": {
                "stringValue": adminemail
            },
            "address": {
                "stringValue": adminaddress
            }
        }
    })


    fetch("https://firestore.googleapis.com/v1/" + name, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: body
        }
    )
    .then(res => res.json())
    .then(data => console.log(data));
    console.log("update done");
 }

function deletebuyer(name) {
    console.log(name);

    fetch("https://firestore.googleapis.com/v1/" + name, {
        method: 'DELETE'
    })
    location.reload()
 }

