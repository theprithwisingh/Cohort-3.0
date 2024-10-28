
 const changeColor=()=>{
    let randomColor = Math.floor(Math.random() * 16777215);
    let hexColor = "#" + randomColor.toString(16).padStart(6, '0');
    console.log(hexColor);
    document.body.style.backgroundColor = hexColor;
 }
 changeColor();

 document.addEventListener('click', function() {
    document.body.style.backgroundColor =  changeColor();
});