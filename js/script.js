
const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const totalContainer = document.getElementById("total");
const cartCount = document.getElementById("cartCount");
const clearCartButton = document.getElementById("clear-cart");



fetch("../products.json")
.then(response => response.json())
.then(products => {
    localStorage.setItem("products", JSON.stringify(products));

});


let cont = document.querySelector(".container-100");
let loadMoreButton = document.querySelector(".container-100 .button");

let initialItems = 6;
let loadItems = 3;

function loadInitialItems(){
    let products = JSON.parse(localStorage.getItem("products"));
    let out = "";
    let counter = 0;
    for(let product of products){
        if(counter < initialItems){
            out+=
            `     
            <div class="col-md-4 col-sm-1 product">
            <div class="card card-cover overflow-hidden text-bg-dark rounded-4">
                <img src = "${product.img}" class = "card-img-top" alt= "${product.nom}">
            </div>
            <div class="image-container">
                <div class="d-flex justify-content-between align-items-start">
                <h6 class= "card-title pt-1 display-6 lh-1 fw-bold fs-2">${product.nom}</h6>

                <div class="d-flex justify-content-between align-items-end">   
                    <button
                            data-id="${product.id}"
                            data-nom="${product.nom}"
                            data-img="${product.img}"
                            data-description="${product.description}"
                            data-prix="${product.prix}"
                            class = "btn text-primary voir-details"  
                            data-bs-toggle="modal" 
                            data-bs-target="#productModal">
                            <i class="fa-solid fa-eye fs-4"></i>
                    </button>

                    <button
                            data-id="${product.id}"
                            data-nom="${product.nom}"
                            data-img="${product.img}"
                            data-description="${product.description}"
                            data-prix="${product.prix}"
                            class = "btn text-primary add-to-cart">
                            <i class="fa-solid fa-cart-plus fs-4"></i>
                    </button>
                </div>
            </div>
            </div>
        
            </div>
        `;
        }
        counter++;
    }
    let div = document.createElement("div");
    div.classList.add("row");
    div.innerHTML = out;
    
    cont.insertBefore(div, loadMoreButton); 
}



function loadData(){
    let products = JSON.parse(localStorage.getItem("products"));
    let currentDisplayedItems = document.querySelectorAll(".product").length;

    let out = "";
    let counter = 0;
    for(let product of products){
        if(counter >= currentDisplayedItems && counter < loadItems + currentDisplayedItems){

            out+=
            `     
            <div class="col-md-4 col-sm-1 product">
            <div class="card card-cover overflow-hidden text-bg-dark rounded-4">
                <img src = "${product.img}" class = "card-img-top" alt= "${product.nom}">
            </div>
            <div class="image-container">
                <div class="d-flex justify-content-between align-items-start">
                <h6 class= "card-title pt-1 display-6 lh-1 fw-bold fs-2">${product.nom}</h6>

                <div class="d-flex justify-content-between align-items-end">   
                    <button
                            data-id="${product.id}"
                            data-nom="${product.nom}"
                            data-img="${product.img}"
                            data-description="${product.description}"
                            data-prix="${product.prix}"
                            class = "btn text-primary voir-details"  
                            data-bs-toggle="modal" 
                            data-bs-target="#productModal">
                            <i class="fa-solid fa-eye fs-4"></i>
                    </button>

                    <button
                            data-id="${product.id}"
                            data-nom="${product.nom}"
                            data-img="${product.img}"
                            data-description="${product.description}"
                            data-prix="${product.prix}"
                            class = "btn text-primary add-to-cart">
                            <i class="fa-solid fa-cart-plus fs-4"></i>
                    </button>
                </div>
            </div>
            </div>
        
            </div>
        `;
    }
    counter++;
    }

    let div = document.createElement("div");
    div.classList.add("row fade-element");
    div.innerHTML = out;   
    cont.insertBefore(div, loadMoreButton); 

    if(document.querySelectorAll(".product").length == products.length)
    {
       loadMoreButton.classList.add("hide");
    }

    fadeIn(div);
}


function fadeIn(div){
    let opacity = 0;
    let interval = setInterval(function(){
        if(opacity <= 1){
            opacity = opacity + 0.02;
            div.style.opacity = opacity;
        }
        else{
            clearInterval(interval);
        }
    },50);
}

loadInitialItems();


//Boton details
document.querySelectorAll(".voir-details").forEach(button =>{
    button.addEventListener("click", (event) =>{
            const buttonClicked = event.target.closest('button');
            const id = buttonClicked.getAttribute("data-id");
            const img = buttonClicked.getAttribute("data-img");
            const nom = buttonClicked.getAttribute("data-nom");
            const prix = buttonClicked.getAttribute("data-prix");
            const description = buttonClicked.getAttribute("data-description");

            showProductModal(id, img, nom, prix, description);
        
    });


    function showProductModal(id, img, nom, prix, description)
    {
        const modalTitle = document.getElementById("modal-title");

        modalTitle.textContent = nom;

        const modalBody = document.getElementById("modal-body");

        modalBody.innerHTML = 
        `<div class="text-center">
            <img src="${img}" class="img-fluid mb-3" alt="${nom}">
        </div>
        <p class="text-center"> ${description}</p>
        <p class="text-center"> ${prix} $</p>
        `;

    }

});


