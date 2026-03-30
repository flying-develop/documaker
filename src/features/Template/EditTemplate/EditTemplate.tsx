import { FC } from 'react';
import { Template } from '&/entities/Template/model/types/Template';
import { FormErrors } from '&/features/Auth/ByLogin/types/FormErrors';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Button, Input } from 'antd';
import { useAppSelector } from '&/app/providers/Store';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';

import cn from './EditTemplate.module.scss';

interface EditTemplateProps {
    onClose: () => void;
    onAccept: (template: Template) => void;
}

const EditTemplate: FC<EditTemplateProps> = ({ onClose, onAccept }) => {
    const {
        register,
        control,
        handleSubmit: onSubmit,
        formState,
    } = useForm<Template & FormErrors>({});
    const { errors: formErrors } = formState;

    const template = useAppSelector(getTemplate);

    const { name: nameInputTitle } = register('title', {
        value: template.title,
        required: 'Cannot be empty',
    });

    const handleSubmit = async (data: Template) => {
        onAccept(data);
        onClose();
    };

    return (
        <form className={classNames(cn['rename-template'])} onSubmit={onSubmit(handleSubmit)}>
            <div className={cn['rename-template-field']}>
                <Controller
                    control={control}
                    name={nameInputTitle}
                    render={({ field }) => <Input placeholder="Full Name" {...field} />}
                />

                {formErrors?.title && (
                    <div className="register-input-error">{formErrors?.title?.message}</div>
                )}
            </div>

            <Button
                type="primary"
                htmlType="submit"
                size="large"
                className={cn['create-user-submit']}
            >
                Save
            </Button>
        </form>
    );
};

export default EditTemplate;
