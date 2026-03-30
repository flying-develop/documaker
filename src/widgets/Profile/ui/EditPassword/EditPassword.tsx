import { Button, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { FormErrors } from '&/features/Auth/ByLogin/types/FormErrors';
import { useAppDispatch } from '&/app/providers/Store';
import { updateProfilePassword } from '&/entities/Profile/model/services/updateProfilePassword';
import { profileActions } from '&/entities/Profile/model/slice/profileSlice';
import { fetchProfile } from '&/entities/Profile/model/services/fetchProfile';

import cn from './EditPassword.module.scss';

interface EditPasswordProps {
    className: string | undefined;
}

interface FormData {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

const EditPassword = ({ className }: EditPasswordProps) => {
    const dispatch = useAppDispatch();
    const { handleSubmit, register, control, watch, formState } = useForm<FormData & FormErrors>(
        {},
    );

    const { errors: formErrors } = formState;

    const { name: currentPasswordName } = register('currentPassword', {
        required: 'Cannot be empty',
    });
    const { name: newPasswordName } = register('newPassword', {
        required: 'Cannot be empty',
    });
    const { name: newPasswordConfirmName } = register('newPasswordConfirm', {
        required: 'Cannot be empty',
        validate: (value: string) => {
            if (watch('newPassword') !== value) {
                return 'Passwords do no match';
            }
        },
    });

    const onSubmit = async (payloadForm: FormData) => {
        const { payload } = await dispatch(
            updateProfilePassword({
                old_password: payloadForm.currentPassword,
                password: payloadForm.newPassword,
                password_confirmation: payloadForm.newPasswordConfirm,
            }),
        );

        dispatch(profileActions.setAccessToken({ accessToken: payload.access_token }));
        dispatch(profileActions.setExpiresAt({ expiresIn: payload.expires_in }));
        dispatch(fetchProfile({}));
    };

    return (
        <form
            className={classNames(className, cn['edit-password'])}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={cn['edit-password-field']}>
                <Controller
                    control={control}
                    name={currentPasswordName}
                    render={({ field }) => (
                        <Input.Password placeholder="Current Password" {...field} />
                    )}
                />
                {formErrors?.currentPassword && (
                    <div className="register-input-error">
                        {formErrors?.currentPassword?.message}
                    </div>
                )}
            </div>
            <div className={cn['edit-password-field']}>
                <Controller
                    control={control}
                    name={newPasswordName}
                    render={({ field }) => <Input.Password placeholder="Password" {...field} />}
                />
                {formErrors?.newPassword && (
                    <div className="register-input-error">{formErrors?.newPassword?.message}</div>
                )}
            </div>
            <div className={cn['edit-password-field']}>
                <Controller
                    control={control}
                    name={newPasswordConfirmName}
                    render={({ field }) => (
                        <Input.Password placeholder="Confirm new password" {...field} />
                    )}
                />

                {formErrors?.newPasswordConfirm && (
                    <div className="register-input-error">
                        {formErrors?.newPasswordConfirm?.message}
                    </div>
                )}
            </div>

            <Button
                htmlType="submit"
                type="primary"
                size="large"
                className={cn['edit-password-submit']}
            >
                Save
            </Button>
        </form>
    );
};

export default EditPassword;
