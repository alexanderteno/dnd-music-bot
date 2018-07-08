import * as Cookies from 'es-cookie';

const AUTHENTICATED = 'authenticated';

class Authentication {

  isAuthenticated: boolean;

  constructor() {
    this.isAuthenticated = !!Cookies.get(AUTHENTICATED);
  }

  authenticate(password: string): Promise<string> {

    // TODO: Use an actual implementation
    if (password === 'password') {
      this.isAuthenticated = true;
      Cookies.set(AUTHENTICATED, 'authenticated', {expires: 1});
      this.isAuthenticated = true;
      return Promise.resolve('success');
    } else {
      this.isAuthenticated = false;
      return Promise.reject('failure');
    }

  }

}

const authentication = new Authentication();

export default authentication;