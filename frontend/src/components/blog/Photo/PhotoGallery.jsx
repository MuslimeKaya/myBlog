import React, { useEffect } from 'react';
import usePhotoStore from '../../../store/photoStore';
import { useNavigate } from 'react-router-dom';

const PhotoGallery = () => {
    const navigate = useNavigate();
    const { photos, loading, error, fetchPhotos } = usePhotoStore();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchPhotos();
    }, [navigate, fetchPhotos]);

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata: {error}</div>;

    return (
        <div className="photo-gallery">
            {photos.length === 0 ? (
                <div>Henüz fotoğraf yok</div>
            ) : (
                photos.map((photo) => (
                    <img key={photo.id} src={photo.url} alt={photo.title} className="gallery-image" />
                ))
            )}
        </div>
    );
};

export default PhotoGallery;
