$(document).ready(function() {
	//#region AJAX LS REQUESTS
	ajaxCallBack("nav.json", function(result) {
		setLS("nav", result);
    })
	ajaxCallBack("products.json", function(result) {
		setLS("products", result);
    })
	ajaxCallBack("categories.json", function(result) {
		setLS("categories", result);
    })
	ajaxCallBack("brands.json", function(result) {
		setLS("brands", result);
    })
	ajaxCallBack("sort.json", function(result) {
		setLS("sort", result);
    })
	ajaxCallBack("reviews.json", function(result) {
		setLS("reviews", result);
    })
	var nav = getLS("nav");
	var products = getLS("products");
	var categories = getLS("categories");
	var brands = getLS("brands");
	var sort = getLS("sort");
	//#endregion

	//#region DYNAMIC NAV
	let navHTML = "";

	for (const link of nav) {
		navHTML += `
		<li class="nav-item px-3">
			<a aria-current="page" href="${link.link}">${link.name}</a>
		</li>
		`;
	}
	$("#responsive-nav>.main-nav").html(navHTML);

	$(".menu-toggle > a").on("click", function (e) {
		e.preventDefault();
		$("#responsive-nav").toggleClass("active");
	})
	//#endregion

	//#region URL
		if (location.pathname == "/tehnotron/index.html" || location.pathname == "/tehnotron/") {
		// if (location.pathname == "/index.html") {
			console.log(location.pathname)
			$("#responsive-nav ul li:nth-child(1)").addClass("active");
			//#region HOME - COLLECTIONS
			let categoryHTML = "";

			for (const category of categories) {
				categoryHTML += `
					<div class="col-md-3 p-md-0 p-4">
						<div class="shop">
							<a href="store.html?cat=${category.id}">
								<div class="shop-img">
									<img src="assets/img/shop0${category.id}.png" alt="collections" />
								</div>
								<div class="shop-body">
									<h3>${category.name}<br>Collection</h3>
								</div>
							</a>
						</div>
					</div>
				`;
			}
			$("#collections").html(categoryHTML);
			//#endregion

			//#region HOME - NEW PRODUCTS SECTION DYNAMIC
			var newProducts = products.filter(element => element.is_new == true);

			$("#new-products .swiper .swiper-wrapper").html(getProducts(newProducts, "product swiper-slide"));
			//#endregion
			
			//#region HOME - SALE COUNTER
			setInterval(function() { makeTimer(); }, 1000);
			//#endregion
		}

		else if (location.pathname == "/tehnotron/store.html") {
		// else if (location.pathname == "/store.html") {
			$("#responsive-nav ul li:nth-child(2)").addClass("active");
			//#region STORE - PRODUCTS
			$("#store>#store-products").html(getProducts(products, "product col-lg-4 col-sm-6 my-3"));
			//#endregion

			//#region STORE - SORT	
			let htmlSort = "";
			htmlSort = `<option value="0">Recommended</option>`;
			for (const type of sort) {
				htmlSort += `<option value="${type.value}">${type.name}</option>`;
			}
			$("#ddlSort").html(htmlSort);

			$("#ddlSort").on("change", productsFilterAndSort);
			//#endregion

			//#region STORE - CATEGORIES
			let rbCatHTML = "";
			rbCatHTML += `
				<div class="input-radio form-check">
					<input class="form-check-input" type="radio" id="rb0" name="rbCat" value="0" checked>
					<label class="form-check-label" for="rb0">
						<span></span>
						All
						<small>(${products.length})</small>
					</label>
				</div>
				`;
			for (const category of categories) {
				rbCatHTML += `
				<div class="input-radio form-check">
					<input class="form-check-input" type="radio" id="rb${category.id}" name="rbCat" value="${category.id}">
					<label class="form-check-label" for="rb${category.id}">
						<span></span>
						${category.name}
						<small>(${getNum(products, category.id, "category")})</small>
					</label>
				</div>
				`;
			}
			$("#rbListCategory").html(rbCatHTML);

			$(`#rbListCategory input[type="radio"]`).on("change", productsFilterAndSort);
			//#endregion

			//#region STORE - BRANDS
			let chbBrandHTML = "";
			for (const brand of brands) {
				chbBrandHTML += `
				<div class="input-checkbox form-check">
					<input class="form-check-input" type="checkbox" id="chb${brand.id}" value="${brand.id}">
					<label for="chb${brand.id}">
						<span></span>
						${brand.name}
						<small>(${getNum(products, brand.id, "brand")})</small>
					</label>
				</div>
				`;
			}
			$("#chbListBrands").html(chbBrandHTML);

			$(`#chbListBrands input[type="checkbox"]`).on("change", productsFilterAndSort);
			//#endregion

			//#region STORE - PRICE
			$("#range-value").html($("#rPrice").val() + " €");
			$("#rPrice").on("input", function() {
				$("#range-value").html($(this).val() + " €");
				productsFilterAndSort();
			});
			//#endregion

			//#region STORE - VIEWS
			$("#store-grid-cells").on("click", function() {
				$(this).addClass("active");
				$("#store-grid-list").removeClass("active");
				productsFilterAndSort();
			});
			$("#store-grid-list").on("click", function() {
				$(this).addClass("active");
				$("#store-grid-cells").removeClass("active");
				productsFilterAndSort();
			});
			//#endregion

			const params = new URLSearchParams(window.location.search);
			const cat = params.get("cat");
			if (cat != null) {
				var radio = $("#rbListCategory input")[cat];
				radio.checked = true;
				var filteredProducts = products.filter(element => element.category_id == cat);
				$("#store>#store-products").html(getProducts(filteredProducts, "product col-lg-4 col-sm-6 my-3"));
			}
		}

		else if (location.pathname == "/tehnotron/product.html") {
		// else if (location.pathname == "/product.html") {
			getProductPage(products);

			//#region PRODUCT - IMG CHANGE
			$("#product-imgs img").on("click", function() {
				let smallSrc = $(this).attr("src");
				smallSrc = smallSrc.slice(0, -5) + smallSrc.slice(-4);
				console.log(smallSrc)
				$("#product-main-img .product-preview img").attr("src", smallSrc);
			});
			//#endregion
		}

		else if (location.pathname == "/tehnotron/checkout.html") {
		// else if (location.pathname == "/checkout.html") {
			getOrderItems(products);

			//#region CHECKOUT - ORDER QTY
			$(document).on("change", ".order-qty",  function() {
				let num = $(this);
				console.log($(this).data("id"))
				console.log(num.val())
		
				for (const item of cartItems) {
					if (num.data("id") == item.id) {
						item.quantity = parseInt(num.val());
						break;
					}
				}
				setLS("cart", cartItems);
				// addToCart();
				getOrderItems(products);
			});
			//#endregion

			//#region CHECKOUT - FORM VALDATION
			var formSubmit = document.querySelector("#form-submit");
			if (formSubmit) {
				formSubmit.addEventListener("click", formValidation);
			}
			//#endregion
		
			//#region CHECKOUT - TRASH
			var cartItems = getLS("cart");
			$(document).on("click", ".trash", function(e) {
				e.preventDefault;
				cartItems.splice(cartItems.findIndex(element => element.id == $(this).data("id")), 1);
				setLS("cart", cartItems);
				getCartNum();
				getOrderItems(products);
			});
			//#endregion
		}

		else if (location.pathname == "/tehnotron/author.html") {
		// else if (location.pathname == "/author.html") {
			$("#responsive-nav ul li:nth-child(6)").addClass("active");
		}
	//#endregion

	//#region CART
	$(document).on("click", ".add-to-cart-btn", addToCart);
	getCartNum();
	//#endregion

	//#region WISHLIST
	$(".wishlist").on("click", function() {
		$("#wishlist-tab").show();
		$("#wishlist-tab").addClass("active");
	});
		// $(document).mouseup(function(e){
		// 	if(!$("#wishlist-tab").is(e.target) && $("#wishlist-tab").has(e.target).length === 0){
		// 		$("#wishlist-tab").hide();
		// 	}
		// });

	var wishlist = [];
	$(document).on("click", ".add-to-wishlist", addToWishlist);
	getWishNum();

	wishlist = getLS("wishlist");
	$("#wishlist-tab-content").html(getWishlistProducts(wishlist));

	$("#close-tab").on("click", function() {
		$("#wishlist-tab").removeClass("active");
	});
	//#endregion

	//#region SEARCH
	$("#header-search button").on("click", function() {
		setLS("search-temp", $("#search").val());
		if (location.pathname != "/tehnotron/store.html") {
			window.location.pathname = "/tehnotron/store.html";
		}
		else {
			productsFilterAndSort();
		}
	});
	$('#search').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);

		if(keycode == "13"){
			setLS("search-temp", $("#search").val());
			if (location.pathname != "/tehnotron/store.html") {
				window.location.pathname = "/tehnotron/store.html";
			}
		}
		else {
			productsFilterAndSort();
		}
	
	});
	$("#search").val(getLS("search-temp"));
	productsFilterAndSort();
	localStorage.removeItem("search-temp");
	//#endregion

	//#region INPUT NUMBER DISABLE
	$("[type='number']").on("keydown",function (e) {
		let windowSize = $(window).width()
		if (windowSize > 767) {
			e.preventDefault();
		}
	});
	//#endregion

	//#region FOOTER CATEGORIES
	let footerCats = "";
	for (const cat of categories) {
		footerCats += `<li><a href="store.html?cat=${cat.id}">${cat.name}</a></li>`;
	}
	$("#footer-cats").html(footerCats);
	//#endregion
});

