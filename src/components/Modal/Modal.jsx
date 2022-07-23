import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from "prop-types";
import { Overlay, ModalForm } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export const Modal = (props) => {
    const handleKeyDown = useCallback(event => {
        if (event.code === 'Escape') {
            props.onClose();
        };
    }, [props]);

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            props.onClose();
        };
    };

    useEffect(() => { window.addEventListener('keydown', handleKeyDown) }, [handleKeyDown]);
    useEffect(() => {
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return createPortal(
        <Overlay onClick={handleBackdropClick}>
            <ModalForm>{props.children}</ModalForm>
        </Overlay>,
        modalRoot
    );
};

Modal.propTypes = {
    children: PropTypes.any,
    onClose: PropTypes.func.isRequired,
};