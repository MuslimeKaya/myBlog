import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Uzungöl from '../../assets/images/uzun-göl.jpg';
import AyderYaylası from '../../assets/images/AyderYaylası.jpg';
import Mardin from '../../assets/images/Mardin.jpg'
import Batum from '../../assets/images/Batum.jpg'
import SümelaManastırı from '../../assets/images/SümelaManastırı.jpg'
import OnGözlü from '../../assets/images/OnGözlü.jpg'
import Urfa from '../../assets/images/Urfa.jpg'
import Elazığ from '../../assets/images/Elazığ.jpg'
import CumalıKızık from '../../assets/images/CumalıKızık.jpg'

const PhotoGalleryPage = () => {
    const [photos, setPhotos] = useState([
        {
            id: 1,
            location: 'Trabzon, Türkiye',
            imageUrl: AyderYaylası,
            date: '3 Haziran 2024',
        },
        {
            id: 2,
            location: 'Batum, Gürcistan',
            imageUrl: Batum,
            date: '6 Haziran 2024',
        },
        {
            id: 3,
            location: 'Mardin, Türkiye',
            imageUrl: Mardin,
            date: '3 Haziran 2025',
        },
        {
            id: 4,
            location: 'Trabzon, Türkiye',
            imageUrl: SümelaManastırı,
            date: '5 Haziran 2024',
        },
        {
            id: 5,
            location: 'Diyarbakır, Türkiye',
            imageUrl: OnGözlü,
            date: '27 temmuz 2023',
        },
        {
            id: 6,
            location: 'Urfa, Türkiye',
            imageUrl: Urfa,
            date: '25 Eylüy 2022',
        },
        {
            id: 7,
            location: 'Elazığ, Türkiye',
            imageUrl: Elazığ,
            date: '01 Kasım 2020',
        },
        {
            id: 8,
            location: 'Bursa, Türkiye',
            imageUrl: CumalıKızık,
            date: '01 Kasım 2020',
        },
    ]);
    const [activePhoto, setActivePhoto] = useState(null);

    const showPhotoDetail = (photo) => setActivePhoto(photo);
    const closePhotoDetail = () => setActivePhoto(null);

    return (
        <div className="photo-gallery">
            <h1>Fotoğraf Galerisi</h1>
            <div className="photo-grid">
                {photos.map((photo) => (
                    <div key={photo.id} className="photo-item" onClick={() => showPhotoDetail(photo)}>
                        <img src={photo.imageUrl} alt={photo.title} />
                        <h3>{photo.location}</h3>
                        <h6>{photo.date}</h6>

                    </div>
                ))}
            </div>
            {activePhoto && (
                <div className="photo-modal">
                    <h2>{activePhoto.title}</h2>
                    <button onClick={closePhotoDetail}>Kapat</button>
                </div>
            )}
            <Link to="/" className='Anasayfa-link'>← Ana Sayfaya Dön</Link>
        </div>
    );
};

export default PhotoGalleryPage;
