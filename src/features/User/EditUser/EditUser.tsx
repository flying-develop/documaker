import { FormErrors } from '&/features/Auth/ByLogin/types/FormErrors';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from 'antd';
import PhoneInput from '&/shared/ui/PhoneInput/PhoneInput';
import classNames from 'classnames';
import { IMaskInput } from 'react-imask';
import { User } from '&/entities/User/model/types/User';

import cn from './EditUser.module.scss';

interface EditUserProps {
    className?: string | undefined;
    user: User;
    onClose: () => void;
    onAccept: (data: User) => void;
}

const EditUser: FC<EditUserProps> = ({ user, onClose, onAccept, className }) => {
    const { register, control, handleSubmit: onSubmit, formState } = useForm<User & FormErrors>({});
    const { errors: formErrors } = formState;

    const {
        name: phoneInputName,
        ref: phoneInputRef,
        onChange: onPhoneInputChange,
        onBlur: onPhoneInputBlur,
    } = register('phone', {
        required: 'Cannot be empty',
    });

    const {
        name: emailInputName,
        ref: emailInputRef,
        onChange: onEmailInputChange,
        onBlur: onEmailInputBlur,
    } = register('email', {
        required: 'Cannot be empty',
        value: user.email,
        validate: (value) => {
            return (
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
                    value as string,
                ) || 'This is not an E-mail'
            );
        },
    });

    const { name: nameInputName } = register('name', {
        value: user.name,
        required: 'Cannot be empty',
    });

    const handleSubmit = async (data: User) => {
        onAccept(data);
        onClose();
    };

    return (
        <form
            className={classNames(className, cn['create-user'])}
            onSubmit={onSubmit(handleSubmit)}
        >
            <div className={cn['create-user-field']}>
                <Controller
                    control={control}
                    name={phoneInputName}
                    render={() => (
                        <PhoneInput
                            value={user.phone}
                            readOnly={false}
                            inputRef={phoneInputRef}
                            name={phoneInputName}
                            onChange={onPhoneInputChange}
                            onBlur={onPhoneInputBlur}
                        />
                    )}
                />

                {formErrors?.phone && (
                    <div className="register-input-error">{formErrors?.phone?.message}</div>
                )}
            </div>

            <div className={cn['create-user-field']}>
                <Controller
                    control={control}
                    name={emailInputName}
                    render={() => (
                        <IMaskInput
                            inputRef={emailInputRef}
                            name={emailInputName}
                            mask={[{ mask: /^\S*@?\S*$/ }]}
                            type="email"
                            inputMode="email"
                            placeholder="E-mail"
                            onAccept={(_value, _mask, event: InputEvent | undefined) => {
                                if (event) onEmailInputBlur(event);
                            }}
                            onComplete={(_value, _mask, event: InputEvent | undefined) => {
                                if (event) onEmailInputChange(event);
                            }}
                            onBlur={onEmailInputBlur}
                        />
                    )}
                />

                {formErrors?.email && (
                    <div className="register-input-error">{formErrors?.email?.message}</div>
                )}
            </div>

            <div className={cn['create-user-field']}>
                <Controller
                    control={control}
                    name={nameInputName}
                    render={({ field }) => <Input placeholder="Full Name" {...field} />}
                />

                {formErrors?.name && (
                    <div className="register-input-error">{formErrors?.name?.message}</div>
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

export default EditUser;
