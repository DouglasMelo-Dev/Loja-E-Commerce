// cart

let cartIcone = document.querySelector("#cart__icone");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close__cart");

//abre carrinho
cartIcone.addEventListener('click', () =>{
    cart.classList.toggle("active");

})
//fecha carrinho
closeCart.addEventListener('click', ()=>{
    cart.classList.remove('active')
})

//trabalhando no carrinho

if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);

}else {
    ready();
}

//fazendo funcoes

function ready(){
    //remove itens do carrinho

    let botaoRemove = document.getElementsByClassName('cart__remove')
    /* console.log(botaoRemove)  */

    for(let i = 0; i < botaoRemove.length; i++){
        let button = botaoRemove[i];
        button.addEventListener('click', removeCartItem)
    }
    // quantidade de mudancas 

    let quantityInputs = document.getElementsByClassName('cart__quantity')
    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    let addCart = document.getElementsByClassName("add__cart")
    for(let i = 0; i < addCart.length; i++){
        let button = addCart[i]
        button.addEventListener('click', addCartClicked)
}

//remove item do carrinho

function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal()
}

function quantityChanged(event){
    let input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal()
}
//adiciona no carrinho:

function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product__title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product__img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg){

    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart__box")
    let cartItems = document.getElementsByClassName("cart__content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart__product-title");

    for(let i = 0; i < cartItemsNames.length; i++){
        alert("Voce tem ainda que adicionar os itens no carrinho") 
        return;
    }
}    

let cartBoxContent = `

                    <img src="${productImg}" alt="produto-2" class="cart__img">

                    <div class="detail__box">
                        <div class="cart__product-title">${title}</div>
                        <div class="cart__price">${price}</div>
                        <input type="number" value="1" class="cart__quantity">
                    </div>
                    <!--remove cart-->
                    <i class="fa-solid fa-trash cart__remove"></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart__remove")[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName("cart__quantity")[0].addEventListener('change', quantityChanged);

 
//atualiza o total

function updateTotal(){

    let cartContent = document.getElementsByClassName("cart__content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart__box");
    var total = 0

    for (let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElemnt = cartBox.getElementsByClassName("cart__price")[0];
        let quantityElement = cartBox.getElementsByClassName('cart__quantity')[0];
        let price = parseFloat(priceElemnt.innerText.replace("R$", ""));
        let quantity = quantityElement.value;
        total = total + price * quantity;

        /* se o valor tiver centavos, para deixar com duas casas apos virgula */

        total = Math.round(total * 100)/100

        document.getElementsByClassName('total__price')[0].innerText = "R$" + total;
    }
}}
