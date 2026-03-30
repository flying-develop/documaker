import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Button, Input } from 'antd';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTag } from '&/entities/Tag/model/selectors/getTag';
import { tagsActions } from '&/entities/Tag/model/slice/tagsSlice';
import { TagOption } from '&/entities/Tag/model/types/Tag';
import { TagType } from '&/shared/types/TagTypes';
import classNames from 'classnames';
import { LuBraces } from 'react-icons/lu';
import SelectKeyWord from '&/features/Tag/AddTag/ui/AddTagChoice/ui/SelectKeyWord/SelectKeyWord';
import cn from './AddTagChoice.module.scss';

const AddTagChoice: FC = () => {
    const dispatch = useAppDispatch();
    const tag = useAppSelector(getTag);
    const [optionId, setOptionId] = useState<string | number | null>(null);

    const optionHandler = useCallback(
        (option: TagOption) => (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch(tagsActions.updateTagOption({ ...option, title: evt.target.value }));
        },
        [dispatch],
    );

    const deleteOptionHandler = useCallback(
        (option: TagOption) => () => {
            dispatch(tagsActions.deleteTagOption(option));
        },
        [dispatch],
    );

    const keyWordHandler = useCallback(
        (option: TagOption) => () => {
            setOptionId(option?.id || null);
        },
        [],
    );

    const cancelHandler = useCallback(() => {
        setOptionId(null);
    }, []);

    return (
        <div>
            <div className={cn.title}>Options</div>
            <div className={cn.options}>
                {tag?.options?.map((option) => {
                    if (tag.type === TagType.CHOICE) {
                        return (
                            <div key={option.id} className={classNames(cn.option, cn.choice)}>
                                <Input value={option.title} onChange={optionHandler(option)} />
                                <Button
                                    onClick={keyWordHandler(option)}
                                    shape="circle"
                                    icon={<LuBraces size={16} />}
                                    className={cn.button}
                                />
                                <Button
                                    onClick={deleteOptionHandler(option)}
                                    shape="circle"
                                    icon={<FaRegTrashAlt />}
                                    className={cn.button}
                                />
                            </div>
                        );
                    }
                    return (
                        <div key={option.id} className={cn.option}>
                            <Input value={option.title} onChange={optionHandler(option)} />
                            <Button
                                onClick={deleteOptionHandler(option)}
                                shape="circle"
                                icon={<FaRegTrashAlt />}
                            />
                        </div>
                    );
                })}
            </div>

            {optionId && <SelectKeyWord onCancel={cancelHandler} optionId={optionId} />}
        </div>
    );
};

export default AddTagChoice;
