// All imports 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"
import { auth, db } from './config.js'

// selectors and variables
let userImage = document.querySelector('#profileImage');
let signOutBtn = document.querySelector('#logout');
let userAvatar = document.querySelector('.nav-icons');
let searchInput = document.querySelector('.searchInput');
let productsDiv = document.querySelector('.products');

let productsArr = [];

// check user login or not 
function checkUserStatus() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);

      const q = query(collection(db, "data"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      let userData;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
        console.log(userData);
        userImage.src = userData.profileUrl;
      });
    } else {
      console.log('no user');
      userAvatar.innerHTML = `<button class="h-login bg-white px-3 py-2 w-[5.5rem] rounded hover:text-[blue] hover:"><a href="login.html">login</a></button>`;
    }
  });
}

checkUserStatus();

// signout function 
signOutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log("signOut successfully");
  }).catch((error) => {
    console.log('signOut error ==>' + error);
  });
});

// get products data from firestore 
async function getData() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    productsArr.push(doc.data());
  });
  renderProducts();
}

getData();

// render products data 
function renderProducts(products = productsArr) {
  console.log(products);
  
  productsDiv.innerHTML = "";
  products.forEach((item) => {
    productsDiv.innerHTML += `
    <div class="card bg-base-100 w-full md:w-96 p-4 shadow-xl flex flex-col rounded-lg overflow-hidden transition-transform transform hover:scale-105">
  <figure class="flex justify-center mb-4">
    <img class="proImg w-[400px] h-[250px] object-cover rounded-lg" src="${item.productPic}" alt="${item.productTitle}">
  </figure>
  <div class="card-body flex-1 flex flex-col justify-between">
    <h2 class="card-title text-lg md:text-xl font-bold mb-2">${item.productTitle}</h2>
    <p class="text-sm md:text-base font-semibold  text-gray-700">${item.productPrice}</p>
    <p class="text-xs md:text-sm text-gray-600 flex-1">${item.productDesc}</p>
    <div class="card-actions justify-end mt-4">
      <button id="more" class="btn btn-primary">More...</button>
    </div>
  </div>
</div>


    `;
  });

  // Add event listeners to "More..." buttons
  let moreButtons = document.querySelectorAll('#more');
  moreButtons.forEach((moreBtn, index) => {
    moreBtn.addEventListener('click', () => {
      console.log(products[index]);
      localStorage.setItem('singleProduct', JSON.stringify(products[index]));
      window.location = "singleProduct.html";
    });
  });
}

// Search functionality
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  const filteredProducts = productsArr.filter(product =>
    product.productTitle.toLowerCase().includes(query)
  );
  console.log(filteredProducts);

  renderProducts(filteredProducts);
});