var swiper = new Swiper('.swiper', {
	slidesPerView: 1,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},

	navigation: {
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		576: {
		slidesPerView: 2,
		spaceBetween: 30
		},
		768: {
		slidesPerView: 3,
		spaceBetween: 40
		},
		992: {
			slidesPerView: 4,
			spaceBetween: 40
		}
	}
});

function ajaxCallBack(file, result){
    $.ajax({
        url: "assets/data/" + file,
        method: "get",
        dataType: "json",
        success: result,
        error: function(jqXHR, exception){
            var msg = "";
			if (jqXHR.status === 0) {
				msg = "Not connected. Verify network.";
			}
			else if (jqXHR.status == 404) {
				msg = "Requested page not found [404]";
			}
			else if (jqXHR.status == 500) {
				msg = "Internal Server Error [500]";
			}
			else if (exception === "parseerror") {
				msg = "Requested JSON parse failed.";
			}
			else if (exception === "timeout") {
				msg = "Requested page not found [404]";
			}
			else if (exception === "abort") {
				msg = "AJAX request aborted.";
			}
			else {
				msg = "Uncaught Error." + jqXHR.responseText;
			}
			return msg;
        }
    })
}

function setLS(name, value){
    localStorage.setItem(name, JSON.stringify(value));
}

function getLS(name){
    return JSON.parse(localStorage.getItem(name));
}

