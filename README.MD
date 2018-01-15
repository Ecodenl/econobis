# Installatie
## Vereisten
NPM of Yarn geinstalleerd:

[Download Yarn](https://yarnpkg.com/lang/en/docs/install/)
- 
[Of NPM](https://www.npmjs.com/get-npm)

CORS toestaan met behulp van:

[CORS extensie](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)

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