let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Boton AddCart
document.querySelectorAll(".container-100").forEach(button =>{

    button.addEventListener("click", (event) =>{
        if (event.target.closest(".add-to-cart")) {
            const buttonClicked = event.target.closest('button');
            const id = buttonClicked.getAttribute("data-id");
            const img = buttonClicked.getAttribute("data-img");
            const nom = buttonClicked.getAttribute("data-nom");
            const prix = buttonClicked.getAttribute("data-prix");
           
            addtToCart(id, img, nom, prix);
        }
   });

});
 

document.querySelectorAll("#addCartModal").forEach(button =>{

    button.addEventListener("click", (event) =>{
        if (event.target.closest(".add-to-cart")) {
            const buttonClicked = event.target.closest('button');
            const id = buttonClicked.getAttribute("data-id");
            const img = buttonClicked.getAttribute("data-img");
            const nom = buttonClicked.getAttribute("data-nom");
            const prix = buttonClicked.getAttribute("data-prix");
           
            addtToCart(id, img, nom, prix);
        }
   });

});

        
function addtToCart(id, img, nom, prix)
{
    const existingItem = cart.find(item => item.id === id);
    
    if(existingItem)
    {
        existingItem.quantity++;
    }
    else
    {
         cart.push({id, img, nom, prix, quantity: 1});
    }   

    updateCart();
    saveCart();
}


function updateCart()
{
    cartContainer.innerHTML = "";
    let total = 0;
    let itemCount = 0;
        
    cart.forEach(item => {
        total += item.prix * item.quantity;
        itemCount += item.quantity;
        
        const listItem = document.createElement("li");
        
        listItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span> ${item.quantity} x ${item.nom} = ${(item.prix * item.quantity).toFixed(2)}</span>
                <button class="btn remove-item ms-2 btn-panier" data-id="${item.id}"> 
                    <i class="fas fa-trash-alt"></i> 
                </button>
            </div>
        `;

            cartContainer.appendChild(listItem);
    });

    totalContainer.textContent = total.toFixed(2);
    cartCount.textContent = itemCount;
        
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonClicked = e.target.closest('button');
            const id = buttonClicked.getAttribute('data-id')
        
                removeFromCart(id);
        });
        
    });
        
    displayClearCartButton();

}
 


        
function removeFromCart(id)
{
    const index = cart.findIndex(item => item.id === id);
        
    if (index !== -1) 
    {
        if(cart[index].quantity > 1)
        {
            cart[index].quantity--;
        }
        else
        {
            cart.splice(index,1)
        }    
    }

    updateCart();
    saveCart();     
}

function saveCart()
{
    localStorage.setItem("cart", JSON.stringify(cart));
}

    
   
function clearCart()
{
    cart = [];
    saveCart();
    updateCart();
}


function displayClearCartButton()
{
    if(cart.length > 0)
    {
        clearCartButton.style.display = "block";
    }
    else
    {
        clearCartButton.style.display = "none";
    }
}


updateCart();

clearCartButton.addEventListener("click", () => {
    if(confirm("Voulez-vous vraiment vider votre panier ?"))
    {
        clearCart();
    }
    else
    {

    }
});  




const arrow = document.getElementById('button-fleche');

window.addEventListener("scroll", () => { 
    if (window.scrollY > 900) {
    
            arrow.classList.add("ajouter") ;
    }    
    else
    {
        arrow.classList.remove("ajouter");
    }
    
});

arrow.addEventListener("click", () => {   
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    
});






//CONTACT

const submitButton = document.getElementById("submit");

submitButton.addEventListener ('click', function(event){

        event.preventDefault();


       if(validateForm()){

           alert('Message envoyé avec succès !');
            const modalElem = document.getElementById("contactModal");
            const modal = bootstrap.Modal.getInstance(modalElem);  
            modal.hide();
        
            const form = document.getElementById("contactForm"); 
            form.resert();  
        }
        
    });

function validateForm(){

        function showError(input, message)
        {
                const feedback = input.nextElementSibling;
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
                feedback.textContent = message;
        }
    
    
        function showSuccess(input)
        {
                const feedback = input.nextElementSibling;
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                feedback.textContent = "";
        }
           

        let isValid = true;

        const name = document.getElementById("name");

        if(name.value.trim() === "")
        {
            showError(name, "Veuillez entrer votre nom.");
            isValid = false;
        }
        else if (name.value.length < 3) {
            showError(name, "Le nom doit contenir au moins 3 caractères.");
            isValid = false;
        }
        else
        {
            showSuccess(name);
        }

        const email = document.getElementById("email");

        const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,3}$/;

        if(!emailPattern.test(email.value)){
            showError(email, "Veuillez entrer une adresse valide.");
            isValid = false;
        }
        else
        {
            showSuccess(email);
        }


        const message = document.getElementById("message-text");

        if(message.value.length < 10){
            showError(message, "Le message doit contenir au moins 10 caractères.");
            isValid = false;
        }
        else
        {
            showSuccess(message);
        }
    


       return isValid;
    }        
        
   