function getCategory(id) {
	var categories = getLS("categories");
	for (const category of categories) {
		if (category.id == id) {
			return category.name;
		}
	}
}

function getProducts(array, div) {
	let productsHTML = "";
	
	if (array.length == 0) {
		return productsHTML = `<div class="text-center border-top border-bottom py-5" id="no-products"><i class="fa-regular fa-circle-xmark fs-1"></i><p class="fs-3 my-5">Currently we don't have products that match your request.</p></div>`;
	}

	if ($("#store-grid-list").hasClass("active")) {
		for (const product of array) {
			productsHTML += `
				<div class="${div}">
					<div class="row align-items-center">
						<div class="product-img col-4">
						<a href="product.html?id=${product.id}"><img src="${product.images[0].big}" alt="${product.name}" class="w-100" /></a>
						</div>
						<div class="product-body col-8">
							<p class="product-category">${getCategory(product.category_id)}</p>
							<h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
							<p>${product.description.short.substring(0, 200) + "..."}</p>
							<h3 class="product-price">${getPrice(product.price.current_price, "current")} ${getPrice(product.price.old_price, "old")}</h3>
							<div class="my-2">
								<button class="add-to-cart-btn" data-id="${product.id}"><i class="fa fa-shopping-cart"></i> add to cart</button>
							</div>
							<div class="product-rating fs-5">
								${getRating(product.rating)}
							</div>
							<div class="product-btns fs-5">
								${getIfWish(product.id)}
							</div>
							<div class="product-label me-4">
								${getDiscount(product.discount)}
								${getNew(product.is_new)}
							</div>
						</div>
					</div>
				</div>
			`;
		}
	}
	else {
		for (const product of array) {
			productsHTML += `
				<div class="${div}">
					<div class="product-img">
						<a href="product.html?id=${product.id}"><img src="${product.images[0].big}" alt="${product.name}" class="w-100" /></a>
						<div class="add-to-cart">
							<button class="add-to-cart-btn" data-id="${product.id}"><i class="fa fa-shopping-cart"></i> add to cart</button>
						</div>
						<div class="product-label">
							${getDiscount(product.discount)}
							${getNew(product.is_new)}
						</div>
					</div>
					<div class="product-body">
						<p class="product-category">${getCategory(product.category_id)}</p>
						<h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
						<h5 class="product-price">${getPrice(product.price.current_price, "current")} ${getPrice(product.price.old_price, "old")}</h5>
						<div class="product-rating">
							${getRating(product.rating)}
						</div>
						<div class="product-btns">
							${getIfWish(product.id)}
						</div>
					</div>
				</div>
			`;
		}
	}
	return productsHTML;
}

