const pswrtDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const lengthDisplay = document.querySelector("[data-lenghthNumber]");
const slider = document.querySelector("[data-lengthSlider]");
const copymsg = document.querySelector("[data-copymsg]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const light = document.querySelector("[data-indicator]");
const genratebtn = document.querySelector(".gen-pswrd");

let symbol ="!@#~`$%^&*-=+-,./;:[]{}<>?/";

let password= "";
let passwordLength =10;
let checkCount =0;
handleSilder();
//set strength circle color to grey
setIndicator('#ccc')


//pswrdlenght
function handleSilder(){
    slider.value = passwordLength; 
  lengthDisplay.innerText = passwordLength;
    // our kuch add krna cheaye
    const min =slider.min;
    const max =slider.max;
    slider.style.backgroundSize =(
      (passwordLength - min)*100/(max - min)) + "% 100%"
   
}

function setIndicator(color){
  light.style.background = color;
  //shadow
}

function getRndInteger(min,max){
 return Math.floor(Math.random() * (max-min)) + min ;
}

function genrateRendomNumber(){
 return getRndInteger(0,9); 
}

function genrateLowercase(){
return String.fromCharCode(getRndInteger(97,123));

}
 
function genrateUppercase(){
return String.fromCharCode(getRndInteger(61,91));

}
 
function genrateSymbol(){
const randNum = getRndInteger(0, symbol.length);
return symbol.charAt(randNum);
}

function calcStrength(){
let hasUpper = false;
let hasLower = false;
let hasNum = false;
let hasSym = false;
if (uppercase.checked) hasUpper = true;
if (lowercase.checked) hasLower = true;
if (numbers.checked) hasNum = true;
if (symbols.checked) hasSym = true;

if ( hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8) {
  setIndicator("#0f0");
} else if (
  (hasLower || hasUpper) &&
  (hasNum || hasSym) &&
  passwordLength >=6
){
  setIndicator("#ff0");
}else{
  setIndicator("#f00");
}
}

async function copyContent(){
  try {
 await navigator.clipboard.writeText(pswrtDisplay.value);
 copymsg.innerText = "Copied"
  }
  catch(e){
    copymsg.innerText = "Failled"
  }
  copymsg.classList.add("active"); 

setTimeout(() => {
copymsg.classList.remove("active");  
}, 2000);
 
}
 /* to make copy wala span visible */

function shufflePassword(array){
  //Fisher yates method
  for(let i= Array.length - 1; i > 0; i--){
    const j= Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str= "";
  array.forEach((el) => (str += el));
  return str;

}

function handleCheckBoxChange(){
  checkCount= 0;
  allcheckbox.forEach( (checkbox) => {
    if(checkbox.checked){
      checkCount++;
    }
  });
  //special condition
  if(passwordLength < checkCount)
  {
    passwordLength = checkCount;
    handleSilder();
  }
};


allcheckbox.forEach( (checkbox) => {checkbox.addEventListener('change', handleCheckBoxChange)

});

slider.addEventListener("input", (e) =>{
  passwordLength= e.target.value;
  handleSilder();
});
 
copybtn.addEventListener('click',()=>{
  if(pswrtDisplay.value){
    copyContent();
  }
}) 

genratebtn.addEventListener('click', ()=>{
  //none of the checkbox are selected
  if(checkCount<= 0) return;
  
  if(passwordLength<checkCount){
    passwordLength = checkCount
    handleSilder();
  }

  // let's start the journey to find new password
   
  // remove old password
password = "";
//let's put the stuff mentioned by checkboxes
// if(uppercase.checked){
//   password += genrateUppercase();
// }

// if(lowercase.checked){
//   password += genrateLowercase();
// }

// if(numbers.checked){
//   password += genrateRendomNumber();
// }

// if(symbols.checked){
//   password += genrateSymbol();
// }
let funcArr = [];

if(uppercase.checked)
  funcArr.push(genrateUppercase);

if(lowercase.checked)
  funcArr.push(genrateLowercase);

if(numbers.checked)
  funcArr.push(genrateRendomNumber);

if(symbols.checked)
  funcArr.push(genrateSymbol);

// remaining addition 
for(let i=0; i<funcArr.length; i++){
 password += funcArr[i]();
}
 
// remaining addition
for(let i=0; i<passwordLength-funcArr.length; i++){
  let randIndex= getRndInteger(0,funcArr.length);
  password += funcArr[randIndex]();
}

// shuffle the password 
  password = shufflePassword(Array.from(password));

// show in ui 
pswrtDisplay.value = password;
//calculate strength
calcStrength();

});

