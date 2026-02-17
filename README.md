# CurrencyHub

Фронтенд-приложение для помощи в конвертации валют.
![alt text](image.png)
![alt text](image-1.png)

## Цель:

Написать SPA для конвертирования валют. Для получения текущих курсов использовать любое открытое
API

## Что делает приложение:

### Получает список доступных для конвертации валют

### Получает курсы относительно заданной валюты

### Позволяет сконвертировать две валюты по актуальному курсу

Данные по выбранной валюте и избранным курсам валют хранятся в localStorage для повторного использования или перезаходе на страницу

## Технологии:

- Typescript
- Next js

## Требования

- Node.js 16+ (LTS)
- API ключ от [CurrencyAPI](https://currencyapi.com/)

## Использование

В приложении используется Shadcn UI.

Официальная документация - https://ui.shadcn.com/docs/installation

### В приложении используются такие компоненты как:

- button - https://ui.shadcn.com/docs/components/radix/button
- card - https://ui.shadcn.com/docs/components/radix/card
- input - https://ui.shadcn.com/docs/components/radix/input
- select - https://ui.shadcn.com/docs/components/radix/select

## Запуск приложения

1. `git clone <repository-url>`
2. `cd nextjs-converter-currencies`
3. `npm install`
4. `npm run dev`
