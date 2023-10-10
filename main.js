var button = document.querySelector("#submitbtn");
var productContainer = document.querySelector("#productContainer"); 
var form = document.getElementById("productform"); 

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const amountInput = document.getElementById('amount');
    const descriptionInput = document.getElementById('productName');
    const categorySelect = document.getElementById('category'); 

    const productData = {
        amount: amountInput.value,
        name: descriptionInput.value,
        cat: categorySelect.options[categorySelect.selectedIndex].value,
    };
    axios.post("https://crudcrud.com/api/0b201c556db4462f86bd258eaf9ac3fd/productsdata", productData)
    .then(data=>{
        if(data){displayProduct(data.data);}
        form.reset();
    }).catch(err =>{
        console.error(err)
    }) ;
    
});

function showAllProducts() {
    axios.get("https://crudcrud.com/api/0b201c556db4462f86bd258eaf9ac3fd/productsdata")
        .then(response => {
            const products = response.data;
            products.forEach(product => {
                displayProduct(product);
            });
        })
        .catch(err => {
            console.error(err);
        });
}


function displayProduct(product) {
    const uniqueId = product._id;
    const productDiv = document.createElement("div");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    deleteButton.className = "btn-sm btn-danger ml-4 mt-2 mb-2";
    editButton.className = "btn-sm btn-primary ml-2 mt-2 mb-2";
    deleteButton.textContent = "Delete";
    editButton.textContent = "Edit";
    const productCategory = document.getElementById(product.cat);

    deleteButton.addEventListener("click", function () {
        productDiv.remove();
        deleteUser(uniqueId);
    });

    editButton.addEventListener("click", function(){
        axios.get(`https://crudcrud.com/api/0b201c556db4462f86bd258eaf9ac3fd/productsdata/${uniqueId}`)
        .then(response => {
            const user = response.data;
            document.getElementById("productName").value = product.name;
            document.getElementById("category").value = product.cat;
            document.getElementById("amount").value = product.amount;
        })
        .catch(err => {
            console.error(err);
        });
        
        productDiv.remove();
        deleteUser(uniqueId);
        
    });
    // const productDet = document.createElement("p");
    productDiv.innerHTML = `

        <p class="ml-4 mt-2 mb-2"><strong>Product Name:</strong> ${product.name}</p>
        <p class="ml-4 mt-2 mb-2"><strong>Category:</strong> ${product.cat}</p>
        <p class="ml-4 mt-2 mb-2"><strong>Price:</strong> ${product.amount}</p>
    `;
  

    // productDiv.appendChild(productDet);
    productDiv.className = "alert-primary d-flex border rounded mt-2 align-text-center";
    productDiv.appendChild(deleteButton);
    productDiv.appendChild(editButton);

    productCategory.appendChild(productDiv);
    form.reset;
}

function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/0b201c556db4462f86bd258eaf9ac3fd/productsdata/${userId}`)
        .then(response => {
            console.log("User deleted:", response);
        })
        .catch(err => {
            console.error(err);
        });
}

showAllProducts();