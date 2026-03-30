# Components
## App
**Файл:** `src/app/App.tsx`
**Назначение:** React-компонент, обнаруженный в `src/app/App.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** RouterProvider

**Хуки:** React hooks из базового набора не обнаружены.

## HeaderProvider
**Файл:** `src/app/providers/Header/HeaderProvider.tsx`
**Назначение:** React-компонент, обнаруженный в `src/app/providers/Header/HeaderProvider.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| isShow | `boolean` | Поле интерфейса `HeaderContextProps`. |
| setIsShow | `Dispatch<SetStateAction<boolean>>` | Поле интерфейса `HeaderContextProps`. |

**Состояние:** isShow

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** HeaderContext, HeaderContextProps, PropsWithChildren, SetStateAction

**Хуки:** useState

## ProtectedRoute
**Файл:** `src/app/providers/Router/config/ProtectedRoute.tsx`
**Назначение:** React-компонент, обнаруженный в `src/app/providers/Router/config/ProtectedRoute.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| roles | `string[]` | Поле интерфейса `ProtectedRouteProps`. |

**Состояние:** hasAccess

**Эффекты:** if (isAuth && profile && profile.roles) { setHasAccess(isRoleByName(profile.roles, roles)); } [deps: profile, isAuth, roles]

**Использует компоненты:** Navigate, PropsWithChildren, ProtectedRouteProps

**Хуки:** useState, useEffect

## router
**Файл:** `src/app/providers/Router/config/router.tsx`
**Назначение:** React-компонент, обнаруженный в `src/app/providers/Router/config/router.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AuthLayout, BaseLayout, HomePage, Navigate, NotFoundPage, ProtectedRoute, Route

**Хуки:** React hooks из базового набора не обнаружены.

## routes
**Файл:** `src/app/providers/Router/config/routes.tsx`
**Назначение:** React-компонент, обнаруженный в `src/app/providers/Router/config/routes.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** CasesId, CasesIdBlank, CasesPage, Debug, Forgot, Login, Register, Reset, Templates, TemplatesId, TemplatesIdBlank, Users

**Хуки:** React hooks из базового набора не обнаружены.

## useAuth
**Файл:** `src/app/providers/auth/ui/AuthProvider.tsx`
**Назначение:** React-компонент, обнаруженный в `src/app/providers/auth/ui/AuthProvider.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| isAuth | `boolean` | Поле интерфейса `AuthContextProps`. |
| checkLogin | `(data: ICheckLogin) => void` | Поле интерфейса `AuthContextProps`. |
| login | `(data: ILogin) => void` | Поле интерфейса `AuthContextProps`. |
| register | `(data: IRegister) => void` | Поле интерфейса `AuthContextProps`. |
| forgot | `(data: IForgot) => void` | Поле интерфейса `AuthContextProps`. |
| reset | `(data: IReset) => void` | Поле интерфейса `AuthContextProps`. |
| logout | `() => void` | Поле интерфейса `AuthContextProps`. |
| profile | `Profile | null` | Поле интерфейса `AuthContextProps`. |

**Состояние:** isAuth, timeRefreshToken

