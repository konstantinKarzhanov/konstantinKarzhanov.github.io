"use strict"

// Assign required constants
const file = "./data.json";

const filters = document.querySelector("#filters");
const filterGenders = filters.querySelector("#genders");
const filterAges = filters.querySelector("#ages");
const filterStatuses = filters.querySelector("#statuses");
const filterInterests = filters.querySelector("#interests");

const btnShowSelected = document.querySelector("#show-selected");
const sectionResults = document.querySelector("#results");

const listResults = document.createElement("ol");
listResults.setAttribute("id", "list-results");
listResults.setAttribute("class", "list-results");

let rangeAge;
let chkboxAllAcc;
const chkboxInterestsAcc = [];
const chkboxGendersAcc = [];
const chkboxStatusesAcc = [];
const uniqDataAllAcc = {};

const msgMatchError = "No one matches the criteria you have provided. Please try again with different criteria";


// Reqired functions 
function getAge(birthday, dateReference = Date.now()){
// The function calculates the age based on a provided birthday and reference date (with todays date as default value)
    // Subtract the birthday year from the reference date year to get the result 
    return (new Date(dateReference)).getFullYear() - (new Date(birthday)).getFullYear();
}


function convertKilosToPounds(kilos){
// The function converts a kilo weight to pounds weight
    kilos = parseFloat(kilos);

    if(isNaN(kilos)) return "";

    const conversionFactor = 2.2046226218;
    let pounds = (kilos * conversionFactor).toFixed(2);

    return pounds.concat(" lbs");
}


function convertCentimetersToFeet(centimeters){
    centimeters = parseFloat(centimeters);

    if(isNaN(centimeters)) return "";

    const conversionFactorFoot = 0.0328084;
    const conversionFactorInch = 12;

    let lengthFeet = centimeters * conversionFactorFoot;
    let footPart = parseInt(centimeters * conversionFactorFoot);
    let inchPart = Math.round((lengthFeet % footPart) * conversionFactorInch);

    return `${footPart}' ${inchPart}''`;
}


function addToChkboxAcc(id, value){
    if(id == "genders"){
        chkboxGendersAcc.push(value);
    } else if(id == "statuses"){
        chkboxStatusesAcc.push(value);
    } else if(id == "interests"){
        chkboxInterestsAcc.push(value);
    }
}


function removeFromChkboxAcc(id, value){
    let index;

    if(id == "genders"){
        index = chkboxGendersAcc.indexOf(value);
        index != -1 && chkboxGendersAcc.splice(index, 1);
    } else if(id == "statuses"){
        index = chkboxStatusesAcc.indexOf(value);
        index != -1 && chkboxStatusesAcc.splice(index, 1);
    } else if(id == "interests"){
        index = chkboxInterestsAcc.indexOf(value);
        index != -1 && chkboxInterestsAcc.splice(index, 1);
    }
}


function showSelectedData(){
    if(sectionResults.children.length == 0 || sectionResults.lastElementChild.tagName != listResults.tagName){
        sectionResults.appendChild(listResults);
    }

    console.clear();
    listResults.innerHTML = "";

    // Fetch a JSON file and process the data
    fetch(file)
    // When the data is returned, convert it to JSON format
    .then(response => response.json())
    // Process JSON data
    .then(data => {
        const arrResults = [];
        
        data.forEach(({ name, gender, "physical attributes":{weight, height, "hair color": hair, "eye color": eyes}, birthday, address:{city}, status, interests, phone, email }) => {

            if(chkboxGendersAcc.length > 0 && chkboxGendersAcc.indexOf(gender) == -1) return;
            if(getAge(birthday) > rangeAge) return;
            if(chkboxStatusesAcc.length > 0 && chkboxStatusesAcc.indexOf(status) == -1) return;

            for(let i = 0; i < chkboxInterestsAcc.length; i++){
                if(interests.indexOf(chkboxInterestsAcc[i]) == -1) return;
            }

            if(chkboxGendersAcc.length > 0 || getAge(birthday) <= rangeAge || chkboxStatusesAcc.length > 0 || chkboxInterestsAcc.length > 0){
                arrResults.push([name.title, name.first, name.last, birthday, weight, height, hair, eyes, city, phone, email]);
            }
        });

        if(arrResults.length == 0){
            console.log(msgMatchError);
            listResults.innerHTML = msgMatchError;
        } else {
            arrResults.forEach((item, index) => {
                const objBirthday = new Date(item[3]);
                const objBirthdayYear = objBirthday.getFullYear();
                const objBirthdayMonth = objBirthday.toLocaleString("default", { month: "long" });
                const objBirthdayDate = objBirthday.getDate();

                const fullNameDsp = `${item[0]}. ${item[1]} ${item[2]}`
                const birthdayDsp = `${objBirthdayDate} ${objBirthdayMonth} ${objBirthdayYear}`;

                const weightDsp = convertKilosToPounds(item[4]);
                const heightDsp = convertCentimetersToFeet(item[5]);

                const strItem = `${fullNameDsp}, ${birthdayDsp}, weight: ${weightDsp} (${item[4]}), height: ${heightDsp} (${item[5]}), ${item[6]} hair, ${item[7]} eyes (${item[8]}, ${item[9]}, ${item[10]});`

                const lineDsp = "-".repeat(10);
                console.log(`${lineDsp}\n${strItem}\n${lineDsp}`);

                listResults.innerHTML += `<li class="list-item">${strItem}</li>`;
            });
        }
    })
}


