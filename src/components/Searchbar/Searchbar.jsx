import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { SearchBar, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.styled";

export const Searchbar = ({onSubmit}) => {
    const [imageName, setImageName] = useState('');

    const handleNameChange = event => {
        setImageName(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (imageName.trim() === '') {
            toast.warn('Enter your query');
            return;
        };

        onSubmit(imageName);
        setImageName('');
    };

    return (
        <SearchBar>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormButton type="submit">
                    <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                </SearchFormButton>
                <SearchFormInput
                    type="text"
                    autocomplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={imageName}
                    onChange={handleNameChange}
                />
            </SearchForm>
        </SearchBar>
    );
};

Searchbar.propTypes = {
    handleSubmit: PropTypes.func,
};