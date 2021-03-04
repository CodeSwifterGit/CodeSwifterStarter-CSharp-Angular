export interface IAuthenticatedUser {
  email: string,
  email_verified: boolean,
  name: string,
  nickname: string,
  picture: string,
  sub: string,
  updated_at: Date | string;
}

export interface IAuthConfig {
  signInUrl: string;
  signOutUrl: string;
  apiUrl: string;
  audience: string;
}

export class UserSession {
  email: string;
  name: string;
  nickname: string;
  picture: string;
  scopes: Array<string>;
  teamId: string;
  clientId: string;
  year?: number;
  branchId: string;

  isAuthenticated(): boolean {
    return !!this.name;
  }
}

export class SecurityPermission {
  static readonly sensitiveData = 'sensitive-data';
  static readonly accessAccounts = 'access-accounts';
  static readonly managePortalContent = 'manage-portal-content';
  static readonly manageTeamData = 'manage-team-data';
  static readonly masterTeamData = 'master-team-data';
}
