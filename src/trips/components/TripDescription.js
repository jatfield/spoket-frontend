import React from 'react';
import { useState } from 'react';
import { ReactComponent as ExpandButton } from '../../shared/images/expand_more-24px.svg';
import { ReactComponent as ShrinkButton } from '../../shared/images/expand_less-24px.svg';

const TripDescription = (props) => {

  const [showDescription, setShowDescription] = useState(false);

  const descriptionClickHandler = () => {
    setShowDescription(showDescription ? false : true)
  }

  return (
    <div className="trip__data__description">
      <h2 onClick = {descriptionClickHandler}>Leírás {showDescription ? <ShrinkButton /> : <ExpandButton/>}</h2> 
      {showDescription && <div className="description__body" dangerouslySetInnerHTML= {{__html: props.description}}></div>}
    </div>
  );
};

export default TripDescription;