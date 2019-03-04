import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }

  getProducts(catId) {
    return this.db.list(`categories/${catId}/products`);
  }

  remove(catId, prodId) {
    return this.db.object(`categories/${catId}/products/${prodId}`).remove();
  }

  updateProduct(catId, prodId, update) {
    return this.db.object(`categories/${catId}/products/${prodId}`).update(update);
  }

  addProduct(catId, prodData) {
    return this.db.list(`categories/${catId}/products`).push(prodData);
  }

}
