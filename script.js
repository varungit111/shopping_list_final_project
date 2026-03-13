//initial shopping list variable
const shoppingList = [];

//Selecting Element
const shoppingListForm = document.getElementById("shopping-list-form");
const itemInputEl = document.getElementById("item");
const quantityInputEl = document.getElementById("quantity");
const shoppingListDisplayEl = document.getElementById("shopping-list-display");

// 1️⃣ When submit form, add item & quantity to shopping list (save value in variable)
// HTMLElEMENT.addEventListener("eventName", function(){ ... })
shoppingListForm.addEventListener("submit", function (event) {
    //Prevent the default behaviour(refresh the page) when submit form
    event.preventDefault();

    // console.log(itemInputEl.value)
    // console.log(quantityInputEl.value)
  
    //Push the item & quantity into shoppingList array
    shoppingList.push({
        item: itemInputEl.value,
        quantity: quantityInputEl.value
    })
       
    console.log(shoppingList)
    //Display the shopping List
    displayListItems();
})

// 2️⃣ Display shopping list (display variable)
function displayListItems() {
    //reset the display area
    shoppingListDisplayEl.innerHTML = "";
    // shoppingListDisplayEl.innerHTML = "egg x 12";
    // shoppingListDisplayEl.innerHTML = `${shoppingList[0].item} x ${shoppingList[0].quantity}`;
    // for each item in the shoppingList array, display item, quantity
    shoppingList.forEach(function (element, index, array) {
        shoppingListDisplayEl.innerHTML =
            shoppingListDisplayEl.innerHTML +
            `${element.item} x ${element.quantity}<span onclick="deleteItem(${index})">❎</span><br>`
        // shoppingListDisplayEl.innerHTML += `${element.item} x ${element.quantity}<br>`
        
    })
}

//3️⃣Delete list item from shoppingList[];
function deleteItem(indexOfDeleteItem) {
    console.log("delete button clicked!",indexOfDeleteItem);
    shoppingList.splice(indexOfDeleteItem, 1);
    console.log(shoppingList);
    //Display the shopping list after delete element.
    displayListItems();
} 



//Array.splice() practice
//              0         1        2         3
const arr = ["apple", "banana", "peach", "mango"];

//Delete "apple" from array
arr.splice(0, 1);
console.log(arr)//['banana', 'peach', 'mango']

//Delete "mango" from array
arr.splice(2, 1);
console.log(arr)// ['banana', 'peach']

//Delete "peach" from array
arr.splice(1, 1);
console.log(arr)//['banana']


//"==== Shopping Basket ===="
console.log("==== Shopping Basket ====")
const shoppingBasketForm = document.getElementById("shopping-basket-form");
const shoppingBasketEl = document.getElementById("shopping-basket");
const itemStillToBuyDisplayEl = document.getElementById("item-still-to-buy-display");

//1️⃣When Basket Button clicked, we need to compare input.value with shoppingList
shoppingBasketForm.addEventListener("submit", function (e) {
    //Prevent the default behaviour(refresh the page) when submit form
    e.preventDefault();
    console.log("basket String", shoppingBasketEl.value)// "egg,tea,apple"
    //Initial basket array from user input (convert string to array by split())
    const basketArray = shoppingBasketEl.value.toLowerCase().split(",");
    console.log("basket Array", basketArray)//["egg","tea","apple"]
    //2️⃣Find out the items which are not inside of the basket array
    //filter() returns a new array of elements which pass the condition (true)
    //1. filter shoppingList
    const itemsStillToBuy = shoppingList.filter(function (element,index,array) {
//2. if basket array "includes" this element.item -> return false (We don't need this element in itemStillToBuy array)
//3. if basket array not "includes" this element.item -> return true (We will add this element to itemStillToBuy array)
        return !basketArray.includes(element.item.toLowerCase())//make sure shopping list item is lower case
    })

    console.log("itemsStillToBuy", itemsStillToBuy)//display this array⬇️
    //3️⃣display the items we still need to get (the itemStillToBuy array)
    if (itemsStillToBuy.length === 0) {
        //if itemStillToBuy array is empty then display ⬇️ "-------You got everything!😃-------";
        itemStillToBuyDisplayEl.innerHTML = "-------You got everything!😃-------";
    } else {
        //else display⬇️
        // clear the display and add the sentance
        itemStillToBuyDisplayEl.innerHTML = "Here are the items you still need to get!<br>";
        // display all elements in itemsStillToBuy by forEach()
        itemsStillToBuy.forEach((element, index, array) => {
            //update the HTML to what is currently rendered, plus a new string
            itemStillToBuyDisplayEl.innerHTML += `${element.item} x ${element.quantity} <br>`
        })

      }
   
})

//⭐Filter logic explain here:*/
const shoppingList1 = ["🍎", "🍌", "☕", "🥚", "🍉"];
const basket1 = ["🍌"];
// array.includes();
console.log(shoppingList1.includes("🍌"));//true;
console.log(basket1.includes("🍌"));//true;

const itemMissingArray = shoppingList1.filter(function (element, index, array) {
    // if return value is true, keep the element
    // return element === "🍎"
    //loop all elements from shoppingList1
    return !basket1.includes(element);
})
console.log(itemMissingArray)
//["🍎", "☕", "🥚", "🍉"];
