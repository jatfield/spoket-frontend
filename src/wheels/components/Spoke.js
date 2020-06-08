import React, { useEffect, useState } from 'react';
import {useFetch} from '../../hooks/request-hook'
import SpokeMap from './SpokeMap';
import './Spoke.css';
import dayjs from 'dayjs';
import { ReactComponent as DateSpokeIcon } from '../../shared/images/today-24px.svg';
import { ReactComponent as DistanceSpokeIcon } from '../../shared/images/settings_ethernet-24px.svg';


const Spoke = (props) => {

  const {isLoading, sendRequest} = useFetch();
  const [spokeImageUrl, setSpokeImageUrl] = useState();  

  useEffect (() => {
    const getSpokeUrl = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/spokes/${props.wheel._id}/${props.spoke._id}`, 'GET', null, {'Authentication': `token ${props.user.spokeToken}`});
        setSpokeImageUrl(responseData.url);
      } catch (error) {
        console.log(error);
      }
    };
    props.spoke && getSpokeUrl();
    
  }, [sendRequest, props.wheel, props.spoke, props.user, setSpokeImageUrl]);

  const handleUploadClick = () => {
    props.handleImageUploadClick();
  };

  return (
    <div className="wheel__spoke">
      {!isLoading && spokeImageUrl && 
        <div className="spoke__data">
          <div className="spoke__image">
            <img src = {spokeImageUrl} alt = {props.spot.name} width = {150}/>
          </div>
          <div className="spoke__image_data">
            <div className="spoke__image_data_status">
              {props.spoke.verifiedAt ? 'Látogatás elfogadva' : 'Látogatás érvénytelen'}<br />
              <DateSpokeIcon /> {dayjs(props.spoke.updatedAt).format('YYYY.MM.DD. HH:mm')} <br/>
            </div>
            {props.spoke.distance &&<div className="spoke__image_data_distance"><DistanceSpokeIcon /> {(Math.round(props.spoke.distance) * 100)/100} m</div>}
          </div>
        </div>}
      <div className="spoke__uploadlink"><button onClick = {handleUploadClick}>{spokeImageUrl ? "Új kép" : "Képfeltöltés"}</button></div>
      {props.spoke && props.spot &&  <SpokeMap spoke = {props.spoke} spot = {props.spot} verified = {props.spoke.verifiedAt} />}
    </div>)
}

export default Spoke;