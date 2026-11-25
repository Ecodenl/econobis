# Econobis

<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>

<a href="https://phpunit.de/">
    <img alt="Tested with PHPUnit" src="https://img.shields.io/badge/tested%20with-PHPUnit-green.svg">
</a>

<a href="https://php.net/">
    <img alt="PHP 8.2 or higher" src="https://img.shields.io/badge/php-%3E%3D%208.2-8892BF.svg">
</a>

<a href="https://laravel.com/">
    <img alt="Laravel 12" src="https://img.shields.io/badge/Laravel-12-red.svg">
</a>

<a href="https://github.com/">
    <img alt="Open source" src="https://badges.frapsoft.com/os/v1/open-source.svg?v=102">
</a>

To contribute to this project you must assign copyright of your contribution to Cooperatie Econobis U.A.
To do this, include the following filled-in copyright assignment form in your patch: [Individual contributor assignment agreement](https://wiki.econobis.nl/attachments/86)

## Why all this legal stuff ?

We want clean renewable energy. We want a digital energy market which is democratic controlled, fair and accessible for all people at all times.
We are cooperatives, because we believe that members, in our case normal people, are the owners of everything we do.
That is why we choose for Open Source software. It is also democratic, fair and accessible for everybody.
But we want to make sure that it remains Open Source. That is why we need the legal stuff.

---

# Inhoudsopgave

- [Technische opbouw](#technische-opbouw)
- [Vereisten](#vereisten)
- [Ontwikkelomgevingen](#ontwikkelomgevingen)
- [Installatie backend](#installatie-backend)
- [Econobis shared database](#econobis-shared-database)
- [Bigstorage](#bigstorage)
- [Passport en OAuth](#passport-en-oauth)
- [Installatie frontend](#installatie-frontend)
- [Installatie customer portal](#installatie-customer-portal)
- [Lokale mailconfiguratie](#lokale-mailconfiguratie)
- [Queues en scheduler](#queues-en-scheduler)
- [Webformulieren API](#webformulieren-api)
- [Testen](#testen)
- [Onderhoud ontwikkelomgeving](#onderhoud-ontwikkelomgeving)
- [Troubleshooting](#troubleshooting)

---

# Technische opbouw

Econobis bestaat uit een Laravel-backend en twee afzonderlijke
React-frontendapplicaties.

| Onderdeel | Techniek |
| --- | --- |
| Backend | PHP / Laravel |
| Authenticatie | Laravel Passport |
| Database | MariaDB (via MySQL-driver) |
| Rollen en rechten | Spatie Laravel Permission |
| PDF-generatie | Dompdf |
| Econobis frontend | React / Webpack |
| Customer portal | React / Create React App |
| Backend tests | PHPUnit |
| Frontend tests | Jest / TestCafe |

## Belangrijkste directories

| Directory | Omschrijving |
| --- | --- |
| `app/` | Laravel-applicatie |
| `config/` | Applicatieconfiguratie |
| `database/` | Migraties, seeders en SQL-scripts |
| `client-app/` | Frontend van Econobis |
| `customer-portal-app/` | Frontend van de customer portal |
| `public/` | Publiek toegankelijke bestanden |
| `public/portal/` | Lokaal gepubliceerde customer portal |
| `storage/` | Laravel-opslag, logs en tijdelijke bestanden |
| `secrets/oauth/` | Standaard opslaglocatie Passport-sleutels |
| `bigstorage/` | Standaard lokale opslaglocatie voor documenten, mailbijlagen en administratiebestanden |
| `tests/` | Backend tests |

---

# Vereisten

## Software

| Software | Versie / uitgangspunt |
| --- | --- |
| PHP | 8.2 of hoger, conform `composer.json` |
| Laravel | 12 |
| Laravel Passport | 13 |
| Composer | 2.x |
| Database | MariaDB (productie: 10.11.20) |
| Node.js | 22.22.3 aanbevolen voor lokale ontwikkeling |
| NPM | 10.x |
| React | 18 |
| Git | Recente versie |

Econobis draait in productie op MariaDB 10.11.
Lokale ontwikkelomgevingen kunnen een afwijkende databaseversie gebruiken.
Voor optimale compatibiliteit wordt dezelfde hoofdversie als in
productie aanbevolen.

Binnen Econobis wordt voor MariaDB de MySQL-driver van Laravel
gebruikt (`DB_CONNECTION=mysql`).

De exacte PHP- en packagevereisten zijn vastgelegd in
`composer.json`, `composer.lock` en de packagebestanden van beide
frontendapplicaties.

Gebruik bij voorkeur de vastgelegde dependencies uit de lockbestanden.

Gebruik voor een reguliere installatie daarom:

```bash
composer install
```

en:

```bash
npm ci --legacy-peer-deps
```

Gebruik `composer update` en `npm update` alleen wanneer het
daadwerkelijk de bedoeling is om dependencies te wijzigen.

## PHP-extensies

Zorg ervoor dat de benodigde PHP-extensies beschikbaar zijn.

Belangrijke extensies zijn onder andere:

- bcmath
- ctype
- curl
- dom
- fileinfo
- gd
- iconv
- imap
- mbstring
- openssl
- PDO
- pdo_mysql
- session
- simplexml
- soap
- sodium
- tokenizer
- xml
- xmlreader
- xmlwriter
- zip
- zlib

Controleer de PHP-versie:

```bash
php -v
```

Controleer de beschikbare PHP-extensies:

```bash
php -m
```

Controleer na het installeren van de Composer-packages of aan de
platformvereisten wordt voldaan:

```bash
composer check-platform-reqs
```

## Node.js en NPM

Het gebruik van een Node Version Manager wordt aanbevolen wanneer
meerdere projecten verschillende Node.js-versies gebruiken.

Voor Windows kan hiervoor NVM for Windows worden gebruikt.

```bash
nvm install 22.22.3
nvm use 22.22.3
```

Controleer de actieve versies:

```bash
node -v
npm -v
```

Op Windows kan de actieve NVM-versie ook worden gecontroleerd met:

```bash
nvm current
```

---

# Ontwikkelomgevingen

Econobis kan lokaal worden ontwikkeld in verschillende omgevingen.

De installatie-instructies in deze README zijn gericht op:

- Windows met XAMPP.
- Windows met Laravel Homestead, Vagrant en VirtualBox.

Docker wordt eveneens gebruikt als ontwikkelomgeving. De specifieke
Docker-installatie-instructies worden later aan deze README toegevoegd.

De algemene installatie- en configuratiestappen zijn grotendeels
onafhankelijk van de gekozen ontwikkelomgeving.

## Windows met XAMPP

XAMPP kan worden gebruikt voor het lokaal draaien van PHP, Apache
en de database.

Download XAMPP:

https://www.apachefriends.org/

Installeer daarnaast:

- Git.
- Composer.
- Node.js en NPM, eventueel via NVM for Windows.

Zorg ervoor dat de juiste PHP-installatie beschikbaar is via de
Windows PATH-omgevingsvariabele.

Controleer dit bijvoorbeeld met:

```powershell
where.exe php
php -v
php --ini
```

### PHP-extensies activeren

Afhankelijk van de XAMPP-installatie moeten aanvullende extensies
worden geactiveerd in `php.ini`.

Bijvoorbeeld:

```ini
extension=gd
extension=imap
extension=soap
extension=zip
extension=sodium
```

Controleer of de betreffende extensies aanwezig zijn en nog niet
zijn geactiveerd.

Herstart Apache na het aanpassen van `php.ini`.

Controleer vervolgens opnieuw:

```bash
php -m
```

### Apache-configuratie

Configureer Apache zodanig dat de documentroot van de Econobis-website
verwijst naar de `public`-directory van het project.

Bijvoorbeeld:

```text
C:/framework/econobis/public
```

Gebruik nooit de projectroot zelf als documentroot.

Zorg ervoor dat URL-rewriting beschikbaar is, zodat Laravel de
applicatieroutes correct kan afhandelen.

De exacte Apache VirtualHost-configuratie is afhankelijk van de
gekozen lokale domeinnaam en installatielocatie.

## Windows met Laravel Homestead

Laravel Homestead biedt een Linux-ontwikkelomgeving binnen een
virtuele machine.

Benodigde software:

- VirtualBox.
- Vagrant.
- Laravel Homestead.
- Git.
- Eventueel Node.js en NPM op Windows.

Meer informatie:

- https://www.virtualbox.org/
- https://developer.hashicorp.com/vagrant
- https://laravel.com/docs/homestead

### Voorbeeld directorystructuur

Op Windows:

```text
D:/framework/
    econobis/
    bigstorage/
        econobis/
```

Binnen Homestead:

```text
/home/vagrant/code/
    econobis/
    bigstorage/
        econobis/
```

### Voorbeeld Homestead.yaml

```yaml
folders:
    - map: D:/framework
      to: /home/vagrant/code

sites:
    - map: econobis-xaris.nl
      to: /home/vagrant/code/econobis/public

databases:
    - econobis
    - econobis_shared
```

Pas de domeinnaam, directories en databasenamen aan de eigen
ontwikkelomgeving aan.

Zorg ervoor dat de lokale domeinnaam via het hosts-bestand van
Windows naar het IP-adres van Homestead verwijst.

Start Homestead:

```bash
vagrant up
```

Maak verbinding met de virtuele machine:

```bash
vagrant ssh
```

Ga naar de projectdirectory:

```bash
cd ~/code/econobis
```

Bij wijzigingen in `Homestead.yaml` kan het nodig zijn om de
virtuele machine opnieuw te provisionen:

```bash
vagrant reload --provision
```

### Backend en frontend

Het is mogelijk om:

- De backend binnen Homestead te draaien.
- De frontend binnen Homestead te bouwen.
- De frontend rechtstreeks vanuit Windows te bouwen.

Bij het bouwen van de frontend vanuit Windows wordt gebruikgemaakt
van de Node.js- en NPM-installatie op Windows.

De PHP- en Node.js-versies binnen Homestead hoeven daarom niet
hetzelfde te zijn als de versies op Windows.

Voer Composer- en Artisan-commando's uit in de omgeving waarin
de Laravel-backend daadwerkelijk draait.

Gebruik voor NPM-commando's bij voorkeur consequent dezelfde
omgeving. Wisselen tussen Windows en Linux met dezelfde
`node_modules`-directory kan problemen veroorzaken.

---

# Installatie backend

De onderstaande stappen zijn bedoeld voor een nieuwe lokale
Econobis-installatie met een lege database.

Bij gebruik van een bestaande database of databaseback-up gelden
aanvullende aandachtspunten.

## 1. Repository ophalen

Clone de Econobis-repository en ga naar de projectdirectory.

Gebruik de gewenste ontwikkelbranch.

Alle onderstaande Artisan- en Composer-commando's worden,
tenzij anders vermeld, uitgevoerd vanuit de projectroot.

## 2. Omgevingsbestand aanmaken

Maak een eigen `.env` aan op basis van `.env.example`.

Linux, macOS of Git Bash:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Pas het `.env`-bestand aan de eigen ontwikkelomgeving aan.

Neem nooit het lokale `.env`-bestand op in Git.

## 3. Applicatieconfiguratie

Voorbeeld:

```dotenv
APP_NAME=Econobis
APP_ENV=local
APP_DEBUG=true
APP_URL=https://econobis-xaris.nl
APP_COOP_NAME=test
URL_API=https://econobis-xaris.nl/api

LC_TIME=nl_NL.utf8
SEED_DEMO=false
```

Gebruik de URL en coöperatienaam van de eigen ontwikkelomgeving.

`APP_COOP_NAME` wordt onder andere gebruikt voor het bepalen van
de opslaglocatie van documenten, mailbijlagen en administratiebestanden.

De demoseeders zijn voorlopig uitgeschakeld omdat de bestaande
demodata verouderd is.

## 4. Databaseconfiguratie

Maak een lege database aan voor Econobis.

Bijvoorbeeld:

```sql
CREATE DATABASE econobis
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```

Configureer de databaseverbinding in `.env`.

Voorbeeld:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=econobis
DB_USERNAME=
DB_PASSWORD=
```

Gebruik de juiste databasegegevens voor de gekozen
ontwikkelomgeving.

Configureer ook de shared database, zoals beschreven in het
hoofdstuk Econobis shared database.

## 5. Beheerder configureren

Bij het initialiseren van een nieuwe database wordt via de
standaardseeders een beheerder aangemaakt.

Configureer hiervoor vooraf de volgende instellingen in `.env`:

```dotenv
ADMIN_USER_FIRST_NAME=
ADMIN_USER_LAST_NAME=
ADMIN_USER_LAST_NAME_PREFIX_ID=
ADMIN_USER_EMAIL=
ADMIN_USER_PASSWORD=
```

Vul minimaal de voornaam, achternaam, het e-mailadres en het
wachtwoord in.

`ADMIN_USER_LAST_NAME_PREFIX_ID` kan leeg blijven wanneer er geen
tussenvoegsel van toepassing is.

De beheerder krijgt de rol `Beheerder`.

## 6. Composer-packages installeren

```bash
composer install
```

Controleer vervolgens de platformvereisten:

```bash
composer check-platform-reqs
```

## 7. Application key genereren

Genereer voor een nieuwe installatie een Laravel application key:

```bash
php artisan key:generate
```

Hiermee wordt `APP_KEY` in het `.env`-bestand ingevuld.

### Belangrijk bij bestaande databases

Genereer niet zomaar een nieuwe application key wanneer gebruik
wordt gemaakt van een bestaande database of databaseback-up.

Econobis gebruikt `APP_KEY` voor het versleutelen van verschillende
gegevens, waaronder bijvoorbeeld IBAN's en API-sleutels.

Wanneer de application key niet overeenkomt met de key waarmee
de gegevens oorspronkelijk zijn versleuteld, kunnen deze gegevens
niet meer worden ontsleuteld.

Gebruik bij een bestaande database daarom de bijbehorende
oorspronkelijke application key.

## 8. Database migreren en initialiseren

Voer voor een nieuwe installatie uit:

```bash
php artisan migrate --seed
```

Hiermee worden:

- De databasetabellen aangemaakt.
- De vaste stamgegevens gevuld.
- De permissies aangemaakt.
- De rollen aangemaakt.
- De koppelingen tussen rollen en permissies aangemaakt.
- De beheerder aangemaakt.
- De eerste coöperatie aangemaakt.

De standaardinitialisatie maakt gebruik van `FixedSeeder`.

De verouderde `DemoSeeder` wordt voorlopig niet uitgevoerd.

Controleer de migratiestatus:

```bash
php artisan migrate:status
```

### Bestaande database

Bij gebruik van een bestaande database worden normaal gesproken
alleen de nog openstaande migraties uitgevoerd:

```bash
php artisan migrate
```

Voer seeders alleen opnieuw uit wanneer dit daadwerkelijk nodig is.

Maak vooraf een databaseback-up wanneer er wijzigingen worden
uitgevoerd op een database waarvan de gegevens behouden moeten blijven.

Gebruik `migrate:fresh` uitsluitend wanneer de volledige database
verwijderd en opnieuw opgebouwd mag worden.

## 9. Overige configuratie

Rond vervolgens de installatie af door:

1. De shared database te configureren.
2. Bigstorage in te richten.
3. Passport-sleutels en OAuth-clients aan te maken.
4. De Econobis-frontend te installeren en te bouwen.
5. Indien gewenst de customer portal te installeren en te bouwen.
6. De lokale mailconfiguratie in te stellen.
7. De applicatiecaches en permissiecache te legen.

Deze stappen worden in de volgende hoofdstukken toegelicht.

---

# Econobis shared database

Naast de eigen database van een coöperatie maakt Econobis gebruik
van een afzonderlijke shared database.

Deze database bevat gegevens die door meerdere Econobis-installaties
gebruikt kunnen worden.

## Database aanmaken

Maak bijvoorbeeld een database aan met de naam `econobis_shared`.

```sql
CREATE DATABASE econobis_shared
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```

## Configuratie

Configureer de shared database in `.env`.

```dotenv
DB_CONNECTION_SHARED=
DB_DATABASE_SHARED=econobis_shared
DB_USERNAME_SHARED=
DB_PASSWORD_SHARED=
DB_MANAGE_SHARED_DATABASE=false
```

De shared database maakt momenteel gebruik van dezelfde
databasehost en databasepoort als de reguliere Econobis-database.

De gebruikersnaam, het wachtwoord en de databasenaam kunnen
afzonderlijk worden ingesteld.

De Laravel-databaseverbinding heet `econobis_shared`.

De instellingen `DB_CONNECTION_SHARED` en
`DB_MANAGE_SHARED_DATABASE` zijn gereserveerd voor eventuele
toekomstige functionaliteit.

## Tabelstructuren

De SQL-scripts voor het aanmaken van de tabelstructuren staan in:

```text
database/scripts/econobis_shared_areas_and_districts.sql
database/scripts/econobis_shared_command_runs.sql
```

Voer beide scripts uit op de shared database.

Hiermee worden de volgende tabellen aangemaakt:

```text
shared_areas
shared_districts
shared_municipalities
shared_postal_codes_house_numbers
shared_command_runs
```

## Gegevens importeren

De SQL-scripts bevatten de tabelstructuren, maar niet de
bijbehorende geografische gegevens.

Deze gegevens worden afzonderlijk geïmporteerd vanuit de
beschikbare CSV- of Excel-bestanden.

Dit kan bijvoorbeeld met de importfunctionaliteit van Navicat
of een ander geschikt databaseprogramma.

Een bestaande shared database kan ook worden ingericht door
een daarvoor geschikte databaseback-up te importeren.

---

# Bigstorage

Econobis maakt gebruik van een afzonderlijke opslaglocatie voor
onder andere:

- Documenten.
- Mailbijlagen.
- Administratiebestanden.

Deze opslaglocatie wordt aangeduid als `bigstorage`.

Bigstorage is geen onderdeel van de Git-repository.

## Standaard opslaglocatie

Voor een lokale ontwikkelomgeving is de standaardlocatie:

```text
<project-root>/bigstorage
```

Voor productieomgevingen is de standaardlocatie:

```text
/home/econobis/domains/econobis.nl/bigstorage
```

De configuratie is vastgelegd in:

```text
config/filesystems.php
```

## Afwijkende opslaglocatie

Indien gewenst kan de standaardlocatie worden overschreven met
de volgende instelling in `.env`:

```dotenv
BIGSTORAGE_PATH=
```

Wanneer deze instelling niet is opgenomen in `.env`, wordt de
standaardlocatie gebruikt.

Voorbeeld Homestead:

```dotenv
BIGSTORAGE_PATH=/home/vagrant/code/bigstorage/econobis
```

Voorbeeld Windows/XAMPP:

```dotenv
BIGSTORAGE_PATH=D:/framework/bigstorage/econobis
```

Het ingestelde pad moet toegankelijk zijn vanuit de omgeving
waarin PHP draait.

Bij gebruik van Homestead moet daarom een Linux-pad worden
gebruikt en geen Windows-pad.

## Directorystructuur

Binnen bigstorage wordt per coöperatie een afzonderlijke
directory gebruikt.

De naam van deze directory wordt bepaald door `APP_COOP_NAME`.

Bijvoorbeeld:

```dotenv
APP_COOP_NAME=test
```

De bijbehorende directorystructuur is:

```text
bigstorage/
    test/
        app/
            documents/
            mails/
            administrations/
```

Bij gebruik van de standaard lokale opslaglocatie kunnen deze
directories als volgt worden aangemaakt.

Linux, macOS of Git Bash:

```bash
mkdir -p bigstorage/test/app/documents
mkdir -p bigstorage/test/app/mails
mkdir -p bigstorage/test/app/administrations
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path bigstorage/test/app/documents
New-Item -ItemType Directory -Force -Path bigstorage/test/app/mails
New-Item -ItemType Directory -Force -Path bigstorage/test/app/administrations
```

Vervang `test` door de ingestelde waarde van `APP_COOP_NAME`.

Bij gebruik van een afwijkende `BIGSTORAGE_PATH` moeten de
directories op die locatie worden aangemaakt.

Zorg ervoor dat PHP schrijfrechten heeft op deze directories.

## Bigstorage buiten de projectdirectory

Het is mogelijk om bigstorage buiten de projectdirectory te
plaatsen.

Gebruik hiervoor bij voorkeur `BIGSTORAGE_PATH`.

Een bestaande installatie kan ook gebruikmaken van een symlink
of Windows-junction.

Het aanmaken van een symlink is voor een nieuwe installatie
niet noodzakelijk.

## Controle van de configuratie

Leeg eerst de configuratiecache:

```bash
php artisan config:clear
```

Controleer vervolgens de geconfigureerde opslaglocaties:

```bash
php artisan tinker --execute="dump(config('filesystems.disks.documents.root'), config('filesystems.disks.mail_attachments.root'), config('filesystems.disks.administrations.root'));"
```

Controleer of de weergegeven paden overeenkomen met de gewenste
opslaglocaties.

---

# Passport en OAuth

Econobis maakt gebruik van Laravel Passport voor authenticatie
van de Econobis-frontend en de customer portal.

## Passport-sleutels

De standaard opslaglocatie van de Passport-sleutels is:

```text
<project-root>/secrets/oauth
```

Indien gewenst kan deze locatie worden overschreven in `.env`:

```dotenv
PASSPORT_KEYS_PATH=
```

Laat deze instelling weg wanneer de standaardlocatie gebruikt
moet worden.

Maak indien nodig de directory aan.

Linux, macOS of Git Bash:

```bash
mkdir -p secrets/oauth
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path secrets/oauth
```

Genereer voor een nieuwe installatie de Passport-sleutels:

```bash
php artisan passport:keys
```

Hiermee worden de volgende bestanden aangemaakt:

```text
oauth-private.key
oauth-public.key
```

Zorg ervoor dat deze bestanden toegankelijk zijn voor Laravel.

Neem de Passport-sleutels nooit op in Git.

Overschrijf bij een bestaande installatie niet zonder reden de
bestaande Passport-sleutels. Hierdoor kunnen bestaande
access tokens ongeldig worden.

## OAuth-clients aanmaken

Voor het aanmaken van de benodigde OAuth-clients beschikt
Econobis over een eigen installatiecommando.

Zorg ervoor dat bij een nieuwe installatie de volgende
instellingen in `.env` leeg zijn:

```dotenv
OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
OAUTH_PORTAL_CLIENT_ID=
OAUTH_PORTAL_CLIENT_SECRET=
```

Zorg er ook voor dat `APP_NAME` is ingevuld.

Voer vervolgens uit:

```bash
php artisan config:clear
php artisan install:create-oauth-clients
```

Dit commando maakt de benodigde OAuth-clients aan voor:

- Personal access.
- Econobis-gebruikers.
- Customer portal-gebruikers.

De benodigde client-ID's en client secrets worden automatisch
in het `.env`-bestand vastgelegd.

Het installatiecommando maakt bij het wijzigen van `.env`
een back-up van het bestaande omgevingsbestand.

Het commando kan ook worden uitgevoerd in dry-run-modus:

```bash
php artisan install:create-oauth-clients --dry-run
```

Leeg na het aanmaken van de OAuth-clients de applicatiecaches:

```bash
php artisan optimize:clear
```

## Bestaande database

Bij het gebruik van een bestaande database kunnen de
OAuth-clients al aanwezig zijn.

Zorg ervoor dat de OAuth-instellingen in `.env` overeenkomen
met de OAuth-clients in de gebruikte database.

Gebruik waar mogelijk de bijbehorende bestaande
omgevingsconfiguratie.

Client secrets mogen niet worden opgenomen in frontendbestanden
of in Git.

Het standaardcommando `php artisan passport:install` wordt
niet gebruikt voor de reguliere Econobis-installatie.

Gebruik hiervoor het hierboven beschreven Econobis-commando.

---

# Installatie frontend

De frontend van Econobis bevindt zich in:

```text
client-app/
```

## 1. Node.js-versie controleren

Gebruik bij voorkeur Node.js 22.22.3.

```bash
node -v
npm -v
```

## 2. Naar de frontenddirectory gaan

```bash
cd client-app
```

## 3. NPM-packages installeren

```bash
npm ci --legacy-peer-deps
```

## 4. Omgevingsbestanden

Voor de frontend zijn verschillende voorbeeldbestanden aanwezig:

```text
.env.development.example
.env.production.example
.env.production.local.example
```

Maak de benodigde omgevingsbestanden aan op basis van deze
voorbeeldbestanden.

Linux, macOS of Git Bash:

```bash
cp .env.development.example .env.development
cp .env.production.local.example .env.production.local
```

Windows PowerShell:

```powershell
Copy-Item .env.development.example .env.development
Copy-Item .env.production.local.example .env.production.local
```

De voorbeeldbestanden bevatten onder andere:

```dotenv
GRANT_TYPE=password
NODE_ENV=development
```

OAuth client secrets hoeven niet meer handmatig in deze
frontendbestanden te worden opgenomen.

## 5. Frontend lokaal bouwen

```bash
npm run build:local
```

De lokale build genereert de benodigde JavaScript-bestanden
in:

```text
public/js/
```

Daarnaast wordt de bijbehorende Laravel-view gegenereerd:

```text
resources/views/welcome.blade.php
```

Open vervolgens de lokaal geconfigureerde Econobis-website
in de browser.

## 6. Frontend development server

Voor frontendontwikkeling kan ook gebruik worden gemaakt van:

```bash
npm run serve
```

Hiermee wordt de Webpack development server gestart.

Afhankelijk van de lokale configuratie kan het nodig zijn
om de backend-URL en CORS-instellingen hierop af te stemmen.

## 7. Productiebuild

Voor het maken van een productiebuild:

```bash
npm run build
```

Gebruik hiervoor de bijbehorende productieconfiguratie.

Een productiebuild is voor een reguliere lokale installatie
niet noodzakelijk.

## CORS

Bij gebruik van afzonderlijke frontend- en backend-URL's kan
aanvullende CORS-configuratie nodig zijn.

Een relevante instelling in `.env` is:

```dotenv
CORS_ORIGIN_PATTERNS='["/localhost/"]'
```

Stem deze instelling af op de daadwerkelijk gebruikte
frontend-URL.

Het gebruik van een browserextensie die CORS-beveiliging
uitschakelt, is niet nodig voor een correct geconfigureerde
ontwikkelomgeving.

---

# Installatie customer portal

De frontend van de customer portal bevindt zich in:

```text
customer-portal-app/
```

## 1. Naar de frontenddirectory gaan

Voer vanuit de projectroot uit:

```bash
cd customer-portal-app
```

## 2. NPM-packages installeren

```bash
npm ci --legacy-peer-deps
```

## 3. Omgevingsbestand

Indien nodig kan een lokaal `.env`-bestand worden aangemaakt
op basis van:

```text
.env-example
```

Linux, macOS of Git Bash:

```bash
cp .env-example .env
```

Windows PowerShell:

```powershell
Copy-Item .env-example .env
```

Voor een standaard lokale installatie zijn hier doorgaans
geen aanvullende instellingen nodig.

## 4. Customer portal bouwen

```bash
npm run build
```

De gegenereerde bestanden worden opgeslagen in:

```text
customer-portal-app/build/
```

## 5. Customer portal lokaal publiceren

De lokaal gepubliceerde customer portal bevindt zich in:

```text
public/portal/
```

De build-directory en de publicatie-directory zijn
afzonderlijke directories.

Voor een eerste lokale publicatie kunnen de bestanden uit
`customer-portal-app/build/` naar `public/portal/` worden
gekopieerd.

Voer vanuit de projectroot uit.

Linux, macOS of Git Bash:

```bash
mkdir -p public/portal
cp -a customer-portal-app/build/. public/portal/
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path public/portal
Copy-Item -Path customer-portal-app/build/* -Destination public/portal -Recurse -Force
```

Let bij het opnieuw publiceren van een bestaande portal op
eventuele lokaal aanwezige afbeeldingen, favicons en andere
coöperatiespecifieke bestanden.

Deze bestanden mogen niet onbedoeld worden overschreven
of verwijderd.

De handmatige publicatiestap moet nog worden gevalideerd
bij een volledig nieuwe lokale installatie.

## 6. Serverconfiguratie genereren

Voer vanuit de projectroot uit:

```bash
php artisan install:createServerDataJs
```

Hiermee wordt het configuratiebestand `server-data.js`
voor de customer portal gegenereerd.

Dit bestand bevat onder andere de interne portal-URL en
de relevante captcha-configuratie.

## 7. Portal CSS genereren

```bash
php artisan portal:rebuildPortalCss
```

Hiermee wordt de portal-CSS opnieuw opgebouwd op basis
van de ingestelde portalconfiguratie.

## 8. Customer portal openen

De customer portal is bij een reguliere lokale publicatie
beschikbaar via:

```text
<APP_URL>/portal
```

Bijvoorbeeld:

```text
https://econobis-xaris.nl/portal
```

## Development server

Voor afzonderlijke frontendontwikkeling kan gebruik worden
gemaakt van:

```bash
npm start
```

Voer dit commando uit vanuit `customer-portal-app`.

Afhankelijk van de lokale ontwikkelconfiguratie kunnen
aanvullende instellingen nodig zijn.

---

# Lokale mailconfiguratie

Voor het lokaal ontwikkelen en testen van mailfunctionaliteit
wordt het gebruik van een lokale testmailserver aanbevolen.

Bijvoorbeeld:

- MailHog.
- Mailpit.

Hiermee kan worden voorkomen dat tijdens het ontwikkelen
onbedoeld echte e-mails worden verzonden.

## Voorbeeld MailHog-configuratie

```dotenv
MAIL_DRIVER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=
MAIL_FROM_NAME=Econobis
MAIL_FROM_ADDRESS=econobis@example.test
```

Pas `MAIL_HOST` aan wanneer de mailserver in een andere
virtuele machine of container draait.

## Custom mailboxen negeren

Econobis kan gebruikmaken van mailboxen die in de database
zijn geconfigureerd.

Om lokaal altijd gebruik te maken van de mailinstellingen
uit `.env` kan de volgende instelling worden gebruikt:

```dotenv
MAIL_IGNORE_CUSTOM_MAILBOXES=true
```

Dit is met name belangrijk wanneer lokaal gebruik wordt
gemaakt van een databaseback-up van een bestaande coöperatie.

## SSL-instellingen

Voor specifieke lokale testomgevingen kunnen de volgende
instellingen nodig zijn:

```dotenv
MAIL_SSLOPTIONS_ALLOW_SELF_SIGNED=true
MAIL_SSLOPTIONS_VERIFY_PEER=false
MAIL_SSLOPTIONS_VERIFY_PEER_NAME=false
```

Gebruik deze instellingen uitsluitend wanneer dit voor de
lokale testomgeving noodzakelijk is.

Schakel certificaatvalidatie niet uit in productieomgevingen.

## Mailconfiguratie activeren

Na wijzigingen in `.env`:

```bash
php artisan config:clear
```

Controleer ook de mailboxconfiguratie binnen Econobis wanneer
mailboxspecifieke functionaliteit getest moet worden.

---

# Queues en scheduler

## Queue

Econobis maakt gebruik van Laravel queues voor het uitvoeren
van achtergrondtaken.

Voor een lokale installatie kan bijvoorbeeld gebruik worden
gemaakt van:

```dotenv
QUEUE_DRIVER=database
```

Start indien nodig een lokale queue worker:

```bash
php artisan queue:work
```

Stop de worker met `Ctrl+C`.

Na wijzigingen in de applicatiecode of configuratie kan
het nodig zijn om actieve queue workers opnieuw te starten:

```bash
php artisan queue:restart
```

Controleer mislukte queue jobs:

```bash
php artisan queue:failed
```

## Scheduler

De Laravel scheduler wordt gebruikt voor periodieke taken.

De configuratie is onder andere afhankelijk van:

```dotenv
SCHEDULE_RUN_ID=1
```

Controleer de beschikbare geplande taken:

```bash
php artisan schedule:list
```

Voor het lokaal uitvoeren van de scheduler kan gebruik
worden gemaakt van:

```bash
php artisan schedule:work
```

Start de scheduler lokaal alleen wanneer dit nodig is
voor de te testen functionaliteit.

Wees extra voorzichtig bij het gebruik van een databaseback-up
van een bestaande coöperatie. Geplande taken kunnen bijvoorbeeld
e-mails versturen of externe koppelingen aanroepen.

---

# Webformulieren API

Econobis beschikt over een afzonderlijke API voor de
verwerking van externe webformulieren.

Voor het configureren van deze API is het volgende
Artisan-commando beschikbaar:

```bash
php artisan econobis:setup-rest-api
```

Deze configuratie maakt geen onderdeel uit van de
reguliere lokale installatie.

De specifieke installatie- en configuratie-instructies
voor de Webformulieren API worden afzonderlijk beschreven.

---

# Testen

## Backend tests

Voer vanuit de projectroot uit:

```bash
php artisan test
```

Of rechtstreeks via PHPUnit:

```bash
vendor/bin/phpunit
```

Voor het uitvoeren van een specifieke test:

```bash
php artisan test --filter=NaamVanDeTest
```

Gebruik voor geautomatiseerde tests een afzonderlijke
testdatabase en testconfiguratie.

Controleer vooraf de database-instellingen in onder andere
`.env.testing` en `phpunit.xml`.

Voer tests die databases wijzigen of opnieuw initialiseren
nooit uit op een database waarvan de gegevens behouden
moeten blijven.

## Frontend tests

Voer vanuit `client-app` uit:

```bash
npm test
```

Voor de TestCafe-tests:

```bash
npm run test:global
```

De benodigde testconfiguratie is afhankelijk van de
uit te voeren tests.

## Customer portal tests

Voer vanuit `customer-portal-app` uit:

```bash
npm test
```

## Functionele controle nieuwe installatie

Controleer na het afronden van een nieuwe installatie
minimaal de volgende onderdelen:

- [ ] Econobis kan worden geopend in de browser.
- [ ] Inloggen met de aangemaakte beheerder werkt.
- [ ] De beheerder beschikt over de juiste rollen en rechten.
- [ ] Een contact kan worden aangemaakt.
- [ ] Een administratie kan worden aangemaakt.
- [ ] Een documenttemplate kan worden aangemaakt.
- [ ] Een document kan worden gegenereerd.
- [ ] Een gegenereerd PDF-bestand kan worden geopend.
- [ ] Het PDF-bestand staat fysiek op de juiste bigstorage-locatie.
- [ ] Mailfunctionaliteit werkt via de lokale testmailserver.
- [ ] Mailbijlagen worden op de juiste locatie opgeslagen.
- [ ] Administratiebestanden worden op de juiste locatie opgeslagen.
- [ ] De customer portal werkt, indien deze is geïnstalleerd.

---

# Onderhoud ontwikkelomgeving

## Na het ophalen van wijzigingen

Afhankelijk van de opgehaalde wijzigingen kunnen de
volgende acties nodig zijn.

Backend-packages bijwerken conform `composer.lock`:

```bash
composer install
```

Databasemigraties uitvoeren:

```bash
php artisan migrate
```

Applicatiecaches legen:

```bash
php artisan optimize:clear
```

Permissiecache legen:

```bash
php artisan permission:cache-reset
```

Queue workers opnieuw starten:

```bash
php artisan queue:restart
```

Voer bij wijzigingen in de frontend-dependencies opnieuw
`npm ci --legacy-peer-deps` uit in de betreffende
frontenddirectory.

Bouw indien nodig de frontend opnieuw.

## Database wisselen of importeren

Wanneer lokaal wordt gewisseld tussen verschillende
Econobis-databases, controleer dan onder andere:

- De reguliere database-instellingen.
- De shared database-instellingen.
- De bijbehorende `APP_KEY`.
- De OAuth client-ID's en client secrets.
- De waarde van `APP_COOP_NAME`.
- De bigstorage-configuratie.
- De mailconfiguratie.
- Eventuele externe koppelingen.

Voer na het wijzigen van de databaseconfiguratie uit:

```bash
php artisan optimize:clear
php artisan permission:cache-reset
```

Log indien nodig opnieuw in.

## Applicatiecaches

Alle gebruikelijke Laravel-optimalisatiecaches legen:

```bash
php artisan optimize:clear
```

Alleen de configuratiecache legen:

```bash
php artisan config:clear
```

Alleen de applicatiecache legen:

```bash
php artisan cache:clear
```

Alleen de routecache legen:

```bash
php artisan route:clear
```

Alleen de viewcache legen:

```bash
php artisan view:clear
```

## Composer autoload

Indien nodig kan de Composer-autoloader opnieuw worden
gegenereerd:

```bash
composer dump-autoload
```

---

# Troubleshooting

## PHP-extensie ontbreekt

Controleer welke PHP-installatie en configuratie worden gebruikt:

```bash
php -v
php --ini
php -m
```

Controleer de Composer-platformvereisten:

```bash
composer check-platform-reqs
```

Activeer of installeer de ontbrekende PHP-extensie.

Herstart indien nodig Apache, PHP-FPM of de betreffende
ontwikkelomgeving.

Gebruik `--ignore-platform-reqs` niet als standaardoplossing
voor ontbrekende PHP-extensies.

## Databaseverbinding werkt niet

Controleer de database-instellingen in `.env`:

```dotenv
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

Controleer of de databaseserver actief is en of de
databasegebruiker voldoende rechten heeft.

Leeg de configuratiecache:

```bash
php artisan config:clear
```

Controleer vervolgens:

```bash
php artisan migrate:status
```

## OAuth-client niet gevonden

Bij een nieuwe installatie kan bijvoorbeeld de volgende
foutmelding optreden:

```text
OAuth client 2 from OAUTH_CLIENT_ID was not found as an active users client.
```

Dit kan gebeuren wanneer `.env` verwijst naar een
OAuth-client die niet aanwezig is in de gebruikte database.

Bij een volledig nieuwe installatie met een lege
`oauth_clients`-tabel moeten de volgende instellingen
leeg zijn:

```dotenv
OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
OAUTH_PORTAL_CLIENT_ID=
OAUTH_PORTAL_CLIENT_SECRET=
```

Voer vervolgens uit:

```bash
php artisan config:clear
php artisan install:create-oauth-clients
php artisan optimize:clear
```

Bij een bestaande database moeten de OAuth-instellingen
worden afgestemd op de reeds aanwezige OAuth-clients.

## Passport-sleutels ontbreken

Controleer de geconfigureerde opslaglocatie:

```bash
php artisan tinker --execute="dump(config('passport.keys_path'));"
```

Controleer of op deze locatie de volgende bestanden
aanwezig zijn:

```text
oauth-private.key
oauth-public.key
```

Voor een nieuwe installatie kunnen deze worden aangemaakt met:

```bash
php artisan passport:keys
```

Overschrijf bestaande sleutels niet zonder reden.

## HTTP 403 - This action is unauthorized

Bij het wisselen tussen databases of na het importeren
van een databaseback-up kan de permissiecache nog
gegevens bevatten van de eerder gebruikte database.

Dit kan leiden tot een HTTP 403-response:

```text
This action is unauthorized.
```

Leeg in dat geval de Spatie-permissiecache:

```bash
php artisan permission:cache-reset
```

Leeg indien nodig ook de overige applicatiecaches:

```bash
php artisan optimize:clear
```

Log vervolgens opnieuw in indien het probleem nog aanwezig is.

Controleer bij aanhoudende problemen de rollen en
permissies van de betreffende gebruiker.

## Documenten of andere bestanden worden niet opgeslagen

Controleer de waarde van:

```dotenv
APP_COOP_NAME=
```

Controleer indien ingesteld ook:

```dotenv
BIGSTORAGE_PATH=
```

Leeg de configuratiecache:

```bash
php artisan config:clear
```

Controleer de daadwerkelijke opslaglocaties:

```bash
php artisan tinker --execute="dump(config('filesystems.disks.documents.root'), config('filesystems.disks.mail_attachments.root'), config('filesystems.disks.administrations.root'));"
```

Controleer of de betreffende directories aanwezig zijn
en of PHP voldoende schrijfrechten heeft.

## PDF-generatie mislukt

Econobis maakt gebruik van Dompdf voor het genereren
van PDF-bestanden.

Controleer of de volgende directory aanwezig en
beschrijfbaar is:

```text
storage/fonts/
```

Deze directory wordt bij een reguliere Git-checkout
automatisch aangemaakt doordat deze een `.gitignore`
bevat.

Indien de directory toch ontbreekt:

Linux, macOS of Git Bash:

```bash
mkdir -p storage/fonts
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path storage/fonts
```

Een ontbrekende fonts-directory kan leiden tot een
foutmelding zoals:

```text
fopen(.../storage/fonts/...ufm): Failed to open stream:
No such file or directory
```

Controleer daarnaast de bigstorage-configuratie en
de Laravel-logbestanden.

## Versleutelde gegevens kunnen niet worden ontsleuteld

Bij gebruik van een bestaande database kan bijvoorbeeld
de volgende foutmelding optreden:

```text
The MAC is invalid.
```

Controleer of de ingestelde `APP_KEY` overeenkomt met
de application key waarmee de gegevens oorspronkelijk
zijn versleuteld.

Het genereren van een nieuwe application key lost
dit probleem niet op.

Wijzig of verwijder bestaande versleutelde gegevens
niet zonder eerst de oorzaak te onderzoeken.

## NPM-installatie mislukt

Controleer eerst de actieve Node.js- en NPM-versies:

```bash
node -v
npm -v
```

Gebruik bij voorkeur de aanbevolen Node.js-versie.

Bij gebruik van NVM:

```bash
nvm use 22.22.3
```

Installeer vervolgens de dependencies opnieuw:

```bash
npm ci --legacy-peer-deps
```

Voer dit commando uit in de betreffende frontenddirectory.

Verwijder of wijzig het `package-lock.json`-bestand niet
zonder dat dit onderdeel is van een bewuste
dependency-upgrade.

## Frontend toont oude of ontbrekende bestanden

Bouw de frontend opnieuw.

```bash
cd client-app
npm run build:local
```

Ga vervolgens terug naar de projectroot:

```bash
cd ..
php artisan optimize:clear
```

Ververs de browser indien nodig zonder gebruik te maken
van de browsercache.

## Customer portal toont oude bestanden

Controleer of de customer portal opnieuw is gebouwd
en of de gegenereerde bestanden op de juiste locatie
zijn gepubliceerd.

Controleer de volgende directories:

```text
customer-portal-app/build/
public/portal/
```

Genereer indien nodig opnieuw de serverconfiguratie
en portal-CSS:

```bash
php artisan install:createServerDataJs
php artisan portal:rebuildPortalCss
```

## Mail wordt niet verzonden

Controleer:

- De mailinstellingen in `.env`.
- Of de lokale testmailserver actief is.
- De ingestelde mailhost en mailpoort.
- De benodigde PHP-extensies.
- De mailboxconfiguratie binnen Econobis.
- De instelling `MAIL_IGNORE_CUSTOM_MAILBOXES`.
- Of een benodigde queue worker actief is.

Leeg na configuratiewijzigingen de configuratiecache:

```bash
php artisan config:clear
```

## HTTPS- en sessieproblemen

Controleer of `APP_URL` overeenkomt met de URL
waarmee Econobis wordt geopend.

Controleer ook de volgende instellingen:

```dotenv
SESSION_DOMAIN=
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
```

Wanneer lokaal uitsluitend HTTP wordt gebruikt, kan
het nodig zijn om de volgende instelling te gebruiken:

```dotenv
SESSION_SECURE_COOKIE=false
```

Gebruik bij voorkeur HTTPS voor de lokale ontwikkelomgeving.

Leeg na wijzigingen de configuratiecache:

```bash
php artisan config:clear
```

## Laravel-logbestanden

De Laravel-logbestanden bevinden zich doorgaans in:

```text
storage/logs/
```

Controleer de aanwezige logbestanden:

```bash
ls -lh storage/logs/
```

Bekijk de laatste regels van een specifiek logbestand:

```bash
tail -n 100 storage/logs/laravel-YYYY-MM-DD.log
```

Volg een logbestand tijdens het testen:

```bash
tail -f storage/logs/laravel-YYYY-MM-DD.log
```

Zoek naar een specifieke foutmelding:

```bash
grep -n "zoekterm" storage/logs/laravel-YYYY-MM-DD.log
```

Vervang `YYYY-MM-DD` door de betreffende datum.