import classNames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { Button, Input } from 'antd';

import { useAppDispatch } from '&/app/providers/Store';
import { updateProfileInfo } from '&/entities/Profile/model/services/updateProfileInfo';
import PhoneInput from '&/shared/ui/PhoneInput/PhoneInput';
import { profileActions } from '&/entities/Profile/model/slice/profileSlice';
import { fetchProfile } from '&/entities/Profile/model/services/fetchProfile';
import { Profile } from '&/entities/Profile/model/types/Profile';
import { FormErrors } from '&/features/Auth/ByLogin/types/FormErrors';
import { useProfile } from '&/entities/Profile/hooks/useProfile';

import cn from './EditInfo.module.scss';

interface EditInfoProps {
    className: string | undefined;
}

const EditInfo = ({ className }: EditInfoProps) => {
    const { profile } = useProfile();
    const dispatch = useAppDispatch();
    const {
        register,
        control,
        handleSubmit: onSubmit,
        formState,
    } = useForm<Profile & FormErrors>({});

    const { errors: formErrors } = formState;

    const {
        name: emailInputName,
        ref: emailInputRef,
        onChange: onEmailInputChange,
        onBlur: onEmailInputBlur,
    } = register('email', {
        value: profile?.email,
        required: 'Cannot be empty',
        validate: (value) => {
            return (
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
                    value as string,
                ) || 'This is not an E-mail'
            );
        },
    });

    const { name: nameInputName } = register('name', {
        value: profile?.name,
        required: 'Cannot be empty',
    });

    const {
        name: phoneInputName,
        ref: phoneInputRef,
        onChange: onPhoneInputChange,
        onBlur: onPhoneInputBlur,
    } = register('phone', {
        required: 'Cannot be empty',
    });

    const handleSubmit = async (payloadForm: Profile) => {
        const { payload } = await dispatch(
            updateProfileInfo({
                name: payloadForm.name,
                phone: payloadForm.phone,
                email: payloadForm.email,
            }),
        );

        dispatch(profileActions.setAccessToken({ accessToken: payload.access_token }));
        dispatch(profileActions.setExpiresAt({ expiresIn: payload.expires_in }));
        dispatch(fetchProfile({}));
    };

    return (
        <form className={classNames(className, cn['edit-info'])} onSubmit={onSubmit(handleSubmit)}>
            <div className={cn['edit-info-field']}>
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

            <div className={cn['edit-info-field']}>
                <Controller
                    control={control}
                    name={nameInputName}
                    render={({ field }) => <Input placeholder="Full Name" {...field} />}
                />

                {formErrors?.name && (
                    <div className="register-input-error">{formErrors?.name?.message}</div>
                )}
            </div>

            <div className={cn['edit-info-field']}>
                <Controller
                    control={control}
                    name={phoneInputName}
                    render={() => (
                        <PhoneInput
                            value={profile?.phone}
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

            <Button
                type="primary"
                htmlType="submit"
                size="large"
                className={cn['edit-info-submit']}
            >
                Save
            </Button>
        </form>
    );
};

export default EditInfo;
