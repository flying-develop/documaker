import { useState } from 'react';
import { Segmented } from 'antd';

import { ProfilePhoto } from '../ProfilePhoto/ProfilePhoto';
import { tabItems, TabKeys } from '../../config/tab-config';
import EditInfo from '../EditInfo/EditInfo';
import EditPassword from '../EditPassword/EditPassword';
import cn from './ProfileEdit.module.scss';

const ProfileEdit = () => {
    const [currentTab, setCurrentTab] = useState<string>(TabKeys.INFO);

    const onChangeTab = (value: string) => {
        setCurrentTab(value as string);
    };

    return (
        <>
            <ProfilePhoto />

            <Segmented
                size="large"
                className={cn['profile-edit-segment']}
                options={tabItems}
                onChange={onChangeTab}
            />

            {currentTab === 'info' && <EditInfo className={cn['profile-edit']} />}
            {currentTab === 'pass' && <EditPassword className={cn['profile-edit']} />}
        </>
    );
};

export default ProfileEdit;
