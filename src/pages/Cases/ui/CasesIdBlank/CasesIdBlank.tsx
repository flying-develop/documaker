import { FC, useCallback, useContext, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { getTemplateLoading } from '&/entities/Template/model/selectors/getTemplateLoading';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { Button, Card } from 'antd';
import BlockPage from '&/shared/ui/BlockPage/BlockPage';
import { Structure } from '&/widgets/Structure';
import PageTitle from '&/shared/ui/PageTitle/PageTitle';
import { updateTemplateSectionBlank } from '&/entities/Template/model/services/updateTemplateSectionBlank';
import { BlankEditor } from '&/widgets/Editor';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import { HeaderContext, HeaderContextProps } from '&/app/providers/Header/HeaderProvider';
import AsideMenuDraft from '&/widgets/AsideMenuDraft/AsideMenuDraft';
import { saveTemplateCaseDraft } from '&/entities/Template/model/services/saveTemplateCaseDraft';
import { getTemplateIsDraft } from '&/entities/Template/model/selectors/getTemplateIsDraft';
import { fetchTemplateCaseById } from '&/entities/Template/model/services/fetchTemplateCaseById';
import cn from './TemplatesIdBlank.module.scss';

const CasesIdBlank: FC = () => {
    const { setIsShow } = useContext<HeaderContextProps>(HeaderContext);
    useLayoutEffect(() => {
        setIsShow(false);
    }, [setIsShow]);
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(getTemplateLoading);
    const template = useAppSelector(getTemplate);
    const editedSection = useAppSelector(getTemplateEditedSection);
    const isDraft = useAppSelector(getTemplateIsDraft);

    const backBtnHandler = useCallback(() => {
        navigate(`../${AppRoutes.CASES}/${id}`);
    }, [id, navigate]);

    const saveSectionHandler = useCallback(() => {
        dispatch(updateTemplateSectionBlank({ section: editedSection }));
    }, [dispatch, editedSection]);

    const applyChangesHandler = useCallback(() => {
        dispatch(saveTemplateCaseDraft());
    }, [dispatch]);

    useEffect(() => {
        dispatch(templatesActions.setTemplateIsBlank(true));
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(fetchTemplateCaseById(id));
        }
        dispatch(templatesActions.setTemplateIsBlank(true));
        dispatch(templatesActions.setTemplateIsCase(true));
    }, [dispatch, id]);

    if (!id) {
        return null;
    }

    return (
        <div className={cn.page}>
            <div className={cn.header}>
                <PageTitle title={`Application: ${template?.title}`} onBack={backBtnHandler} />
                <div className={cn.buttons}>
                    {isDraft && (
                        <div className={cn.buttons}>
                            <Button type="primary" onClick={applyChangesHandler}>
                                Apply changes
                            </Button>
                        </div>
                    )}
                    <Button
                        type="primary"
                        onClick={saveSectionHandler}
                        disabled={!editedSection?.id}
                    >
                        Save
                    </Button>
                </div>
            </div>
            <div className={cn.template}>
                <Card styles={{ body: { padding: 0 } }} className={cn.container}>
                    <div className={cn.structure}>
                        <AsideMenuDraft id={id} />
                        <Structure />
                    </div>
                </Card>
                <BlankEditor />
            </div>
            {loading && <BlockPage />}
        </div>
    );
};

export default CasesIdBlank;
