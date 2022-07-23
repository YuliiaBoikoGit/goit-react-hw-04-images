import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from "prop-types";
import { Overlay, ModalForm } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        };
    };

    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        };
    };

    render() {
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalForm>{this.props.children}</ModalForm>
            </Overlay>,
            modalRoot
        );
    };
};

Modal.propTypes = {
    children: PropTypes.any,
    onClose: PropTypes.func.isRequired,
};