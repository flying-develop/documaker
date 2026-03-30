import { FC, useMemo } from 'react';

import { Avatar, Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { User } from '&/entities/User/model/types/User';
import { getTemplateAssignUsers } from '&/entities/Template/model/selectors/getTemplateAssignUsers';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import cn from './AssignTemplateClient.module.scss';
import { LuUser } from 'react-icons/lu';

interface ClientProps {
    user: User;
    position: number;
}

const AssignTemplateClient: FC<ClientProps> = (props) => {
    const { user, position } = props;
    const dispatch = useAppDispatch();
    const assignUsers = useAppSelector(getTemplateAssignUsers);
    const onChange: CheckboxProps['onChange'] = (e) => {
        if (e.target.checked) {
            dispatch(templatesActions.addTemplateAssignUser(user));
        } else {
            dispatch(templatesActions.removeTemplateAssignUser(user));
        }
    };

    const checked = useMemo(() => {
        return !!assignUsers.find((aUser) => aUser.id === user.id);
    }, [assignUsers, user.id]);
    console.log(user);
    return (
        <label className={cn.user}>
            <div className={cn.position}>{position}.</div>
            <div className={cn.name}>ID:{user.id}</div>
            {/*<Avatar src={`https://randomuser.me/api/portraits/med/men/${user.id}.jpg`} />*/}
            {user.avatar?.url ? (
                <Avatar src={user.avatar?.url || ''} />
            ) : (
                <Avatar icon={<LuUser />} />
            )}
            <div className={cn.name}>{user.name}</div>
            <div className={cn.email}>{user.email}</div>
            <div className={cn.checkbox}>
                <Checkbox onChange={onChange} checked={checked} />
            </div>
        </label>
    );
};

export default AssignTemplateClient;
