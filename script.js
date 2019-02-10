	let Model = {
		init(){
			this.cats = [{id : 1, name: 'Roberto', url: 'roberto.jpg', clicks: 0},
						{id : 2, name: 'Jackson', url: 'jackson.jpg', clicks: 0},
						{id : 3, name: 'Monica', url: 'monica.jpg', clicks: 0},
						{id : 4, name: 'Olivia', url: 'olivia.jpg', clicks: 0},
						{id : 5, name: 'PewPew', url: 'pewpew.jpg', clicks: 0}];
			this.currentCat = this.cats[0];
		},
		getAll(){
			return this.cats;
		},
		update(obj){
			return Object.assign(this.currentCat, obj);
		}
	}

	let Controller = {
		init(){
			Model.init();
			ListView.init();
			DisplayView.init();
			AdminView.init();
			this.render();
		},
		getCurrentCat(){
			return Model.currentCat;
		},
		getCats(){
			return Model.getAll();
		},
		showCat(cat){
			Model.currentCat = cat;
			this.render();
		},
		clickCat(){
			Model.currentCat.clicks++;
			this.render();
		},
		updateCat(newCat){
			Model.update(newCat);
			this.render();
		},
		render(){
			ListView.render();
			DisplayView.render(Model.currentCat);
			AdminView.render(Model.currentCat);
		}
	}

	let AdminView = {
		init(){
			this.activateAdmin = document.querySelector('#activate_admin');
			this.edit = false;
			this.adminForm = document.querySelector('#admin_area form');
			this.name = this.adminForm.querySelector('[name="name"]');
			this.url = this.adminForm.querySelector('[name="url"]');
			this.clicks = this.adminForm.querySelector('[name="clicks"]');

			this.activateAdmin.addEventListener('click', e => {
				this.edit = !this.edit;
				this.render();
			});

			this.adminForm.addEventListener('submit', e => {
				e.preventDefault();
				let obj = {
					name: this.name.value,
					url: this.url.value,
					clicks: this.clicks.value	
				}
				Controller.updateCat(obj);
				this.edit = false;
				this.render();
			});
		},
		render(){
			this.name.value = Controller.getCurrentCat().name;
			this.url.value = Controller.getCurrentCat().url;
			this.clicks.value = Controller.getCurrentCat().clicks;
			this.adminForm.style.display = (this.edit) ? 'block' : 'none';
			this.activateAdmin.textContent = (this.edit) ? 'Cancel' : 'Admin'; 
		}
	}

	let ListView = {
		init(){
			this.wrapper = document.querySelector('#cats_list');
		},
		render(){
			this.wrapper.innerHTML = '';
			Controller.getCats().forEach( cat => {
				let item = document.createElement('li');
				item.innerHTML = `<b>${cat.name}</b> (${cat.clicks})`;
				item.addEventListener('click', () => 
					Controller.showCat(cat)
				);
				this.wrapper.appendChild(item);
			});
		}
	}

	let DisplayView = {
		init(){
			this.wrapper = document.querySelector('#cats_display');
			this.name = this.wrapper.querySelector('.cat_name');
			this.clicks = this.wrapper.querySelector('.cat_clicks');
			this.img = this.wrapper.querySelector('.cat_image');
			this.img.addEventListener('click', () => 
				Controller.clickCat()
			);
		},
		render(){
			let cat = Controller.getCurrentCat();
			this.name.textContent = cat.name;
			this.clicks.textContent = cat.clicks;
			this.img.src = cat.url;
			this.img.alt = `This is ${cat.name}`;
		}
	}

	Controller.init();
