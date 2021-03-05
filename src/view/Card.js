import React, {useState, useEffect, useRef} from 'react';

import defaultImage from "./Fichier_1.png";

import "./Card.css";

const Card = (props) => {
  const imageElement = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);

  let viewCardClassName = "viewCard";
  if (imageLoaded) {
    viewCardClassName = `${viewCardClassName} loaded`;
  }

  useEffect(() => {
    const abortController = new AbortController();

    const loadDefaultImage = () => {
      if (imageElement.current) imageElement.current.src = defaultImage;
    }

    const fetchImage = async() => {
      try {
        const response = await fetch(props.data.image, {signal: abortController.signal});
        if (response.status < 400) {
          const blob = await response.blob();
          if (imageElement.current) imageElement.current.src = URL.createObjectURL(blob);
        } else {
          loadDefaultImage();
        }
      } catch(e) {
        if (!abortController.signal.aborted) {
          loadDefaultImage();
        }
      }
    }
    fetchImage();
    return () => {
      abortController.abort("");
    }
  }, [props.data.image])

  return (
    <div className={viewCardClassName}>
      <div className="cardContainer">
        <div className="cardImage">
          <img
            alt="amiibo"
            onLoad={() => setImageLoaded(true)}
            ref={imageElement}
          />
        </div>
        <div className="cardText">
          <div className="text">
            {props.data.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
