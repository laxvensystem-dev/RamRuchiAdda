let cart = [];
const money = n => "₹" + n;
async function loadProducts(){
  const res = await fetch("/api/products"); const products = await res.json();
  document.getElementById("products").innerHTML = products.map(p => `
    <article class="product"><div class="emoji">🥮</div><h3>${p.name}</h3>
    <p>${p.category} • ${p.unit}</p><strong>${money(p.price)}</strong>
    <br><button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">కార్ట్‌లో చేర్చండి</button></article>`).join("");
}
function addToCart(id,name,price){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,name,price,qty:1});renderCart();}
function renderCart(){const el=document.getElementById("cart");if(!cart.length){el.textContent="మీ కార్ట్ ఖాళీగా ఉంది.";return;}const total=cart.reduce((s,x)=>s+x.price*x.qty,0);el.innerHTML=cart.map(x=>`${x.name} × ${x.qty} — ${money(x.price*x.qty)}`).join("<br>")+`<hr><b>మొత్తం: ${money(total)}</b>`;}
document.getElementById("orderForm").addEventListener("submit",async e=>{e.preventDefault();if(!cart.length){document.getElementById("status").textContent="ముందుగా కార్ట్‌లో వస్తువులు చేర్చండి.";return;}const f=new FormData(e.target);const payload={customer:f.get("customer"),phone:f.get("phone"),address:f.get("address"),items:cart};const r=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});const data=await r.json();document.getElementById("status").textContent=data.message||data.error; if(r.ok){cart=[];renderCart();e.target.reset();}});
document.getElementById("year").textContent=new Date().getFullYear();loadProducts();
