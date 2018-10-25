import { ReduceStore } from 'flux/utils';
import * as Immutable from 'immutable';
import CatalogDispatcher from './CatalogDispatcher';
import CatalogActionTypes from './CatalogActionTypes';
import CatalogActions from './CatalogActions';

interface CatalogState {

}

class CatalogStore extends ReduceStore<CatalogState, CatalogActions.Action> {

  constructor() {
    super(CatalogDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state: CatalogState, action: CatalogActions.Action) {
    switch (action.type) {
      case CatalogActionTypes.ADD_CATALOGS:
        return CatalogStore.addCatalogs(state, <CatalogActions.AddCatalogs>action);
      default:
        return state;
    }
  }

  static addCatalogs(state: CatalogState, action: CatalogActions.AddCatalogs): CatalogState {
    return Immutable.OrderedMap();
  }

}

export default new CatalogStore();