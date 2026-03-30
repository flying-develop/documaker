import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import { useAppSelector } from '&/app/providers/Store';
import { getTemplateKeyWords } from '&/entities/Template/model/selectors/getTemplateKeyWords';
import { AddTemplateKeyWord } from '&/features/Template';
import KeyWordItem from '&/widgets/KeyWords/ui/KeyWordsList/ui/KeyWordItem/KeyWordItem';
import cn from './KeyWordsList.module.scss';

const KeyWordsList: FC = () => {
    const keyWords = useAppSelector(getTemplateKeyWords);
    const [query, setQuery] = useState('');

    const searchHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;
        setQuery(value);
    }, []);

    const list = useMemo(() => {
        return keyWords.filter((word) =>
            query ? word.code?.toLowerCase().includes(query.toLowerCase()) : true,
        );
    }, [keyWords, query]);

    const withButton = useMemo(() => {
        return (
            !!query &&
            keyWords.filter((word) => query.toLowerCase() === word.code?.toLowerCase()).length === 0
        );
    }, [keyWords, query]);

    return (
        <div
            className={classNames(cn.container, {
                [cn.withButton]: withButton,
            })}
        >
            <Input value={query} onChange={searchHandler} />
            <div className={classNames(cn.list, {})}>
                {list.map((keyWord) => {
                    return <KeyWordItem key={keyWord.id} keyWord={keyWord} />;
                })}
            </div>
            {withButton && <AddTemplateKeyWord setQuery={setQuery} word={query} />}
        </div>
    );
};

export default KeyWordsList;
