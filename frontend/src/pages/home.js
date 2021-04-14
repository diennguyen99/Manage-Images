import { useState, useEffect } from 'react';
import { Gallery } from '../components/gallery';
import { List } from '../components/list';

export const Home = () => {
    const [imagesList, setImagesList] = useState([]);
    const [showGallery, setShowGallery] = useState(false);

    useEffect(() => {
        fetch('http://localhost:9000/api/images')
        .then(response => response.json())
        .then(json => json.map((obj) => {
            return { id: obj.id, original: obj.imageUrl, thumbnail: obj.imageUrl, thumbnailLabel: obj.name }
        }))
        .then(images => setImagesList(images))
    }, [])

    return (
        <div className="container">
            <div className="py-2 border-b">
                <div className="d-flex">
                    <button onClick={() => setShowGallery(false)}>List</button>
                    <button onClick={() => setShowGallery(true)} className="ml-4">Gallery</button>
                </div>
            </div>
            { showGallery ? <Gallery images={imagesList} /> : <List images={imagesList} onDelete={setImagesList} />}
        </div>
    );
}