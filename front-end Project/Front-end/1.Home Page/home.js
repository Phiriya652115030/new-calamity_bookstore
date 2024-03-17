let dropdownBtn = document.getElementById("drop-text");
let list = document.getElementById("list-category");
let icon = document.getElementById("icon");
let input = document.getElementById("search-input");
let listItem = document.querySelectorAll(".dropdown-list-item");

//show dropdown list when click
dropdownBtn.onclick = function () {
    //rotate arrow icon
    if(list.classList.contains('show')){
        icon.style.rotate = "0deg"
    }else{
        icon.style.rotate = "-180deg" 
    }
    list.classList.toggle("show");

};

//hide dropdown list when click out side
window.onclick = (e) => {
    if (
        e.target.id !== "drop-text" &&
        e.target.id !== "span" &&
        e.target.id !== "icon" 
    ) {
        list.classList.remove("show")
        icon.style.rotate = "0deg"
    }
};


for(item of listItem) {
    item.onclick = (e) => {
    
        //change dropdown btn text
        span.innerText = e.target.innerText;

        //change input placeholde text
        if (e.target.innerText == "All category"){
            input.placeholder = "Find your favorite book...";
        } else {
            input.placeholder = "Your category are " + e.target.innerText + "..."
        }
        
    };
}