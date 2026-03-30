import { useEffect, useState } from 'react';
import { Avatar, Upload } from 'antd';
import { getBaseUrl, getUrl } from '&/shared/api/utils';
import { Services } from '&/shared/api';
import { UploadChangeParam } from 'antd/es/upload';
import { useAppDispatch } from '&/app/providers/Store';
import { updateProfilePhoto } from '&/entities/Profile/model/services/updateProfilePhoto';
import { getAvatarInitials } from '&/shared/utils/getAvatarInitials';
import { useProfile } from '&/entities/Profile/hooks/useProfile';
import type { UploadFile } from 'antd';

import cn from './ProfilePhoto.module.scss';

export const ProfilePhoto = () => {
    const dispatch = useAppDispatch();
    const { profile } = useProfile();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [imageId, setImageId] = useState<number | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const actionUpload = `${getBaseUrl()}${getUrl({
        service: Services.UPLOAD,
        endpoint: '',
    })}`;

    const uploadButton = (
        <>
            {profile && !profile.avatar && (
                <Avatar size="large" className={cn['profile-photo-avatar-text']}>
                    {getAvatarInitials(profile?.name)}
                </Avatar>
            )}
            {profile && profile.avatar && (
                <Avatar
                    size="large"
                    className={cn['profile-photo-avatar-image']}
                    src={profile.avatar.url}
                />
            )}
        </>
    );

    const handleChange = ({ file }: UploadChangeParam<UploadFile>) => {
        setLoaded(file.status === 'done');

        if (file.response?.data.url && file.response?.data.id) {
            setImageUrl(file.response?.data.url);
            setImageId(file.response?.data.id);
        }
    };

    useEffect(() => {
        if (loaded && imageId) {
            dispatch(
                updateProfilePhoto({
                    id: imageId,
                }),
            );
        }
    }, [dispatch, imageId, imageUrl, loaded]);

    return (
        <Upload
            name="file"
            className={cn['profile-photo-upload']}
            showUploadList={false}
            action={actionUpload}
            onChange={handleChange}
        >
            {imageUrl ? (
                <img src={imageUrl} alt="avatar" className={cn['profile-photo-image']} />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};
