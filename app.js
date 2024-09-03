const BASE_URL =
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const formCurr=document.querySelector("#form");
const toCurr=document.querySelector("#to");
const msg = documemnt.querySelector(".msg")


for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target)
  })
};


const updateFlag=(element)=>{
  let currCode =element.value;
  let countryCode= countryList[currCode];
  let newSrc =`https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
};

btn.addEventListener("click",async(evt) =>{
  evt.preventDefault();
  let amount =document.querySelector(".amount input");
  let amtVal=amount.value;
  if (amtVal ===""||amtVal<1){
    amtVal=1;
    amount.value="1";
  }
  const URL = `${BASE_URL}/${formCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${formCurr.value} = ${finalAmount} ${toCurr.value}`;
});
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});