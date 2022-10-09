import { getData } from "./modules/dataMiner.js";

(() => {

let theTemplate = document.querySelector("#things-template").content,
    theThings = document.querySelector(".things-section"),
    buttonContainer = document.querySelector('.query-controls'),
    activityList;

    // Adds 
    function addButtons(data) { 
        //console.log(data.things); 
        let container = new DocumentFragment(); 
        activityList = data.things;
        data.things.forEach(thing => { 
            let buttonEl = document.createElement('button'); 
            buttonEl.className = 'catButton'; 
            buttonEl.dataset.thing = thing.activity.id;  
            buttonEl.textContent = thing.activity.name; 

            buttonEl.addEventListener('click', buttonEvent) 
            container.appendChild(buttonEl); 
        });

        buttonContainer.appendChild(container); 

    }

    function buttonEvent(){ 
        theThings.textContent = ''; 
        activityList.forEach(thing => { 
            if(thing.activity.id == this.dataset.thing) {
                let panel = theTemplate.cloneNode(true), 
                containers = panel.firstElementChild.children; 

                containers[0].textContent = thing.activity.name;
                containers[1].querySelector('img').src = 'images/' + thing.activity.image; 
                containers[2].textContent = thing.activity.description;

                theThings.appendChild(panel); 
            }
        });
    }

    getData("./data.json", addButtons);

})();



