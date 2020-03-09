function getProductsUrl(keyword) {
	return `https://www.blibli.com/backend/search/products?searchTerm=${keyword}`;
}

function getProducts(keyword) {
	// Code Promise Here!
	const promise = new Promise((resolve, reject) => {
		//code async
		const ajax = new XMLHttpRequest();
		ajax.onload = () => {
			if (ajax.status == 200) {
				const data = JSON.parse(ajax.responseText);
				resolve(data);
			} else {
				reject(Error('Gagal mengambil data produk'));
			}
		};
		const url = getProductsUrl(keyword);
		ajax.open('GET', url);
		ajax.send();
	});

	return promise;
}

function getProductsError() {
	console.log('Error get Products');
	alert('Error get Products');
}

function displayProducts(products) {
	let rows = '';
	products.forEach(product => {
		rows += displayProductUI(product);
		console.log(product);
	});
	const productRows = document.querySelector('.products--row');
	productRows.innerHTML = rows;
}

function displayProductUI({ images, name }) {
	const sortName = name
		.split(' ')
		.splice(0, 5)
		.join(' ');
	return `
    <div class="col-6 col-md-4 col-lg-3">
            <div class="card card-product rounded-lg px-0 shadow-sm mt-4" title="${name}">
				<img src="${images} " class="card-img-top" alt="..." />
                <div class="card-body">
					<small class="card-text px-0"  >${sortName}...</small>
					<h5 class="card-title d-flex "></h5>
						
					<a href="#" class="btn btn-primary">Go somewhere</a>
			    </div>
            </div>
    </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
	const promise = getProducts('discount');
	promise
		.then(value => {
			return value.data.products;
		})
		.then(products => {
			displayProducts(products);
		});
});

function checkValue(keyword) {
	if (!keyword.value == 0) {
		return true;
	}
	return false;
}

const buttonClick = [...document.querySelectorAll('.btn--search')];
buttonClick.map(btn => {
	btn.addEventListener('click', e => {
		e.preventDefault();
		const inputKeyword = [...document.querySelectorAll('#keyword')];
		inputKeyword
			.filter(inputValue => checkValue(inputValue))
			.map(keyword => {
				const promise = getProducts(keyword.value);
				promise
					.then(value => {
						return value.data.products;
					})
					.then(products => {
						displayProducts(products);
					});
			});
	});
});
