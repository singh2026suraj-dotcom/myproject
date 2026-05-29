import { useEffect, useState } from "react";

function ViewImages() {
    const [images, setImages] = useState([]);

    const loadImages = async () => {
        const res = await fetch("http://localhost:4001/things/images");
        const data = await res.json();
        setImages(data);
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <div>
            <h2>Uploaded Images</h2>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {images.map((img, index) => (
                    <div key={index}>
                        <img
                            src={img.url}
                            alt=""
                            width="150"
                            style={{ borderRadius: "8px", border: "1px solid #ccc" }}
                        />
                        <p>{img.filename}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewImages;
