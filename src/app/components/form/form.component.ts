import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  private animalService = inject(AnimalService);
  name = '';
  race = '';

  addToList() {
    const id = this.animalService.getLastId() + 1;
    this.animalService.addToList( { id, name: this.name, race: this.race } );
    this.name = '';
    this.race = '';
  }

  ngOnInit() {
    this.getAnimal();
  }

  ngOnChanges() {
    this.getAnimal();
  }

  getAnimal() {
    this.animalService.getAnimal().subscribe({
      next: (animal) => {
        this.name = animal.name;
        this.race = animal.race;
      },
      error: () => {}
    });
  }

}
