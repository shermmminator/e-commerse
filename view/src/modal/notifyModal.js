import "./notifyModal.css"
import { Button, Typography } from '@mui/material';
import ReactModal from 'react-modal';

function NotifyModal({ isOpen, onClose }) {
    return (
        <ReactModal
        className="custom-overlay"
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldFocusAfterRender={true}
        shouldCloseOnEsc={true}
        style={{
            overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "1000"
            }
        }}
        >
            <div className="modal-inner-container">
                <Typography 
                id="success-title" 
                variant="h4"
                style={{
                    color: "grey",
                    fontStyle: "italic",
                    
                }}
                >
                    Order has been placed!
                </Typography>
                <Button
                id="close-button"
                variant="contained"
                style={{
                    width: "6vw",
                    height: "3vw",
                    backgroundColor: "green",
                    marginTop: "2vw"
                }}
                onClick={onClose}
                >
                    Close
                </Button>
            </div>

        </ReactModal>
    )
};

export default NotifyModal;