```markdown
# Архитектура проекта `documaker-frontend`

## 1. Обзор архитектуры

Проект `documaker-frontend` реализован как современное React-приложение с использованием TypeScript, React Router v6 и Redux Toolkit (RTK). Архитектура следует принципам **feature-sliced design** с чётким разделением по доменным сущностям (`Auth`, `Profile`, `Tag`, `Template`) и инфраструктурным слоям (`app/providers`). Каждая сущность инкапсулирует свою логику: типы, селекторы, сервисы (асинхронные вызовы), редьюсеры и хуки — что обеспечивает высокую модульность, тестируемость и поддерживаемость.

Приложение построено вокруг **защищённой маршрутизации**: основной поток проходит через `ProtectedRoute`, который проверяет аутентификацию перед рендером защищённых страниц. Структура маршрутов (`routes.tsx`) декларативно описывает пути и соответствующие компоненты-страницы (`Login`, `CasesPage`, `Debug` и др.), а `router.tsx` собирает их в `RouterProvider`. Всё состояние приложения централизовано в RTK Store с явным разделением на slice-редьюсеры — каждый домен имеет свой `slice.ts` и набор reducer-файлов для обработки разных статусов (fulfilled/pending/rejected), что упрощает отладку и управление жизненным циклом асинхронных операций.

Слой представления использует гибридный подход: **container-компоненты** (например, страницы) используют хуки из `entities/`, а **presentational-компоненты** (в том числе кастомные UI-элементы) остаются в `shared/` или `widgets/` (не указаны в зависимостях, но подразумеваются по практике). Хуки (`useProfile`, `useTemplates` и др.) выступают в роли «адаптеров» между состоянием (Redux) и UI, инкапсулируя бизнес-логику, побочные эффекты и преобразования данных.

## 2. Граф компонентов (ASCII-дерево)

```
App (src/app/App.tsx)
├── RouterProvider (src/app/providers/Router/index.ts)
│   └── router (src/app/providers/Router/config/router.tsx)
│       ├── AuthLayout (e.g., Login/Register/Forgot/Reset)
│       ├── BaseLayout (e.g., CasesPage, Template pages)
│       │   ├── HeaderProvider (src/app/providers/Header/HeaderProvider.tsx)
│       │   └── ProtectedRoute (src/app/providers/Router/config/ProtectedRoute.tsx)
│       │       └── Route-children (e.g., HomePage, CasesId, TemplateEditor)
│       ├── Navigate / NotFoundPage
│       └── routes (src/app/providers/Router/config/routes.tsx)
│           ├── Login
│           ├── Register
│           ├── Forgot
│           ├── Reset
│           ├── CasesPage
│           ├── CasesId
│           ├── CasesIdBlank
│           ├── Debug
│           └── ... (other domain-specific routes)
├── AuthProvider (src/app/providers/auth/ui/AuthProvider.tsx)
│   └── AuthContext
└── StoreProvider (src/app/providers/Store/index.ts)
    └── store (src/app/providers/Store/config/store.ts)
        ├── authSlice (src/entities/Auth/model/slice/authSlice.ts)
        ├── profileSlice (src/entities/Profile/model/slice/profileSlice.ts)
        ├── tagsSlice (src/entities/Tag/model/slice/tagsSlice.ts)
        └── templateSlice (implicit in hooks/services, not yet in slice list)
