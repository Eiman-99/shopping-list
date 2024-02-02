const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const submitBtn = document.querySelector('button[type=submit]');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

let isEditing = false;
let oldLabel;
// Add items to the list
function validateInput(input){
    if(input === ''){
        // validate Input
        return 'Please add an item';
    }
    else if (getItemsFromLocalStorage().includes(input)) {
        return "Item already exists."
    }   
}


function addItemWithValidation(newLabel){
    if (validateInput(newLabel)) {
        alert(validateInput(newLabel));
    } else {
        addItemToDOM(newLabel);
        addItemToStorage(newLabel);
    }
}

function onAddItemSubmit (e){
    e.preventDefault();
    const newLabel = itemInput.value;
    if (isEditing){
        if (!validateInput(newLabel)){
        // Remove old item
        for (const item of itemList.children) {
            if (item.textContent.trim() === oldLabel){
                item.remove();
            }
        }
        const filteredItems = getItemsFromLocalStorage().filter((item) => item !== oldLabel);
        localStorage.setItem('items', JSON.stringify(filteredItems));
        // Validate & Add item
        addItemWithValidation(newLabel);
        
        submitBtn.style.background = 'black';
        submitBtn.textContent = 'Add Item';
        isEditing = false;
        itemInput.value = '';
        } else {
            alert("error");
            itemInput.value = oldLabel;
        }
    } else {
        addItemWithValidation(newLabel);
        itemInput.value = '';
       
    }
    
    checkUI();
}

function addItemToDOM(item){
    itemList.innerHTML += `<li>${item}
    <button class="remove-item btn-link text-red">
    <i class="fa-solid fa-xmark"></i>
    </button>
    </li>`
}

function getItemsFromLocalStorage() {
    if (localStorage.getItem('items') === null)
        return [];
    else 
        return JSON.parse(localStorage.getItem('items')); 
}

function addItemToStorage(item){
    let itemsFromStorage = getItemsFromLocalStorage(); // Get items from local storage.
    itemsFromStorage.push(item); // Add new item to the items array.

    localStorage.setItem('items', JSON.stringify(itemsFromStorage)); // Push back updated array into local storage.
}

function displayItems(){
    const itemsFromStorage = getItemsFromLocalStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    
    checkUI();
}

function removeItem(i){
    // console.log(i);
    const label = i.parentElement.parentElement.textContent.trim(); // Get the name of the item to remove
    
    i.parentElement.parentElement.remove(); // Remove the item from the DOM.
    
    let items = getItemsFromLocalStorage(); // Fetch the items stored in the local storage

    if (items.includes(label)){ // Precheck 
        items = items.filter((item) => item !== label ); // Filter out all items that do not have the label given.
    }

    localStorage.setItem('items', JSON.stringify(items)); // Update items in the local storage after removing the item.
}
function editList(e){
    const target = e.target;
    
    // REMOVE ITEM
    if (target.parentElement.classList.contains('remove-item')){
        removeItem(target);
    }
    else if(target.tagName === 'LI'){
        isEditing = true;
        const itemName = target.textContent.trim();
        oldLabel = itemName;
        itemInput.value = itemName;
        for (let item of itemList.children) {
            item.style.color = '#333';
        }
        target.style.color = 'grey';
        submitBtn.style.background = 'green';
        submitBtn.textContent = 'Update Item';
    }
    checkUI();
}

function clearItems(){
    // Clear from DOM
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

    // Clear from local storage
    // localStorage.setItem('items', "[]");
    localStorage.removeItem('items');
    checkUI();
    
}

function checkUI(){
    if (itemList.children.length === 0){
        filter.style.display='none';
        clearBtn.style.display='none';
    }
    else {
        filter.style.display='block';
        clearBtn.style.display='block';
    }
}



function filterItems(e){
    const items = document.querySelectorAll('li');
    const input = e.target.value.toLowerCase();
    let found = false;

    if(input === ''){
        itemList.innerHTML = '';
        displayItems();
    }
    else {
        items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(input) !== -1){
            item.style.display = 'flex';
            found = true;
        } 
        else {
            item.style.display = 'none';
            
            // itemList.innerHTML = `<p> We couldn't find '${input}'</p>`;
        }
    });

    if(!found){
         itemList.innerHTML = `<p> We couldn't find '${input}'</p></div>`;
    }}
    
    
    
}

// submitBtn.addEventListener('click', addItem);
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', editList); // Edit List Handler
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();

