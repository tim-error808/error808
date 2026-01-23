NAPOMENA: U slucaju problema sa postavljanjem i pokretanjem aplikacije javite nam se.

**1. Instalacija**

- **Preduvjeti**:

  1. Node.js 20
  2. npm [LATEST]

- **Preuzimanje**: 

  ``` bash
    $ git clone https://github.com/tim-error808/error808.git
  ```


**Instalacija ovisnosti**:

  ``` bash
    $ cd error808
    $ cd backend
    $ npm install
    $ cd ../frontend
    $ npm install
  ```

**2. Postavke**

Detaljne upute za konfiguraciju aplikacije:

- **Konfiguracijske datoteke**:
  
  1. frontend
    
    Potrebno je postaviti adresu backend API. Konfiguracijska datoteka se nalazi u frontend/src/config/ModeConfig.js

  2. backend

    Potrebno je postaviti environment varijable:

    ```
      FRONTEND_URL
      GOOGLE_CLIENT_ID - oauth
      GOOGLE_CLIENT_SECRET - oauth
      JWT_SECRET
      LOCAL_TEST
      MONGODB_URI
      REFRESH_SECRET
      REST_API_PORT
      EMAIL_SENDER - "from@someone.domain"
      EMAIL_SMTP_HOST
      EMAIL_PASSWORD
    ```
    Kontekst pojedine varijable je jasan iz naziva varijabli. Ovisno o okruženju postavljanje varijabli se razlikuje, stoga je na korisniku da poznaje alate svoga okruženja.


- **Postavke baze podataka**: 

  Baza podataka se postavlja na temelju modela koji se nalaze u backend/models direktoriju i na wiki stranicama.

**3. Pokretanje aplikacije**

  ``` bash
  $ cd backend
  $ npm run dev-start
  $ cd ../frontend
  $ npm start
  ```

**4. Upute za administratore**

Smjernice za administratore aplikacije nakon puštanja u pogon:

- **Pristup administratorskom sučelju**:

  - URL/admin

  - Administrator treba biti postavljen ili dodijeljen od strane drugog administratora

- **Redovito održavanje**:

  - Redovito pregledati stanje web aplikacije na servisu koji se koristi za hosting.

------------------------------------------------------------------------


**5. Puštanje u pogon na Azure platformi**

  Azure je platforma koja je korištena za ovaj projekt kako je dostupna studentima za razvoj projekata bez dodatnih troškova.

  - Za frontend koristi se Static Web App

    1. Na portalu Azure usluge odabrati izradu Static Web App
    2. Povezati s github repozitorijem projekta, tj folderom frontend
    3. Azure automatski postavlja skriptu za deploy frontend projekta
    4. Postaviti simboličku adresu po uputama na platformi
    5. Postaviti potrebne environment varijable na sučelju kreirane Static Web App usluge

  - Za backend koristi se App Service

    1. Na portalu Azure usluge odabrati izradu App Service
    2. Povezati s github repozitorijem projekta, tj folderom backend
    3. Azure automatski postavlja skriptu za deploy backend projekta
    4. Postaviti simboličku adresu po uputama na platformi
    5. Postaviti potrebne environment varijable na sučelju kreirane App Service usluge
    6. Postaviti CORS postavke na sučelju kreirane App Service usluge


  Aplikaciji se pristupa pomoću postavljene simboličke adrese.
