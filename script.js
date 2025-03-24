const inputslider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const paswwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[dataindicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
//starting ma password kya hai
//starting ma password length 10 man rha hu
//starting ma uppercase checkboc ko tick krkr de rha hai
//strting ma indicator grey
let password = "";
let passwordLength = 10;
let checkCountor = 0;
handleslider();
//str strength color to grey
setindicator("#ccc");

//set passwordLength
//jo slider aaga picha kroge us mutabik password length set kr dega
//paswordlength ko ui pa reflect krata hai
function handleslider() {
  inputslider.value = passwordLength;
  //jo length hai woh starting ma 10 ho
  lengthDisplay.innerText = passwordLength;
  //or kuch bhi krna chaiya
  const min = inputslider.min;
  const max = inputslider.max;

  inputslider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "%100%";
}

//color set
//shadow set

function setindicator(color) {
  indicator.style.backgroundColor = color;
  //shadow khud
  indicator.style.boxShadow = `0px 0px 12px 1px ${color} `;
}

//min aur max ka bich ma ek random integer findout krkr deta hai

function getRandomInteger(min, max) {
  //ab anser o to max -min ka bich ma aagya
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomInteger() {
  return getRandomInteger(0, 9);
}
function generateLowerCase() {
  //a assci value 97 and z have ascii value 123
  return String.fromCharCode(getRandomInteger(97, 123));
}

function generateUpperCase() {
  //A assci value 65 and z have ascii value 91
  return String.fromCharCode(getRandomInteger(65, 91));
}

//symbol ki string sa randomly index pkdkr uss index pa jo symbol pda hai woh deta hai
function generateSymbols() {
  //string len find in order to find max
  const randNum = getRandomInteger(0, symbols.length);

  return symbols[randNum];
}

//to calulate stength of password on basis of some rules
//kon konsa checkbox checked hai kon sa nhi hai
//indicator ma color set krdeta hai
function calculateStrength() {
  let hasupper = false;
  let haslower = false;
  let hasNum = false;
  let hasSymbol = false;

  if (upperCaseCheck.checked) {
    hasupper = true;
  }
  if (lowerCaseCheck.checked) {
    haslower = true;
  }
  if (numberCheck.checked) {
    hasNum = true;
  }
  if (symbolCheck.checked) {
    hasSymbol = true;
  }

  if (hasupper && haslower && (hasNum || hasSymbol) && passwordLength >= 8) {
    setindicator("#0f0");
  } else if (
    (haslower || hasupper) &&
    (hasNum || hasSymbol) &&
    passwordLength >= 6
  ) {
    setindicator("#ff0");
  } else {
    setindicator("#f00");
  }
}

//clipboard api
//async function
//jo bhi content password display ki field ka andar ussa clipboard pa copy krta hai
//write text method jo promise return krta haiclipboard
async function copyContent() {
  //promise resolve or reject dono ho skta hai so we give in try and catch block
  //copy msg invisible ho gya kuch time ka bad
  try {
    await navigator.clipboard.writeText(paswwordDisplay.value);
    copyMsg.innerText = "Copied";
  } catch (error) {
    copyMsg.innerText = "Failed";
  }
  //to make copy wala span visible

  copyMsg.classList.add("active");

  //copy wala text ko gyab krne ka liye

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

//to add event listener
//slider ko jb bhi aag picha kr raha hun to slider ki avlue change ho rhi yeh woh value lakar de rha hai
inputslider.addEventListener("input", (e) => {
  //pasword length ko updat kr diya
  passwordLength = e.target.value;

  handleslider();
});

//copy btn add event listener
//input value koi value hogi tb copy kr payoge
copyBtn.addEventListener("click", () => {
  if (paswwordDisplay.value) {
    copyContent();
  }
});

function handleCheckBoxChange() {
  checkCountor = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCountor++;
    }
  });

  //special condition of password length< no of checkbocx count
  if (passwordLength < checkCountor) {
    passwordLength = checkCountor;
    handleslider();
  }
}
//saara checkbocx pa even listener lga denga
//chahe tick ho ho rha ya untick usma check krkr aao kitna checkbox cheked hai
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

//to genrate a shuffle paswword
function shufflePassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
    //random J, find out using random function
    const j = Math.floor(Math.random() * (i + 1));
    //swap number at i index and j index
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}
//generate password
//jb mai sare boxes ko unchecked kr deta hu then click krta hu genertae password
//then generate password nhi hota

generateBtn.addEventListener("click", () => {
  //koi bhi checkbox ticked nhi hai to hum password generate nhi kr sakta
  // if (checkCountor == 0) {
  //   return;
  // }

  if (passwordLength < checkCountor) {
    passwordLength = checkCountor;
    handleslider();
  }

  // console.log("stating the journey");

  //lets start to journey to find new password

  //remove old password
  password = "";
  //check kru ki password ma kon si chiza dalni hai means konsa checkbox checked hai
  //lets put the stuff mentioned by checkbox
  //   if (upperCaseCheck.checked) {
  //     password += generateUpperCase();
  //   }
  //   if (lowerCaseCheck.checked) {
  //     password += generateLowerCase();
  //   }
  //   if (numberCheck.checked) {
  //     password += generateRandomInteger();
  //   }
  //   if (symbolCheck.checked) {
  //     password += generateSymbols();
  //   }
  //suppose 10 paswwword length this 4 chize upar wali daldi
  // aur no randomly dal dun
  //lekin yeh kaisa findout karu ki no dalu , symbol , ya letter

  let funcArr = [];
  if (upperCaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }
  if (lowerCaseCheck.checked) {
    funcArr.push(generateLowerCase);
  }
  if (numberCheck.checked) {
    funcArr.push(generateRandomInteger);
  }
  if (symbolCheck.checked) {
    funcArr.push(generateSymbols);
  }
  //is function ma sari chiz daldi jo bhi chceked hai

  //compulsory addition
  //jo tick kiya hu

  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  // console.log("Compulsory addition done");

  //remaining addition

  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRandomInteger(0, funcArr.length);

    password += funcArr[randIndex]();
  }
  // console.log("Remaining addition Done");

  //shuffle krna padega
  //pasword ko array ka frm ma bhje diya
  password = shufflePassword(Array.from(password));
  // console.log("Shuffling done");
  paswwordDisplay.value = password;
  // console.log("Ui addition done");
  //paswword bn ka bad strength bhi call krni padegi
  calculateStrength();
});

// Generate password when page loads
window.addEventListener("load", () => {
  generateBtn.click();
});
