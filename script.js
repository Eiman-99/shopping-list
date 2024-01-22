const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const submitBtn = document.querySelector('button[type=submit]');
const itemList = document.getElementById('item-list');

// Add items to the list


function addItem (e){
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem === ''){
        // validate Input
        alert('Please add an item');
        return;
    }
   
    itemList.innerHTML += `<li>${newItem}
    <button class="remove-item btn-link text-red">
    <i class="fa-solid fa-xmark"></i>
    </button>
    </li>`
    
    itemInput.value = ''
    
}



// submitBtn.addEventListener('click', addItem);
itemForm.addEventListener('submit', addItem);

