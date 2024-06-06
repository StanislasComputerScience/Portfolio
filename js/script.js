////////////////
// Neo jQuery //
////////////////

function $(selector) {
  return new NeoJquery(selector)
}

class NeoJquery {
	constructor (selector, context = document) {
    this.elems = Array.from(context.querySelectorAll(selector));
    this.orig = this.elems;
	}
  
	find (selector) {
    this.elems = Array.from(new $(selector, this.elems[0]).elems);
		return this;
	}
  
	addClass(...classes) {
		for (let item of this.elems) { item.classList.add(...classes); }
		return this;
	}
  
	removeClass(...classes) {
		for (let item of this.elems) { item.classList.remove(...classes); }
		return this;
	}
  
	css (prop, val) {
		// Convert CSS naming to JavaScript naming
		prop = prop.split('-').map(function (part, index) {
			if (index === 0) return part;
			let arr = part.split('');
			arr.splice(0, 1, arr[0].toUpperCase());
			return arr.join('');
		}).join('');
    
		for (let item of this.elems) { item.style[prop] = val; }
		return this;
	}
  
  attr (attr, val = '') {
    for (let item of this.elems) { item.setAttribute(attr, val); }
    return this;
  }
  
  prev () {
    var el = this.elems;
    this.elems = [];
    for (let item of el) { this.elems.push(item.previousElementSibling); }
    return this;
	}
  
  next () {
    var el = this.elems;
    this.elems = [];
    for (let item of el) { this.elems.push(item.nextElementSibling); }
    return this;
	}
  
  parent () {
    this.elems = new Array(this.elems[0].parentElement);
    return this;
	}
  
  show (display = 'block') {
    for (let item of this.elems) { item.style.display = display; }
    return this;
	}
  
  hide () {
    for (let item of this.elems) { item.style.display = 'none'; }
    return this;
	}
  
  siblings (filter = '') {
    var curr = this.elems[0];
    var sib = this.elems[0].parentElement.children;
    this.elems = [];
    
    for(let item of sib) {
      if(item != curr) {
        switch (filter.charAt(0)) {
          case '':
            this.elems.push(item);
            break;
          case '.':
            if(item.classList.contains(filter.substring(1))) { this.elems.push(item); }
            break;
          case '#':
            if(item.id == filter.substring(1)) { this.elems.push(item); }
            break;
          default :
            if(item.tagName.toLowerCase() == filter.toLowerCase()) { this.elems.push(item); }
          }
      }
    }
    return this;
  }
  
  hasClass (classe) {
    return this.elems[0].classList.contains(classe);
  }
  
  end () {
    this.elems = this.orig;
    return this;
	}
  
  closest (selector) {
    this.elems = [this.elems[0].closest(selector)];
    return this;
	}
}

$('a[rel=external]').attr('target','_blank');
// $('a[rel=nolink]').on('click', function(e){
//  e.preventDefault();
// });


   