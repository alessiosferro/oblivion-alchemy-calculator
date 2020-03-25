import { AngularFirestore } from '@angular/fire/firestore';
import { Ingredient } from './model/ingredient.model';
import { Component, OnInit } from '@angular/core';
import ingredients from '../static/ingredients';
import 'firebase/firestore';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'oblivion-alchemy-calculator';

  ingredients$: Observable<Ingredient[]>;

  constructor(private FireStore: AngularFirestore) { }

  ngOnInit() {
    this.ingredients$ =
      this.FireStore
        .collection<Ingredient>('ingredients')
        .valueChanges();

    this.ingredients$
      .pipe(take(1))
      .subscribe(ingredients => {
        if (!ingredients.length) {
          this.ingredients.forEach(ingredient => {
            this.FireStore
              .collection('ingredients')
              .add(ingredient);
          });
        }
      });
  }

  get ingredients() {
    return ingredients;
  }
}
