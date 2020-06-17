
function itemTemplate(item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" id="edit-button" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}

//Initial page load render
const ourHTML = items.map((item) => {
    return itemTemplate(item)
}).join('')
document.getElementById('item-list').insertAdjacentHTML("beforeend", ourHTML)

//Create feature
const createField = document.getElementById("create-field")

document.getElementById("create-form").addEventListener("submit", (e) => {
    e.preventDefault()
    axios.post('/create-item', {text: createField.value})
        .then((response) => {
            // Create html for a new item
            document.getElementById('item-list').insertAdjacentHTML('beforeend', itemTemplate(response.data))
            createField.value = ''
            createField.focus()
        }).catch((err) => {
            console.log('Please try again later')
        })
   
})

document.addEventListener("click", (e) => {
    //delete feature
    if (e.target.classList.contains("delete-me")) {
        if (confirm("do you really want to delete this item permenantly?")) {
            axios.post('/delete-item', {id: e.target.getAttribute("data-id")})
            .then(() => {
                e.target.parentElement.parentElement.remove()
            }).catch((err) => {
                console.log('Please try again later')
            })
        }
    }

    //Update feature
    if (e.target.classList.contains("edit-me")) {
        const userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if (userInput && userInput.trim() !== "") {
            axios.post('/update-item', { text: userInput, id: e.target.getAttribute("data-id")})
            .then(() => {
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch((err) => {
                console.log('Please try again later')
            })
        }
    }
})
const update = document.getElementById('edit-button')
