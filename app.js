const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

///usd/inr.json

let selectedDrop  = document.querySelectorAll(".select-container select")

//this will return total selected option

let fromCurr =  document.querySelector(".from select");

let toCurr =  document.querySelector(".To select")

let msg = document.querySelector(".msg")


let button = document.querySelector(".btn")

for(let select of selectedDrop){

  for(let currCode in countryList){
    let option = document.createElement("option");
    if(select.name == "from" && currCode == "USD"){
      option.selected = "selected";
    }else if(select.name == "To" && currCode == "INR"){
      option.selected = "selected";
    }
    
    option.innerText = currCode;
    option.value = currCode
    select.append(option);
    
  }


 select.addEventListener("change",(evDetails) => {
  upedateFlag(evDetails.target)
 })
}

function upedateFlag(details){
  let curencyCode = details.value;
  let coutry = countryList[curencyCode]
  let imgSrc = `https://flagsapi.com/${coutry}/flat/64.png`
  

  let image = details.parentElement.querySelector("img");
  image.src = imgSrc;
}


button.addEventListener("click", (eve)=>{
  eve.preventDefault();
  calculateDisplay()
});

async function calculateDisplay(){
  let amount = document.querySelector("form input").value;
  if(amount == "" || amount < 1){
    alert("Please enter valid input")
  }
 
  let url = `${baseUrl}${fromCurr.value.toLowerCase()}.json` 

  let response = await fetch(url);
  let mainData = await response.json();
  let rate = mainData[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmount = amount*rate.toFixed(2);

  msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
 

}

window.addEventListener("load",calculateDisplay)





