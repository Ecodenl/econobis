# Econobis

<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>

<a href="https://phpunit.de/">
    <img alt="Tested with PHPUnit" src="https://img.shields.io/badge/tested%20with-PHPUnit-green.svg">
</a>

<a href="https://php.net/">
    <img alt="php 7.0.0" src="https://img.shields.io/badge/php-%3E%3D%207.0-8892BF.svg">
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

# Installatie
## Vereisten
NPM of Yarn geinstalleerd:

[Download Yarn](https://yarnpkg.com/lang/en/docs/install/)  [Of NPM](https://www.npmjs.com/get-npm)

CORS toestaan met behulp van:

[CORS extensie](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)

Om emails te kunnen verzenden moet imap aan staan:

Zet php_imap aan in php.ini: extension=php_imap.dll

## Backend
Command prompt in eco/econobis

Eigen .env aanmaken:
`cp .env.example .env`

Key zetten in deze .env
`php artisan key:generate`

Installeer packages:
`composer install`

Migreer database met seed:
`php artisan migrate --seed`

## Frontend
Naar client-app map toe:
`cd client-app`

Packages installeren:
`npm install` of `yarn install`

Passport zetten in database:
`php artisan passport:install`

In de database is nu in de oauth_clients een Econobis Password Grant Client aangemaakt. Kopieer de secret naar .env.development in de client-app map.

Daarna project runnen:
`npm run serve` of `yarn serve`

Het project zou nu zelf op moeten starten. Als de pagina zichtbaar is moet je rechtsboven bij CORS Enable cross-origin resource sharing aan en uit zetten.

# Troubleshooting
## Problemen met permissies
Cache clearen, command in eco/econobis: 
`php artisan cache:forget spatie.permission.cache`
## Overig
`composer dump-autoload`
