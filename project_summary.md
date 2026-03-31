# Qasqyr Team Project Architecture & Context Summary

## 🐺 Проект: «Қасқыр Team» (Qasqyr Team)

Я исследовал исходный код проекта. Ниже представлено полное резюме архитектуры, функционала и использованного стека, чтобы подтвердить, что весь контекст загружен.

### 💻 Технологический стек
- **Frontend:** React 19, React Router DOM, TypeScript.
- **Сборщик:** Vite.
- **Стилизация:** Tailwind CSS v4.
- **Backend / API:** Netlify Functions (`.mts`).
- **База Данных / Хранилище:** Netlify Blobs (`@netlify/blobs`).
- **Хостинг:** Netlify.

### 🏗️ Структура приложения

В приложении настроен роутинг (в `App.tsx`) на две основные части:
1. **Главная страница (`/`) — Публичная часть (`MainSite.tsx`)**
2. **Админ-панель (`/admin/*`) — Зона управления (`AdminDashboard.tsx`)**

#### 1. Публичные компоненты (`src/components/`):
- `Hero.tsx` – Главный баннер, логотип.
- `Team.tsx` – Карточки участников команды.
- `Training.tsx` – Тренировочные данные, виджеты Strava по активностям.
- `Calendar.tsx` – Календарь событий.
- `Gallery.tsx` – Фотогалерея (сетка).
- `Ironman.tsx` – Блок о главной цели (гонке).
- `Footer.tsx` – Подвал.

#### 2. Компоненты Админ-панели (`src/components/admin/`):
- `AdminConfig.tsx` – Глобальные настройки.
- `AdminTeam.tsx` – Управление составом команды.
- `AdminTrainingLog.tsx` – Логи тренировок.
- `AdminCalendar.tsx` – Управление событиями.
- `AdminGallery.tsx` – Управление медиа.

#### 3. Серверная часть (`netlify/functions/`):
- `api-auth.mts`, `api-config.mts`, `api-team.mts`, `api-strava.mts`, `api-training.mts`, `api-gallery.mts`, `api-calendar.mts`.

### 🔗 Особенности
- Используется обертка `useFetch` (в `api.ts`) для связи фронтенда с серверлесс-функциями.
- Приложение не использует внешнюю СУБД вроде PostgreSQL или MongoDB, вместо этого оно полагается на `Netlify Blobs`.
- Дизайн сайта создан на основе концепта «хищный, дерзкий, сдержанный» (из файла `Промт_Қасқыр_Team_Google_Sites.md`).

---
> [!NOTE]
> Контекст полностью загружен! Я вижу всю архитектуру сайта на React + Netlify Functions. Готово к следующим задачам!