// Fetch a JSON file and process the data
fetch(file)
// When the data is returned, convert it to JSON format
.then(response => response.json())
// Process JSON data
.then(data => {

    data.forEach(({ gender, birthday, status, interests }) => {
        if(!uniqDataAllAcc.genders && !uniqDataAllAcc.ages && !uniqDataAllAcc.statuses && !uniqDataAllAcc.interests){
            uniqDataAllAcc.genders = [];
            uniqDataAllAcc.ages = [];
            uniqDataAllAcc.statuses = [];
            uniqDataAllAcc.interests = [];
        } else if(uniqDataAllAcc.genders && uniqDataAllAcc.ages && uniqDataAllAcc.statuses && uniqDataAllAcc.interests){
            uniqDataAllAcc.genders.indexOf(gender) == -1 && uniqDataAllAcc.genders.push(gender);
            
            const age = getAge(birthday);
            uniqDataAllAcc.ages.indexOf(age) == -1 && uniqDataAllAcc.ages.push(age);

            uniqDataAllAcc.statuses.indexOf(status) == -1 && uniqDataAllAcc.statuses.push(status);

            interests.forEach(item => {
                uniqDataAllAcc.interests.indexOf(item) == -1 && uniqDataAllAcc.interests.push(item);
            })
        }
    });

    let uniqDataGendersSorted = [...uniqDataAllAcc.genders].sort();
    let uniqDataAgesSorted = [...uniqDataAllAcc.ages].sort((a, b) => a - b);
    rangeAge = uniqDataAgesSorted[(uniqDataAgesSorted.length - 1)];

    let uniqDataStatusesSorted = [...uniqDataAllAcc.statuses].sort();
    let uniqDataInterestsSorted = [...uniqDataAllAcc.interests].sort();

    
    uniqDataGendersSorted.forEach((item, index) => {
        filterGenders.innerHTML += `<label for="gender-${index + 1}"><input id="gender-${index + 1}" type="checkbox" name="gender-${index + 1}" value="${item}">${item[0].toUpperCase().concat(item.slice(1))}</label>`;
    });

    filterAges.innerHTML += `<label for="ages-ctrl"><input id="ages-ctrl" type="range" name="ages-ctrl" min="${uniqDataAgesSorted[0]}" max="${uniqDataAgesSorted[(uniqDataAgesSorted.length - 1)]}" step="1" value="${uniqDataAgesSorted[(uniqDataAgesSorted.length - 1)]}"></label>`;
    
    uniqDataStatusesSorted.forEach((item, index) => {
        filterStatuses.innerHTML += `<label for="status-${index + 1}"><input id="status-${index + 1}" type="checkbox" name="status-${index + 1}" value="${item}">${item[0].toUpperCase().concat(item.slice(1))}</label>`;
    });

    uniqDataInterestsSorted.forEach((item, index) => {
        filterInterests.innerHTML += `<label for="interest-${index + 1}"><input id="interest-${index + 1}" type="checkbox" name="interest-${index + 1}" value="${item}">${item[0].toUpperCase().concat(item.slice(1))}</label>`;
    });
});


function addSelectedData(event){
    let targetElement = event.target.closest("input");

    if(!targetElement) return;
    
    let parentLabel = targetElement.parentNode;
    let parentForm = parentLabel.parentNode;

    if(targetElement.id == "ages-ctrl"){
        rangeAge = targetElement.value;
    }

    if(targetElement.checked == true){
        addToChkboxAcc(parentForm.id, targetElement.value)
    } else if(targetElement.checked == false){
        removeFromChkboxAcc(parentForm.id, targetElement.value)
    }

    chkboxAllAcc = [...chkboxInterestsAcc, ...chkboxGendersAcc];
}


filters.addEventListener("click", addSelectedData);
btnShowSelected.addEventListener("click", showSelectedData);