function getPrice(price, type) {
	if (type == "current") {
		price = price.toLocaleString("de-DE", {style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2});
		return price;
	}
	else if (type == "old") {
		if (price == null) {
			return "";
		}
		price = price.toLocaleString("de-DE", {style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2}); 
		return `<del class="product-old-price">${price}</del>`;
	}
}

function getDiscount(tagDiscount) {
	if (tagDiscount == null) {
		return "";
	}
	return `<span class="sale">-${tagDiscount}%</span>`;
}

function getNew(tagNew) {
	if (tagNew) {
		return `<span class="new fw-bold">NEW</span>`;
	}
	return "";
}

function getRating(rating) {
	let ratings = "";
	for (let i = 0; i < rating; i++) {
		ratings += `<i class="fa-solid fa-star"></i>`;
	}
	if (rating < 5) {
		for (let i = 0; i < 5 - rating; i++) {
			ratings += `<i class="fa-regular fa-star"></i>`;
		}
	}
	return ratings;
}

function makeTimer() {
	var endTime = new Date("2023-03-31");	
	endTime = (Date.parse(endTime) / 1000);

	var now = new Date();
	now = (Date.parse(now) / 1000);

	var timeLeft = endTime - now;

	var days = Math.floor(timeLeft / 86400); 
	var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
	var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
	var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

	if (hours < "10") { hours = "0" + hours; }
	if (minutes < "10") { minutes = "0" + minutes; }
	if (seconds < "10") { seconds = "0" + seconds; }

	$("#days").html(days);
	$("#hours").html(hours);
	$("#minutes").html(minutes);
	$("#seconds").html(seconds);	

}

function getNum(array, num, type) {
	type += "_id";
	var newArray = array.filter(element => element[type] == num);
	return newArray.length;
}

