import React from 'react';
import './Icon.scss';

interface IconProps {
    children: string;
    onClick?: (...args: any[]) => void;
    className?: string;
};

const Icon = ({ children, onClick, className }: IconProps) => {
    const classes = ["icon", "material-icons"];
    const additionalClasses = className ? className.split(' ') : [];
    return (
        <div className={classes.concat(additionalClasses).join(' ')} onClick={onClick}>{children}</div>
    )
}

export default Icon;