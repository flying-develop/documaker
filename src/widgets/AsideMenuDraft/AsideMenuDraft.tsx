import { FC, useCallback } from 'react';
import { Button } from 'antd';
import { RiListCheck3, RiSurveyLine } from 'react-icons/ri';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateGlobalSection } from '&/entities/Template/model/selectors/getTemplateGlobalSection';
import { getTemplateIsBlank } from '&/entities/Template/model/selectors/getTemplateIsBlank';
import { getTemplateSections } from '&/entities/Template/model/selectors/getTemplateSections';
// import { setTemplateSectionActive } from '&/entities/Template/model/services/setTemplateSectionActive';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import cn from './AsideMenuDraft.module.scss';

interface AsideMenuProps {
    id: number | string;
}

const AsideMenuDraft: FC<AsideMenuProps> = (props) => {
    const { id } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isBlank = useAppSelector(getTemplateIsBlank);
    const sections = useAppSelector(getTemplateSections);
    const globalSection = useAppSelector(getTemplateGlobalSection);
    const template = useAppSelector(getTemplate);
    const isDraft = !!template?.is_draft;

    const setTemplateHandler = useCallback(() => {
        if (id) {
            navigate(`../${AppRoutes.CASES}/${id}`);
            if ((isBlank || isDraft) && globalSection?.is_current) {
                const nextSection = sections?.find((section) => !section.is_global);
                if (nextSection?.id) {
                    dispatch(
                        updateTemplateSectionById({ section: { ...nextSection, is_current: 1 } }),
                    );
                }
            }
        }
    }, [dispatch, globalSection?.is_current, id, isBlank, isDraft, navigate, sections]);

    const setBlankHandler = useCallback(() => {
        navigate(`../${AppRoutes.CASES}/${id}/blank`);
    }, [id, navigate]);

    return (
        <div className={cn.aside}>
            <Button
                type="primary"
                icon={<RiListCheck3 />}
                className={classNames(cn.button, {
                    [cn.active]: !isBlank,
                })}
                onClick={setTemplateHandler}
            />

            <Button
                type="primary"
                icon={<RiSurveyLine />}
                className={classNames(cn.button, {
                    [cn.active]: isBlank,
                })}
                onClick={setBlankHandler}
            />
        </div>
    );
};

export default AsideMenuDraft;
