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
      <h2 onClick = {descriptionClickHandler}> Kiírás {showDescription ? <ShrinkButton /> : <ExpandButton/>}</h2> 
      {showDescription && <div className="description__body">

        <h3>A verseny neve:</h3>
        Óriáskerék Motoros Egyesület Nyíregyháza, OKME2020 Motoros Tájtúra verseny
        <h3>Célkitűzésünk:</h3>
        Ösztönözni motoros társainkat Kelet-Magyarország kulturális, történelmi, építészeti és
        természeti értékeinek, nevezetességeinek felkeresésére, megismerésére.
        <h3>Időtartam:</h3>
        2020. június 29. – 2020. november 01.
        <h3>Részvétel:</h3>
        A részvétel regisztrációhoz kötött.
        <h3>Regisztráció:</h3>
        az OKME elnökénél személyesen:
        Szász Károly (telefonszám: +36 30 945 8472),
        Szász Motor Kft. 4400 Nyíregyháza, Vasgyár u. 2/B. (munkaidőben!)
        A regisztrációs nyomtatvány kitöltését követően részvételi lapot kapsz, amelyen szerepel a
        regisztrációs számod.
        <h3>A verseny:</h3>
        <ol>
          <li>A versenyben való részvételhez Facebook fiók és a Facebook fiókhoz tartozó email cím
        ismerete szükséges. ( A Facebook mail cím a Facebook beállítások menüpontjában nézhető meg.)</li>
          <li>Az interneten keresd fel a www.kerekkalandok.hu oldalt!</li>
          <li>Regisztrálj a Facebook fiókodhoz tartozó email címeddel!</li>
          <li>A regisztrációt követő 24 órán belül visszaigazoljuk a részvételi jogosultságodat.</li>
          <li>A www.kerekkalandok.hu oldalon az OKME 2020. motoros tájtúra verseny alatt kattints a Jelentkezek gombra!</li>
          <li>A szervezők a regisztrációs lapon megadott adatok alapján jóváhagyják nevezésedet.</li>
          <li>Ezt követően az oldalon való bejelentkezés után a Nevezések alatt megjelennek a verseny helyszínek, elnevezéssel, térképpel.</li>
          <li>Motorozz el a verseny helyszíneire, és készíts egy olyan fotót, amely a lehető legjobban
          hasonlít az ott készített mintafényképre, és amelyen rajta van a saját részvételi lapod
          regisztrációs számodat tartalmazó oldala!<br />
          <b>FONTOS:</b> a fényképek helyszíni megfelelőségének értékelése a fénykép készítésének GPS
          adatai alapján, a feltöltés után automatikusan történik. Ezért fontos, hogy olyan
          telefonnal vagy fényképező géppel készítsd el a fényképet ami a fénykép készítésének
          koordinátáit (GPS adatait) is rögzíti! Célszerű erről még a helyszínen meggyőződni! (Ezt a
          szolgáltatást gyakorlatilag miden okos telefon tudja!)</li>
          <li>Az általad készített fényképeket töltsd fel az oldalra!
            <ol>
              <li>Lépj be az oldalra.</li>
              <li>Azt a belépés után a helyszín nevét megkeresd meg.</li>
              <li>Válasz ki a feltöltés ikon-t</li>
              <li>Válaszd ki a fényképet</li>
              <li>A feltöltés elindul.</li>
            </ol>
          </li>
          <li>Feltöltés után visszajelzést kapsz a fénykép készítési helyének érvényességéről!</li>
          <li>Egy helyszínről csak egy fényképet tölts fel!</li>
          <li>Csak azok a fényképek vesznek részt a versenyben, amelyeket feltöltöttél, a helyszín az
          elkészítés helye alapján érvényes, és amelyeken egyértelműen látszik a részvételi lapod
          regisztrációs számodat tartalmazó oldala.</li>
          <li>A verseny értékelését az OKME vezetősége végzi el a verseny lezárását követően. A
          verseny nyertesei telefonon kapnak értesítést. A nyertesekről és a díjátadóról az OKME a
          Facebook-oldalán ad tájékoztatást. A díjazottak a Szász Motor jóvoltából értékes
          motoros nyereményeket kapnak.</li>
        </ol>
        A versennyel kapcsolatos kérdéseitekkel nyugodtan fordulhattok az OKME vezetőségéhez
        személyesen, telefonon, mail-en vagy a Facebook oldalunkon.
        Balesetmentes versenyzést és kellemes időtöltést kívánunk!
        Az Óriáskerék Motoros Egyesület Nyíregyháza vezetősége
        Nyíregyháza, 2020.06.20.
      </div>}
    </div>
  );
};

export default TripDescription;