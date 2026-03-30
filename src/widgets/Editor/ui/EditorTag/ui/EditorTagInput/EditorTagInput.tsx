import { ChangeEvent, FC, useState } from 'react';
import {
    DatePicker,
    DatePickerProps,
    Input,
    Radio,
    RadioChangeEvent,
    Checkbox,
    Button,
} from 'antd';
import dayjs from 'dayjs';
// @ts-ignore
import type { GetProp } from 'antd';
import { Tag, TagOption } from '&/entities/Tag/model/types/Tag';

import classNames from 'classnames';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateExcludedSections } from '&/entities/Template/model/selectors/getTemplateExcludedSections';
import cn from './EditorTagInput.module.scss';

const { TextArea } = Input;

interface BlankTagInputProps {
    tag: Tag;
    onChange: (value: number | string | number[]) => void;
    setOption?: (option: TagOption) => void;
    deleteSection: (option: TagOption) => void;
    isClient?: boolean;
}

const EditorTagInput: FC<BlankTagInputProps> = (props) => {
    const { tag, onChange, setOption, deleteSection, isClient } = props;
    const [value, setValue] = useState(tag?.value || tag?.default_value);
    const dispatch = useAppDispatch();
    const excludedSections = useAppSelector(getTemplateExcludedSections);

    const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        onChange(evt.target.value);
        setValue(evt.target.value);
    };

    const textHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(evt.target.value);
        setValue(evt.target.value);
    };

    const dateHandler: DatePickerProps['onChange'] = (_, dateString) => {
        onChange(dateString as string);
        setValue(dateString as string);
    };

    const choiceHandler = (evt: RadioChangeEvent) => {
        const { value } = evt.target;
        const option = tag.options?.find((option) => option.id === value);
        if (option?.id) {
            onChange(value);
            setValue(value);
            const linkedSections = tag?.options
                ?.filter((o) => o.id !== option.id && !!o?.linked_section)
                .map((o) => (o.linked_section?.id ? +o.linked_section.id : 0));
            if (!!linkedSections?.length) {
                dispatch(
                    templatesActions.updateTemplateExcludedSections(
                        _.uniq([
                            ...excludedSections.filter(
                                (section) => section !== option.linked_section?.id,
                            ),
                            ...linkedSections,
                        ]),
                    ),
                );
            }
        }
    };

    // @ts-ignore
    const checkboxHandler: GetProp<typeof Checkbox.Group, 'onChange'> = (
        checkedValues: number[],
    ) => {
        onChange(checkedValues);
        setValue(checkedValues);
    };

    if (tag.type === 'text' && !Array.isArray(value)) {
        return (
            <div className={cn.option}>
                <TextArea
                    className={cn.input}
                    value={value as string}
                    onChange={textHandler}
                    autoComplete="off"
                    autoSize={{ minRows: 1, maxRows: 10 }}
                />
            </div>
        );
    }

    if (tag.type === 'number' && !Array.isArray(value)) {
        return (
            <div className={cn.option}>
                <Input
                    className={cn.input}
                    value={value as string}
                    onChange={inputHandler}
                    autoComplete="off"
                    type="number"
                />
            </div>
        );
    }

    if (tag.type === 'date' && !Array.isArray(value)) {
        const currentValue = dayjs(value as string, 'YYYY-MM-DD').isValid()
            ? dayjs(value as string, 'YYYY-MM-DD')
            : null;
        return (
            <div className={cn.option}>
                <DatePicker
                    className={cn.input}
                    value={currentValue}
                    onChange={dateHandler}
                    autoComplete="off"
                />
            </div>
        );
    }

    if (tag.type === 'choice' && tag?.options && !Array.isArray(value)) {
        const currentValue = typeof value === 'undefined' ? tag?.options[0].id : value;

        if (!tag?.options.length) {
            return null;
        }
        return (
            <div>
                <Radio.Group
                    onChange={choiceHandler}
                    value={currentValue}
                    style={{ width: '100%' }}
                >
                    <div className={cn.options}>
                        {tag?.options?.map((option): any => {
                            return (
                                <div
                                    className={classNames(cn.row, {
                                        [cn.rowOnly]: isClient,
                                    })}
                                    key={option?.id}
                                >
                                    <Radio value={option?.id} className={cn.option}>
                                        {option.title}
                                    </Radio>
                                    {!isClient && (
                                        <>
                                            {option.linked_section ? (
                                                <Button
                                                    className={cn.button}
                                                    onClick={() => deleteSection(option)}
                                                >
                                                    {option.linked_section.title}
                                                </Button>
                                            ) : (
                                                <Button
                                                    className={cn.button}
                                                    onClick={
                                                        setOption
                                                            ? () => setOption(option)
                                                            : undefined
                                                    }
                                                    disabled={!setOption}
                                                >
                                                    Set section
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Radio.Group>
            </div>
        );
    }

    if (tag.type === 'choices' && tag?.options) {
        if (!tag?.options.length) {
            return null;
        }
        const currentValue: number[] = (Array.isArray(value) ? value : []).map(
            (value: string | number) => +value,
        );

        return (
            <div>
                <Checkbox.Group
                    style={{ width: '100%' }}
                    onChange={checkboxHandler}
                    value={currentValue}
                >
                    <div className={cn.options}>
                        {tag?.options?.map((option): any => {
                            return (
                                <div
                                    className={classNames(cn.row, {
                                        [cn.rowOnly]: isClient,
                                    })}
                                    key={option?.id}
                                >
                                    <Checkbox
                                        value={option?.id}
                                        style={{ width: '100%' }}
                                        className={cn.option}
                                    >
                                        {option.title}
                                    </Checkbox>
                                    {!isClient && (
                                        <>
                                            {option.linked_section ? (
                                                <Button
                                                    className={cn.button}
                                                    onClick={() => deleteSection(option)}
                                                >
                                                    {option.linked_section.title}
                                                </Button>
                                            ) : (
                                                <Button
                                                    className={cn.button}
                                                    onClick={
                                                        setOption
                                                            ? () => setOption(option)
                                                            : undefined
                                                    }
                                                    disabled={!setOption}
                                                >
                                                    Set section
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Checkbox.Group>
            </div>
        );
    }

    return null;
};

export default EditorTagInput;
