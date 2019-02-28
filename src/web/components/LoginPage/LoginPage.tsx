import * as React from 'react';
import authentication from '../../stores/Authentication';
import applicationHistory from '../../History';

class LoginPage extends React.Component<{}, { loginFailed: boolean, password: string | undefined }> {

  constructor(props: {}) {
    super(props);
    this.state = {
      loginFailed: false,
      password: undefined,
    };
  }

  componentDidMount() {
    document.title = "Login"
  }

  onSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    authentication.authenticate(this.state.password)
      .then(() => {
        applicationHistory.history.replace('/');
      })
      .catch(() => {
        this.setState({
          loginFailed: true,
        });
      });
    event.preventDefault();
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="login page">
        <form onSubmit={this.onSubmit}>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" id="password" onChange={this.onChange} />
          <input type="submit" value="Login" />
        </form>
        {
          this.state.loginFailed && (<div className="error">Password was incorrect, please try again.</div>)
        }
      </div>
    );
  }

}

export default LoginPage;