function getProductPage(products) {
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");
	const product = products.find(element => element.id == id);
	productContentHTML = `
		<div class="col-md-2">
			<div id="product-imgs">
				${getThumbnails(product.images)}
			</div>
		</div>
		<div class="col-md-5">
			<div id="product-main-img">
				<div class="product-preview">
					<img src="${product.images[0].big}" alt="">
				</div>
			</div>
		</div>
		<div class="col-md-5">
			<div class="product-details">
				<h2 class="product-name">${product.name}</h2>
				<div>
					<div class="product-rating">
						${getRating(product.rating)}
					</div>
					<a class="review-link" href="#product-tab">${product.review_ids.length} Review(s)</a>
				</div>
				<div>
					<h3 class="product-price">${getPrice(product.price.current_price, "current")} ${getPrice(product.price.old_price, "old")}</h3>
					<span class="product-available">In Stock</span>
				</div>
				<p>${product.description.short}</p>

				<div class="add-to-cart d-flex align-items-end my-4">
					<div class="form-group">
						<label for="quantity" class="form-label mb-2">Quantity</label>
						<input type="number" class="form-control" id="quantity" value="1" min="1" max="10" />
					</div>
					<div class="form-group">
						<button class="add-to-cart-btn btn btn-primary" data-id="${product.id}"><i class="fa fa-shopping-cart"></i> add to cart</button>
					</div>
					<div class="product-btns ms-5 fs-3">
						${getIfWish(product.id)}
					</div>
				</div>

				<ul class="product-links mt-4">
					<li>Category:</li>
					<li><a href="store.html?cat=${product.category_id}">${getCategory(product.category_id)}</a></li>
				</ul>
			</div>
		</div>
		<div class="col-md-12">
			<div id="product-tab">
				<ul class="tab-nav nav nav-tabs justify-content-center" role="tablist">
					<li class="nav-item active" role="presentation"><a class="active" data-bs-toggle="tab" data-bs-target="#tab1">Specifications</a></li>
					<li role="presentation"><a data-bs-toggle="tab" data-bs-target="#tab2">Details</a></li>
					<li role="presentation"><a data-bs-toggle="tab" data-bs-target="#tab3">Reviews (3)</a></li>
				</ul>
				<div class="tab-content">
					<div id="tab1" class="tab-pane fade show active" role="tabpanel">
						<div class="row justify-content-center">
						<h3 class="title text-uppercase text-center text-decoration-underline mb-3">Specifications</h3>
							${getSpecs(product.specifications)}
						</div>
					</div>
					<div id="tab2" class="tab-pane fade" role="tabpanel">
						<div class="row justify-content-center">
							<div class="col-md-8">
							<h3 class="title text-uppercase text-center text-decoration-underline mb-3">Details</h3>
								${product.description.long}
							</div>
						</div>
					</div>
					<div id="tab3" class="tab-pane fade" role="tabpanel">
						<div class="row justify-content-center align-items-center">
							<div class="col-md-8">
								<div id="reviews">
								<h3 class="title text-uppercase text-center text-decoration-underline mb-3">Reviews</h3>
									${getReview(product.review_ids)}
								</div>
							</div>
						</div>
					</div>
				</div>
	`;
	$("#product-content>.row").html(productContentHTML);
}

function getThumbnails(images) {
	let thumbHTML = "";
	for (const image of images) {
		thumbHTML += `
			<div class="product-preview my-2">
				<img src="${image.small}" alt="thumbnail" />
			</div>
		`;
	}
	return thumbHTML;
}

function getSpecs(specs) {
 	let specsHTML = `<div class="col-md-8"><table class="table table-striped table-hover"><tbody>`;
	for (const spec of specs) {
		specsHTML += `
			<tr>
				<td class="text-capitalize p-3">${spec.name}:</td>
				<td class="p-3">${spec.value}</td>
			</tr>
		`;
	}
	specsHTML += `</tbody></table></div>`;
	return specsHTML;
}

