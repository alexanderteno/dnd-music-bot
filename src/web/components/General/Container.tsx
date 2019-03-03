import React, { useState } from 'react';
import Icon from './Icon';
import Loading from './Loading';
import './Container.scss';

interface ContainerProps {
    title: string;
    collapsible?: boolean
    className?: string;
    children: JSX.Element;
    iconLigature?: string;
    loading?: boolean;
}

const Container = (props: ContainerProps) => {
    const [collapsed, setCollapsed] = useState(props.collapsible)
    const classes = props.className ? props.className.split(' ') : [];
    const defaultClasses = ['container'];
    if (props.collapsible) {
        defaultClasses.push('collapsible');
    }

    const titleStyle = !props.collapsible ? { gridColumn: '1 / span 2' } : undefined;
    const headerOnClick = !props.collapsible ? undefined : () => setCollapsed(!collapsed);

    return (
        <div className={defaultClasses.concat(classes).join(' ')}>
            <div className={'header' + (props.collapsible ? ' collapsible' : '')} onClick={headerOnClick}>
                {props.collapsible && (<Icon>{collapsed ? 'expand_more' : 'expand_less'}</Icon>)}
                <div className="title" style={titleStyle}>{props.title}</div>
                {(props.iconLigature !== undefined) && (<Icon>{props.iconLigature}</Icon>)}
            </div>
            {
                (!collapsed) && (
                    <div className="content">
                        {props.loading ? (<Loading />) : props.children}
                    </div>
                )
            }

        </div>
    )
}

export default Container;