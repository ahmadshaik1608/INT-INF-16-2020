import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {MyserviceService} from './myservice.service'

@Injectable({
  providedIn: 'root'
})
export class MyserviceGuard implements CanActivate {
  constructor(private serve:MyserviceService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.serve.isLoggedIn;
  }
  
}
