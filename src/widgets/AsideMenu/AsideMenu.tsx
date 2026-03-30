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
import cn from './AsideMenu.module.scss';

interface AsideMenuProps {
    id: number | string;
}

const AsideMenu: FC<AsideMenuProps> = (props) => {
    const { id } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isBlank = useAppSelector(getTemplateIsBlank);
    const sections = useAppSelector(getTemplateSections);
    const globalSection = useAppSelector(getTemplateGlobalSection);

    const setTemplateHandler = useCallback(() => {
        if (id) {
            navigate(`../${AppRoutes.TEMPLATES}/${id}`);
            if (isBlank && globalSection?.is_current) {
                const nextSection = sections?.find((section) => !section.is_global);
                if (nextSection?.id) {
                    // dispatch(setTemplateSectionActive(nextSection.id));
                    dispatch(
                        updateTemplateSectionById({ section: { ...nextSection, is_current: 1 } }),
                    );
                }
            }
        }
    }, [dispatch, globalSection?.is_current, id, isBlank, navigate, sections]);

    const setBlankHandler = useCallback(() => {
        navigate(`../${AppRoutes.TEMPLATES}/${id}/blank`);
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

export default AsideMenu;
