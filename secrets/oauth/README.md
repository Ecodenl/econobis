# 🔐 Secrets Directory

Deze directory bevat gevoelige bestanden die nodig zijn voor authenticatie en beveiliging binnen de Laravel-applicatie, zoals OAuth-sleutels.

## 📁 Inhoud

Typische bestanden in deze map zijn:

- `oauth-private.key`
- `oauth-public.key`

## 📌 Belangrijk

- Deze map is **uitgesloten van Git** (`.gitignore`) om te voorkomen dat gevoelige informatie per ongeluk wordt gecommit.
- Tijdens deployment wordt deze map automatisch gesymlinked vanuit `shared/secrets`, zodat deze persistent blijft over verschillende releases heen.

## ⚠️ Let op

- Voeg deze map **niet** toe aan Git!
- Als je lokaal ontwikkelt en deze map niet bestaat, kun je de sleutels genereren met:

  ```bash
  php artisan passport:keys
