
const itemList = document.getElementById('todo-items')
const text = document.createTextNode('goodbye')

console.log("hello")
itemList.addEventListener("load", () => {
    console.log(text)
    console.log("goodbye")
    createItem()
})

function createItem() {
    console.log('maybe')
}
console.log("hello")
// paragraph.appendChild(text) = "testing"
// const body = document.getElementById('body')
// body.appendChild(paragraph)

// var para = document.createElement("p");
// var node = document.createTextNode("This is new.");
// para.appendChild(node);

// var element = document.getElementById("test");
// element.appendChild(para);