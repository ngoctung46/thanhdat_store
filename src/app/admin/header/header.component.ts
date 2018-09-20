import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routes = [
    { name: 'Home', url: './home' },
    { name: 'Category', url: './category' },
    { name: 'About Us', url: './about' },
    { name: 'Contact', url: './contact' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
