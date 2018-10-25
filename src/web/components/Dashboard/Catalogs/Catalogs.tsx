import * as React from 'react';
import './Catalogs.scss';
import Catalog, { CatalogProps } from './Catalog/Catalog';

const SKELETON_CATALOG = {songs: [] as any[]};
const SKELETON_CATALOGS = [SKELETON_CATALOG];

class Catalogs extends React.Component<{}, { catalogs: CatalogProps[] | undefined }> {

  constructor(props: {}) {
    super(props);
    this.state = {
      catalogs: undefined,
    };
  }

  componentDidMount() {
    if (!this.state.catalogs) {

    }
  }

  render() {
    const catalogsProps = this.state.catalogs || SKELETON_CATALOGS;
    const catalogs = catalogsProps.map(
      (catalog: CatalogProps) => {
        let catalogProps = {
          name: catalog.name,
          songs: catalog.songs,
          key: catalog.name,
        };
        return React.createElement(Catalog, catalogProps);
      },
    );
    return (<div className="catalogs" children={catalogs}/>);
  }

}

export default Catalogs;