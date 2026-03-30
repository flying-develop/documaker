# documaker-frontend

**documaker-frontend** — это современное React-приложение для визуального создания, редактирования и управления шаблонами документов. Оно предоставляет drag-and-drop интерфейс для построения структурированных шаблонов (с разделами, подразделами, ключевыми словами и файлами), поддержку тегирования, управление пользователями и ролевой доступ, а также интеграцию с бэкендом через REST API. Приложение ориентировано на внутреннее использование в корпоративных средах, где требуется гибкость при формировании юридических, регламентных или операционных документов.

---

## Технологический стек

| Категория         | Технологии / Библиотеки |
|---------------------|--------------------------|
| **Фреймворк**       | React 18+, React DOM |
| **Сборка & DevTools** | Vite, TypeScript, ESLint, Prettier, GitLab CI |
| **UI-библиотека**   | Ant Design (v5), @ant-design/cssinjs |
| **State Management** | Custom hooks + Context API (без Redux — используется лёгкий store-провайдер с middleware) |
| **Drag & Drop**     | `@dnd-kit/core`, `@dnd-kit/sortable`, `dnd-kit-sortable-tree`, `react-dnd` (legacy fallback) |
| **Редактор контента** | Lexical (`@lexical/react`, `@lexical/html`, `@lexical/table`, `@lexical/clipboard`) |
| **Routing**         | React Router v6 (custom `ProtectedRoute`, declarative `routes.tsx`) |
| **HTTP-клиент**     | Axios |
| **Утилиты**         | Lodash, Day.js, Nanoid, Filesize, Classnames, React Copy to Clipboard, React Device Detect, React Collapsible |
| **Стилизация**      | Emotion (`@emotion/react`, `@emotion/styled`), CSS Reset & Normalize |

---

## Структура проекта

```
src/
├── app/                # Ядро приложения: App.tsx, провайдеры (Router, Auth, Header), конфигурация маршрутов
├── entities/           # Бизнес-сущности (Auth, Profile, Template, User): хуки, селекторы, сервисы, слайсы
├── features/           # Функциональные фичи (авторизация, теги, шаблоны): UI-компоненты, провайдеры, утилиты
├── pages/              # Страницы приложения (по маршрутизации): Login, Dashboard, TemplatesList, TemplateEditor и др.
├── shared/             # Общие компоненты, хуки, типы, константы, utils, i18n (если есть)
├── widgets/            # Переиспользуемые составные блоки (например, TreeViewWidget, TableWithPagination, FormSection)
├── index.tsx           # Точка входа: рендеринг корневого <App />
├── vite-env.d.ts       # TypeScript-определения для Vite и env-переменных
```

> 💡 **Примечание**: Архитектура следует принципам Feature-Sliced Design (FSD) с элементами BEM-подхода к именованию компонентов. Логика разделена по ответственности: `entities` — данные и бизнес-логика, `features` — пользовательские сценарии, `widgets` — переиспользуемые UI-блоки.

---

## Установка и запуск

### Требования
- Node.js ≥ 18.0  
- npm ≥ 9.0  

### Команды

```bash
# Клонировать репозиторий
git clone <repository-url>
cd documaker-frontend

# Установить зависимости
npm install

# Запустить в режиме разработки (сервер + HMR)
npm run dev

# Собрать продакшн-сборку
npm run build

# Проверить сборку локально
npm run preview

# Проверить код на соответствие правилам линтинга
npm run lint
```

После запуска `npm run dev` приложение будет доступно по адресу: **http://localhost:5173**

---

## Компоненты

| Имя                    | Файл                                                                 | Назначение |
|------------------------|----------------------------------------------------------------------|------------|
| `App`                  | `src/app/App.tsx`                                                    | Корневой компонент приложения, точка монтирования провайдеров и маршрутизации |
| `HeaderProvider`       | `src/app/providers/Header/HeaderProvider.tsx`                        | Провайдер заголовка страницы (динамический title, breadcrumbs) |
| `ProtectedRoute`       | `src/app/providers/Router/config/ProtectedRoute.tsx`                 | Защищённый маршрут: перенаправляет неавторизованных пользователей на `/login` |
| `router`               | `src/app/providers/Router/config/router.tsx`                         | Конфигурация React Router (обёртка над `createBrowserRouter`) |
| `routes`               | `src/app/providers/Router/config/routes.tsx`                         | Декларативное описание маршрутов с lazy loading и guards |
| `useAuth`              | `src/app/providers/auth/ui/AuthProvider.tsx`                         | Хук для доступа к состоянию авторизации и действиям (logout, refresh) |
| `useProfile`           | `src/entities/Profile/hooks/useProfile.tsx`                          | Получение и кэширование профиля текущего пользователя |
| `useTemplateCases`     | `src/entities/Template/hooks/useTemplateCases.tsx`                   | Хук для работы с кейсами (примерами использования) шаблонов |
| `AddTag`               | `src/features/Tag/AddTag/AddTag.tsx`                                 | Форма добавления нового тега с выбором типа, области применения и обязательности |
| `ForgotForm`           | `src/features/Auth/ByLogin/ui/ForgotForm/ForgotForm.tsx`             | Форма восстановления пароля (email-запрос) |
| `LoginForm`            | `src/features/Auth/ByLogin/ui/LoginForm/LoginForm.tsx`               | Основная форма входа с валидацией и обработкой ошибок |
| `AssignTemplate`       | `src/features/Template/AssignTemplate/AssignTemplate.tsx`            | Модальное окно назначения шаблона клиенту/проекту |
| `EditTemplateSection`  | `src/features/Template/EditTemplateSection/EditTemplateSection.tsx`    | Редактор раздела шаблона: текст, порядок, видимость, привязка файлов |
| `CopyTemplateSection`  | `src/features/Template/CopyTemplateSection/CopyTemplateSection.tsx`    | Компонент клонирования раздела внутри шаблона или между шаблонами |
| `DeleteTemplateSectionUnit` | `src/features/Template/DeleteTemplateSectionUnit/DeleteTemplateSectionUnit.tsx` | Удаление отдельного элемента (параграфа, таблицы, файла) в разделе |

> ✅ Всего зарегистрировано **179 компонентов**, включая формы, провайдеры, хуки и UI-блоки. Полный список — в разделе «Компоненты» технической документации проекта.

---

## Переменные окружения

| Переменная      | Обязательна | Описание |
|-----------------|-------------|----------|
| `VITE_BASE_URL` | Да          | Базовый URL API-бэкенда (например, `https://api.documaker.local/v1`). Используется в `axios`-инстансе. |

> ⚠️ Переменные определяются в `.env`-файле в корне проекта. Для production-сборки значения должны быть заданы на этапе CI/CD или при запуске `vite build`.
