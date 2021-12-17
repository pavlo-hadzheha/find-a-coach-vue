export interface Firebase {
  API: {
    auth: {
      signIn: string;
      signUp: string;
    };
    users: (path?: string) => string;
    messages: (path?: string) => string;
  }
}
