import React, { Component } from 'react';
import './AutoSuggest.scss';

const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
}

const KEYS = {
    ENTER: 13,
    UP: 38,
    DOWN: 40,
}

interface AutoSuggestProps<T> {
    getLabel: (suggestion: T) => string;
    onSelect: (suggestion: T) => void;
    suggestions?: T[]
    newSuggestion?: (label: string) => void;
    fetchSuggestions?: () => void;
}

interface AutoSuggestState<T> {
    suggestions: undefined | T[];
    filter: string;
    selectedIndex: number;
}

const filterSuggestions = <T extends {}>(suggestions: T[], filter: string, getLabel: (suggestion: T) => string): T[] => {
    if (!filter) {
        return [];
    } else {
        return suggestions.filter((suggestion: T) => {
            const label = getLabel(suggestion).toLowerCase();
            return label.indexOf(filter) !== -1;
        })
    }
}

const getFilteredSuggestions = <T extends {}>(props: AutoSuggestProps<T>, state: AutoSuggestState<T>): T[] | undefined => {
    const suggestions = props.fetchSuggestions ? state.suggestions : props.suggestions;
    return filterSuggestions(suggestions, state.filter, props.getLabel);
}

class AutoSuggest<T> extends Component<AutoSuggestProps<T>, AutoSuggestState<T>> {

    constructor(props: AutoSuggestProps<T>) {
        super(props);
        this.state = {
            suggestions: undefined,
            filter: undefined,
            selectedIndex: -1,
        }
    }

    makeSelection = (suggestion: T) => {
        this.setState({ filter: undefined, selectedIndex: -1 }, () => {
            this.props.onSelect(suggestion);
        });
    }

    handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.keyCode == KEYS.DOWN) {
            this.setState((prevState, props) => {
                const suggestions = getFilteredSuggestions(props, prevState);
                const nextIndex = (prevState.selectedIndex + 1) % suggestions.length;
                return ({
                    ...prevState,
                    selectedIndex: clamp(nextIndex, 0, suggestions.length - 1),
                });
            });
        } else if (e.keyCode == KEYS.UP) {
            this.setState((prevState, props) => {
                const suggestions = getFilteredSuggestions(props, prevState);
                const nextIndex = ((prevState.selectedIndex - 1) + suggestions.length) % suggestions.length;
                return ({
                    ...prevState,
                    selectedIndex: clamp(nextIndex, 0, suggestions.length - 1),
                });
            });
        } else if (e.keyCode == KEYS.ENTER) {
            e.preventDefault();
            if (getFilteredSuggestions(this.props, this.state)) {

            } else {
                if (this.props.newSuggestion) {
                    this.props.newSuggestion(this.state.filter)
                }
            }
        }
    }

    handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const filter = e.currentTarget.value;
        this.setState({ filter: filter ? filter.toLowerCase() : undefined });
    }

    render() {

        const filteredSuggestions = getFilteredSuggestions(this.props, this.state);

        return (
            <div className="auto-suggest">
                <input type="text" onKeyDown={this.handleKeyDown} onInput={this.handleInput}></input>
                <div className="items">
                    {
                        filteredSuggestions.map((suggestion: T, index: number) => {
                            const label = this.props.getLabel(suggestion);
                            const className = ['suggestion'];
                            if (index === this.state.selectedIndex) {
                                className.push('selected');
                            }
                            return (
                                <div
                                    className={className.join(' ')}
                                    key={label}
                                    onClick={() => this.props.onSelect(suggestion)}
                                >
                                    {label}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

}

export default AutoSuggest;