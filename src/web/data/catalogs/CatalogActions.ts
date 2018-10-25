import { CatalogProps } from '../../components/Dashboard/Catalogs/Catalog/Catalog';
import CatalogDispatcher from './CatalogDispatcher';
import CatalogActionTypes from './CatalogActionTypes';

namespace CatalogActions {

  export interface Action {
    readonly type: string;
  }

  export interface AddCatalogs extends Action {
    readonly catalogs: CatalogProps[];
  }

  export const addCatalogs = (catalogs: CatalogProps[]) => {
    CatalogDispatcher.dispatch(<Action>{
      type: CatalogActionTypes.ADD_CATALOGS,
      catalogs,
    });
  };

}

export default CatalogActions;