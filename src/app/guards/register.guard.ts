import { Injectable } from "@angular/core"
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { SettingsService } from "../services/settings.service"

@Injectable({
  providedIn: 'root'
})

export class RegisterGuard implements CanActivate {

  constructor(private router: Router, private settingsService: SettingsService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.settingsService.getSettings().allowRegistration) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