```

> Примечание: `HeaderProvider`, `AuthProvider`, `StoreProvider` — это контекстные провайдеры, инжектируемые на верхнем уровне `App`. Дочерние компоненты получают доступ к состоянию через `useSelector`/`useDispatch` или через специализированные хуки (`useProfile`, `useTemplates`).

## 3. Слои приложения

| Слой             | Назначение                                                                 | Примеры путей                                                                 |
|------------------|------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| **Pages**        | Компоненты верхнего уровня, соответствующие маршрутам; координируют логику и рендеринг | `src/app/providers/Router/config/routes.tsx`, `src/pages/CasesPage.tsx` (неявно) |
| **Containers**   | Логически завершённые компоненты, связывающие данные и UI (часто — хуки + презентационные компоненты) | `src/entities/Template/hooks/useTemplates.tsx`, `src/entities/Profile/hooks/useProfileCases.tsx` |
| **Presentational** | Чистые, переиспользуемые компоненты без зависимости от состояния или бизнес-логики | Не указаны напрямую в зависимостях, но подразумеваются в `shared/ui/` или `widgets/` (например, `PaginationState`, `TableColumn`, `Link`) |
| **Hooks**        | Кастомные хуки, инкапсулирующие логику взаимодействия со стором, API и состоянием | `useProfile`, `useProfileCases`, `useTemplateCases`, `useTemplates`            |
| **Services**     | Асинхронные функции для работы с API (без side-effects в UI)                | `src/entities/Auth/model/services/login.ts`, `fetchCases.ts`, `createTemplate.ts` |
| **Model (Domain)** | Типы, селекторы, редьюсеры, схемы — ядро доменной логики                     | `AuthSchema.ts`, `getProfile.ts`, `authSlice.ts`, `tagsSlice.ts`              |
| **Providers**    | Инфраструктурные провайдеры: роутинг, хранилище, аутентификация, заголовки    | `RouterProvider`, `StoreProvider`, `AuthProvider`, `HeaderProvider`            |
| **Types**        | Глобальные и доменные типы, расширения библиотек                             | `global.d.ts`, `pagination-meta.ts`, `react-table-extensions.d.ts`           |

> ⚠️ Замечание: В текущем списке отсутствуют явные `widgets/`, `features/` или `shared/` директории — следовательно, архитектура пока ориентирована на **domain-first**, а не на **layer-first**, что характерно для feature-sliced design.

## 4. Управление состоянием

- **Основной механизм**: **Redux Toolkit (RTK)** с `configureStore`, `createSlice`, `createAsyncThunk` (подразумевается по структуре `fulfilled`/`pending`/`rejected` редьюсеров).
- **Доступ к состоянию**: через `useSelector` и `useDispatch` в хуках и компонентах.
- **Локальное состояние**: используется избирательно через `useState` и `useEffect` в:
  - Провайдерах (`HeaderProvider`, `AuthProvider`)
  - Хуках (`useProfile`, `useTemplates`) — для управления локальными UI-состояниями (например, `searchQuery`, `sorting`, `pagination`)
- **Контекст**: применяется минимально — только для провайдеров (`AuthContext`, `HeaderContext`), **не используется для глобального состояния** (все домены — в Redux).
- **Middleware**: присутствует `accessMiddleware.ts` — предположительно, для обработки токенов, refresh-логики или авторизационных side-effects.

> ✅ Итог: гибридная стратегия — **глобальное состояние через RTK**, **локальное — через хуки**, **инфраструктурное — через Context**. Это позволяет балансировать производительность (минимизация перерисовок), предсказуемость (единственный источник истины) и удобство разработки.

## 5. Паттерны

- **Feature-Sliced Design (FSD)**  
  Явно прослеживается: каждая сущность (`Auth`, `Profile`, `Tag`, `Template`) содержит *все* необходимые файлы (типы, селекторы, сервисы, редьюсеры, хуки) в своей папке. Отсутствуют кросс-доменные зависимости внутри `entities/`.

- **Slice Pattern (RTK)**  
  Каждый домен использует `createSlice`, с разделением логики на отдельные reducer-файлы (`loginFulfilled.ts`, `setPending.ts` и т.д.) — повышает читаемость и упрощает тестирование отдельных состояний.

- **Hook-Based Composition**  
  Все доменные интерфейсы предоставляются через кастомные хуки (`useProfile`, `useTemplates`), что скрывает детали реализации (Redux vs. local state) и даёт единый API для потребителей.

- **Protected Routing Pattern**  
  `ProtectedRoute` — это HOC-подобный компонент, реализующий guard-логику (проверка токена, редирект на `/login` при отсутствии доступа), инкапсулирующий защиту на уровне маршрута.

- **Type-First Development**  
  Типы (`AuthSchema.ts`, `ProfileSchema.ts`, `TagSchema.ts`) определяются до реализации, используются в сервисах, селекторах и редьюсерах — обеспечивает безопасность и согласованность API.

- **Separation of Concerns (SoC) в редьюсерах**  
  Разделение `setPending` / `setRejected` / `fulfilled`-редьюсеров по файлам — позволяет легко добавлять логику для конкретного статуса (например, показ уведомлений при ошибке) без изменения основного `slice`.
```
