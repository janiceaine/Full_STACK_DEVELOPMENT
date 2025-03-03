import { Inject, Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});
export interface User {
  email: string;
  name: string;
  password?: string;
}
export interface AuthResponse {
  token: string;
}
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  public getToken(): string | null {
    return this.storage.getItem('travlr-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public async login(user: User): Promise<any> {
    const authResp: AuthResponse = await this.tripDataService.login(user);
    this.saveToken(authResp.token);
  }

  public async register(user: User): Promise<any> {
    const authResp: AuthResponse = await this.tripDataService.register(user);
    this.saveToken(authResp.token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    return false;
  }

  public getCurrentUser(): User | undefined {
    if (this.isLoggedIn()) {
      const token = this.getToken();
      if (token) {
        const { email, name } = JSON.parse(atob(token.split('.')[1]));
        return { email, name } as User;
      }
    }
    return undefined;
  }
}
