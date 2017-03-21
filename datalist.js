/* 
    Datalist Tag
	Copyright (c) 2017, @luiarhs
    Based on ComboBox Object 
	http://www.zoonman.com/projects/combobox/
	All rights reserved.
	BSD License */

Datalist = function (input_name) {
	
    // Edit element cache 
	this.edit = document.getElementById(input_name);
	// Items Container 
	var ddl = document.getElementById(input_name).parentNode.getElementsByTagName('div');
	this.dropdownlist = ddl[0];
	// Current Item
	this.currentitem = null;
	// Current Item Index
	this.currentitemindex = null;
	// Visible Items Count
	this.visiblecount = 0;
	// Closure Object 
	var parobject = this;   
	// Picker
	var pick = document.getElementById(input_name).parentNode.getElementsByTagName('span');
	pick[0].onclick =function () {
		parobject.edit.focus();
	};
	// Show Items when edit get focus
	this.edit.onfocus = function () {
		parobject.dropdownlist.style.display = 'block';
	};
	// Hide Items when edit lost focus
	this.edit.onblur = function () {
		if(allowLoose)
		setTimeout(function () {parobject.dropdownlist.style.display = 'none';}, 150);
	};
	var allowLoose=true;

	// Get Items
	this.listitems = this.dropdownlist.getElementsByTagName('a');
	for (let i = 0; i < this.listitems.length; i++) {
		let t = i;
		// Binding Click Event
		this.listitems[i].onclick = function () {
			let upv = this.innerHTML;   
			upv = upv.replace(/\<b\>/ig, '');
			upv = upv.replace(/\<\/b\>/ig, '');
			parobject.edit.value = upv;
			parobject.dropdownlist.style.display = 'none';
			return false;
		}
		// Binding OnMouseOver Event
		this.listitems[i].onmouseover = function (e) {
			
			for (let i=0;i < parobject.listitems.length; i++) {
				
				if (this == parobject.listitems[i]) {
					
					if (parobject.currentitem) {
						parobject.currentitem.className = parobject.currentitem.className.replace(/combobox__list--light/g, '');
					}
					parobject.currentitem = parobject.listitems[i];
					parobject.currentitemindex = i;
					parobject.currentitem.className += 'combobox__list--light';
				}
			}
		}
	};
	// Use RegExp for Search on Typing Event
	this.edit.onkeyup = function (e) {
		//Create Pattern 
        let pattern = new RegExp('^'+parobject.edit.value,'i');
        
		for (let i = 0; i < parobject.listitems.length; i++) {
            let input = parobject.listitems[i].innerHTML;
            
			if ( pattern.test(input) ) {
                parobject.listitems[i].style.display = 'block';
                parobject.visiblecount++;						
            } else {
                parobject.listitems[i].style.display = 'none';
            }
        }

	}
	
}