import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import {MyserviceService} from './myservice.service'

@Injectable({
  providedIn: 'root'
})
export class MyserviceGuard implements CanActivate {
  constructor(private serve:MyserviceService,
              private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.isLoggedIn()) {      
      return true;      
      }
      this.router.navigate(['/']);      
      return false; 
  }
  public isLoggedIn(): boolean {      
    let status = false;      
    if (localStorage.getItem('isLoggedIn')=='true') {      
       status = true;      
    }    
    else {      
       status = false;      
       }      
    return status;      
    }    

}