function getReview(reviewArray) {
	let reviewHTML = `<ul class="reviews">`;
	var reviews = getLS("reviews");
	for (const ra of reviewArray) {
		var r = reviews.find(element => element.id == ra);
		reviewHTML += `
			<li>
				<div class="review-heading">
					<h6 class="name">${r.name}</h6>
					<p class="date">${new Date(r.date).toDateString()}</p>
					<div class="review-rating">
						${getRating(r.rating)}
					</div>
				</div>
				<div class="review-body">
					<p>${r.review_text}</p>
				</div>
			</li>
		`;
	}
	reviewHTML += `</ul>`;
	return reviewHTML;
}

function productsFilter(array, type) {
	let filteredProducts = [];
	let value;
	switch (type) {
		case "category":
			value = $('#rbListCategory input[type="radio"]:checked').val();
			if (value == "0") {
				return array;
			}
			
			filteredProducts = array.filter(element => element.category_id == value);
			return filteredProducts;
			// break;

		case "brand":
			let checkedBrands = $('#chbListBrands input[type="checkbox"]:checked').map(function() {
				return $(this).val();
			});
			if (checkedBrands.length == 0) {
				return array;
			}
			array.filter(element => {
				for (const check of checkedBrands) {
					if (element.brand_id == check) {
						filteredProducts.push(element);
					}
				}
			});
			return filteredProducts;
			// break;

		case "search":
			value = $("#search").val();
			if (value == "") {
				return array;
			}
			filteredProducts = array.filter(element => element.name.toLowerCase().includes(value.toLowerCase()));
			return filteredProducts;
			// break;
		
		case "price":
			value = $("#rPrice").val();
			if (value == "3000") {
				return array;
			}
			filteredProducts = array.filter(element => element.price.current_price <= value);
			return filteredProducts;
			// break;

		default:
			return array;
			// break;
		}
}

function productsSort(array) {
	let sortValue = $("#ddlSort").val();
	switch (sortValue) {
		case "price-asc":
			array.sort((a, b) => a.price.current_price - b.price.current_price);
			break;

		case "price-desc":
			array.sort((a, b) => b.price.current_price - a.price.current_price);
			break;

		case "a-z":
			array.sort((a, b) => a.name.localeCompare(b.name));
			break;

		case "z-a":
			array.sort((a, b) => b.name.localeCompare(a.name));
			break;

		default:
			break;
		}
	return array;
}

function productsFilterAndSort() {
	let updatedProducts = getLS("products");
	updatedProducts = productsFilter(updatedProducts, "search");
	updatedProducts = productsFilter(updatedProducts, "category");
    updatedProducts = productsFilter(updatedProducts, "brand");
	updatedProducts = productsFilter(updatedProducts, "price");
    updatedProducts = productsSort(updatedProducts);

	if ($("#store-grid-list").hasClass("active")) {
		$("#store>#store-products").html(getProducts(updatedProducts, "product col-12 my-3"));
	}
	else {
		$("#store>#store-products").html(getProducts(updatedProducts, "product col-lg-4 col-sm-6 my-3"));
	}
}

function addToCart() {
	let id = $(this).data("id");

	cartItems = getLS("cart");

	if (location.pathname == "/tehnotron/product.html") {
		let qtyValue = parseInt($("#quantity").val());
		if (cartItems == null) {
			cartItems = 
			[
				{
					"id": id,
					"quantity": qtyValue
				}
			];
		}
		else if (cartItems.some(element => element.id == id)) {
			for (const product of cartItems) {
				if (product.id == id) {
					product.quantity += 1; 
				}
			}
		}
		else {
			cartItems.push({
				"id": id,
				"quantity": qtyValue
			})
		}
	}
	else {
		if (cartItems == null) {
			cartItems = 
			[
				{
					"id": id,
					"quantity": 1
				}
			];
		}
		else if (cartItems.some(element => element.id == id)) {
			for (const product of cartItems) {
				if (product.id == id) {
					product.quantity += 1; 
				}
			}
		}
		else {
			cartItems.push({
				"id": id,
				"quantity": 1
			})
		}
	}

	setLS("cart", cartItems);
	getCartNum();
}

