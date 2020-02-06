import React, { useEffect, useState, useRef } from 'react';

const ImageUpload = (props) => {
  const [image, setImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();

  //image preview
  useEffect(() => {
    if (!image) {
      return;
    }
    const fileReader = new FileReader(); //browser API
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    }
    fileReader.readAsDataURL(image);
  }, [image])

  const filePickHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setImage(pickedFile);
    }
    props.onInput(props.id, pickedFile)
  }

  const pickClickHandler = () => {
    filePickerRef.current.click();
  }

  return (
    <div className="file_upload">
      <input 
        id = {props.id}
        ref = {filePickerRef}
        style = {{display: 'none'}}
        type = "file"
        accept = ".jpg,.png,.jpeg"
        onChange = {filePickHandler} />
      <div className="image_upload__preview">
        {/*previewUrl && <img src = {previewUrl} alt = "Preview" />*/}
      </div>
      <button type = "button" onClick = {pickClickHandler}>Pick image!</button>
    </div>
  )
};

export default ImageUpload;