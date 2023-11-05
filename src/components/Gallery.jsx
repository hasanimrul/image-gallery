import React, { useState } from "react";
import style from "../../src/styles/Gallery.module.css";

const Gallery = () => {
  const [images, setImages] = useState([
    "/assets/img5.jpg",
    "/assets/img4.jpg",
    "/assets/img3.jpg",
    "/assets/img6.jpg",
    "/assets/img7.jpg",
    "/assets/img8.jpg",
    "/assets/img9.jpg",
    "/assets/img10.jpg",
    "/assets/img11.jpg",
    "/assets/img2.jpg",
    "/assets/img12.jpg",
    "/assets/img13.jpg",
    "/assets/img16.jpg",
    "/assets/img18.jpg",
    "/assets/img20.jpg",
    "/assets/img21.jpg",
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);


  // images selection function
  const toggleImageSelection = (index) => {
    const isSelected = selectedImages.includes(index);
    if (isSelected) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };


  // selected image delete function
  const deleteSelectedImages = () => {
    const updatedImages = images.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  // image drag & drop function

  const handleDragStart = (index) => {
    setDraggedImageIndex(index);
  };


  const handleDragOver = (index) => {
    if (draggedImageIndex === null) return;
    if (draggedImageIndex !== index) {
      const updatedImages = [...images];
      const draggedImage = updatedImages[draggedImageIndex];
      updatedImages.splice(draggedImageIndex, 1);
      updatedImages.splice(index, 0, draggedImage);
      setImages(updatedImages);
      setDraggedImageIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedImageIndex(null);
  };

  
  return (
    <div className={style.galleryContainer}>
      {selectedImages.length > 0 && (
        <div className={style.deleteBtn}>
          <img src="/assets/trash.gif" onClick={deleteSelectedImages} alt="" />
          <p>Click the Bin to Delete</p>
        </div>
      )}
      <div className={style.gallery}>
        {images.map((img, i) => (
          <img
            key={i}
            id='img'
            src={img}
            alt=""
            draggable={true}
            onDragStart={() => handleDragStart(i)}
            onDragOver={() => handleDragOver(i)}
            onDragEnd={handleDragEnd}

            className={`img ${selectedImages.includes(i) ? style.selected : ""}`}
            onClick={() => toggleImageSelection(i)}
            style={{
              transform: draggedImageIndex === i ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.7s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;