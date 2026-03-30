import { FC, useContext, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateNewId } from '&/entities/Template/model/selectors/getTemplateNewId';
import { getTemplateLoading } from '&/entities/Template/model/selectors/getTemplateLoading';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { useNavigate } from 'react-router';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import BlockPage from '&/shared/ui/BlockPage/BlockPage';
import { Helmet } from 'react-helmet';
import BaseNav from '&/widgets/Layouts/BaseNav/BaseNav';
import { TableTemplateCases } from '&/widgets/Templates';
import { HeaderContext, HeaderContextProps } from '&/app/providers/Header/HeaderProvider';
import { SearchTemplate } from '&/features/Template';
import { TemplateCaseStatuses } from '&/entities/Template/model/types/TemplateCaseStatus';
import SearchTemplateByStatus from '../../../../features/Template/SearchTemplateByStatus/SearchTemplateByStatus';
import cn from './Cases.module.scss';

const Cases: FC = () => {
    const { setIsShow } = useContext<HeaderContextProps>(HeaderContext);
    useLayoutEffect(() => {
        setIsShow(true);
    }, [setIsShow]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const newTemplateId = useAppSelector(getTemplateNewId);
    const loading = useAppSelector(getTemplateLoading);

    const title = 'Cases';

    useEffect((): any => {
        if (newTemplateId) {
            navigate(`../${AppRoutes.CASES}/${newTemplateId}`);
            return () => dispatch(templatesActions.resetTemplateState());
        }
    }, [dispatch, navigate, newTemplateId]);

    useEffect((): any => {
        dispatch(templatesActions.setTemplateIsDraft(false));
        return () => dispatch(templatesActions.resetTemplateFilters());
    }, [dispatch]);

    return (
        <>
            <Helmet title={title} />
            <BaseNav>
                <SearchTemplateByStatus statuses={TemplateCaseStatuses} isCase />
                <div className={cn.header}>
                    <SearchTemplate />
                </div>
                <TableTemplateCases />
            </BaseNav>
            {loading && <BlockPage />}
        </>
    );
};

export default Cases;