function getCartNum() {
	var cartItems = getLS("cart");
	
	if (cartItems == null || cartItems.length == 0) {
		$("#cartQty").addClass("d-none");
	}
	else {
		$("#cartQty").html(cartItems.length);
		$("#cartQty").removeClass("d-none");
	}
}

function getOrderItems(products) {
	var cartItems = getLS("cart");
	let orderItems = [];
	let orderHTML = "";

	if (cartItems == null || cartItems.length == 0) {
		$(".order-details").html(`
			<div class="d-flex flex-column h-100 justify-content-between py-5">
				<div class="section-title text-center">
				<div class="text-center py-5">
					<i class="fa-regular fa-circle-xmark fs-1"></i>
				</div>
					<h3 class="title">your cart is empty.</h3>
				</div>
				<a href="store.html" class="primary-btn order-submit" id="go-back">go back to store</a>
			</div>
		`);
		$("#form-checkout input, #form-checkout textarea").prop("disabled", true);
		$("#disabled-form").removeClass("d-none");
	}
	else {
		for (const item of cartItems) {
			for (const product of products) {
				if (item.id == product.id) {
					orderItems.push(product);
					continue;
				}
			}
		}

		let total = 0;
		for (let i=0; i<orderItems.length; i++) {
			orderHTML += `
				<div class="row align-items-center border-bottom position-relative mb-2">
					<div class="col-md-2 text-center">
						<img src="${orderItems[i].images[0].small}" alt="${orderItems[i].name}" />
					</div>
					<div class="col-2 text-center">
						<input type="number" class="order-qty" value="${cartItems[i].quantity}" data-id="${orderItems[i].id}" min="1" max="10" />
					</div>
					<div class="col-md-5 col-10"><a href="/tehnotron/product.html?id=${orderItems[i].id}">${orderItems[i].name}</a></div>
					<div class="col-md-3 text-end">${cartItems[i].quantity} x ${orderItems[i].price.current_price} €</div>
					<a class="position-absolute top-0 end-0 w-auto trash" data-id="${orderItems[i].id}"><i class="fa-solid fa-trash-can"></i></a>
				</div>
			`;

			total += cartItems[i].quantity * orderItems[i].price.current_price;
		}
		const formatter = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2,});
		$("#order-total").html(formatter.format(total) + " €");
	}
	$("#order-products").html(orderHTML);
}

function addToWishlist() {
	var products = getLS("products");
	let id = $(this).data("id");

	var wishItems = getLS("wishlist");
	if (wishItems == null) {
		wishItems = [];
		wishItems.push(products.find(element => element.id == id));
	}
	else if (wishItems.some(element => element.id == id)) {
		wishItems.splice(wishItems.findIndex(element => element.id == $(this).data("id")), 1);
	}
	else {
		wishItems.push(products.find(element => element.id == id));
	}
	
	$(this).toggleClass("active");
	if ($(this).hasClass("active")) {
		$(this).html(`<i class="fa-solid fa-heart"></i>`);

	} else {
		$(this).html(`<i class="fa-regular fa-heart"></i>`);
	}

	setLS("wishlist", wishItems);
	$("#wishlist-tab-content").html(getWishlistProducts(wishItems));
	getWishNum();
}

function getWishNum() {
	var wishlist = getLS("wishlist");
	
	if (wishlist == null || wishlist.length == 0) {
		$("#wishQty").addClass("d-none");
	}
	else {
		$("#wishQty").html(wishlist.length);
		$("#wishQty").removeClass("d-none");
	}
}

