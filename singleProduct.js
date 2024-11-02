import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"

import { auth, db } from './config.js'


let userImage =document.querySelector('#profileImage')
let signOutBtn = document.querySelector('#logout')
let userAvatar =document.querySelector('.nav-icons')

function checkUserStatus() {

    onAuthStateChanged(auth, async (user) => {
  
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
  
        const q = query(collection(db, "data"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        let userData;
        querySnapshot.forEach((doc) => {
          userData = doc.data()
          console.log(  userData);
          
          userImage.src = userData.profileUrl
        });
  
  
  
  
      }
  
      else {
        console.log('no user');
       userAvatar.innerHTML = `<button class = "h-login">  <a href="login.html">login</a> </button>`
  
  
      }
    });
  
  }
  
  checkUserStatus()
  
  signOutBtn.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
      console.log("signOut successfully");
      
    }).catch((error) => {
      console.log('signOut error ==>' + error );
      
    });
  })


let getLocalData = JSON.parse(localStorage.getItem('singleProduct'))
console.log(getLocalData);
let display = document.querySelector('.product-container')


display.innerHTML = `<div class="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-4 md:p-6 mx-auto mt-4 max-w-screen-lg">
    <div class="product-image flex-shrink-0 mb-4 md:mb-0 md:mr-4">
        <img src="${getLocalData.productPic}" alt="Product Image" class="rounded-lg object-cover w-full h-48 md:h-64">
    </div>
    <div class="product-details flex-1">
        <h1 class="text-2xl font-bold mb-2">${getLocalData.productTitle}</h1>
        <p class="product-description text-gray-700 mb-4">
            ${getLocalData.productDesc}
        </p>
        <p class="product-price text-xl font-semibold text-green-600 mb-4">${getLocalData.productPrice} Rs.</p>
        <button class="add-to-cart bg-[#4c68fe] text-white py-2 px-4 rounded hover:bg-[#3b54d4] transition duration-300">
            Add to Cart
        </button>
    </div>
</div>

`


