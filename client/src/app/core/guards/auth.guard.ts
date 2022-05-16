import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountServiceService } from 'src/app/account/account-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountServiceService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>{
    return this.accountService.currentUser$.pipe(
      map(auth =>{
        if (auth){
          return true;
        }
        this.router.navigate(['account/login'], {queryParams:{returnUrl: state.url}});
      })
    )
  }
  
}
