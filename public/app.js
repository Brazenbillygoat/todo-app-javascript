console.log("hello")

const paragraph = document.getElementById('todo-items')
const text = document.createTextNode("goodbye")
console.log(text)

paragraph.addEventListener('load', (e) => {
    
    console.log(text)
    paragraph.appendChild(text)
    e.preventDefault()
})


// paragraph.appendChild(text) = "testing"
// const body = document.getElementById('body')
// body.appendChild(paragraph)

// var para = document.createElement("p");
// var node = document.createTextNode("This is new.");
// para.appendChild(node);

// var element = document.getElementById("test");
// element.appendChild(para);