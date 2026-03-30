import { FC, useContext, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateNewId } from '&/entities/Template/model/selectors/getTemplateNewId';
import { getTemplateLoading } from '&/entities/Template/model/selectors/getTemplateLoading';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { useNavigate } from 'react-router';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import BlockPage from '&/shared/ui/BlockPage/BlockPage';
import { TableTemplates } from '&/widgets/Templates';
import { Helmet } from 'react-helmet';
import BaseNav from '&/widgets/Layouts/BaseNav/BaseNav';
import { AddTemplate, SearchTemplate, SearchTemplateByStatus } from '&/features/Template';
import { HeaderContext, HeaderContextProps } from '&/app/providers/Header/HeaderProvider';
import { TemplateStatuses } from '&/entities/Template/model/types/TemplateStatus';
import cn from './Templates.module.scss';

const Templates: FC = () => {
    const { setIsShow } = useContext<HeaderContextProps>(HeaderContext);
    useLayoutEffect(() => {
        setIsShow(true);
    }, [setIsShow]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const newTemplateId = useAppSelector(getTemplateNewId);
    const loading = useAppSelector(getTemplateLoading);

    const title = 'Templates';

    useEffect((): any => {
        if (newTemplateId) {
            navigate(`../${AppRoutes.TEMPLATES}/${newTemplateId}`);
            return () => dispatch(templatesActions.resetTemplateState());
        }
    }, [dispatch, navigate, newTemplateId]);

    useEffect((): any => {
        dispatch(templatesActions.resetTemplateState());
        return () => dispatch(templatesActions.resetTemplateFilters());
    }, [dispatch]);

    return (
        <>
            <Helmet title={title} />
            <BaseNav>
                <SearchTemplateByStatus statuses={TemplateStatuses} />
                <div className={cn.header}>
                    <SearchTemplate />
                    <AddTemplate />
                </div>
                <TableTemplates />
            </BaseNav>
            {loading && <BlockPage />}
        </>
    );
};

export default Templates;
