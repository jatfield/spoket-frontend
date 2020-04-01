import React, { useEffect, useState } from 'react';
import {useFetch} from '../../hooks/request-hook'
import SpokeMap from './SpokeMap';
import './Spoke.css'

const Spoke = (props) => {

  const {isLoading, sendRequest} = useFetch();
  const [spokeImageUrl, setSpokeImageUrl] = useState();

  useEffect (() => {
    const getSpokeUrl = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/spokes/${props.wheel._id}/${props.spoke._id}`, 'GET', null, {'Authentication': `token ${props.user.fbToken}`});
        setSpokeImageUrl(responseData.url);
      } catch (error) {
        console.log(error);
      }
    };
    props.spoke && getSpokeUrl();
    
  }, [sendRequest, props, setSpokeImageUrl]);

  return (
    <div className="wheel__spoke">
      {props.spoke && <SpokeMap spoke = {props.spoke} spot = {props.spot}/>}
      {!isLoading && spokeImageUrl && 
        <div className="spoke__image">
          <img src = {spokeImageUrl} alt = {props.spot.name} width = {150}/>
        </div>}
      <div className="spoke__uploadlink"><p onClick = {props.handleImageUploadClick}>{spokeImageUrl ? "Új kép" : "Feltöltöm a képet"}</p></div>
    </div>)
}

export default Spoke;