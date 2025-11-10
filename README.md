# Programsko inženjerstvo- projekt PlayTrade

*Playtrade* je web-aplikacija namijenjena ljubiteljima društvenih igara koja omogućuje jednostavnu *razmjenu društvenih igara* između korisnika.  
Ideja proizlazi iz potrebe da se smanji broj igara koje stoje neiskorištene na policama i istovremeno omogući pristup novim i zanimljivim igrama bez dodatnih troškova.

Platforma povezuje korisnike koji žele zamijeniti svoje igre s drugima, nudeći pregled dostupnih igara, mogućnost slanja i primanja ponuda za zamjenu te komunikaciju kroz sustav notifikacija i e-mail obavijesti.  
Korisnici mogu uređivati svoj profil, pratiti svoje aktivne i arhivirane zamjene te stvarati popis želja za buduće igre.

Aplikacija je izrađena kao *web-aplikacija prilagođena mobilnim uređajima*, dostupna svima — uz punu funkcionalnost za registrirane korisnike.

Naš cilj je stvoriti dinamičnu zajednicu zaljubljenika u društvene igre, u kojoj svaka zamjena znači novo iskustvo i novu igru na stolu.


## Ciljevi projekta

Razvoj *PlayTrade-a* ima nekoliko ključnih ciljeva:

- *Olakšati razmjenu društvenih igara* među korisnicima i omogućiti pristup rijetkim ili skupim naslovima bez potrebe za kupnjom.  
- *Omogućiti praktično iskustvo razvoja web aplikacije*, od planiranja do implementacije i dokumentiranja.  
- *Razvijati timsku suradnju i komunikaciju*, kroz koordiniran rad, dogovore i podjelu zadataka među članovima.  
- *Pružiti održivu i skalabilnu platformu*, koja može rasti i širiti se na veći broj korisnika i tržišta.

Ovaj projekt nam omogućuje stjecanje praktičnih znanja iz modernih web tehnologija te razvijanje vještina planiranja, komunikacije i implementacije složenih sustava.


## Ključni funkcijski zahtjevi

Za naš projekt analizirali smo i definirali skup funkcionalnosti koje su temeljne za rad aplikacije.

- *Pregled objavljenih društvenih igara*  
  - Dostupan svim korisnicima, uključujući neregistrirane.  
  - Prikaz osnovnih informacija o igri: naziv, žanr, izdavač, godina, broj igrača, težina, vrijeme igranja, stanje i opis.

- *Registracija i prijava korisnika*  
  - Registracija putem e-mail adrese.  
  - Autorizacija se provodi pomoću *OAuth 2.0 protokola* korištenjem tokena.  
  - Nakon prijave korisnik može uređivati svoj profil i objavljivati oglase.

- *Korisnički profili*  
  - Svaki korisnik ima profil sa slikom, opisom i lokacijom (pomoću OpenStreetMap geolokacije).  
  - Mogućnost definiranja interesa po kategorijama igara radi personaliziranih prijedloga.

- *Objavljivanje i upravljanje oglasima*  
  - Registrirani korisnici mogu objaviti svoje igre za zamjenu te uređivati ili uklanjati postojeće oglase.  
  - Oglasi se prikazuju u pogledu *„Moje igre”*.

- *Filtriranje i pretraga*  
  - Korisnici mogu pretraživati igre po kategorijama, žanrovima, težini, broju igrača ili nazivu.

- *Sustav ponuda za zamjenu*  
  - Klikom na gumb *„Ponudi zamjenu”* korisnik može ponuditi jednu ili više svojih igara za razmjenu.  
  - Ponude se prikazuju u pogledu *„Ponude”*, a korisnici dobivaju i e-mail obavijest.  
  - Korisnik može prihvatiti, odbiti ili urediti ponudu.

- *Popis želja i obavijesti*  
  - Korisnici mogu stvoriti popis željenih igara.  
  - Sustav ih automatski obavještava (unutar aplikacije i e-mailom) kada se pojavi igra s popisa.

- *Arhiva zamjena*  
  - Sve izvršene zamjene pohranjuju se i prikazuju u pogledu *„Moje zamjene”*.

- *Administracija*  
  - Administratori mogu uređivati korisnike i njihove objave.  
  - U slučaju kršenja pravila ponašanja, mogu deaktivirati korisničke račune ili obrisati sadržaj.

---

## Tehnologije

Za razvoj sustava odabrali smo moderne i široko podržane tehnologije:

- *Frontend:* React  
  - Koristi komponentni pristup za izradu dinamičnog i responzivnog korisničkog sučelja.  
  - Omogućuje brzo ažuriranje prikaza bez ponovnog učitavanja stranice.

- *Backend:* Node.js (Express)  
  - Obrada poslovne logike, autentifikacija, validacija i upravljanje bazom podataka.  
  - RESTful API za komunikaciju s frontendom.

- *Baza podataka:* MongoDB  
  - NoSQL baza optimizirana za rad s JSON dokumentima.  
  - Koristi se za pohranu korisnika, igara, ponuda i zamjena.

- *Autentifikacija:* OAuth 2.0  
  - Siguran pristup putem tokena.  
  - Integracija s vanjskim identitetima (Google, GitHub, itd.).

- *Deployment:* Microsoft Azure  
  - Frontend: Azure Static Web Apps  
  - Backend: Azure App Service  
  - Skalabilno rješenje s podrškom za monitoring i sigurnost.

## Način rada tima

Rad na projektu temelji se na jasnoj podjeli zadataka i stalnoj komunikaciji među članovima tima.

- Zaduženja se raspoređuju prema znanju i interesima članova (frontend, backend, dizajn, dokumentacija).  
- Komunikacija se odvija putem *WhatsAppa* (brze poruke) i *Discorda* (koordinacija, sastanci, razmjena dokumenata) ili uživo.  
- Održavaju se redoviti online i uživo sastanci radi pregleda napretka i donošenja zajedničkih odluka.  
- Svi članovi surađuju pri planiranju i testiranju funkcionalnosti, s naglaskom na timsku koheziju i učenje.


## Arhitektura sustava

Aplikacija koristi *klijent-poslužitelj arhitekturu* s odvojenim frontendom i backendom.  
Komunikacija se odvija putem RESTful API-ja uz prijenos podataka u JSON formatu.


## Zaključak

Projekt *PlayTrade* spaja tehničku izvedbu i praktično iskustvo timskog razvoja.  
Kroz izradu funkcionalne web aplikacije korisnici dobivaju jednostavan način za zamjenu društvenih igara, a tim stječe dragocjeno iskustvo rada na stvarnom projektu – od analize i planiranja do razvoja i implementacije.

Na taj način, PlayTrade ne predstavlja samo digitalno rješenje, već i primjer kako tehnologija može oživjeti zajedničke interese i potaknuti društvenu interakciju kroz igre.

## Članovi tima

* *Marko Bošnjak* - razvoj backenda
* *Marin Čikotić* - spoj backenda i frontenda (fullstack)
* *Frane Ćevid* - razvoj baze podataka
* *Toni Kapučija* - testiranje
* *Niko Knežević* - voditelj
* *Mihael Rošić* - razvoj frontenda
* *Ivan Žalac* - DevOps

## Licenca

Ovaj projekt licenciran je pod MIT licencom.  
Dozvoljeno je korištenje, kopiranje i modificiranje ovog koda u obrazovne svrhe, uz obavezno navođenje izvora.