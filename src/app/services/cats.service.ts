import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list(`categories`);
  }

  addCategories(data) {
    return this.db.list('categories').push(data);
  }

  remove(catId){
    return this.db.object('categories/' + catId).remove();
  }

  update(catId, data) {
    return this.db.object('categories/' + catId).update({name: data.name, validFrom: data.validFrom});
  }
}
