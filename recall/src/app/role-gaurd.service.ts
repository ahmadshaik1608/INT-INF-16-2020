import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { MyserviceGuard } from './myservice.guard';

 
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: MyserviceGuard, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    let expectedRoleArray = route.data;
     expectedRoleArray = expectedRoleArray.expectedRole;
   
    const token = localStorage.getItem('jwt');
 
    // decode the token to get its payload
    let  expectedRole = '';
 
    for(let i=0; i<expectedRoleArray.length; i++){
      if(expectedRoleArray[i]==localStorage.getItem('role')){
        console.log("Roles Matched");
        expectedRole = localStorage.getItem('role')
      }
    }
  
    if (this.auth.isLoggedIn() && localStorage.getItem('role') == expectedRole) {
      console.log("User permitted to access the route");
      return true;
    }
    else{
      console.log("nooologin");
      
       this.router.navigate['/']
      return false
    }
    
 
    //this.router.navigate(['login']);
  }
}
