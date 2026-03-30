import { FC, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateNewId } from '&/entities/Template/model/selectors/getTemplateNewId';
import { getTemplateLoading } from '&/entities/Template/model/selectors/getTemplateLoading';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { useNavigate } from 'react-router';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import BlockPage from '&/shared/ui/BlockPage/BlockPage';
import { Helmet } from 'react-helmet';
import { useDebounce } from 'react-use';
import { TableProfileCases } from '&/widgets/Templates';
import { Input } from 'antd';
import { HeaderContext, HeaderContextProps } from '&/app/providers/Header/HeaderProvider';
import WithManagers from '&/widgets/Layouts/ForClient/WithManagers';
import cn from './ClientCases.module.scss';

const ClientCases: FC = () => {
    const { setIsShow } = useContext<HeaderContextProps>(HeaderContext);
    useLayoutEffect(() => {
        setIsShow(true);
    }, [setIsShow]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const newTemplateId = useAppSelector(getTemplateNewId);
    const loading = useAppSelector(getTemplateLoading);
    const [search, setSearch] = useState<string>('');
    const [, setDebouncedValue] = useState<string>('');

    const [isReady] = useDebounce(
        () => {
            setDebouncedValue(search);
        },
        300,
        [search],
    );

    const title = 'Cases';

    useEffect((): any => {
        if (newTemplateId) {
            navigate(`../${AppRoutes.CASES}/${newTemplateId}`);
            return () => dispatch(templatesActions.resetTemplateState());
        }
    }, [dispatch, navigate, newTemplateId]);

    return (
        <>
            <Helmet title={title} />
            <WithManagers>
                <div className={cn.header}>
                    <Input
                        type="search"
                        value={search}
                        placeholder="Search"
                        className={cn['search-input']}
                        onInput={({ currentTarget }) => {
                            setSearch(currentTarget.value);
                        }}
                    />
                </div>
                <TableProfileCases search={isReady() ? search : ''} />
            </WithManagers>
            {loading && <BlockPage />}
        </>
    );
};

export default ClientCases;
