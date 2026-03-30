import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { Button, Input, Modal } from 'antd';

import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getUsers } from '&/entities/User/model/selectors/getUsers';
import { assignTemplate } from '&/entities/Template/model/services/assignTemplate';
import { useNavigate } from 'react-router';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import AssignTemplateClient from '&/features/Template/AssignTemplate/ui/AssignTemplateClient/AssignTemplateClient';
import cn from './AssignTemplate.module.scss';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';

const AssignTemplate: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const users = useAppSelector(getUsers);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');

    const cancelHandler = useCallback(() => {
        setOpen(false);
        dispatch(templatesActions.resetTemplateAssignUsers());
    }, []);

    const doneHandler = useCallback(async () => {
        setOpen(false);
        await dispatch(assignTemplate());
        dispatch(templatesActions.resetTemplateAssignUsers());
        navigate(`../${AppRoutes.CASES}`);
    }, [dispatch, navigate]);

    const searchHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;
        setQuery(value);
    }, []);

    const userOptions = useMemo(() => {
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase()),
        );
    }, [query, users]);

    return (
        <>
            <Button onClick={() => setOpen(true)} danger ghost>
                Assign
            </Button>
            <Modal
                width={700}
                title="Assign"
                open={open}
                onCancel={cancelHandler}
                footer={
                    <Button onClick={doneHandler} danger>
                        Done
                    </Button>
                }
            >
                <div className={cn.search}>
                    <Input value={query} onChange={searchHandler} />
                </div>
                <div className={cn.users}>
                    {userOptions.map((user, idx) => {
                        return <AssignTemplateClient key={idx} user={user} position={idx + 1} />;
                    })}
                </div>
            </Modal>
        </>
    );
};

export default AssignTemplate;
