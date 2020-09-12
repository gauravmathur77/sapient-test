import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
 

import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public launchYear = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];

  public landing = ['True', 'False'];

  public spaceX: any;

  filters: any = {};

  url = 'https://api.spacexdata.com/v3/launches?limit=100';
  

  constructor(private homeService: HomeService,
    private router:Router,
    private activatedRoute: ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe(params => {
        Object.keys(params).forEach((key)=>{
          this.filters[key] = params[key];
        })
    });
    
  }

  ngOnInit() {
    if(Object.keys(this.filters).length > 0) {
      this.fetchDataFromFilter();
    } else {
      this.getAllData(this.url);
    }
  }

  getAllData(url) {
    this.spaceX = null;
    this.homeService.getData(url).subscribe((data) => {
      this.spaceX = data;
    })
  }

  filter(event, type) {
    if (type == 'year') {
      this.filters['launch_year'] = event;
    }
    if (type == 'launch') {
      this.filters['launch_success'] = (event == 'True') ? true : false;
    }
    if (type == 'landing') {
      this.filters['land_success'] = (event == 'True') ? true : false;
    }

    this.router.navigate([''],  { queryParams: this.filters });
    this.fetchDataFromFilter();
  }

  fetchDataFromFilter() {
    let string = '';
    if(Object.keys(this.filters).length > 0) {
      string = `${this.url}&`
    } else {
      string = `${this.url}`
    }
    Object.keys(this.filters).forEach((key) => {
      if(string.endsWith('&')) {
        string = string  + key + '=' + this.filters[key];
      } else {
        string = string + '&' + key + '=' + this.filters[key];
      }
    })
    this.getAllData(string);
  }

  checkCondition(value, type) {
    if(type == 'landing') {
      return (value == this.filters.land_success) ? true : false
    }
    if(type == 'launch') {
      return (value == this.filters.launch_success) ? true : false
    }
  }
}
