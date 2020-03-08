function getProductsUrl(keyword) {
	return `https://www.blibli.com/backend/search/products?searchTerm=${keyword}`;
}

function getProducts(keyword, callbackSuccess, CallbackError) {
	const ajax = new XMLHttpRequest();

	// Track the state changes of the request
	ajax.onreadystatechange = function() {
		// Ready state 4 means the request is done
		if (ajax.readyState === 4) {
			// 200 is a successful return
			if (ajax.status === 200) {
				const data = JSON.parse(ajax.responseText);
				callbackSuccess(data);
			} else {
				CallbackError();
			}
		}
	};

	// ajax.onload = () => {
	// 	if (ajax.status == 200) {
	// 		const data = JSON.parse(ajax.responseText);
	// 		callbackSuccess(data);
	// 	} else {
	// 		CallbackError();
	// 	}
	// };
	const url = getProductsUrl(keyword);

	ajax.open('GET', url);

	ajax.send();
}

function getProductsError() {
	console.log('Error get Products');
	alert('Error get Products');
}

function displayProducts(data) {
	let rows = '';
	const products = data.data.products;
	products.forEach(product => {
		console.log(product);
		rows += displayProductUI(product);
	});
	const productRows = document.querySelector('.main--products');
	productRows.innerHTML = rows;
}

function displayProductUI({ images, name }) {
	return `
    <div class="col-6 col-md-4 col-lg-3">
            <div class="card card-product bg-secondary rounded-lg px-0 shadow-sm mt-4">
				<img src="${images} " class="card-img-top" alt="..." />
                <div class="card-body">
                    <p class="card-text">
                    ${name}
				    </p>
					<h5 class="card-title d-flex "></h5>
						
					<a href="#" class="btn btn-primary">Go somewhere</a>
			    </div>
            </div>
    </div>
    `;
}

const buttonClick = [...document.querySelectorAll('.btn--search')];

buttonClick.map(btn => {
	btn.addEventListener('click', e => {
		e.preventDefault();
		[...document.querySelectorAll('#keyword')]
			.map(keyword => keyword.value)
			.map(keyword => {
				getProducts(
					keyword,
					function(data) {
						displayProducts(data);
					},
					function() {
						getProductsError();
					}
				);
			});
	});
});
