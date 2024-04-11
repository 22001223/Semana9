import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private list = new BehaviorSubject<Animal[]>([]);
  currentList = this.list.asObservable();
  private animal = new BehaviorSubject<Animal>({id: 0, name: '', race: ''});
  currentAnimal = this.list.asObservable();

  constructor() { }

  getList() {    
    return this.list;
  }

  getLastId() {
    const length = this.list.getValue().length;
    if (length === 0) return 0;
    return this.list.getValue()[length - 1].id;
  }

  getAnimal() {
    return this.animal;
  }

  addToList(animal: Animal) {
    let array = this.list.getValue();
    array.push({...animal});
    this.list.next(array);
  }

  deleteAnimal(animal: Animal) {
    let array = this.list.getValue();
    array = array.filter((a) => a.id !== animal.id);
    this.list.next(array);
  }

  editingAnimal(animal: Animal) {
    this.deleteAnimal(animal);
    this.animal.next({...animal});
  }

}
