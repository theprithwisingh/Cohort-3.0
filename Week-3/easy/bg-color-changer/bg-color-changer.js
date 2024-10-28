// const body = document.getElementsByTagName("body");
// const button = document.getElementsByTagName("button");
// const value = button.value;
// console.log(value)
// const colArray = ["red", "yellow", "white", "purple", "yellow", "green", "", ""]
// const changeBG=()=>{
//     console.log("yes")
// }

const changeBG = (button) => {
    const color = button.value; // Get the value attribute of the clicked button
    document.body.style.backgroundColor = color; // Set the background color
}
changeBG();