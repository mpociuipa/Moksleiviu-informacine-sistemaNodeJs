import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';  // Patikrinkite ar kelias yra teisingas
import './AddPhotoModal.scss';

const AddPhotoModal = ({ onHide, setPhotos }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (url) {
            try {
                // Pridedame naują dokumentą į 'photos' kolekciją
                await addDoc(collection(firestore, 'photos'), { url });
                console.log('Photo URL added:', url);

                // Atnaujinti nuotraukų sąrašą po naujos nuotraukos pridėjimo
                const photoCollection = collection(firestore, 'photos');
                const photoSnapshot = await getDocs(photoCollection);
                const photosData = photoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPhotos(photosData);
                
                setUrl('');
                onHide();
            } catch (err) {
                console.error("Error adding document: ", err);
                alert(err.message);
            }
        } else {
            console.error("URL is empty!");
        }
    };

    return (
        <Modal show onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Pridėti nuotrauką</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formPhotoUrl">
                        <Form.Label>Nuotraukos URL</Form.Label>
                        <Form.Control
                            type="url"
                            placeholder="Įveskite nuotraukos URL"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Pridėti</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddPhotoModal;