**Эффекты:** setIsAuth(checkAuth()); [deps: accessToken, checkAuth, expiresAt]; if (isAuth) { dispatch(fetchProfile({})); } [deps: dispatch, isAuth]; const interval = setInterval(() => { setTimeRefreshToken(Number(expiresAt) > 0 && Date.now() >= Number(expiresAt) - 600000); }, 300); return () => { clearInterv [deps: expiresAt]; if (timeRefreshToken && isAuth) { dispatch(refreshAccessToken({})); setTimeRefreshToken(false); } [deps: dispatch, isAuth, timeRefreshToken]

**Использует компоненты:** AuthContext, AuthContextProps, PropsWithChildren

**Хуки:** useState, useEffect, useCallback

## useProfile
**Файл:** `src/entities/Profile/hooks/useProfile.tsx`
**Назначение:** React-компонент, обнаруженный в `src/entities/Profile/hooks/useProfile.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** isSuperAdmin, isAdmin, isModerator, isUser

**Эффекты:** if (profile && profile.roles) { setIsSuperAdmin(isRoleByName(profile.roles, Roles.SUPER_ADMIN)); setIsAdmin(isRoleByName(profile.roles, Roles.ADMIN)); setIsMode [deps: profile]

**Использует компоненты:** Дочерние JSX-компоненты не обнаружены.

**Хуки:** useState, useEffect

## useProfileCases
**Файл:** `src/entities/Profile/hooks/useProfileCases.tsx`
**Назначение:** React-компонент, обнаруженный в `src/entities/Profile/hooks/useProfileCases.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** sorting, paginationData, pagination

**Эффекты:** setPaginationData({ total: paginationMeta.total, current: paginationMeta.current, pageSize: paginationMeta.pageSize, }); [deps: paginationMeta]; dispatch( fetchCases({ dir: sorting[0].desc ? 'desc' : 'asc', sort: sorting[0].id, page: pagination.pageIndex, search, }), ); [deps: dispatch, pagination.pageIndex, search, sorting]

**Использует компоненты:** Link, PaginationState, SortingState, Status, Template

**Хуки:** useState, useEffect

## useTemplateCases
**Файл:** `src/entities/Template/hooks/useTemplateCases.tsx`
**Назначение:** React-компонент, обнаруженный в `src/entities/Template/hooks/useTemplateCases.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** paginationData, sorting, pagination

**Эффекты:** setPaginationData({ total: paginationMeta.total, current: paginationMeta.current, pageSize: paginationMeta.pageSize, }); [deps: paginationMeta]; const params = { dir: sorting[0].desc ? 'desc' : 'asc', sort: sorting[0].id, page: pagination.pageIndex, ...filters, }; if (JSON.stringify(memoFilters.current) [deps: dispatch, pagination.pageIndex, filters, sorting]

**Использует компоненты:** FaAngleDown, FaAngleUp, Link, PaginationState, SearchTemplateByUser, SetTemplateStatus, SortingState, TableColumn, Template, Trash

**Хуки:** useState, useEffect, useCallback

## useTemplates
**Файл:** `src/entities/Template/hooks/useTemplates.tsx`
**Назначение:** React-компонент, обнаруженный в `src/entities/Template/hooks/useTemplates.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** sorting, paginationData, pagination, isOpenTemplateEdit

**Эффекты:** setPaginationData({ total: paginationMeta.total, current: paginationMeta.current, pageSize: paginationMeta.pageSize, }); [deps: paginationMeta]; const params = { dir: sorting[0].desc ? 'desc' : 'asc', sort: sorting[0].id, page: pagination.pageIndex, ...filters, }; if (JSON.stringify(memoFilters.current) [deps: dispatch, filters, pagination.pageIndex, sorting]

**Использует компоненты:** Copy, Edit, Link, PaginationState, SetTemplateStatus, SortingState, TableColumn, Template, Trash

**Хуки:** useState, useEffect, useCallback

## useUsers
**Файл:** `src/entities/User/hooks/useUsers.tsx`
**Назначение:** React-компонент, обнаруженный в `src/entities/User/hooks/useUsers.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** paginationData, sorting, pagination, isOpenUserEdit, user

**Эффекты:** setPaginationData({ total: paginationMeta.total, current: paginationMeta.current, pageSize: paginationMeta.pageSize, }); [deps: paginationMeta]; dispatch( fetchUsers({ dir: sorting[0].desc ? 'desc' : 'asc', sort: sorting[0].id, page: pagination.pageIndex, ...filters }), ).then(() => { dispatch(fetchRoles [deps: dispatch, sorting, pagination.pageIndex, filters]

**Использует компоненты:** Edit, Link, PaginationState, SortingState, TableColumn, Trash, User, UserBlock

**Хуки:** useState, useEffect, useCallback

## useLogin
**Файл:** `src/features/Auth/ByLogin/config/LoginProvider.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Auth/ByLogin/config/LoginProvider.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| login | `null | string` | Поле интерфейса `LoginContextProps`. |
| typeLogin | `string` | Поле интерфейса `LoginContextProps`. |
| setLogin | `(login: string) => void` | Поле интерфейса `LoginContextProps`. |
| setTypeLogin | `(type: string) => void` | Поле интерфейса `LoginContextProps`. |

**Состояние:** login, typeLogin

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** LoginContext, LoginContextProps, PropsWithChildren

**Хуки:** useState

## tabConfig
**Файл:** `src/features/Auth/ByLogin/config/tabConfig.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Auth/ByLogin/config/tabConfig.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Дочерние JSX-компоненты не обнаружены.

**Хуки:** React hooks из базового набора не обнаружены.

## ForgotForm
**Файл:** `src/features/Auth/ByLogin/ui/ForgotForm/ForgotForm.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Auth/ByLogin/ui/ForgotForm/ForgotForm.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** isOpenModal

**Эффекты:** if (isAuth) navigate(`/${AppRoutes.AUTH}/${AppRoutes.LOGIN}`); if (errorCode) { setError(FORM_ERROR, { message: errorMessage ?? 'An error has occurred refresh t [deps: isAuth, errorCode, navigate, setError, errorMessage]; const subscription = watch((_value, { type }) => { if ((type as string) === 'input' || type === 'change' || type === 'valueChange') clearErrors(FORM_ERROR); }); [deps: clearErrors, watch]

**Использует компоненты:** Button, Controller, IMaskInput, Modal

**Хуки:** useState, useEffect

## LoginForm
**Файл:** `src/features/Auth/ByLogin/ui/LoginForm/LoginForm.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Auth/ByLogin/ui/LoginForm/LoginForm.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** showPasswordField

**Эффекты:** setShowPasswordField(idUser !== null); if (isAuth) navigate(`/${AppRoutes.TEMPLATES}`); if (errorCode === 422) navigate(`/${AppRoutes.AUTH}/${AppRoutes.REGISTER [deps: errorCode, idUser, isAuth, navigate, setError, setFocus, setValue, showPasswordField]; const subscription = watch((_value, { type }) => { if ((type as string) === 'input' || type === 'change' || type === 'valueChange') clearErrors(FORM_ERROR); }); [deps: clearErrors, idUser, watch]

**Использует компоненты:** Button, Controller, ILogin, IMaskInput, Input, Link, PhoneInput, Segmented

**Хуки:** useState, useEffect

## RegisterForm
**Файл:** `src/features/Auth/ByLogin/ui/RegisterForm/RegisterForm.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Auth/ByLogin/ui/RegisterForm/RegisterForm.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** if (isAuth) navigate(`/${AppRoutes.TEMPLATES}`); if (errorCode) { setError(FORM_ERROR, { message: errorMessage ?? '' }); } [deps: isAuth, errorCode, navigate, errorMessage, setError]; const subscription = watch((_value, { type }) => { if ((type as string) === 'input' || type === 'change' || type === 'valueChange') clearErrors(FORM_ERROR); }); [deps: clearErrors, watch]

**Использует компоненты:** Button, Controller, IMaskInput, Input, Link, PhoneInput

**Хуки:** useEffect

## ResetForm
**Файл:** `src/features/Auth/ByLogin/ui/ResetForm/ResetForm.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Auth/ByLogin/ui/ResetForm/ResetForm.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** if (isAuth) navigate(`/${AppRoutes.AUTH}/${AppRoutes.LOGIN}`); if (errorCode) { setError(FORM_ERROR, { message: errorMessage ?? '' }); } [deps: isAuth, errorCode, navigate, setError, errorMessage]; const subscription = watch((_value, { type }) => { if ((type as string) === 'input' || type === 'change' || type === 'valueChange') clearErrors(FORM_ERROR); }); [deps: clearErrors, watch]

**Использует компоненты:** Button, Controller, IReset, Input

**Хуки:** useEffect

## withAuth
**Файл:** `src/features/Auth/ByLogin/utils/withAuth/withAuth.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Auth/ByLogin/utils/withAuth/withAuth.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| children | `JSX.Element | undefined` | Поле интерфейса `AuthProps`. |
| title | `string | undefined` | Поле интерфейса `AuthProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AuthProps, Component, LoginProvider

**Хуки:** React hooks из базового набора не обнаружены.

## AddTag
**Файл:** `src/features/Tag/AddTag/AddTag.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Tag/AddTag/AddTag.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| scope | `TagScope` | Поле интерфейса `AddTagProps`. |
| query | `string` | Поле интерфейса `AddTagProps`. |
| setQuery | `(query: string) => void` | Поле интерфейса `AddTagProps`. |

**Состояние:** open, slide

**Эффекты:** if (tagInit) { if (tagInit !== scope) { setQuery(''); } } [deps: scope, setQuery, tagInit]

**Использует компоненты:** AddTagChoice, AddTagProps, AddTagRequired, AddTagTitle, AddTagType, AiOutlineArrowLeft, AiOutlineArrowRight, Button, Carousel, CarouselRef, Modal

**Хуки:** useState, useEffect, useCallback

## AddTagChoice
**Файл:** `src/features/Tag/AddTag/ui/AddTagChoice/AddTagChoice.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Tag/AddTag/ui/AddTagChoice/AddTagChoice.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** optionId

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, FaRegTrashAlt, HTMLInputElement, Input, LuBraces, SelectKeyWord

**Хуки:** useState, useCallback

## SelectKeyWord
**Файл:** `src/features/Tag/AddTag/ui/AddTagChoice/ui/SelectKeyWord/SelectKeyWord.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Tag/AddTag/ui/AddTagChoice/ui/SelectKeyWord/SelectKeyWord.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** value, keywordCode

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiFillDelete, Button, HTMLInputElement, Input, Modal, Props, Select

**Хуки:** useState, useCallback

## AddTagRequired
**Файл:** `src/features/Tag/AddTag/ui/AddTagRequired/AddTagRequired.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Tag/AddTag/ui/AddTagRequired/AddTagRequired.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Switch

**Хуки:** React hooks из базового набора не обнаружены.

## AddTagScope
**Файл:** `src/features/Tag/AddTag/ui/AddTagScope/AddTagScope.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Tag/AddTag/ui/AddTagScope/AddTagScope.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Segmented

**Хуки:** useCallback

## AddTagTitle
**Файл:** `src/features/Tag/AddTag/ui/AddTagTitle/AddTagTitle.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Tag/AddTag/ui/AddTagTitle/AddTagTitle.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** HTMLInputElement, Input

**Хуки:** React hooks из базового набора не обнаружены.

## AddTagType
**Файл:** `src/features/Tag/AddTag/ui/AddTagType/AddTagType.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Tag/AddTag/ui/AddTagType/AddTagType.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Menu

**Хуки:** React hooks из базового набора не обнаружены.

## DeleteTag
**Файл:** `src/features/Tag/DeleteTag/DeleteTag.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Tag/DeleteTag/DeleteTag.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| tag | `Tag | undefined` | Поле интерфейса `DeleteTagProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiFillDelete, DeleteTagProps

**Хуки:** useCallback

## EditTag
**Файл:** `src/features/Tag/EditTag/EditTag.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Tag/EditTag/EditTag.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| tag | `Tag | undefined` | Поле интерфейса `DeleteTagProps`. |

**Состояние:** open, slide

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AddTagChoice, AddTagRequired, AddTagTitle, AddTagType, AiFillEdit, AiOutlineArrowLeft, AiOutlineArrowRight, Button, Carousel, CarouselRef, DeleteTagProps, Modal

**Хуки:** useState, useCallback

## AddTemplate
**Файл:** `src/features/Template/AddTemplate/AddTemplate.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/AddTemplate/AddTemplate.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** open, title

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, HTMLInputElement, Input, Modal

**Хуки:** useState, useCallback

## titleHandler
**Файл:** `src/features/Template/AddTemplateKeyWord/AddTemplateKeyWord.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/AddTemplateKeyWord/AddTemplateKeyWord.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** open, code, title

**Эффекты:** setCode(prepareCode(title)); [deps: title]; setTitle(prepareCode(word)); [deps: word]

**Использует компоненты:** Button, HTMLInputElement, Input, Modal, Props, PropsWithChildren

**Хуки:** useState, useEffect, useCallback

## AddTemplateSection
**Файл:** `src/features/Template/AddTemplateSection/AddTemplateSection.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/AddTemplateSection/AddTemplateSection.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** open, type, title

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, FiPlusCircle, HTMLInputElement, Input, Modal, Segmented, TemplateSectionType

**Хуки:** useState, useCallback

## AddTemplateSubSection
**Файл:** `src/features/Template/AddTemplateSubSection/AddTemplateSubSection.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/AddTemplateSubSection/AddTemplateSubSection.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| parent | `TemplateSection` | Поле интерфейса `AddTemplateSubSectionProps`. |

**Состояние:** open, type, title

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AddTemplateSubSectionProps, AiOutlinePlus, HTMLInputElement, Input, Modal, Segmented, TemplateSectionType

**Хуки:** useState, useCallback

## AssignTemplate
**Файл:** `src/features/Template/AssignTemplate/AssignTemplate.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/AssignTemplate/AssignTemplate.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** open, query

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AssignTemplateClient, Button, HTMLInputElement, Input, Modal

**Хуки:** useState, useCallback

## AssignTemplateClient
**Файл:** `src/features/Template/AssignTemplate/ui/AssignTemplateClient/AssignTemplateClient.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/AssignTemplate/ui/AssignTemplateClient/AssignTemplateClient.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| user | `User` | Поле интерфейса `ClientProps`. |
| position | `number` | Поле интерфейса `ClientProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Avatar, Checkbox, ClientProps, LuUser

**Хуки:** React hooks из базового набора не обнаружены.

## CopyTemplateSection
**Файл:** `src/features/Template/CopyTemplateSection/CopyTemplateSection.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/CopyTemplateSection/CopyTemplateSection.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineCopy, Props

**Хуки:** useCallback

## DeleteTemplateKeyWord
**Файл:** `src/features/Template/DeleteTemplateKeyWord/DeleteTemplateKeyWord.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/DeleteTemplateKeyWord/DeleteTemplateKeyWord.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiFillDelete, Props, PropsWithChildren

**Хуки:** useCallback

## DeleteTemplateSection
**Файл:** `src/features/Template/DeleteTemplateSection/DeleteTemplateSection.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/DeleteTemplateSection/DeleteTemplateSection.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| section | `TemplateSection` | Поле интерфейса `AddTemplateSubSectionProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AddTemplateSubSectionProps, AiFillDelete

**Хуки:** useCallback

## DeleteTemplateSectionUnit
**Файл:** `src/features/Template/DeleteTemplateSectionUnit/DeleteTemplateSectionUnit.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/DeleteTemplateSectionUnit/DeleteTemplateSectionUnit.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiFillDelete, Props

**Хуки:** useCallback

## EditTemplate
**Файл:** `src/features/Template/EditTemplate/EditTemplate.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/EditTemplate/EditTemplate.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| onClose | `() => void` | Поле интерфейса `EditTemplateProps`. |
| onAccept | `(template: Template) => void` | Поле интерфейса `EditTemplateProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, Controller, EditTemplateProps, Input, Template

**Хуки:** React hooks из базового набора не обнаружены.

## EditTemplateSection
**Файл:** `src/features/Template/EditTemplateSection/EditTemplateSection.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/EditTemplateSection/EditTemplateSection.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** open, type, title

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineEdit, HTMLInputElement, Input, Modal, Props, Segmented, TemplateSectionType

**Хуки:** useState, useCallback

## EditTemplateSectionFile
**Файл:** `src/features/Template/EditTemplateSectionFile/EditTemplateSectionFile.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/EditTemplateSectionFile/EditTemplateSectionFile.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** open

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiFillEdit, Button, HTMLInputElement, Input, Modal, Props

**Хуки:** useState, useCallback

## ExpandCaseDrafts
**Файл:** `src/features/Template/ExpandCaseDrafts/ExpandCaseDrafts.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/ExpandCaseDrafts/ExpandCaseDrafts.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Link

**Хуки:** React hooks из базового набора не обнаружены.

## LinkTemplateSection
**Файл:** `src/features/Template/LinkTemplateSection/LinkTemplateSection.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/LinkTemplateSection/LinkTemplateSection.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| parent | `TemplateSection` | Поле интерфейса `LinkTemplateSectionProps`. |

**Состояние:** open

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineLink, LinkTemplateSectionProps, Modal, SelectTemplateSection

**Хуки:** useState, useCallback

## SearchTemplate
**Файл:** `src/features/Template/SearchTemplate/SearchTemplate.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/SearchTemplate/SearchTemplate.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** search

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Input

**Хуки:** useState

## SearchTemplateByStatus
**Файл:** `src/features/Template/SearchTemplateByStatus/SearchTemplateByStatus.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/SearchTemplateByStatus/SearchTemplateByStatus.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** status

**Эффекты:** if (status === 'ALL') { dispatch(templatesActions.deleteTemplateFilter('status')); } else { dispatch(templatesActions.setTemplateFilter({ status })); } [deps: dispatch, status]

**Использует компоненты:** Button, FaRegTrashAlt, Props, Segmented

**Хуки:** useState, useEffect

## SearchTemplateByUser
**Файл:** `src/features/Template/SearchTemplateByUser/SearchTemplateByUser.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/SearchTemplateByUser/SearchTemplateByUser.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Props, TableColumn

**Хуки:** useCallback

## SelectTemplateSection
**Файл:** `src/features/Template/SelectTemplateSection/SelectTemplateSection.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/SelectTemplateSection/SelectTemplateSection.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** initialSections, sections, anchors, currentSection, currentParent, currentAnchor

**Эффекты:** let sections: TemplateSection[] = []; if (fullTree) { if (template?.sections) { sections = template.sections.filter((section) => !section.is_global); } } else i [deps: template, editedSection, fullTree, type]; if (!fullTree && editedSection?.anchors) { setAnchors(editedSection.anchors); } [deps: editedSection, fullTree]

**Использует компоненты:** AiOutlineLeft, AiOutlineLink, AiOutlinePushpin, AiOutlineRight, Button, List, Props, TemplateSection, TemplateSectionAnchor

**Хуки:** useState, useEffect, useCallback

## SetTemplateStatus
**Файл:** `src/features/Template/SetTemplateStatus/SetTemplateStatus.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/SetTemplateStatus/SetTemplateStatus.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Dropdown, DropdownStatus, Props, Status

**Хуки:** React hooks из базового набора не обнаружены.

## DropdownStatus
**Файл:** `src/features/Template/SetTemplateStatus/ui/DropdownStatus/DropdownStatus.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/SetTemplateStatus/ui/DropdownStatus/DropdownStatus.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Props

**Хуки:** React hooks из базового набора не обнаружены.

## ShowTemplateKeyWordParentSection
**Файл:** `src/features/Template/ShowTemplateKeyWordParentSection/ShowTemplateKeyWordParentSection.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/Template/ShowTemplateKeyWordParentSection/ShowTemplateKeyWordParentSection.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineEye, Props, PropsWithChildren

**Хуки:** useCallback

## AddUser
**Файл:** `src/features/User/AddUser/AddUser.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/User/AddUser/AddUser.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** isOpen, isSuccess, createdUser

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AntDCloseIcon, Button, CreateUser, Modal, SuccessMessage, User

**Хуки:** useState

## CreateUser
**Файл:** `src/features/User/CreateUser/CreateUser.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/User/CreateUser/CreateUser.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| className | `string | undefined | undefined` | Поле интерфейса `CreateUserProps`. |
| successCreate | `(user: User) => void` | Поле интерфейса `CreateUserProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** if (serverError) { setError(FORM_ERROR, { message: serverError?.message ?? '' }); } [deps: serverError, setError]; const subscription = watch((_value, { type }) => { if ((type as string) === 'input' || type === 'change' || type === 'valueChange') clearErrors(FORM_ERROR); }); [deps: clearErrors, watch]

**Использует компоненты:** Button, Controller, CreateUserProps, IMaskInput, Input, PhoneInput, User

**Хуки:** useEffect

## EditUser
**Файл:** `src/features/User/EditUser/EditUser.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/User/EditUser/EditUser.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| className | `string | undefined | undefined` | Поле интерфейса `EditUserProps`. |
| user | `User` | Поле интерфейса `EditUserProps`. |
| onClose | `() => void` | Поле интерфейса `EditUserProps`. |
| onAccept | `(data: User) => void` | Поле интерфейса `EditUserProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, Controller, EditUserProps, IMaskInput, Input, PhoneInput, User

**Хуки:** React hooks из базового набора не обнаружены.

## SearchUser
**Файл:** `src/features/User/SearchUser/SearchUser.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/User/SearchUser/SearchUser.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** search

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Input

**Хуки:** useState

## SetManager
**Файл:** `src/features/User/SetManager/SetManager.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/User/SetManager/SetManager.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| user | `User` | Поле интерфейса `SetManagerProps`. |
| setSelectedUser | `(user: User | null) => void` | Поле интерфейса `SetManagerProps`. |

**Состояние:** isOpen, search, users, total, selected

**Эффекты:** getUsers(); [deps: getUsers]

**Использует компоненты:** AntDCloseIcon, Avatar, Button, Checkbox, Input, Modal, Pagination, SetManagerProps, User

**Хуки:** useState, useEffect, useCallback

## SuccessMessage
**Файл:** `src/features/User/SuccessMessage/SuccessMessage.tsx`
**Назначение:** React-компонент, обнаруженный в `src/features/User/SuccessMessage/SuccessMessage.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| user | `User` | Поле интерфейса `SuccessMessageProps`. |
| onClose | `() => void` | Поле интерфейса `SuccessMessageProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, SuccessMessageProps

**Хуки:** React hooks из базового набора не обнаружены.

## index
**Файл:** `src/index.tsx`
**Назначение:** React-компонент, обнаруженный в `src/index.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** App, AuthProvider, ConfigProvider, HeaderProvider, PersistGate, StoreProvider

**Хуки:** React hooks из базового набора не обнаружены.

## Debug
**Файл:** `src/pages/Auth/ui/Debug/Debug.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Auth/ui/Debug/Debug.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** token

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, Input

**Хуки:** useState

## Forgot
**Файл:** `src/pages/Auth/ui/Forgot/Forgot.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Auth/ui/Forgot/Forgot.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** ForgotForm

**Хуки:** React hooks из базового набора не обнаружены.

## Login
**Файл:** `src/pages/Auth/ui/Login/Login.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Auth/ui/Login/Login.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** LoginForm

**Хуки:** React hooks из базового набора не обнаружены.

## Register
**Файл:** `src/pages/Auth/ui/Register/Register.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Auth/ui/Register/Register.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** RegisterForm

**Хуки:** React hooks из базового набора не обнаружены.

## Reset
**Файл:** `src/pages/Auth/ui/Reset/Reset.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Auth/ui/Reset/Reset.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** ResetForm

**Хуки:** React hooks из базового набора не обнаружены.

## Cases
**Файл:** `src/pages/Cases/ui/Cases/Cases.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Cases/ui/Cases/Cases.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** BaseNav, BlockPage, HeaderContextProps, Helmet, SearchTemplate, SearchTemplateByStatus, TableTemplateCases

**Хуки:** useEffect

## CasesId
**Файл:** `src/pages/Cases/ui/CasesId/CasesId.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Cases/ui/CasesId/CasesId.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** if (id) { dispatch(fetchTemplateCaseById(id)); } dispatch(templatesActions.setTemplateIsBlank(false)); dispatch(templatesActions.setTemplateIsCase(true)); [deps: dispatch, id]

**Использует компоненты:** AsideMenuDraft, BlankEditor, BlockPage, Button, Card, HeaderContextProps, PageTitle, Structure, Tags, TemplateEditor

**Хуки:** useEffect, useCallback

## CasesIdBlank
**Файл:** `src/pages/Cases/ui/CasesIdBlank/CasesIdBlank.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Cases/ui/CasesIdBlank/CasesIdBlank.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** dispatch(templatesActions.setTemplateIsBlank(true)); [deps: dispatch]; if (id) { dispatch(fetchTemplateCaseById(id)); } dispatch(templatesActions.setTemplateIsBlank(true)); dispatch(templatesActions.setTemplateIsCase(true)); [deps: dispatch, id]

**Использует компоненты:** AsideMenuDraft, BlankEditor, BlockPage, Button, Card, HeaderContextProps, PageTitle, Structure

**Хуки:** useEffect, useCallback

## CasesPage
**Файл:** `src/pages/Cases/ui/CasesPage/CasesPage.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Cases/ui/CasesPage/CasesPage.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Cases, ClientCases, Loading

**Хуки:** React hooks из базового набора не обнаружены.

## ClientCases
**Файл:** `src/pages/Cases/ui/ClientCases/ClientCases.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Cases/ui/ClientCases/ClientCases.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** search

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** BlockPage, HeaderContextProps, Helmet, Input, TableProfileCases, WithManagers

**Хуки:** useState, useEffect

## index
**Файл:** `src/pages/HomePage/index.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/HomePage/index.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Дочерние JSX-компоненты не обнаружены.

**Хуки:** React hooks из базового набора не обнаружены.

## HomePage
**Файл:** `src/pages/HomePage/ui/HomePage.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/HomePage/ui/HomePage.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** HeaderContextProps, Loading, Navigate

**Хуки:** React hooks из базового набора не обнаружены.

## index
**Файл:** `src/pages/NotFoundPage/index.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/NotFoundPage/index.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Дочерние JSX-компоненты не обнаружены.

**Хуки:** React hooks из базового набора не обнаружены.

## NotFoundPage
**Файл:** `src/pages/NotFoundPage/ui/NotFoundPage.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/NotFoundPage/ui/NotFoundPage.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, TbError404

**Хуки:** React hooks из базового набора не обнаружены.

## Templates
**Файл:** `src/pages/Templates/ui/Templates/Templates.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Templates/ui/Templates/Templates.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AddTemplate, BaseNav, BlockPage, HeaderContextProps, Helmet, SearchTemplate, SearchTemplateByStatus, TableTemplates

**Хуки:** useEffect

## TemplatesId
**Файл:** `src/pages/Templates/ui/TemplatesId/TemplatesId.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Templates/ui/TemplatesId/TemplatesId.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** open

**Эффекты:** return () => { dispatch(templatesActions.resetTemplateState()); }; [deps: dispatch]; return () => { dispatch(templatesActions.resetTemplateState()); }; [deps: dispatch]; if (id) { dispatch(fetchTemplateById(id)); } dispatch(templatesActions.setTemplateIsBlank(false)); [deps: dispatch, id]

**Использует компоненты:** AsideMenu, BlockPage, Button, Card, HeaderContextProps, KeyWords, Modal, PageTitle, Structure, Tags, TemplateEditor

**Хуки:** useState, useEffect, useCallback

## TemplatesIdBlank
**Файл:** `src/pages/Templates/ui/TemplatesIdBlank/TemplatesIdBlank.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Templates/ui/TemplatesIdBlank/TemplatesIdBlank.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** if (id) { dispatch(fetchTemplateById(id)); dispatch(fetchUsers({})); } dispatch(templatesActions.setTemplateIsBlank(true)); [deps: dispatch, id]; return () => { dispatch(templatesActions.resetTemplateState()); }; [deps: dispatch]

**Использует компоненты:** AsideMenu, AssignTemplate, BlankEditor, BlockPage, Button, Card, HeaderContextProps, PageTitle, Structure

**Хуки:** useEffect, useCallback

## Users
**Файл:** `src/pages/Users/ui/Users/Users.tsx`
**Назначение:** React-компонент, обнаруженный в `src/pages/Users/ui/Users/Users.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** selectedUser

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AddUser, BaseNav, BlockPage, Helmet, SearchUser, SetManager, TableUsers, User

**Хуки:** useState, useEffect

## TableColumnUser
**Файл:** `src/shared/lib/Table/TableColumn/TableColumn.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/lib/Table/TableColumn/TableColumn.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** displayRoles, defaultRoles, disabled, menuItems, isUser, managers

**Эффекты:** if (user.roles) { const isCurrentUser = user.id === profile?.id; if (isSuperAdmin) { setDisplayRoles( roles .map(({ name, displayName }: Role) => ({ value: name [deps: isAdmin, isModerator, roles, values, profile, user.roles, user.id, user.name, isSuperAdmin,]; if (items) { setMenuItems( items.map((item: ItemType) => { if (item) { const replaceClasses = item?.className?.split(' ').map((item) => { return item === 'dange [deps: items]; if (user && user.roles) { setIsUser(isRoleByName(user.roles, Roles.USER)); } if (user && user.managers) { setManagers(user.managers); } [deps: user]

**Использует компоненты:** Avatar, BaseOptionType, Dropdown, MenuProps, PropsWithChildren, Select, Space, TableActionButton, TableColumnActionProps, TableColumnManagersProps, TableColumnRoleProps, TableColumnUserProps, User

**Хуки:** useState, useEffect

## TableHeaderRoot
**Файл:** `src/shared/lib/Table/TableHeader/TableHeader.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/lib/Table/TableHeader/TableHeader.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| className | `string | undefined | undefined` | Поле интерфейса `HeaderTableRootProps`. |
| onClick | `((event: unknown) => void) | undefined | undefined` | Поле интерфейса `HeaderTableRootProps`. |
| canSorted | `boolean | undefined` | Поле интерфейса `HeaderTableRootProps`. |
| sort | `false | SortDirection` | Поле интерфейса `HeaderTableRootProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** PropsWithChildren, TableSortArrowDown, TableSortArrowUp

**Хуки:** React hooks из базового набора не обнаружены.

## TablePagination
**Файл:** `src/shared/lib/Table/TablePagination/TablePagination.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/lib/Table/TablePagination/TablePagination.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| total | `number` | Поле интерфейса `TablePaginationProps`. |
| pageSize | `number` | Поле интерфейса `TablePaginationProps`. |
| current | `number` | Поле интерфейса `TablePaginationProps`. |
| className | `string | undefined | undefined` | Поле интерфейса `TablePaginationProps`. |
| changePageIndex | `(updater: Updater<number>) => void` | Поле интерфейса `TablePaginationProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Pagination, TablePaginationProps

**Хуки:** React hooks из базового набора не обнаружены.

## TableRegister
**Файл:** `src/shared/lib/Table/TableRegister/TableRegister.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/lib/Table/TableRegister/TableRegister.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Fragment, PaginationState, SortingState, T, TableHeader, TablePagination

**Хуки:** React hooks из базового набора не обнаружены.

## BlockPage
**Файл:** `src/shared/ui/BlockPage/BlockPage.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/ui/BlockPage/BlockPage.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Spin

**Хуки:** React hooks из базового набора не обнаружены.

## Blockage
**Файл:** `src/shared/ui/Blockage/Blockage.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/ui/Blockage/Blockage.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** IconDesktop

**Хуки:** React hooks из базового набора не обнаружены.

## Chip
**Файл:** `src/shared/ui/Chip/Chip.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/ui/Chip/Chip.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| title | `ReactNode | string | undefined` | Поле интерфейса `TagProps`. |
| control | `ReactNode | null | undefined` | Поле интерфейса `TagProps`. |
| badge | `ReactNode | string | undefined` | Поле интерфейса `TagProps`. |
| className | `string | undefined` | Поле интерфейса `TagProps`. |
| classes | `ChipClassNames | undefined` | Поле интерфейса `TagProps`. |
| level | `number | undefined` | Поле интерфейса `TagProps`. |
| active | `boolean | undefined` | Поле интерфейса `TagProps`. |
| setActive | `() => void | undefined` | Поле интерфейса `TagProps`. |
| onClick | `() => void | undefined` | Поле интерфейса `TagProps`. |
| copy | `string | undefined` | Поле интерфейса `TagProps`. |
| tooltip | `string | undefined` | Поле интерфейса `TagProps`. |
| filled | `boolean | undefined` | Поле интерфейса `TagProps`. |
| exhibit | `boolean | undefined` | Поле интерфейса `TagProps`. |

**Состояние:** copied

**Эффекты:** let timeout: any; if (copied) { timeout = setTimeout(() => { setCopied(false); }, 1000); } return () => { clearTimeout(timeout); }; [deps: copied]

**Использует компоненты:** CopyToClipboard, TagProps, Tooltip

**Хуки:** useState, useEffect

## Dropzone
**Файл:** `src/shared/ui/Dropzone/Dropzone.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/ui/Dropzone/Dropzone.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| onDrop | `(files: File[]) => void | undefined` | Поле интерфейса `DropzoneProps`. |
| className | `string | undefined` | Поле интерфейса `DropzoneProps`. |
| disabled | `boolean | undefined` | Поле интерфейса `DropzoneProps`. |
| accept | `Record<string, string[]> | undefined` | Поле интерфейса `DropzoneProps`. |
| maxSize | `number; // bytes | undefined` | Поле интерфейса `DropzoneProps`. |
| file | `UploadFile | undefined` | Поле интерфейса `DropzoneProps`. |
| onDelete | `() => void | undefined` | Поле интерфейса `DropzoneProps`. |

**Состояние:** error

**Эффекты:** setError((!!fileRejections.length || isDragReject) && !isDragAccept); fileRejections.length = 0; [deps: fileRejections, isDragReject, isDragAccept]

**Использует компоненты:** AiOutlineClose, Button, DropzoneProps, GrDocumentDownload, GrDocumentUpload

**Хуки:** useState, useEffect, useCallback

## Loader
**Файл:** `src/shared/ui/Loader/Loader.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/ui/Loader/Loader.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| loading | `boolean` | Поле интерфейса `LoaderProps`. |
| loadingColor | `string | undefined` | Поле интерфейса `LoaderProps`. |
| backgroundColor | `string | undefined` | Поле интерфейса `LoaderProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Дочерние JSX-компоненты не обнаружены.

**Хуки:** React hooks из базового набора не обнаружены.

## Loading
**Файл:** `src/shared/ui/Loading/Loading.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/ui/Loading/Loading.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Spin

**Хуки:** React hooks из базового набора не обнаружены.

## PageTitle
**Файл:** `src/shared/ui/PageTitle/PageTitle.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/ui/PageTitle/PageTitle.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** ArrowLeft, Button, PageTitle, Typography

**Хуки:** React hooks из базового набора не обнаружены.

## PhoneInput
**Файл:** `src/shared/ui/PhoneInput/PhoneInput.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/ui/PhoneInput/PhoneInput.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| inputRef | `Record<string, any>` | Поле интерфейса `PhoneInputProps`. |
| readOnly | `boolean` | Поле интерфейса `PhoneInputProps`. |
| name | `string` | Поле интерфейса `PhoneInputProps`. |
| onBlur | `(event: FocusEvent<HTMLInputElement>) => void` | Поле интерфейса `PhoneInputProps`. |
| onChange | `(event: React.ChangeEvent<HTMLInputElement>) => void` | Поле интерфейса `PhoneInputProps`. |
| value | `string | undefined | null` | Поле интерфейса `PhoneInputProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** HTMLInputElement, InputPhone

**Хуки:** React hooks из базового набора не обнаружены.

## Status
**Файл:** `src/shared/ui/Status/Status.tsx`
**Назначение:** React-компонент, обнаруженный в `src/shared/ui/Status/Status.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| status | `TemplateStatus | TemplateCaseStatus | undefined` | Поле интерфейса `StatusProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** PropsWithChildren, StatusProps

**Хуки:** React hooks из базового набора не обнаружены.

## AsideMenu
**Файл:** `src/widgets/AsideMenu/AsideMenu.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/AsideMenu/AsideMenu.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| id | `number | string` | Поле интерфейса `AsideMenuProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AsideMenuProps, Button, RiListCheck3, RiSurveyLine

**Хуки:** useCallback

## AsideMenuDraft
**Файл:** `src/widgets/AsideMenuDraft/AsideMenuDraft.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/AsideMenuDraft/AsideMenuDraft.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| id | `number | string` | Поле интерфейса `AsideMenuProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AsideMenuProps, Button, RiListCheck3, RiSurveyLine

**Хуки:** useCallback

## useModal
**Файл:** `src/widgets/Editor/hooks/useModal.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/hooks/useModal.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** data, content, isOpen

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, DefaultFooterModal, Modal, ModalContext

**Хуки:** useState, useCallback

## BlankEditor
**Файл:** `src/widgets/Editor/lib/BlankEditor/BlankEditor.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/lib/BlankEditor/BlankEditor.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** editor, items

**Эффекты:** if (tags) { setItems(tags); } [deps: tags]; if (!!currentSection) { dispatch(templatesActions.setTemplateEditedSection(currentSection)); } [deps: currentSection, dispatch]

**Использует компоненты:** BlockPage, Button, Card, EditorBlankToolbar, EditorBlankWrapper, LexicalEditor, Props, Tag, TemplateEditorSortableList

**Хуки:** useState, useEffect, useCallback

## TemplateEditor
**Файл:** `src/widgets/Editor/lib/TemplateEditor/TemplateEditor.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/lib/TemplateEditor/TemplateEditor.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** editor, items

**Эффекты:** if (units) { setItems(units); } [deps: units]

**Использует компоненты:** BlockPage, Card, Collapsible, EditorFile, EditorFileUnit, EditorSectionUnit, EditorTitle, EditorToolbar, EditorUnitDivider, EditorWrapper, Empty, LexicalEditor, TemplateEditorSortableList, TemplateUnit

**Хуки:** useState, useEffect, useCallback

## TemplateEditorSortableList
**Файл:** `src/widgets/Editor/lib/TemplateEditor/ui/TemplateEditorSortableList/TemplateEditorSortableList.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/lib/TemplateEditor/ui/TemplateEditorSortableList/TemplateEditorSortableList.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** active

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Active, DndContext, Fragment, SortableContext, SortableOverlay, T

**Хуки:** useState

## SortableItem
**Файл:** `src/widgets/Editor/lib/TemplateEditor/ui/TemplateEditorSortableList/components/SortableItem/SortableItem.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/lib/TemplateEditor/ui/TemplateEditorSortableList/components/SortableItem/SortableItem.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, Context, Props, RiDraggable, SortableItemContext

**Хуки:** React hooks из базового набора не обнаружены.

## SortableOverlay
**Файл:** `src/widgets/Editor/lib/TemplateEditor/ui/TemplateEditorSortableList/components/SortableOverlay/SortableOverlay.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/lib/TemplateEditor/ui/TemplateEditorSortableList/components/SortableOverlay/SortableOverlay.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** DragOverlay, Props

**Хуки:** React hooks из базового набора не обнаружены.

## convertLinkElement
**Файл:** `src/widgets/Editor/nodes/custom/AnchorLinkNode/AnchorLinkNode.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/AnchorLinkNode/AnchorLinkNode.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** JSX, LinkComponent

**Хуки:** React hooks из базового набора не обнаружены.

## LinkComponent
**Файл:** `src/widgets/Editor/nodes/custom/AnchorLinkNode/ui/LinkComponent/LinkComponent.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/AnchorLinkNode/ui/LinkComponent/LinkComponent.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** linkValue, showEditor

**Эффекты:** if (!showEditor && linkValue !== link) { setLinkValue(link); } [deps: showEditor, link, linkValue]; if (showEditor) { return mergeRegister( editor.registerCommand( SELECTION_CHANGE_COMMAND, () => { const { activeElement } = document; const inputElem = inputRef [deps: editor, nodeKey, onHide, setShowEditor, showEditor]

**Использует компоненты:** AiOutlineLink, LinkEditor

**Хуки:** useState, useEffect, useCallback

## onChange
**Файл:** `src/widgets/Editor/nodes/custom/AnchorLinkNode/ui/LinkEditor/LinkEditor.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/AnchorLinkNode/ui/LinkEditor/LinkEditor.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| link | `string` | Поле интерфейса `BaseEquationEditorProps`. |
| setLink | `(text: string) => void` | Поле интерфейса `BaseEquationEditorProps`. |
| onDelete | `() => void` | Поле интерфейса `BaseEquationEditorProps`. |
| onSubmit | `() => void` | Поле интерфейса `BaseEquationEditorProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineCheck, AiOutlineDelete, Button, HTMLInputElement, Input

**Хуки:** React hooks из базового набора не обнаружены.

## convertAnchorElement
**Файл:** `src/widgets/Editor/nodes/custom/AnchorNode/AnchorNode.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/AnchorNode/AnchorNode.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AnchorComponent, JSX

**Хуки:** React hooks из базового набора не обнаружены.

## AnchorComponent
**Файл:** `src/widgets/Editor/nodes/custom/AnchorNode/ui/AnchorComponent/AnchorComponent.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/AnchorNode/ui/AnchorComponent/AnchorComponent.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** anchorValue, showEditor

**Эффекты:** if (!showEditor && anchorValue !== anchor) { setAnchorValue(anchor); } [deps: showEditor, anchor, anchorValue]; if (showEditor) { return mergeRegister( editor.registerCommand( SELECTION_CHANGE_COMMAND, () => { const { activeElement } = document; const inputElem = inputRef [deps: editor, nodeKey, onHide, setShowEditor, showEditor]

**Использует компоненты:** AiOutlinePushpin, AnchorEditor

**Хуки:** useState, useEffect, useCallback

## onChange
**Файл:** `src/widgets/Editor/nodes/custom/AnchorNode/ui/AnchorEditor/AnchorEditor.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/AnchorNode/ui/AnchorEditor/AnchorEditor.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| anchor | `string` | Поле интерфейса `BaseEquationEditorProps`. |
| setAnchor | `(text: string) => void` | Поле интерфейса `BaseEquationEditorProps`. |
| onDelete | `() => void` | Поле интерфейса `BaseEquationEditorProps`. |
| onSubmit | `() => void` | Поле интерфейса `BaseEquationEditorProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineCheck, AiOutlineDelete, Button, HTMLInputElement, Input

**Хуки:** React hooks из базового набора не обнаружены.

## ImageResizer
**Файл:** `src/widgets/Editor/nodes/custom/InlineImageNode/ui/ImageResizer.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/InlineImageNode/ui/ImageResizer.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** HTMLDivElement

**Хуки:** React hooks из базового набора не обнаружены.

## InlineImageComponent
**Файл:** `src/widgets/Editor/nodes/custom/InlineImageNode/ui/InlineImageComponent.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/InlineImageNode/ui/InlineImageComponent.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** selection, isResizing

**Эффекты:** let isMounted = true; const rootElement = editor.getRootElement(); const unregister = mergeRegister( editor.registerUpdateListener(({ editorState }) => { if (is [deps: clearSelection, editor, isSelected, nodeKey, onClick, onDelete, onRightClick, setSelected]

**Использует компоненты:** BaseSelection, Button, ImageResizer, LazyImage, LexicalEditor, MdOutlineModeEditOutline, MouseEvent, Suspense, UpdateInlineImageBody, UpdateInlineImageFooter

**Хуки:** useState, useEffect, useCallback

## convertInlineImageElement
**Файл:** `src/widgets/Editor/nodes/custom/InlineImageNode/ui/InlineImageNode.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/InlineImageNode/ui/InlineImageNode.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** InlineImageComponent, JSX, Suspense

**Хуки:** React hooks из базового набора не обнаружены.

## convertKeyWordNodeElement
**Файл:** `src/widgets/Editor/nodes/custom/KeyWordNode/KeyWordNode.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/KeyWordNode/KeyWordNode.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** JSX, KeyWordComponent

**Хуки:** React hooks из базового набора не обнаружены.

## onChange
**Файл:** `src/widgets/Editor/nodes/custom/KeyWordNode/ui/AnchorEditor/AnchorEditor.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/KeyWordNode/ui/AnchorEditor/AnchorEditor.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| anchor | `string` | Поле интерфейса `BaseEquationEditorProps`. |
| setAnchor | `(text: string) => void` | Поле интерфейса `BaseEquationEditorProps`. |
| onDelete | `() => void` | Поле интерфейса `BaseEquationEditorProps`. |
| onSubmit | `() => void` | Поле интерфейса `BaseEquationEditorProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineCheck, AiOutlineDelete, Button, HTMLInputElement, Input

**Хуки:** React hooks из базового набора не обнаружены.

## KeyWordComponent
**Файл:** `src/widgets/Editor/nodes/custom/KeyWordNode/ui/KeyWordComponent/KeyWordComponent.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/KeyWordNode/ui/KeyWordComponent/KeyWordComponent.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Дочерние JSX-компоненты не обнаружены.

**Хуки:** useCallback

## convertLinkElement
**Файл:** `src/widgets/Editor/nodes/custom/LinkNode/LinkNode.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/LinkNode/LinkNode.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** JSX, LinkComponent

**Хуки:** React hooks из базового набора не обнаружены.

## LinkComponent
**Файл:** `src/widgets/Editor/nodes/custom/LinkNode/ui/LinkComponent/LinkComponent.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/LinkNode/ui/LinkComponent/LinkComponent.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** linkValue, showEditor

**Эффекты:** if (!showEditor && linkValue !== link) { setLinkValue(link); } [deps: showEditor, link, linkValue]; if (showEditor) { return mergeRegister( editor.registerCommand( SELECTION_CHANGE_COMMAND, () => { const { activeElement } = document; const inputElem = inputRef [deps: editor, nodeKey, onHide, setShowEditor, showEditor]

**Использует компоненты:** AiOutlineLink, LinkEditor

**Хуки:** useState, useEffect, useCallback

## onChange
**Файл:** `src/widgets/Editor/nodes/custom/LinkNode/ui/LinkEditor/LinkEditor.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/LinkNode/ui/LinkEditor/LinkEditor.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| link | `string` | Поле интерфейса `BaseEquationEditorProps`. |
| setLink | `(text: string) => void` | Поле интерфейса `BaseEquationEditorProps`. |
| onDelete | `() => void` | Поле интерфейса `BaseEquationEditorProps`. |
| onSubmit | `() => void` | Поле интерфейса `BaseEquationEditorProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineCheck, AiOutlineDelete, Button, HTMLInputElement, Input

**Хуки:** React hooks из базового набора не обнаружены.

## YouTubeComponent
**Файл:** `src/widgets/Editor/nodes/custom/YoutubeNode/YouTubeNode.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/nodes/custom/YoutubeNode/YouTubeNode.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** BlockWithAlignableContents, YouTubeComponent

**Хуки:** React hooks из базового набора не обнаружены.

## AnchorLinkPlugin
**Файл:** `src/widgets/Editor/plugins/custom/AnchorLinkPlugin/AnchorLinkPlugin.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/AnchorLinkPlugin/AnchorLinkPlugin.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** if (!editor.hasNodes([AnchorLinkNode])) { throw new Error('LinkNode not registered on editor'); } return editor.registerCommand<CommandPayload | null>( INSERT_L [deps: editor]

**Использует компоненты:** CommandPayload

**Хуки:** useEffect

## AnchorPlugin
**Файл:** `src/widgets/Editor/plugins/custom/AnchorPlugin/AnchorPlugin.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/AnchorPlugin/AnchorPlugin.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** if (!editor.hasNodes([AnchorNode])) { throw new Error('AnchorNode not registered on editor'); } return editor.registerCommand<CommandPayload | null>( INSERT_ANC [deps: editor]

**Использует компоненты:** CommandPayload

**Хуки:** useEffect

## CustomOnChangePlugin
**Файл:** `src/widgets/Editor/plugins/custom/CustomOnChangePlugin/CustomOnChangePlugin.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/CustomOnChangePlugin/CustomOnChangePlugin.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| onChange | `(state: SerializedEditorState<SerializedLexicalNode>) => void` | Поле интерфейса `CustomOnChangePluginProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** SerializedLexicalNode

**Хуки:** useEffect

## FilePlugin
**Файл:** `src/widgets/Editor/plugins/custom/FilePlugin/FilePlugin.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/FilePlugin/FilePlugin.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| onCancel | `() => void` | Поле интерфейса `FilePluginProps`. |
| unit | `TemplateUnit | undefined` | Поле интерфейса `FilePluginProps`. |

**Состояние:** value

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, FilePluginProps, HTMLInputElement, Input, Modal

**Хуки:** useState, useCallback

## FloatingLinkEditorPlugin
**Файл:** `src/widgets/Editor/plugins/custom/FloatingLinkEditorPlugin/index.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/FloatingLinkEditorPlugin/index.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** linkUrl, editedLinkUrl, lastSelection, activeEditor, isLink

**Эффекты:** const scrollerElem = anchorElem.parentElement; const update = () => { editor.getEditorState().read(() => { updateLinkEditor(); }); }; window.addEventListener('r [deps: anchorElem.parentElement, editor, updateLinkEditor]; return mergeRegister( editor.registerUpdateListener(({ editorState }) => { editorState.read(() => { updateLinkEditor(); }); }), editor.registerCommand( SELECTIO [deps: editor, updateLinkEditor, setIsLink, isLink]; editor.getEditorState().read(() => { updateLinkEditor(); }); [deps: editor, updateLinkEditor]; if (isLinkEditMode && inputRef.current) { inputRef.current.focus(); } [deps: isLinkEditMode, isLink]; function updateToolbar() { const selection = $getSelection(); if ($isRangeSelection(selection)) { const focusNode = getSelectedNode(selection); const focusLinkN [deps: editor]

**Использует компоненты:** AiOutlineCheck, AiOutlineClose, AiOutlineDelete, AiOutlineEdit, BaseSelection, Button, FloatingLinkEditor, HTMLDivElement, HTMLInputElement, Input

**Хуки:** useState, useEffect, useCallback

## InlineImagePlugin
**Файл:** `src/widgets/Editor/plugins/custom/InlineImagePlugin/ui/InlineImagePlugin.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/InlineImagePlugin/ui/InlineImagePlugin.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** if (!editor.hasNodes([InlineImageNode])) { throw new Error('ImagesPlugin: ImageNode not registered on editor'); } return mergeRegister( editor.registerCommand<I [deps: editor]

**Использует компоненты:** DragEvent, InsertInlineImagePayload

**Хуки:** useEffect

## InsertInlineImageBody
**Файл:** `src/widgets/Editor/plugins/custom/InlineImagePlugin/ui/InsertInlineImage.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/InlineImagePlugin/ui/InsertInlineImage.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** src, position

**Эффекты:** changeData({ src, position, disabled: isDisabled, }); [deps: changeData, isDisabled, position, src]

**Использует компоненты:** Button, HTMLInputElement, IoCloudUploadOutline, ModalContextType, Position, Select, Space, Upload

**Хуки:** useState, useEffect, useCallback

## UpdateInlineImageBody
**Файл:** `src/widgets/Editor/plugins/custom/InlineImagePlugin/ui/UpdateInlineImage.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/InlineImagePlugin/ui/UpdateInlineImage.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** position

**Эффекты:** changeData({ position, disabled: false, }); [deps: changeData, position]

**Использует компоненты:** Button, ModalContextType, Position, Select, Space

**Хуки:** useState, useEffect, useCallback

## KeyWordPlugin
**Файл:** `src/widgets/Editor/plugins/custom/KeyWordPlugin/KeyWordPlugin.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/KeyWordPlugin/KeyWordPlugin.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** if (!editor.hasNodes([KeyWordNode])) { throw new Error('KeyWordNode not registered on editor'); } return editor.registerCommand<CommandPayload | null>( INSERT_K [deps: editor]

**Использует компоненты:** CommandPayload

**Хуки:** useEffect

## TableActionMenuPlugin
**Файл:** `src/widgets/Editor/plugins/custom/TableActionMenuPlugin/ui/TableActionMenuPlugin.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/TableActionMenuPlugin/ui/TableActionMenuPlugin.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** tableCellNode, selectionCounts, canMergeCells, canUnmergeCell, isMenuOpen, tableCellNode

**Эффекты:** return editor.registerMutationListener(TableCellNode, (nodeMutations) => { const nodeUpdated = nodeMutations.get(tableCellNode.getKey()) === 'updated'; if (node [deps: editor, tableCellNode]; editor.getEditorState().read(() => { const selection = $getSelection(); // Merge cells if ($isTableSelection(selection)) { const currentSelectionCounts = comput [deps: editor]; const menuButtonElement = contextRef.current; const dropDownElement = dropDownRef.current; const rootElement = editor.getRootElement(); if (menuButtonElement != [deps: contextRef, dropDownRef, editor]; function handleClickOutside(event: MouseEvent) { if ( dropDownRef.current != null && contextRef.current != null && !dropDownRef.current.contains(event.target as [deps: setIsMenuOpen, contextRef]; return editor.registerUpdateListener(() => { editor.getEditorState().read(() => { moveMenu(); }); }); }); useEffect(() => { const menuButtonDOM = menuButtonRef. [deps: menuButtonRef, tableCellNode, editor, anchorElem]; if (prevTableCellDOM.current !== tableCellNode) { setIsMenuOpen(false); } prevTableCellDOM.current = tableCellNode; [deps: prevTableCellDOM, tableCellNode]

**Использует компоненты:** Button, CiCircleChevDown, HTMLDivElement, TableActionMenu, TableCellActionMenuContainer, TableCellNode, TableRowNode

**Хуки:** useState, useEffect, useCallback

## TableCellResizerPlugin
**Файл:** `src/widgets/Editor/plugins/custom/TableCellResizer/ui/TableCellResizer.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/TableCellResizer/ui/TableCellResizer.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** mouseCurrentPos, activeCell, isSelectingGrid, draggingDirection

**Эффекты:** return editor.registerCommand( SELECTION_CHANGE_COMMAND, // eslint-disable-next-line @typescript-eslint/no-unused-vars (_payload) => { const selection = $getSel; const onMouseMove = (event: MouseEvent) => { setTimeout(() => { const { target } = event; if (draggingDirection) { updateMouseCurrentPos({ x: event.clientX, y: [deps: activeCell, draggingDirection, editor, resetState]

**Использует компоненты:** ClientRect, HTMLDivElement, HTMLElement, MouseDraggingDirection, MousePosition, TableCellNode, TableCellResizer, TableDOMCell

**Хуки:** useState, useEffect, useCallback

## InsertTableBody
**Файл:** `src/widgets/Editor/plugins/custom/TablePlugin/ui/InsertTable.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/TablePlugin/ui/InsertTable.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** rows, columns

**Эффекты:** changeData({ rows, columns, disabled: !rows || !columns, }); [deps: changeData, columns, rows]

**Использует компоненты:** Button, InputNumber, ModalContextType, Space

**Хуки:** useState, useEffect, useCallback

## TableContext
**Файл:** `src/widgets/Editor/plugins/custom/TablePlugin/ui/TablePlugin.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/TablePlugin/ui/TablePlugin.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** contextValue

**Эффекты:** if (!editor.hasNodes([TableNode])) { invariant(false, 'TablePlugin: TableNode is not registered on editor'); } cellContext.set(cellEditorConfig, children); retu [deps: cellContext, cellEditorConfig, children, editor]

**Использует компоненты:** CellContext, CellContextShape, InsertTableCommandPayload, JSX

**Хуки:** useState, useEffect

## TreeViewPlugin
**Файл:** `src/widgets/Editor/plugins/custom/TreeViewPlugin/TreeViewPlugin.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/plugins/custom/TreeViewPlugin/TreeViewPlugin.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** TreeView

**Хуки:** React hooks из базового набора не обнаружены.

## EditorBlankToolbar
**Файл:** `src/widgets/Editor/ui/EditorBlankToolbar/EditorBlankToolbar.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorBlankToolbar/EditorBlankToolbar.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| editor | `any` | Поле интерфейса `EditorToolbarProps`. |

**Состояние:** isBold, isItalic, isUnderline, elementFormat, isLink, isYT

**Эффекты:** if (editor) { return mergeRegister( editor.registerUpdateListener(({ editorState }: { editorState: EditorState }) => { editorState.read(() => { updateToolbar(); [deps: editor, updateToolbar]

**Использует компоненты:** AiOutlineBold, AiOutlineItalic, AiOutlineLink, AiOutlineUnderline, Button, Card, CiImageOn, CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight, CiViewTable, CiYoutube, EditorLinks, EditorToolbarProps, EditorYouTube, InsertInlineImageBody, InsertInlineImageFooter, InsertTableBody, InsertTableFooter

**Хуки:** useState, useEffect, useCallback

## EditorBlankWrapper
**Файл:** `src/widgets/Editor/ui/EditorBlankWrapper/EditorBlankWrapper.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorBlankWrapper/EditorBlankWrapper.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| section | `TemplateSection` | Поле интерфейса `EditorWrapperProps`. |
| tag | `Tag` | Поле интерфейса `EditorWrapperProps`. |
| setEditor | `(editor: LexicalEditor) => void` | Поле интерфейса `EditorWrapperProps`. |
| isClient | `boolean | undefined` | Поле интерфейса `EditorWrapperProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AnchorLinkPlugin, AnchorPlugin, CustomOnChangePlugin, EditorTag, EditorWrapperProps, HistoryPlugin, InlineImagePlugin, LexicalComposer, LinkPlugin, PropsWithChildren, TableCellResizerPlugin, TableContext, TablePlugin, YouTubePlugin

**Хуки:** useCallback

## EditorFile
**Файл:** `src/widgets/Editor/ui/EditorFile/EditorFile.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorFile/EditorFile.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AnchorLinkPlugin, AnchorPlugin, Card, CustomOnChangePlugin, EditorFileDescription, EditorFilePdfTitle, HashtagPlugin, HistoryPlugin, InlineImagePlugin, KeyWordPlugin, LexicalComposer, LinkPlugin, Props

**Хуки:** useCallback

## EditorFileDescription
**Файл:** `src/widgets/Editor/ui/EditorFile/ui/EditorFileDescription/EditorFileDescription.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorFile/ui/EditorFileDescription/EditorFileDescription.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** ContentEditable, Props, RichTextPlugin

**Хуки:** useEffect

## EditorFilePdfTitle
**Файл:** `src/widgets/Editor/ui/EditorFile/ui/EditorFilePdfTitle/EditorFilePdfTitle.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorFile/ui/EditorFilePdfTitle/EditorFilePdfTitle.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** HTMLInputElement, Input

**Хуки:** useCallback

## onModal
**Файл:** `src/widgets/Editor/ui/EditorFileUnit/EditorFileUnit.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorFileUnit/EditorFileUnit.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| unit | `TemplateUnit` | Поле интерфейса `FileUnitProps`. |

**Состояние:** open

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineClose, AiOutlineFileAdd, Button, Card, DeleteTemplateSectionUnit, Dropdown, EditTemplateSectionFile, FileUnitProps, HiDotsVertical, Modal, PropsWithChildren, SelectTemplateSection

**Хуки:** useState, useCallback

## EditorKeyWords
**Файл:** `src/widgets/Editor/ui/EditorKeyWords/EditorKeyWords.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorKeyWords/EditorKeyWords.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Chip, List, Modal, Props

**Хуки:** useCallback

## EditorLinks
**Файл:** `src/widgets/Editor/ui/EditorLinks/EditorLinks.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorLinks/EditorLinks.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** key

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineLink, AiOutlinePushpin, EditorLinksAnchor, EditorLinksLink, Menu, MenuProps, Modal, Props

**Хуки:** useState

## EditorLinksAnchor
**Файл:** `src/widgets/Editor/ui/EditorLinks/ui/EditorLinksAnchor/EditorLinksAnchor.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorLinks/ui/EditorLinksAnchor/EditorLinksAnchor.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** text

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlinePushpin, Button, HTMLInputElement, Input, Props

**Хуки:** useState, useCallback

## EditorLinksLink
**Файл:** `src/widgets/Editor/ui/EditorLinks/ui/EditorLinksLink/EditorLinksLink.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorLinks/ui/EditorLinksLink/EditorLinksLink.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Props, SelectTemplateSection

**Хуки:** useCallback

## EditorSectionUnit
**Файл:** `src/widgets/Editor/ui/EditorSectionUnit/EditorSectionUnit.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorSectionUnit/EditorSectionUnit.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| unit | `TemplateUnit` | Поле интерфейса `FileUnitProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineFolderOpen, Card, FileUnitProps, PropsWithChildren

**Хуки:** React hooks из базового набора не обнаружены.

## EditorTag
**Файл:** `src/widgets/Editor/ui/EditorTag/EditorTag.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorTag/EditorTag.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| setEditor | `(editor: LexicalEditor) => void` | Поле интерфейса `TagProps`. |
| tag | `Tag` | Поле интерфейса `TagProps`. |
| section | `TemplateSection` | Поле интерфейса `TagProps`. |
| isClient | `boolean | undefined` | Поле интерфейса `TagProps`. |

**Состояние:** option

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Card, ContentEditable, EditorTagFile, EditorTagInput, Modal, PropsWithChildren, RichTextPlugin, SelectTemplateSection, TagOption, TagProps

**Хуки:** useState, useEffect, useCallback

## EditorTagFile
**Файл:** `src/widgets/Editor/ui/EditorTag/ui/EditorTagFile/EditorTagFile.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorTag/ui/EditorTagFile/EditorTagFile.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** open

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineClose, Button, Dropzone, Modal, Props, SelectTemplateSection

**Хуки:** useState, useCallback

## EditorTagInput
**Файл:** `src/widgets/Editor/ui/EditorTag/ui/EditorTagInput/EditorTagInput.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorTag/ui/EditorTagInput/EditorTagInput.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| tag | `Tag` | Поле интерфейса `BlankTagInputProps`. |
| onChange | `(value: number | string | number[]) => void` | Поле интерфейса `BlankTagInputProps`. |
| setOption | `(option: TagOption) => void | undefined` | Поле интерфейса `BlankTagInputProps`. |
| deleteSection | `(option: TagOption) => void` | Поле интерфейса `BlankTagInputProps`. |
| isClient | `boolean | undefined` | Поле интерфейса `BlankTagInputProps`. |

**Состояние:** value

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** BlankTagInputProps, Button, Checkbox, DatePicker, HTMLInputElement, HTMLTextAreaElement, Input, Radio, TextArea

**Хуки:** useState

## EditorTagTitle
**Файл:** `src/widgets/Editor/ui/EditorTag/ui/EditorTagTitle/EditorTagTitle.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorTag/ui/EditorTagTitle/EditorTagTitle.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| tag | `Tag` | Поле интерфейса `BlankTagInputProps`. |
| onChange | `(value: number | string) => void` | Поле интерфейса `BlankTagInputProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** BlankTagInputProps, HTMLInputElement, Input

**Хуки:** React hooks из базового набора не обнаружены.

## EditorTitle
**Файл:** `src/widgets/Editor/ui/EditorTitle/EditorTitle.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorTitle/EditorTitle.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| section | `TemplateSection` | Поле интерфейса `TitleProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** HTMLInputElement, Input, TitleProps

**Хуки:** useCallback

## EditorToolbar
**Файл:** `src/widgets/Editor/ui/EditorToolbar/EditorToolbar.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorToolbar/EditorToolbar.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| editor | `any` | Поле интерфейса `EditorToolbarProps`. |

**Состояние:** isBold, isItalic, isUnderline, elementFormat, isLink, isKeyword

**Эффекты:** if (editor) { return mergeRegister( editor.registerUpdateListener(({ editorState }: { editorState: EditorState }) => { editorState.read(() => { updateToolbar(); [deps: editor, updateToolbar]

**Использует компоненты:** Button, EditorKeyWords, EditorLinks, EditorToolbarProps, InsertInlineImageBody, InsertInlineImageFooter, InsertTableBody, InsertTableFooter, LuBraces, TextAlignCenter, TextAlignJustify, TextAlignLeft, TextAlignRight, TextStyleBold, TextStyleItalic, TextStyleUnderline, ToolImage, ToolLink, ToolTable

**Хуки:** useState, useEffect, useCallback

## EditorUnit
**Файл:** `src/widgets/Editor/ui/EditorUnit/EditorUnit.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorUnit/EditorUnit.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| setEditor | `(editor: LexicalEditor) => void` | Поле интерфейса `EditorUnitProps`. |
| setIsLinkEditMode | `(value: boolean) => void` | Поле интерфейса `EditorUnitProps`. |
| unit | `TemplateUnit` | Поле интерфейса `EditorUnitProps`. |
| onRef | `any | undefined` | Поле интерфейса `EditorUnitProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineRight, Button, Card, ContentEditable, EditorUnitProps, FaRegTrashAlt, LexicalClickableLinkPlugin, Popconfirm, PropsWithChildren, RichTextPlugin, Typography

**Хуки:** useEffect, useCallback

## EditorUnitDivider
**Файл:** `src/widgets/Editor/ui/EditorUnitDivider/EditorUnitDivider.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorUnitDivider/EditorUnitDivider.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| unit | `TemplateUnit | undefined` | Поле интерфейса `UnitDividerProps`. |

**Состояние:** show, isFile

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AiOutlineFileAdd, Button, FilePlugin, GoPlus, UnitDividerProps

**Хуки:** useState, useCallback

## onRef
**Файл:** `src/widgets/Editor/ui/EditorWrapper/EditorWrapper.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorWrapper/EditorWrapper.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| unit | `TemplateUnit` | Поле интерфейса `EditorWrapperProps`. |
| setEditor | `(editor: LexicalEditor) => void` | Поле интерфейса `EditorWrapperProps`. |

**Состояние:** isLinkEditMode, floatingAnchorElem

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AnchorLinkPlugin, AnchorPlugin, CustomOnChangePlugin, EditorUnit, EditorWrapperProps, FloatingLinkEditorPlugin, HTMLDivElement, HashtagPlugin, HistoryPlugin, InlineImagePlugin, KeyWordPlugin, LexicalComposer, LinkPlugin, PropsWithChildren, TableActionMenuPlugin, TableCellResizerPlugin, TableContext, TablePlugin

**Хуки:** useState, useCallback

## EditorYouTube
**Файл:** `src/widgets/Editor/ui/EditorYouTube/EditorYouTube.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Editor/ui/EditorYouTube/EditorYouTube.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** text

**Эффекты:** if (ref.current) { ref.current.focus(); }

**Использует компоненты:** Button, CiYoutube, HTMLInputElement, Input, InputRef, Modal, Props

**Хуки:** useState, useEffect, useCallback

## Error
**Файл:** `src/widgets/Error/Error.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Error/Error.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Дочерние JSX-компоненты не обнаружены.

**Хуки:** React hooks из базового набора не обнаружены.

## KeyWords
**Файл:** `src/widgets/KeyWords/KeyWords.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/KeyWords/KeyWords.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** dispatch(fetchTemplateKeyWords());

**Использует компоненты:** Card, KeyWordsList, Typography

**Хуки:** useEffect

## KeyWordsList
**Файл:** `src/widgets/KeyWords/ui/KeyWordsList/KeyWordsList.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/KeyWords/ui/KeyWordsList/KeyWordsList.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** query

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AddTemplateKeyWord, HTMLInputElement, Input, KeyWordItem

**Хуки:** useState, useCallback

## KeyWordItem
**Файл:** `src/widgets/KeyWords/ui/KeyWordsList/ui/KeyWordItem/KeyWordItem.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/KeyWords/ui/KeyWordsList/ui/KeyWordItem/KeyWordItem.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Chip, DeleteTemplateKeyWord, Dropdown, HiDotsVertical, Props

**Хуки:** React hooks из базового набора не обнаружены.

## AuthLayout
**Файл:** `src/widgets/Layouts/AuthLayout/AuthLayout.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Layouts/AuthLayout/AuthLayout.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Helmet, Outlet, PropsWithChildren, Suspense

**Хуки:** React hooks из базового набора не обнаружены.

## BaseLayout
**Файл:** `src/widgets/Layouts/BaseLayout/BaseLayout.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Layouts/BaseLayout/BaseLayout.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** isBlockage

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Blockage, HeaderContextProps, HeaderProfile, Helmet, Link, Outlet, PropsWithChildren, Suspense

**Хуки:** useState

## BaseNav
**Файл:** `src/widgets/Layouts/BaseNav/BaseNav.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Layouts/BaseNav/BaseNav.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Card, Menu, PropsWithChildren

**Хуки:** React hooks из базового набора не обнаружены.

## Menu
**Файл:** `src/widgets/Layouts/BaseNav/ui/Menu/Menu.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Layouts/BaseNav/ui/Menu/Menu.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| className | `string | undefined | undefined` | Поле интерфейса `MenuProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Chip, MenuCases, MenuProps, MenuTemplates, MenuUsers, NavLink

**Хуки:** React hooks из базового набора не обнаружены.

## WithManagers
**Файл:** `src/widgets/Layouts/ForClient/WithManagers.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Layouts/ForClient/WithManagers.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** dispatch(fetchManagers({})); [deps: dispatch]

**Использует компоненты:** BlockManagers, PropsWithChildren

**Хуки:** useEffect

## BlockManagers
**Файл:** `src/widgets/Layouts/ForClient/ui/BlockManagers/BlockManagers.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Layouts/ForClient/ui/BlockManagers/BlockManagers.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** ManagerCard

**Хуки:** React hooks из базового набора не обнаружены.

## ManagerCard
**Файл:** `src/widgets/Layouts/ForClient/ui/ManagerCard/ManagerCard.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Layouts/ForClient/ui/ManagerCard/ManagerCard.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| user | `User` | Поле интерфейса `ManagerCardProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Avatar, Link, ManagerCardProps

**Хуки:** React hooks из базового набора не обнаружены.

## tab-config
**Файл:** `src/widgets/Profile/config/tab-config.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Profile/config/tab-config.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Дочерние JSX-компоненты не обнаружены.

**Хуки:** React hooks из базового набора не обнаружены.

## index
**Файл:** `src/widgets/Profile/index.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Profile/index.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Дочерние JSX-компоненты не обнаружены.

**Хуки:** React hooks из базового набора не обнаружены.

## EditInfo
**Файл:** `src/widgets/Profile/ui/EditInfo/EditInfo.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Profile/ui/EditInfo/EditInfo.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| className | `string | undefined` | Поле интерфейса `EditInfoProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, Controller, IMaskInput, Input, PhoneInput, Profile

**Хуки:** React hooks из базового набора не обнаружены.

## EditPassword
**Файл:** `src/widgets/Profile/ui/EditPassword/EditPassword.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Profile/ui/EditPassword/EditPassword.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| className | `string | undefined` | Поле интерфейса `EditPasswordProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Button, Controller, FormData, Input

**Хуки:** React hooks из базового набора не обнаружены.

## HeaderProfile
**Файл:** `src/widgets/Profile/ui/HeaderProfile/HeaderProfile.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Profile/ui/HeaderProfile/HeaderProfile.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** isShowPopup

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Avatar, ProfileModal

**Хуки:** useState

## ProfileEdit
**Файл:** `src/widgets/Profile/ui/ProfileEdit/ProfileEdit.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Profile/ui/ProfileEdit/ProfileEdit.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** currentTab

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** EditInfo, EditPassword, ProfilePhoto, Segmented

**Хуки:** useState

## ProfileModal
**Файл:** `src/widgets/Profile/ui/ProfileModal/ProfileModal.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Profile/ui/ProfileModal/ProfileModal.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| onClose | `() => void` | Поле интерфейса `ProfileModalProps`. |
| isOpen | `boolean` | Поле интерфейса `ProfileModalProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AntDCloseIcon, Button, Modal, ProfileEdit

**Хуки:** React hooks из базового набора не обнаружены.

## ProfilePhoto
**Файл:** `src/widgets/Profile/ui/ProfilePhoto/ProfilePhoto.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Profile/ui/ProfilePhoto/ProfilePhoto.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** loaded, imageId, imageUrl

**Эффекты:** if (loaded && imageId) { dispatch( updateProfilePhoto({ id: imageId, }), ); } [deps: dispatch, imageId, imageUrl, loaded]

**Использует компоненты:** Avatar, Upload, UploadFile

**Хуки:** useState, useEffect

## Structure
**Файл:** `src/widgets/Structure/Structure.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Structure/Structure.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AddTemplateSection, StructureSectionsCase, StructureSectionsDnD, Typography

**Хуки:** React hooks из базового набора не обнаружены.

## StructureSections
**Файл:** `src/widgets/Structure/ui/StructureSections/StructureSections.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Structure/ui/StructureSections/StructureSections.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** query

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** HTMLInputElement, Input, Skeleton, StructureSection

**Хуки:** useState, useCallback

## StructureSection
**Файл:** `src/widgets/Structure/ui/StructureSections/ui/StructureSection/StructureSection.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Structure/ui/StructureSections/ui/StructureSection/StructureSection.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** open

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AddTemplateSubSection, Chip, DeleteTemplateSection, Dropdown, HTMLDivElement, HiDotsVertical, Modal, StructureSectionProps

**Хуки:** useState, useCallback

## StructureSectionsCase
**Файл:** `src/widgets/Structure/ui/StructureSectionsCase/StructureSectionsCase.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Structure/ui/StructureSectionsCase/StructureSectionsCase.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** SortableTree, TemplateSection

**Хуки:** React hooks из базового набора не обнаружены.

## StructureSection
**Файл:** `src/widgets/Structure/ui/StructureSectionsCase/ui/StructureSection/StructureSection.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Structure/ui/StructureSectionsCase/ui/StructureSection/StructureSection.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AddTemplateSubSection, BsCopy, Chip, DeleteTemplateSection, Dropdown, HTMLDivElement, HiDotsVertical, SimpleTreeItemWrapper, TemplateSection

**Хуки:** useCallback

## StructureSectionsDnD
**Файл:** `src/widgets/Structure/ui/StructureSectionsDnD/StructureSectionsDnD.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Structure/ui/StructureSectionsDnD/StructureSectionsDnD.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** query, treeData

**Эффекты:** setTreeData(sections as TreeItems<TemplateSection>); // setTreeData( // sections?.map((section) => // selectSectionExhibits(section), // ) as TreeItems<Template [deps: sections, currentSection]

**Использует компоненты:** HTMLInputElement, Input, SortableTree, TemplateSection, TreeItems

**Хуки:** useState, useEffect, useCallback

## StructureSection
**Файл:** `src/widgets/Structure/ui/StructureSectionsDnD/ui/StructureSection/StructureSection.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Structure/ui/StructureSectionsDnD/ui/StructureSection/StructureSection.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AddTemplateSubSection, AiOutlineFile, Chip, CopyTemplateSection, DeleteTemplateSection, Dropdown, EditTemplateSection, HTMLDivElement, HiDotsVertical, LinkTemplateSection, ShowTemplateKeyWordParentSection, SimpleTreeItemWrapper, TemplateSection

**Хуки:** useCallback

## Tags
**Файл:** `src/widgets/Tags/Tags.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Tags/Tags.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| title | `string` | Поле интерфейса `TagsProps`. |
| scope | `TagScope` | Поле интерфейса `TagsProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Card, TagsList, TagsProps, Typography

**Хуки:** React hooks из базового набора не обнаружены.

## TagsList
**Файл:** `src/widgets/Tags/ui/TagsList/TagsList.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Tags/ui/TagsList/TagsList.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| scope | `TagScope` | Поле интерфейса `TagsListProps`. |

**Состояние:** query

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AddTag, HTMLInputElement, Input, Loading, TagListItem, TagsListProps

**Хуки:** useState, useCallback

## TagListItem
**Файл:** `src/widgets/Tags/ui/TagsList/ui/TagListItem/TagListItem.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Tags/ui/TagsList/ui/TagListItem/TagListItem.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| tag | `Tag` | Поле интерфейса `TagListItemProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** Chip, DeleteTag, Dropdown, EditTag, HiDotsVertical, TagListItemProps

**Хуки:** React hooks из базового набора не обнаружены.

## TableProfileCases
**Файл:** `src/widgets/Templates/TableProfileCases/TableProfileCases.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Templates/TableProfileCases/TableProfileCases.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| search | `string` | Поле интерфейса `TableProfileCasesProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** TableProfileCasesProps, TableRegister

**Хуки:** React hooks из базового набора не обнаружены.

## TableTemplateCases
**Файл:** `src/widgets/Templates/TableTemplateCases/TableTemplateCases.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Templates/TableTemplateCases/TableTemplateCases.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** TableRegister

**Хуки:** React hooks из базового набора не обнаружены.

## TableTemplates
**Файл:** `src/widgets/Templates/TableTemplates/TableTemplates.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Templates/TableTemplates/TableTemplates.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| - | - | Явные пропсы не обнаружены |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AntDCloseIcon, EditTemplate, Modal, TableRegister

**Хуки:** React hooks из базового набора не обнаружены.

## TableUsers
**Файл:** `src/widgets/Users/TableUsers/TableUsers.tsx`
**Назначение:** React-компонент, обнаруженный в `src/widgets/Users/TableUsers/TableUsers.tsx`.

**Пропсы:**

| Prop | Type | Description |
| --- | --- | --- |
| setSelectedUser | `(user: User | null) => void` | Поле интерфейса `TableUsersProps`. |

**Состояние:** Локальное состояние через useState не обнаружено.

**Эффекты:** useEffect не обнаружен.

**Использует компоненты:** AntDCloseIcon, EditUser, Modal, TableRegister, TableUsersProps

**Хуки:** React hooks из базового набора не обнаружены.
