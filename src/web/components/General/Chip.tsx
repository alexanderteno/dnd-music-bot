import React, { ReactChildren } from 'react';

interface ChipProps {
    selected: boolean;
    onRemove: (e: React.MouseEvent) => void;
    children: ReactChildren;
}

const Chip = ({ selected, onRemove, children }: ChipProps) => {

    const className = ['chip'];
    if (selected) {
        className.push('selected');
    }

    return (
        <div className={className.join(' ')}>
            {children}
            <span onClick={onRemove} > &times;</span>
        </div>
    )

}

export default Chip;