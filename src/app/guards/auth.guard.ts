import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: Auth = inject(Auth);
  const router: Router = inject(Router);
  const user$ = user(auth);

  return user$.pipe(
    map(v => {

      const vBoolean = !!v;

      if(!vBoolean) {
        router.navigate(["/auth/login"]);
      }
      
      return vBoolean;

    })
  )
};
