import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  screenWidth: number;
  // @Input('toggleMenuVal') toggleMenuVal;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  isActiveMenu: any;
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router
  ) { }

  ngOnInit() {
    console.log(this.isHandset$);
  }

  async logout(){

    await Storage.set({
      key: 'loginUsername',
      value: null
    });
    await Storage.set({
      key: 'loginPassword',
      value: null
    });

    this.router.navigate(['/login']);
    
  }

}
