var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var updateStorage = 0;

var productsContainer;
if (localStorage.getItem("myProducts") != null) {
  productsContainer = JSON.parse(localStorage.getItem("myProducts")); //hatraga3 li JSON tany
  displayProducts(productsContainer);
} else {
  productsContainer = [];
}

addBtn.onclick = function () {
  if (validateProductName() == true) {
    if (addBtn.innerHTML == "Update") {
      addBtn.innerHTML = "Add Product";
      var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
      };
      productsContainer.splice(updateStorage, 1, product);
    } else {
      var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
      };
      productsContainer.push(product);
    }
    localStorage.setItem("myProducts", JSON.stringify(productsContainer)); // 3ashan yb2a kolo string wi ta5azen fi local

    clearForm();
    displayProducts(productsContainer);
  } else {
    alert("product name invalid");
  }
};

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

function displayProducts(list) {
  var cartona = ``;
  for (var i = 0; i < list.length; i++) {
    cartona += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].name} </td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].description}</td>
        <td><button onclick="setFormForUpdate(${i})" class="btn btn-sm btn-outline-warning ">Update</button></td>
        <td><button onclick="deleteProducts(${i})"  class="btn btn-sm btn-outline-danger ">Delete</button></td>
       </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function searchProducts(searchTerm) {
  var searchResult = [];
  for (var i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      searchResult.push(productsContainer[i]);
    }
  }

  displayProducts(searchResult);
}

function deleteProducts(deletedIndex) {
  productsContainer.splice(deletedIndex, 1);
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));

  displayProducts(productsContainer);
}

function setFormForUpdate(updatedindex) {
  productNameInput.value = productsContainer[updatedindex].name;
  productPriceInput.value = productsContainer[updatedindex].price;
  productCategoryInput.value = productsContainer[updatedindex].category;
  productDescriptionInput.value = productsContainer[updatedindex].description;

  updateStorage = updatedindex;
  updateBtn.innerHTML = "Update";
  console.log(updateStorage);
}

function validateProductName() {
  var regex = /^[A-Za-z0-9 +]{3,20}$/;
  if (regex.test(productNameInput.value) == true) {
    productNameInput.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    return false;
  }
}

function setFormForUpdate(updatedindex) {
  productNameInput.value = productsContainer[updatedindex].name;
  productPriceInput.value = productsContainer[updatedindex].price;
  productCategoryInput.value = productsContainer[updatedindex].category;
  productDescriptionInput.value = productsContainer[updatedindex].description;

  updateStorage = updatedindex;
  addBtn.innerHTML = "Update";
}
