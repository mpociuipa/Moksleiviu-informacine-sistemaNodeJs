import React, { useState } from 'react';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore';
import { Modal } from 'react-bootstrap';
import './Gallery.scss';

const firestore = getFirestore();

const Gallery = ({ photos, format, setPhotos }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleDelete = async (id) => {
        try {
            const photoDoc = doc(firestore, 'photos', id);
            await deleteDoc(photoDoc);
            setPhotos(photos.filter(photo => photo.id !== id));
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
    };

    const handleCloseModal = () => {
        setSelectedPhoto(null);
    };

    const renderPhotos = () => (
        <div className={`gallery__center ${format}`}>
            {photos.map((photo, index) => (
                <div key={photo.id} className={`gallery__photo ${format}--${index}`}>
                    <img
                        src={photo.url}
                        alt=""
                        className="gallery__image"
                        onClick={() => handlePhotoClick(photo)}
                    />
                    <button className="gallery__delete" onClick={() => handleDelete(photo.id)}>🗑️</button>
                </div>
            ))}
        </div>
    );

    return (
        <div className={`gallery ${format}`}>
            {renderPhotos()}
            {selectedPhoto && (
                <Modal show onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nuotrauka</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={selectedPhoto.url} alt="" className="full-size-image" />
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
}

export default Gallery;