function getWishlistProducts(array) {
	let productsHTML = "";
	
	if (array == null || array.length == 0) {
		return productsHTML = `<div class="text-center border-top border-bottom py-5 text-uppercase" id="empty"><i class="fa-regular fa-circle-xmark fs-1"></i><p class="fs-3 my-5">your wishlist is empty.</p></div>`;
	}
	for (const product of array) {
		productsHTML += `
			<div class="product col-12">
				<div class="row align-items-center border-bottom m-3">
					<div class="product-img col-lg-4 p-0 d-flex justify-content-center">
						<img src="${product.images[0].big}" alt="${product.name}" />
					</div>
					<div class="product-body col-lg-8">
						<h3 class="product-name fs-5"><a href="product.html?id=${product.id}">${product.name}</a></h3>
						<h3 class="product-price fs-4">${getPrice(product.price.current_price, "current")} ${getPrice(product.price.old_price, "old")}</h3>
						<div class="my-2">
							<button class="add-to-cart-btn" data-id="${product.id}"><i class="fa fa-shopping-cart"></i> add to cart</button>
						</div>
						<div class="product-btns fs-5">
							<button class="add-to-wishlist" data-id="${product.id}"><i class="fa-solid fa-heart-circle-xmark"></i></button>
						</div>
					</div>
				</div>
			</div>
		`;
	}
	return productsHTML;
}

function getIfWish(id) {
	var wishItems = getLS("wishlist");
	if (wishItems == null) {
		return `<button class="add-to-wishlist" data-id="${id}"><i class="fa-regular fa-heart"></i></button>`;
	}


	if (wishItems.find(element => element.id == id)) {
		return `<button class="add-to-wishlist active" data-id="${id}"><i class="fa-solid fa-heart"></i></button>`;
	}
	else {
		return `<button class="add-to-wishlist" data-id="${id}"><i class="fa-regular fa-heart"></i></button>`;
	}
}

var errors;
function formValidation() {
	errors = 0;

	let formFirstName, formLastName, formEmail, formAddress, formPhone, formTerms;

	formFirstName = document.querySelector("#fname");
	formLastName = document.querySelector("#lname");
	formEmail = document.querySelector("#email");
	formAddress = document.querySelector("#address");
	formPhone = document.querySelector("#phone");
	formTerms = document.querySelector("#terms");
	formPayments = document.getElementsByName("payment");

	let regExName, regExEmail, regExAddress, regExPhone;

	regExName = /^[A-ZČĆŠĐŽ][a-zčćđšž]{2,14}$/;
	regExEmail = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
	regExAddress = /^(([A-ZŠĐČĆŽ][a-zšđžčć]{1,15}(\.)?)|([1-9][0-9]{0,2}(\.)?))[a-zA-Z0-9\s\/\-]+$/;
	regExPhone = /^\+?\d{1,4}?[-.\s]?\d{1,3}?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

	regExValidation(formFirstName, regExName);
	regExValidation(formLastName, regExName);
	regExValidation(formEmail, regExEmail);
	regExValidation(formAddress, regExAddress);
	regExValidation(formPhone, regExPhone);

	if(!formTerms.checked) {
		formTerms.classList.add("is-invalid");
		errors++;
	}
	else {
		formTerms.classList.remove("is-invalid");
	}

	let paymentChecked = false;
	for (const payment of formPayments) {
		if (payment.checked) {
			paymentChecked = true;
			break;
		}
	}

	if (!paymentChecked) {
		$(".payment-method").addClass("is-invalid");
	}

	if(errors==0) {
		$(".order-details").html(`
		<div class="d-flex flex-column h-100 justify-content-between py-5">
			<div class="section-title text-center">
			<div class="text-center py-5">
				<i class="fa-regular fa-circle-check fs-1" id="success-icon"></i>
			</div>
				<h3 class="title">order has been successfully sent.</h3>
			</div>
			<a href="store.html" class="primary-btn order-submit" id="go-back">go back to store</a>
		</div>
		`);
		localStorage.removeItem("cart");
		getCartNum();
		document.getElementById("form-checkout").reset();
	}
}	

function regExValidation(formPart, regEx) {
	if(!regEx.test(formPart.value)) {
		formPart.classList.add("is-invalid");
		errors++;
	}
	else{
		formPart.classList.remove("is-invalid");
	}
}
