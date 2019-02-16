const linkSelectedClass = 'tabs-link-selected'
const tabSelectedClass = 'tabs-item-selected'


class Tabs {
  constructor(links) {
    this.links = [];
    links.forEach(e => this.links.push(new TabLink(e)));
    this.content = [];
    this.links.forEach(e => this.content.push(e.tabItem));
  }
  selectedLink() {
    return this.links.filter(e => e.selected())[0];
  }
  selectedContent() {
    return this.content.filter(e => e.selected())[0];
  }
}



class TabLink {
  constructor(element) {
    // Assign this.element to the passed in DOM element
    this.element = element;
    
    // Get the custom data attribute on the Link
    this.data = this.element.dataset.tab;
    
    // Using the custom data attribute get the associated Item element
    this.itemElement = document.querySelector(`.tabs-item[data-tab="${this.data}"]`)
    
    // Using the Item element, create a new instance of the TabItem class
    this.tabItem = new TabItem(this.itemElement);
    
    // Add a click event listener on this instance, calling the select method on click
    this.element.addEventListener('click', () => {
      this.select();
    });

  };

  select() {
    //grab single selected link and deselect it
    const selected = tabs.selectedLink();
    selected.deselect();

    // Add a class named "tabs-link-selected" to this link
    this.element.classList.add(linkSelectedClass);
    
    // Call the select method on the item associated with this link
    this.tabItem.select();
  }

  deselect() {
    this.element.classList.remove(linkSelectedClass);
    this.tabItem.deselect();
  }
  selected() {
    return this.element.classList.contains(linkSelectedClass);
  }
}

class TabItem {
  constructor(element) {
    // Assign this.element to the passed in element
    this.element = element;
  }

  select() {
    // Add a class named "tabs-item-selected" to this element
    this.element.classList.add(tabSelectedClass);
  }

  deselect() {
    this.element.classList.remove(tabSelectedClass);
  }

  selected() {
    return this.element.classList.contains(tabSelectedClass);
  }
}

/* START HERE: 

- Select all classes named ".tabs-link" and assign that value to the links variable

- With your selection in place, now chain a .forEach() method onto the links variable to iterate over the DOM NodeList

- In your .forEach() method's callback function, return a new instance of TabLink and pass in each link as a parameter

*/

const getLinks = () => document.querySelectorAll('.tabs-link');

const getItems = () => document.querySelectorAll('.tabs-item');

links = getLinks();
// links.forEach(e => new TabLink(e));

tabs = new Tabs(links);

// console.log(links);