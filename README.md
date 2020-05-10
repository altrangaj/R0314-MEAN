# R0314-MEAN
R0314 Web kehitys: MEAN.

### workshops
Suoritan kurssin workshopit itsenäisesti. Olen liittänyt tehtävänannot mukaan, koska ne saattavvat olla vanhoja ja päivittyä kurssin edetessä, niin löytyy sitten ne tehtävänannot, joiden mukaan olen tehnyt.

### WS3 Exercise 2 & 3 [in Heroku](https://koiranayttely.herokuapp.com/)
Ymmärsin materiaalista, että tämä tulee tehdä http-kirjastolla. Ratkaisu käyttää https://dog.ceo/api REST-apia. Sovellus arpoo uudet koirat näkymään 20s välein, jos dog.ceo sen sallii. Client lataa kaikki 15 kuvaa aluksi. Se on selainikkunan kuvasuhteesta kiinni paljonko kuvia näkyy.

## projekti 1 [in Heroku](https://r0314-mean-projekti.herokuapp.com/)
Kokeilin  HTTrack Website Copier/3.x githubiin ja otin siitä pohjan tähän harjoitukseen. Pidin prioriteettina saada mahd samannäköisen sivun. Siispä kaikki toiminnallisuus ei ole mukana.

![Image of copied github.com](https://github.com/altrangaj/R0314-MEAN/blob/master/projekti1/READMEmd_pictures/home_info.JPG)

## projekti 3 - kuvagalleria (MERN)
backendissä express-async-errors huolehtii poikkeuksista ja tiedottaa frontendiin saakka. Halusin kokeilla kuvan uploadaus - toiminnon toteuttamista. Eli tässä kuva tallentuu suoraan Buffer-tyyppisenä Mongoon eikä ole riippuvainen lokaalista drivestä. Sopii siis hyvin esim. Herokuun. Leiska ts. CSS on suoraan ws3:een tekemästäni koiranäyttelystä pikaisesti liimattuna...
![kuvagalleria](https://raw.githubusercontent.com/altrangaj/R0314-MEAN/master/projekti3/Capture.PNG)
