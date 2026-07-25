# VisaGo — лендінг візового сервісу

Головна сторінка сервісу онлайн-оформлення віз, паспортів і туристичних декларацій (аналог iVisa.com). Реалізовано Header і Hero Section згідно з макетом у `.cursor/plans`.

## Стек

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4 (кастомна тема в `src/index.css`)
- Lucide React (іконки)

## Запуск

```bash
npm install
npm run dev
```

Сайт буде доступний на `http://localhost:5173`.

## Структура

- `src/components/Header.tsx` — липка шапка: лого, навігація, перемикачі UA/UAH, «Увійти» / «Мій акаунт», мобільне бургер-меню
- `src/components/Hero.tsx` — головний екран: бейдж, H1, підзаголовок, віджет пошуку, рейтинг Trustpilot
- `src/components/CountrySelect.tsx` — випадаючий список країн із пошуком і прапорами
- `src/data/countries.ts` — довідник країн

## Дизайн-токени (Tailwind `@theme`)

| Токен | Значення | Призначення |
|---|---|---|
| `primary` | `#1D4ED8` | основний синій |
| `primary-light` | `#EFF6FF` | світлий фон |
| `accent` | `#F97316` | CTA-кнопки |
| `ink` | `#0F172A` | заголовки |
| `muted` | `#64748B` | вторинний текст |
