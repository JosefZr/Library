const add = document.querySelector(".adding");
const closeBtn = document.querySelector(".close");
const addBtn = document.querySelector(".add-btn");
let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");
let readState= document.getElementById("read");
let error = document.querySelector(".error");
let read = document.querySelector('.read');
class  Book {
    constructor(title, author, pages, read = false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
}
let databooks ;

if(localStorage.books !=null)
    databooks =JSON.parse (localStorage.books);//hna les donnes n7wlohom mn string l data numbers
else 
    databooks =[];
//save localstorage
function adding() {
    add.style.opacity = "1";
    add.style.display="block"
    add.style.transform = "translate(0, 0)"; // Add this line for animation
    // Add this line for animation
}


function closingBtn() {
    add.style.opacity = "0";
    add.style.display="none"
    add.style.transform = "translate(0, 100%)"; // Add this line for animation
    // Add this line for animation
}

addBtn.addEventListener("click", function () {
    if (title.value !== "" && author.value !== "" && pages.value !== "") {
        // Get the value of the checkbox
        let isRead = readState.checked ? 'completed' : 'On progress';

        // Create a new book object
        let newBook =new Book(title.value,author.value,pages.value,isRead);

        // Add the new book to the array
        databooks.push(newBook);

        // Save the updated array to localStorage
        localStorage.setItem("books", JSON.stringify(databooks));

        // Hide the error message
        error.style.display = "none";
        closingBtn()
        // Clear input fields and update the displayed books
        cleardata();
        showdata();
    } else {
        // Display an error message if fields are not filled
        error.style.display = "block";
    }
});
function cleardata(){
    title.value="";
    author.value="";
    pages.value="";
    readState.checked=false;
}
function deleteBooks(i) {
    databooks.splice(i, 1);
    localStorage.setItem("books", JSON.stringify(databooks)); // Update localStorage
    showdata();
}
function showdata() {
    let table = '';
    for (let i = 0; i < databooks.length; i++) {
        table += `
        <div class="card">
            <h1>${databooks[i].title}</h1>
            <h2>by ${databooks[i].author}</h2>
            <p>pages:${databooks[i].pages}</p>
            <div class="buttons">
                <button class="read" onclick='readcondition(${i})'>${databooks[i].read === "completed" ? "read" : "Not read"}</button>
                <button class="remove" onclick='deleteBooks(${i})'>delete</button>
            </div>
            <p class="progress">${databooks[i].read }</p>
        </div>
        `;
    }
    document.querySelector('.books .container').innerHTML = table;
}
function readcondition(i) {
    const readButton = document.querySelectorAll('.read')[i];
    if (readButton.innerHTML === "read") {
        readButton.innerHTML = "Not read";
        databooks[i].read = "On progress";
        localStorage.setItem("books", JSON.stringify(databooks)); // Update localStorage
        showdata();
    } else if (readButton.innerHTML === 'Not read') {
        readButton.innerHTML = "read";
        databooks[i].read = "completed";
        localStorage.setItem("books", JSON.stringify(databooks)); // Update localStorage
        showdata();
    }
}

// Initialize databooks from localStorage if available
const storedBooks = localStorage.getItem("books");
if (storedBooks) {
    databooks = JSON.parse(storedBooks);
}

// Display the initial data
showdata();