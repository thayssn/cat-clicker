let catsWrapper = document.querySelector('#cats'),
clickCount = document.querySelector('#click_count'),
catsList = document.querySelector('#cats_list'),
catsDisplay = document.querySelector('#cats_display'),
cats = [];

function createCatImg(url){
	const catImg = document.createElement('img');
	catImg.src = url;
	return catImg;
}

function Cat({id, name, url}){
	this.id = id;
	this.name = name;
	this.clicks = 0;
	this.img = createCatImg(url);

	this.nameElement = document.createElement('div');
	this.nameElement.classList.add('name');
	this.nameElement.textContent = this.name;

	this.counterElement = document.createElement('div');
	this.counterElement.classList.add('counter');
	this.counterElement.textContent = this.clicks;

	this.element = document.createElement('div');
	this.element.classList.add('cat');
	this.element.appendChild(this.nameElement);
	this.element.appendChild(this.counterElement);
	this.element.appendChild(this.img);


	this.itemElement = document.createElement('li');
	this.itemElement.className = 'list__item';
	this.itemElement.textContent = `${this.name} (${this.clicks})`;

	this.itemElement.addEventListener('click', () => {
		showCat(this.element);
	});

	this.incrementClick = function (){
		this.clicks += 1;
		this.counterElement.textContent = this.clicks;
		this.itemElement.textContent = `${this.name} (${this.clicks})`;
		return this.clicks;
	}

	this.img.addEventListener('click', () => {
		this.incrementClick();
	});

	catsList.appendChild(this.itemElement);

	return this;
}

function showCat(cat){
	catsDisplay.innerHTML = '';
	catsDisplay.appendChild(cat);
}

let roberto = new Cat({id : 1, name: 'Roberto', url: 'roberto.jpg'});
let jackson = new Cat({id : 2, name: 'Jackson', url: 'jackson.jpg'});
let monica = new Cat({id : 3, name: 'Monica', url: 'monica.jpg'});
let olivia = new Cat({id : 4, name: 'Olivia', url: 'olivia.jpg'});
let pewpew = new Cat({id : 5, name: 'PewPew', url: 'pewpew.jpg'});

cats.push(roberto, jackson, monica, olivia, pewpew);