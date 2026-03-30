import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { Button, Input, Modal, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTag } from '&/entities/Tag/model/selectors/getTag';
import { tagsActions } from '&/entities/Tag/model/slice/tagsSlice';
import { getId } from '&/shared/utils';
import { getTemplateKeyWords } from '&/entities/Template/model/selectors/getTemplateKeyWords';
import { AiFillDelete } from 'react-icons/ai';
import { TagOptionKeyword } from '&/entities/Tag/model/types/Tag';
import cn from './SelectKeyWord.module.scss';

interface Props {
    onCancel: () => void;
    optionId: number | string;
}

const SelectKeyWord: FC<Props> = (props) => {
    const { onCancel, optionId } = props;
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<string>('');
    const [keywordCode, setKeywordCode] = useState<string>('');

    const tag = useAppSelector(getTag);
    const keywords = useAppSelector(getTemplateKeyWords);

    const currentOption = useMemo(() => {
        return tag.options?.find(({ id }) => id === optionId) || null;
    }, [optionId, tag.options]);

    const keywordOptions = useMemo(() => {
        if (currentOption) {
            return keywords
                .filter(
                    (keyword) =>
                        !currentOption?.keywords
                            ?.map(({ keyword }) => keyword?.code)
                            .includes(keyword.code),
                )
                .map((word) => ({
                    value: word.code,
                    label: word.code,
                }));
        }
        return [];
    }, [currentOption, keywords]);

    const inputHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;
        setValue(value);
    }, []);

    const addOptionKeywordHandler = useCallback(() => {
        if (currentOption) {
            const optionKeyWords = currentOption.keywords || [];

            const keyword = keywords.find(({ code }) => code === keywordCode);
            if (keyword && value) {
                dispatch(
                    tagsActions.updateTagOption({
                        ...currentOption,
                        keywords: [
                            ...optionKeyWords,
                            {
                                id: getId('temp_'),
                                keyword,
                                value,
                            },
                        ],
                    }),
                );
                setValue('');
                setKeywordCode('');
            }
        }
    }, [currentOption, keywords, value, keywordCode, dispatch]);

    const deleteOptionKeywordHandler = useCallback(
        (keyword: TagOptionKeyword) => () => {
            if (currentOption) {
                const optionKeyWords = currentOption.keywords || [];
                dispatch(
                    tagsActions.updateTagOption({
                        ...currentOption,
                        keywords: optionKeyWords.filter(({ id }) => id !== keyword?.id),
                    }),
                );
            }
        },
        [currentOption, dispatch],
    );

    return (
        <div>
            <Modal
                title="Set Key value"
                open
                onCancel={onCancel}
                footer={
                    <div className={cn.footer}>
                        <Button
                            type="primary"
                            onClick={addOptionKeywordHandler}
                            disabled={!value || !keywordCode}
                        >
                            Add key value
                        </Button>
                    </div>
                }
            >
                <div className={cn.keywordSelect}>
                    <Select
                        onChange={setKeywordCode}
                        options={keywordOptions}
                        value={keywordCode}
                    />
                    <Input onChange={inputHandler} value={value} />
                </div>
                {!!currentOption?.keywords?.length && (
                    <ul className={cn.list}>
                        {currentOption.keywords?.map((keyword) => {
                            return (
                                <li key={keyword.id} className={cn.keyword}>
                                    <span>
                                        <span className={cn.key}>{keyword?.keyword?.code}</span> :{' '}
                                        {keyword.value}
                                    </span>
                                    <i
                                        className={cn.delete}
                                        onClick={deleteOptionKeywordHandler(keyword)}
                                    >
                                        <AiFillDelete />
                                    </i>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </Modal>
        </div>
    );
};

export default SelectKeyWord;
