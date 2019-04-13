import React, { Component } from 'react';

const KEYS = {
    ENTER: 13,
    UP: 38,
    DOWN: 40,
}

interface AutoSuggestProps<T> {
    suggestions?: T[]
    fetchSuggestions?: () => void;
    getLabel: (suggestion: T) => string;
    onSelect: (suggestion: T) => void;
}

interface AutoSuggestState<T> {
    suggestions: undefined | T[];
    filter: string;
}

class AutoSuggest<T> extends Component<AutoSuggestProps<T>, AutoSuggestState<T>> {

    constructor(props: AutoSuggestProps<T>) {
        super(props);
        this.state = {
            suggestions: undefined,
            filter: undefined,
        }
    }

    handleKeyDown = (e: React.KeyboardEvent) => {

        // var x = document.getElementById(this.id + "autocomplete-list");
        // if (x) x = x.getElementsByTagName("div");

        if (e.keyCode == KEYS.DOWN) {
            // currentFocus++;
            // addActive(x)
        } else if (e.keyCode == KEYS.UP) {
            // currentFocus--;
            // addACtive(x)
        } else if (e.keyCode == KEYS.ENTER) {
            e.preventDefault();
            // if (currentFocus > -1) {
            // if (x) x[currentFocus.click()];
            // }
        }
    }

    handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const filter = e.currentTarget.value;
        this.setState({ filter: filter ? filter.toLowerCase() : undefined });
    }

    filterSuggestions = (suggestions: T[], filter: string): T[] => {
        if (!filter) {
            return [];
        } else {
            return suggestions.filter((suggestion: T) => {
                const label = this.props.getLabel(suggestion).toLowerCase();
                return label.indexOf(filter) !== -1;
            })
        }
    }

    render() {

        const suggestions = this.props.fetchSuggestions ? this.state.suggestions : this.props.suggestions;
        const filteredSuggestions = this.filterSuggestions(suggestions, this.state.filter);

        return (
            <div className="auto-suggest">
                <input type="text" onKeyDown={this.handleKeyDown} onInput={this.handleInput}></input>
                <div className="autocomplete-items">
                    {
                        filteredSuggestions.map((suggestion: T) => {
                            const label = this.props.getLabel(suggestion);
                            return (
                                <div
                                    className="autocomplete-item"
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