import * as React from 'react';

const getCatalogClassName = (name: string | undefined): string => {
  const classes = ['catalog', 'sheet'];
  if (!name) {
    classes.push('skeleton');
  }
  return classes.join(' ');
};

export interface CatalogProps {
  name?: string;
  songs: any[];
}

const Catalog = (props: CatalogProps) => (
  <div className={getCatalogClassName(props.name)}>
    <div className="name">{props.name || 'Loading'}</div>
    <div className="count">{props.songs.length}</div>
  </div>
);

export default Catalog;