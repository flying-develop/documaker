import { Provider as StoreProvider } from 'react-redux';
import { store } from '&/app/providers/Store';
import ReactDOM from 'react-dom/client';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from '&/app/App';
import { ConfigProvider } from 'antd';
import AuthProvider from './app/providers/auth/ui/AuthProvider';
import HeaderProvider from './app/providers/Header/HeaderProvider';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <AuthProvider>
                <HeaderProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#FF6C50',
                            },
                        }}
                    >
                        <App />
                    </ConfigProvider>
                </HeaderProvider>
            </AuthProvider>
        </PersistGate>
    </StoreProvider>,
);
