import { Component, inject } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private animalService = inject(AnimalService)
  list: Animal[] = [];
  
  ngOnInit() {
    this.getList();
  }

  ngOnChanges() {
    this.getList();
  }

  getList() {
    this.animalService.getList().subscribe({
      next: (list) => this.list = [...list],
      error: () => {}
    });
  }

  deleteAnimal(animal: Animal) {
    this.animalService.deleteAnimal(animal);
  }

  editingAnimal(animal: Animal) {
    this.animalService.editingAnimal(animal);
  }

  getRaceImage(race: string){
    switch (race) {
      case 'PERRO':
        return '../../../../assets/dog.svg'
      case 'GATO':
        return '../../../../assets/cat.svg'
      case 'PEZ':
        return '../../../../assets/fish.svg'
      case 'AVE':
        return '../../../../assets/bird.svg'
      default:
        return '../../../../assets/dog.svg';
    }
  }

}
