window.addEventListener("load",() => {

//-- Click on detail
$("ul.menu-items > li").on("click",function(){
	$("ul.menu-items > li").removeClass("active");
	$(this).addClass("active");
})

$(".attr,.attr2").on("click",function(){
	var clase = $(this).attr("class");

	$("." + clase).removeClass("active");
	$(this).addClass("active");
})

//-- Click on QUANTITY
$(".btn-minus").on("click",function(){
	var now = $(".inputQty").val();
	if ($.isNumeric(now)){
		if (parseInt(now) -1 > 0){ now--;}
		$(".inputQty").val(now);
	}else{
		$(".inputQty").val("1");
	}
})

$(".btn-plus").on("click",function(){
	var now = $(".inputQty").val();
	if ($.isNumeric(now)){
		$(".inputQty").val(parseInt(now)+1);
	}else{
		$(".inputQty").val("1");
	}
})



})



/*
let cart = {};

const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));

if(carritoGuardado.length) {
    //Si el carrito no esta vacio lo completo
}

function addToCart(product){
	var productName = product.getAttribute("data-name");
	var price = product.getAttribute("data-price");

	cart[productName] = price;
	alert(productName + " successfully added to cart");


	console.log(cart);
	sessionStorage.setItem("myCart", JSON.stringify(cart));
}

function getCart(){
	var test = sessionStorage.getItem("myCart");
	console.log(JSON.parse(test));
}

function clearCart(){
	sessionStorage.removeItem("myCart");
}

function display(){
	var cart = JSON.parse(sessionStorage.getItem("myCart"));

	var content='';
	for (var key in cart) {
		var name = key; //B
		var price = cart[key];	 //15
	 	content += '<tr><td>'+name+'</td><td>'+price+'</td></tr>';
	}

	document.getElementById("cartTable").innerHTML = content;

}
*/