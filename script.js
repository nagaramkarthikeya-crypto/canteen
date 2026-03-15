// ---------- SUPABASE CONNECTION ----------

const { createClient } = supabase

const supabaseClient = createClient(
"https://ucprzsgxrpfivthidsic.supabase.co",
"sb_publishable_CPw9GIUVThzDLoLVUBDoFg_WEYPrbCh"
)


// ---------- REGISTER ----------

async function register(){

let name=document.getElementById("name").value
let roll=document.getElementById("roll").value
let email=document.getElementById("email").value
let phone=document.getElementById("phone").value
let pass=document.getElementById("pass").value
let cpass=document.getElementById("cpass").value

if(pass!==cpass){
alert("Passwords do not match")
return
}

const {data,error}=await supabaseClient
.from("students")
.insert([
{
name:name,
roll:roll,
email:email,
phone:phone,
password:pass
}
])

if(error){

alert("Registration error: "+error.message)

}else{

alert("Registration successful")
window.location="login.html"

}

}


// ---------- LOGIN ----------

async function login(){

let email=document.getElementById("loginEmail").value
let pass=document.getElementById("loginPass").value

const {data,error}=await supabaseClient
.from("students")
.select("*")
.eq("email",email)
.eq("password",pass)

if(data && data.length>0){

alert("Login successful")

localStorage.setItem("studentEmail",email)

window.location="home.html"

}else{

alert("Invalid email or password")

}

}


// ---------- HOT DEALS ITEMS ----------

const deals=[

{
name:"Chicken Biryani",
price:120,
rating:4.5,
img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
},

{
name:"Dosa",
price:30,
rating:4.2,
img:"https://images.unsplash.com/photo-1589308078055-eb5c1a7d1f02"
},

{
name:"Idly",
price:25,
rating:4.3,
img:"https://images.unsplash.com/photo-1625943555419-56a2cb596640"
},

{
name:"Fried Rice",
price:90,
rating:4.4,
img:"https://images.unsplash.com/photo-1604908177522-4322b70d05f9"
},

{
name:"Noodles",
price:80,
rating:4.1,
img:"https://images.unsplash.com/photo-1585032226651-759b368d7246"
}

]


// ---------- LOAD HOT DEALS ----------

let container=document.getElementById("dealsContainer")

if(container){

deals.forEach((item,index)=>{

container.innerHTML+=`

<div class="deal-card">

<img src="${item.img}">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<p>⭐ ${item.rating}</p>

<button onclick="addToCart(${index})">+</button>

</div>

`

})

}


// ---------- CART SYSTEM ----------

let cart=JSON.parse(localStorage.getItem("cart"))||[]

function addToCart(i){

cart.push(deals[i])

localStorage.setItem("cart",JSON.stringify(cart))

alert("Item added to cart")

}

function openCart(){
window.location="cart.html"
}

function openProfile(){
window.location="profile.html"
}


// ---------- CART PAGE ----------

let cartData=JSON.parse(localStorage.getItem("cart"))||[]

let cartDiv=document.getElementById("cartItems")

if(cartDiv){

if(cartData.length==0){

cartDiv.innerHTML="No Order"

}else{

let total=0

cartData.forEach(item=>{

cartDiv.innerHTML+=`<p>${item.name} - ₹${item.price}</p>`

total+=item.price

})

document.getElementById("total").innerText="Total ₹"+total

}

}


// ---------- PAYMENT ----------

function payNow(){

alert("Order placed. 8 minutes to prepare.")

setTimeout(()=>{

alert("Order Ready")

},480000)

}


// ---------- PROFILE ----------

async function loadProfile(){

let email=localStorage.getItem("studentEmail")

const {data,error}=await supabaseClient
.from("students")
.select("*")
.eq("email",email)

let profileDiv=document.getElementById("profile")

if(profileDiv && data && data.length>0){

let user=data[0]

profileDiv.innerHTML=`

<p>Name: ${user.name}</p>
<p>Roll: ${user.roll}</p>
<p>Email: ${user.email}</p>
<p>Phone: ${user.phone}</p>

`

}

}

loadProfile()


function deleteAccount(){

localStorage.removeItem("studentEmail")

alert("Account deleted")

window.location="register.html"

}