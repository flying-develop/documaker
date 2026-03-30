import {
    ChangeEvent,
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Button, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { slugify } from 'transliteration';
import { getTemplateKeyWords } from '&/entities/Template/model/selectors/getTemplateKeyWords';
import { createTemplateKeyWord } from '&/entities/Template/model/services/createTemplateKeyWord';
import cn from './AddTemplateKeyWord.module.scss';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { getId } from '&/shared/utils';

interface Props {
    word: string;
    setQuery: (query: string) => void;
}

const prepareCode = (word: string): string =>
    slugify(word, { uppercase: true, separator: '_' }).replace(/[^a-z0-9_]/gi, '');

const AddTemplateKeyWord: FC<PropsWithChildren<Props>> = (props) => {
    const { word, setQuery } = props;
    const dispatch = useAppDispatch();
    const keyWords = useAppSelector(getTemplateKeyWords);

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');

    const addKeyWordHandler = useCallback(() => {
        setOpen(true);
    }, []);

    const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        const title = evt.target.value;
        setTitle(title);
    };

    const cancelHandler = useCallback(() => {
        setOpen(false);
        setQuery('');
    }, []);

    const createKeyWordHandler = useCallback(() => {
        const id = getId('temp_');
        setOpen(false);
        dispatch(createTemplateKeyWord({ code, id, title: code }));
        dispatch(templatesActions.addTemplateKeyWord({ id, code, title: code }));
        setQuery('');
    }, [code, dispatch]);

    const canApply = useMemo(() => {
        return !!code && keyWords.filter((word) => code === word.code).length === 0;
    }, [code, keyWords]);

    useEffect(() => {
        setCode(prepareCode(title));
    }, [title]);

    useEffect(() => {
        setTitle(prepareCode(word));
    }, [word]);

    return (
        <>
            <Button onClick={addKeyWordHandler}>Create Key Word</Button>
            <Modal
                title="New Key Word"
                open={open}
                onCancel={cancelHandler}
                footer={
                    <div className={cn.footer}>
                        {!!canApply && (
                            <Button type="primary" onClick={createKeyWordHandler}>
                                Apply
                            </Button>
                        )}
                    </div>
                }
            >
                <div className={cn.header}>
                    <div className={cn.name}>
                        {'{{'}
                        {code}
                        {'}}'}
                    </div>
                </div>
                <Input value={title} onChange={titleHandler} />
            </Modal>
        </>
    );
};

export default AddTemplateKeyWord;
