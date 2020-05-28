import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = ()  => {

  return (
    <div class = "pp_container">
      <h2>Adatvédelmi információk</h2>
      <p>
        Az alkalmazás Facebook bejelentkezést használ. Személyes adatot nem tárol.
      </p>
      <p>
        Megőrzésre kerülő adatok: feltöltött képek és azok metaadatai, továbbá az alkalmazás használata során keletkezett adatok.
      </p>
      <p>
        Az alkalmazásban tárolt adatok az alkalmazás Facebook profilról való leválasztása esetén törlésre kerülnek, ami a következő linkre kattintva tehető meg:<br/>
        <a href = "https://www.facebook.com/settings?tab=applications" target = "_new">https://www.facebook.com/settings?tab=applications</a>
      </p>
      <h2>Felhasználási feltételek</h2>
      <p>
        Túrát létrehozni kizárólag közúton, szabályosan megközelíthető látogatási pontokkal engedélyezett. A nem megfelelőnek ítélt túrák értesítés és magyarázat nélkül törlése kerülnek.
        Ezt elkerülendő minden esetben javasolt a létrehozóknak bejárni a helyszíneket, és friss, geotagelt fotókat használni.
      </p>
      <p>
        A túrákhoz és kerekekhez feltöltött képek meg kell, hogy feleljenek a személyiségvédelmi szabályoknak, valamint nem lehetnek bántó, közízlést vagy szemérmet sértő tartalmúak. 
        A nem megfelelő képek szintén törlésre kerülnek.
        A feltöltött fotók a felhasználók általi törlésükig az alkalamazáson belül bárhol felhasználásra kerülhetnek.
      </p>
      <h2>Adathasználat</h2>
      <table class = "pp_table">
        <thead><th>Forrás</th><th>Adat jellege</th><th>Adatgyűjtés célja</th><th>Eltávolítás</th></thead>
        <tbody>
          <tr><td>Regisztrációval</td><td>Facebook azonosító</td><td>Bejelentkezés</td><td>Facebook összeköttetés megszüntetésével</td></tr>
          <tr><td>Önkéntes megadással</td><td>Motor típusa, becenév</td><td>Nyilvános azonosító</td><td>Facebook összeköttetés megszüntetésével</td></tr>
          <tr><td>Az alkalmazás használatakor</td><td>Fotó, látogatás helye és ideje, kiindulópont</td><td>Alkalmazás működéséhez szükséges</td><td>Facebook összeköttetés megszüntetésével</td></tr>
        </tbody>
      </table>
    </div>
  )

};

export default PrivacyPolicy;