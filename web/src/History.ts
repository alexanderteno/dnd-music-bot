import createBrowserHistory from 'history/createBrowserHistory';
import { History } from 'history';

class ApplicationHistory {

  history: History;

  constructor() {
    this.history = createBrowserHistory();
  }

}

const applicationHistory = new ApplicationHistory();

export default applicationHistory;