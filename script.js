// Classe Produit
class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
      
    }
  }
  
  // Classe Élément du Panier
  class ShoppingCartItem {
    constructor(product, quantity = 1) {
      this.product = product;
      this.quantity = quantity;
    }
  
    // Calculer le prix total pour cet élément
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  // Classe Panier
  class ShoppingCart {
    constructor() {
      this.items = []; // Tableau d'éléments du panier
    }
  
    // Ajouter un élément au panier
    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.displayItems();
    }
  
    // Supprimer un élément du panier
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.displayItems();
    }
  
    // Obtenir le prix total de tous les éléments
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0).toFixed(2);
    }
  
    // Afficher les éléments du panier
    displayItems() {
      const cartItemsContainer = document.querySelector('.cart-items');
      cartItemsContainer.innerHTML = ''; // Nettoyer le contenu existant
  
      if (this.items.length === 0) {
        cartItemsContainer.innerHTML = '<p>Le panier est vide.</p>';
      } else {
        this.items.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
  
          cartItem.innerHTML = `
            <div class="item-info">
              <div>
                <h3 class="item-name">${item.product.name}</h3>
                <p class="price" data-price="${item.product.price}">$${item.product.price.toFixed(2)}</p>
              </div>
            </div>
            <div class="item-controls">
              <button class="minus">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="plus">+</button>
              <i class="fas fa-trash delete"></i>
            </div>
          `;
  
          // Boutons Ajouter/Soustraire/Supprimer
          const plusBtn = cartItem.querySelector('.plus');
          const minusBtn = cartItem.querySelector('.minus');
          const deleteBtn = cartItem.querySelector('.delete');
  
          // Ajouter une unité
          plusBtn.addEventListener('click', () => {
            item.quantity++;
            this.displayItems();
          });
  
          // Retirer une unité
          minusBtn.addEventListener('click', () => {
            if (item.quantity > 1) {
              item.quantity--;
              this.displayItems();
            }
          });
  
          // Supprimer l'élément
          deleteBtn.addEventListener('click', () => {
            this.removeItem(item.product.id);
          });
  
          cartItemsContainer.appendChild(cartItem);
        });
      }
  
      // Mettre à jour le prix total
      document.querySelector('.total-price').textContent = `Total: $${this.getTotalPrice()}`;
    }
  }
  
  // Instanciation et manipulation
  document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
  
    // Exemples de produits
    const product1 = new Product(1, 'Item 1', 19.99);
    const product2 = new Product(2, 'Item 2', 9.99);
    const product3 = new Product(3, 'Item 3', 14.99);
  
    // Ajouter des produits au panier pour tester
    cart.addItem(product1, 1);
    cart.addItem(product2, 2);
    cart.addItem(product3, 1);
  });
  