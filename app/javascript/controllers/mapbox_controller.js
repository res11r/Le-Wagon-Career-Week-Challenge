import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

    static values = { 
        lat: Number, 
        lng: Number
    }
    static targets = ["museum"]
  connect() {
    const museums = {}
    console.log("connected to mapbox")
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/museum.json?types=poi&proximity=${this.lngValue},${this.latValue}&access_token=pk.eyJ1IjoiYWhtZWRhbGJhaXRpIiwiYSI6ImNrejhhazBibDA0Nmgydm1xeG1pZ3J5d2EifQ.9EfWb5CYThNWy7vKFFwxtA`)
    .then(response => response.json())
    .then(data => 
        //Iterate over each museum in the result
        data["features"].forEach((museum) => {
            //if postcode property already exists in the museums object, add the museum to that postcode
            if (museum["context"][0]["text"] in museums) {
                museums[museum["context"][0]["text"]].push(museum["text"])
            //else, create new property for postcode and add the museum to it
            } else {
            museums[museum["context"][0]["text"]] = [museum["text"]]
            }
            this.museumTarget.insertAdjacentHTML('afterbegin', `<li> ${museum["context"][0]["text"]} : ${museums[museum["context"][0]["text"]]} </li>` )
        })
    );
    
    }
}