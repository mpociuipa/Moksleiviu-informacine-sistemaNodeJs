import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore  } from '../../services/AuthServices';
import { collection, getDocs } from 'firebase/firestore';
import Header from '../header/Header';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Register from '../user/register/Register';
import Reset from '../user/reset/Reset';
import Profile from '../user/profile/Profile';
import Gallery from '../gallery/Gallery';
import AddPhotoModal from '../addphotomodal/AddPhotoModal';
import FormatModal from '../formatmodal/FormatModal';
import './App.scss';

function App() {
    const [user] = useAuthState(auth);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFormatModal, setShowFormatModal] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [format, setFormat] = useState('grid');

    useEffect(() => {
        const fetchPhotos = async () => {
            const photoCollection = collection(firestore, 'photos');
            const photoSnapshot = await getDocs(photoCollection);
            const photosData = photoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Fetched Photos: ", photosData); 
            setPhotos(photosData);
        };
        fetchPhotos();
    }, []);

    console.log("Photos in App.js state: ", photos);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={(
                    <div className="app">
                        <div className="container text-center">
                            <Home/>
                            {user ? (
                                <>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        +
                                    </button>
                                    <Gallery photos={photos} format={format} setPhotos={setPhotos} />
                                    <button
                                        className="btn btn-link"
                                        onClick={() => setShowFormatModal(true)}
                                    >
                                        Keisti formatavimą
                                    </button>
                                    {showAddModal && <AddPhotoModal onHide={() => setShowAddModal(false)} setPhotos={setPhotos} />}
                                    {showFormatModal && (
                                        <FormatModal
                                            onHide={() => setShowFormatModal(false)}
                                            setFormat={setFormat}
                                        />
                                    )}
                                </>
                            ) : (
                                <p>Prašome prisijungti!</p>
                            )}
                        </div>
                    </div>
                )} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset" element={<Reset />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;