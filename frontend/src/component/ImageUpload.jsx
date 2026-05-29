import { useState } from "react";
// import axios from "axios";

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        console.log(file);
        console.log(preview);
    };

    const uploadImage = async () => {
        if (!file) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("avtar", file); // "image" must match backend field

        // const res = await axios.post(
        //     "http://localhost:3001/things/upload",
        //     formData,
        //     { headers: { "Content-Type": "multipart/form-data" } }
        // );
        // alert("Uploaded: " + res.data.filename);
        const res = await fetch("http://localhost:4001/things/upload", {
            method: "POST",
            body: formData, // do NOT set Content-Type manually
        });
        const data = await res.json(); // fetch requires .json()

        alert("Uploaded: " + data.filename);
    };

    return (
        <div>
            <h2>Upload Image</h2>
            {/* <input type="file" accept="avtar/*" onChange={handleFileChange} /> */}
            <input type="file" name="avtar" onChange={handleFileChange} />

            <br /><br />

            {preview && <img src={preview} alt="Preview" width="200" />}

            <br /><br />

            <button onClick={uploadImage}>Upload</button>
        </div>
    );
}

export default ImageUpload;
