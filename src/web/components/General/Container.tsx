import React, { useState } from 'react';
import Icon from './Icon';
import Loading from './Loading';
import './Container.scss';

interface ContainerProps {
    title: string;
    collapsible?: boolean
    className?: string;
    children: JSX.Element | JSX.Element[];
    iconLigature?: string;
    loading?: boolean;
    handleTitleChange?: (e: React.FormEvent<HTMLDivElement>) => void;
}

const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const range = document.createRange();
    range.selectNodeContents(e.currentTarget);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
        case 'Enter':
            e.preventDefault();
            e.currentTarget.blur();
        default:
            return;
    }
}

const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    e.currentTarget.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
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
                <div
                    className="title"
                    style={titleStyle}
                    suppressContentEditableWarning={true}
                    contentEditable={!!props.handleTitleChange}
                    onClick={!!props.handleTitleChange ? handleClick : undefined}
                    onInput={props.handleTitleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                >
                    {props.title}
                </div>
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