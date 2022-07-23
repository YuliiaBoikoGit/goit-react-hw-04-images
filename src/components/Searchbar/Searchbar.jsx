import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { SearchBar, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.styled";

export class Searchbar extends React.Component {
    state = {
        imageName: ''
    };

    handleNameChange = event => {
        this.setState({ imageName: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.imageName.trim() === '') {
            toast.warn('Enter your query');
            return;
        };

        this.props.onSubmit(this.state.imageName);
        this.setState({ imageName: ''});
    };

    render() {
        return (
            <SearchBar>
                <SearchForm onSubmit={this.handleSubmit}>
                    <SearchFormButton type="submit">
                        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                    </SearchFormButton>

                    <SearchFormInput
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.imageName}
                        onChange={this.handleNameChange}
                    />
                </SearchForm>
            </SearchBar>
        );
    };
};

Searchbar.propTypes = {
    handleSubmit: PropTypes.func,
};