import { Component, HostListener, Renderer2, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'pm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @HostListener('document:keydown.alt.x')
  doSomething() {
    console.log('You pressed alt+x');
    this.router.navigate(['/products']);
  }

  constructor(private router: Router, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.renderer.listen(document, 'keydown.alt.x', handler => {});
  }
 }
