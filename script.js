// Initial shopping list
const shoppingList = [];

// Select Elements
const shoppingListForm = document.getElementById("shopping-list-form");
const itemInputEl = document.getElementById("item");
const quantityInputEl = document.getElementById("quantity");
const shoppingListDisplayEl = document.getElementById("shopping-list-display");

const shoppingBasketForm = document.getElementById("shopping-basket-form");
const shoppingBasketEl = document.getElementById("shopping-basket");
const itemStillToBuyDisplayEl = document.getElementById("item-still-to-buy-display");

// ===== Add item to shopping list =====
shoppingListForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newItem = {
    item: itemInputEl.value.trim(),
    quantity: quantityInputEl.value.trim()
  };

  shoppingList.push(newItem);

  displayListItems(); // Update display
  itemInputEl.value = "";
  quantityInputEl.value = "";
});

// ===== Display shopping list =====
function displayListItems() {
  shoppingListDisplayEl.innerHTML = "";

  shoppingList.forEach((element, index) => {
    // Each item with a delete button
    shoppingListDisplayEl.innerHTML += `
      ${element.item} x ${element.quantity} 
      <span onclick="deleteItem(${index})" style="cursor:pointer;">❎</span><br>
    `;
  });
}

// ===== Delete an item =====
function deleteItem(index) {
  shoppingList.splice(index, 1);
  displayListItems();
}

// ===== Check Shopping Basket =====
shoppingBasketForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // 1️⃣ Get items in the basket from user input
  const basketItems = shoppingBasketEl.value
    .split(",")                // Split by comma
    .map(item => item.trim().toLowerCase()); // Trim spaces and lowercase

  // 2️⃣ Find which shopping list items are NOT in the basket
  const itemsStillToBuy = shoppingList.filter(item => {
    return !basketItems.includes(item.item.toLowerCase());
  });

  // 3️⃣ Clear previous display
  itemStillToBuyDisplayEl.innerHTML = "";

  // 4️⃣ Display results
  if (itemsStillToBuy.length === 0) {
    itemStillToBuyDisplayEl.textContent = "-------You got everything! 😃-------";
  } else {
    const ul = document.createElement("ul"); // Create a list
    itemsStillToBuy.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.item} x ${item.quantity}`;
      ul.appendChild(li);
    });
    itemStillToBuyDisplayEl.appendChild(ul);
  }
});