import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actor2movie',
  templateUrl: './actor2movie.component.html',
  styleUrls: ['./actor2movie.component.css']
})
export class Actor2movieComponent implements OnInit {

  actorsDB: any[] = [];
  moviesDB: any[] = [];

  actorToAdd: string = '';
  actorAddedName: string = '';
  movieToAdd: string = '';
  movieExistingActors: string[] = [];

  constructor(private dbService: DatabaseService) { }

  onSelectAddActor(item) {
    this.actorToAdd = item._id;
  }

  onSelectToMovie(item) {
    this.movieToAdd = item._id;
    this.movieExistingActors = item.actors;
  }

  onAddActorToMovie() {
    this.movieExistingActors.push(this.actorToAdd);

    this.dbService.updateMovie(this.movieToAdd, { actors: this.movieExistingActors }).subscribe(result => {
      this.onGetMovies();
    });

  }

  //Get Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Get ActorsDb 
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }

}
