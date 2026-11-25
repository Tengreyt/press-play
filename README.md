# GreytMove

GreytMove — проект TenGreyt по аренде PlayStation 5. На сайте есть тарифы на 1–7 суток, заявка через WhatsApp и справочник с правилами и видео PlayStation.

[Открыть GreytMove](https://greytmove.pages.dev/)

## Запуск

Нужен Node.js 22.18 или новее. Для подстановки другого номера WhatsApp укажи в `.env` значение `NUXT_PUBLIC_WHATSAPP_NUMBER` с кодом страны. Без переменной на странице показывается основной контакт GreytMove.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
```

`npm run build` собирает Worker для Sites в `dist/`. Номер опубликованного сайта задаётся переменной `NUXT_PUBLIC_WHATSAPP_NUMBER` в настройках Sites. Для обычного Node.js используй `npm run build:node` и `npm run preview` с переменной в окружении либо `docker compose up -d --build`. Контейнер слушает `127.0.0.1:3000`.

## Публикация

Для Cloudflare Pages запусти `npm run generate` и загрузи содержимое `.output/public/` в проект `greytmove` через Direct Upload. Для смены номера WhatsApp задай `NUXT_PUBLIC_WHATSAPP_NUMBER` перед генерацией.

Сделай коммит перед сборкой для Sites. После публикации отправь этот же коммит в GitHub. Workflow сверяет SHA по публичному адресу `/press-play-deployment.json` и обновляет **Deployments → production** при пуше в основную ветку и примерно раз в пять минут. Повторную проверку можно запустить в **Actions → Sync Sites production deployment**.

При импорте с GitHub в Vercel конфигурация `vercel.json` запускает `npm run build:vercel`. При необходимости задай `NUXT_PUBLIC_WHATSAPP_NUMBER` в настройках проекта Vercel.

## Аренда

Кнопка WhatsApp открывает чат через `wa.me` с черновиком заявки. Клиент дописывает даты и отправляет сообщение сам. Доступность, цена и передача согласуются в переписке. Историю заявок предыдущей версии можно просмотреть через таблицу `orders` в Sites.

Тексты справочника и ссылки на видео находятся в `app/composables/use-guide-data.ts`.
