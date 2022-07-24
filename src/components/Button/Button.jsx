import PropTypes from "prop-types";
import { Button } from "./Button.styled";

export const LoadButton = ({onClick}) => {
    return <Button type="button" onClick={onClick}>Load more</Button>
};

LoadButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};