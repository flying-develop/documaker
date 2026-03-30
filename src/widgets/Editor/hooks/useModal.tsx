import { Button, Modal } from 'antd';
import { useMemo, useState, useCallback, FC } from 'react';
import { ModalContext } from '../context/ModalContext';

// eslint-disable-next-line react-refresh/only-export-components
const DefaultFooterModal: FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <>
            <Button
                type="default"
                onClick={() => {
                    onClose();
                }}
            >
                Cancel
            </Button>
            <Button
                type="primary"
                onClick={() => {
                    onClose();
                }}
            >
                OK
            </Button>
        </>
    );
};

const useModal = (): [
    JSX.Element | null,
    (
        title: string,
        isOpen: boolean,
        getBody: () => JSX.Element,
        getFooter: (onClose: () => void) => JSX.Element,
    ) => void,
] => {
    const [data, setData] = useState({});

    const changeData = useCallback((newData: any) => {
        setData((prevState) => ({ ...prevState, ...newData }));
    }, []);

    const [content, setContent] = useState<null | {
        title: string;
        body: JSX.Element;
        footer: JSX.Element;
    }>(null);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const modal = useMemo(() => {
        if (content === null) {
            return null;
        }

        const { title, body } = content;

        const footer =
            !!content.footer || content.footer === null ? (
                content.footer
            ) : (
                <DefaultFooterModal onClose={onClose} />
            );

        return (
            <ModalContext.Provider
                value={{
                    data,
                    changeData,
                }}
            >
                <Modal
                    title={title}
                    open={isOpen}
                    destroyOnClose
                    footer={footer}
                    onCancel={onClose}
                >
                    {body}
                </Modal>
            </ModalContext.Provider>
        );
    }, [content, isOpen, onClose, data, changeData]);

    const createModal = useCallback(
        (
            title: string,
            isOpen: boolean,
            getBody: () => JSX.Element,
            getFooter: (onClose: () => void) => JSX.Element,
        ) => {
            setContent({
                title,
                body: getBody(),
                footer: getFooter(onClose),
            });
            setIsOpen(isOpen);
        },
        [onClose],
    );

    return [modal, createModal];
};

export { useModal };
