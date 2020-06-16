
// const itemList = document.getElementById('todo-items')
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


// function createItem() {
//     let readItems = 
//         `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
//         <span class="item-text">${global.dbItems}</span>
//         <div>
//           <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
//           <button class="delete-me btn btn-danger btn-sm">Delete</button>
//         </div>
//       </li>`;
//     itemList.insertAdjacentHTML('beforeend', readItems)
// }

// // paragraph.appendChild(text) = "testing"
// // const body = document.getElementById('body')
// // body.appendChild(paragraph)

// // var para = document.createElement("p");
// // var node = document.createTextNode("This is new.");
// // para.appendChild(node);

// // var element = document.getElementById("test");
// // element.appendChild(para);

// // `${items.map((item) => {
// //     return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
// //     <span class="item-text">${item.text}</span>
// //     <div>
// //       <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
// //       <button class="delete-me btn btn-danger btn-sm">Delete</button>
// //     </div>
// //   </li>`
// //   }).join('')}`