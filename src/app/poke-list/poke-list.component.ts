import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {
totalPokemons!: number;
page = 1;
pokemons: any[] = [];


  constructor(
    private dataService : DataService
    
  ) { }

  ngOnInit(): void {
    this.getPokemons()
  }

  getPokemons(){
    this.dataService.getpokemons(12,this.page + 0)
    .subscribe((response: any) => {
      this.totalPokemons=response.count;
      response.results.forEach((result :any)=>{
        this.dataService.getMoreData(result.name)
        .subscribe((uniqueResponse:any) =>{
          this.pokemons.push(uniqueResponse);
          console.log(this.pokemons);
        });
      });
    });

  }
}
