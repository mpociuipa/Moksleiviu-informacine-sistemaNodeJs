import React from 'react';
import { Modal } from 'react-bootstrap';
import './FormatModal.scss';

const FormatModal = ({ setFormat, onHide }) => {
    const formats = [
        { id: 1, name: 'Rėmelis su apvalia nuotrauka', className: 'format--round-frame-center' },
        { id: 2, name: 'Dvi nuotraukos 200px po viduriu', className: 'format--two-side-by-side-center' },
        { id: 3, name: 'Keturios nuotraukos centre po 200px', className: 'format--four-center-200px' },
        { id: 4, name: 'Viena nuotrauka su 20px rėmeliu', className: 'format--single-with-border' },
        { id: 5, name: 'Dvi nuotraukos centre po 400px pločio ir 200px aukščio', className: 'format--two-400x200-center' },
        { id: 6, name: 'Keturios nuotraukos centre, pirmoji ir ketvirta apvalios', className: 'format--four-center-some-round' },
        { id: 7, name: 'Dvi nuotraukos centre po 400px pločio ir 200px aukščio', className: 'format--two-400x200-center' },
        { id: 8, name: 'Trys nuotraukos centre: dvi 200px, viena 400px pločio ir 200px aukščio', className: 'format--three-mixed-center' },
        { id: 9, name: 'Trys nuotraukos centre: viena 250px pločio ir 400px aukščio, dvi 150px pločio ir 200px aukščio', className: 'format--three-special-center' }
    ];

    return (
        <Modal show onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Keisti formatavimą</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formats.map(format => (
                    <div key={format.id} className={`format-option ${format.className}`} onClick={() => setFormat(format.className)}>
                        {format.name}
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    );
};

export default FormatModal;
