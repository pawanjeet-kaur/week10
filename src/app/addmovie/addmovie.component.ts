import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  moviesDB: any[] = [];
  title: string = "";
  year: number = 0;
  actors: any[] = [];

  constructor(private dbService: DatabaseService) { }

  //Get Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onSaveMovie() {
    let obj = { title: this.title, year: this.year, actors: this.actors };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();

    });
  }

  ngOnInit() {
    this.onGetMovies();
  }

}
