import CatalogStore from '../data/catalogs/CatalogStore';
import { Container } from 'flux/utils';
import { App } from '../components/App';

const getStores = () => {
  return [
    CatalogStore,
  ];
};

const getState = () => {
  return {
    catalogs: CatalogStore.getState(),
  };
};

export default Container.createFunctional(App, getStores, getState);