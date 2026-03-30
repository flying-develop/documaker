import { Button, Modal } from 'antd';
import { useAuth } from '&/app/providers/auth/ui/AuthProvider';
import AntDCloseIcon from '&/shared/assets/icons/AntDCloseIcon.svg?react';
import ProfileEdit from '../ProfileEdit/ProfileEdit';

import cn from './ProfileModal.module.scss';

interface ProfileModalProps {
    onClose: () => void;
    isOpen: boolean;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
    const { logout } = useAuth();

    const handleClickLogout = () => {
        logout();
    };

    return (
        <Modal
            width={352}
            title={<div className={cn['profile-modal-edit-title']}>Profile</div>}
            classNames={{
                content: cn['profile-modal-edit-content'],
            }}
            closeIcon={<AntDCloseIcon />}
            open={isOpen}
            footer={null}
            onCancel={onClose}
            destroyOnClose
        >
            <ProfileEdit />
            <Button
                type="default"
                onClick={handleClickLogout}
                className={cn['profile-modal-edit-logout']}
                size="large"
            >
                Logout
            </Button>
        </Modal>
    );
};

export default ProfileModal;
