import { FC, useCallback, useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { getTemplateLoading } from '&/entities/Template/model/selectors/getTemplateLoading';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { Button, Card } from 'antd';
import BlockPage from '&/shared/ui/BlockPage/BlockPage';
import { Structure } from '&/widgets/Structure';
import PageTitle from '&/shared/ui/PageTitle/PageTitle';
import { updateTemplateSectionFill } from '&/entities/Template/model/services/updateTemplateSectionFill';
import { fetchTemplateCaseById } from '&/entities/Template/model/services/fetchTemplateCaseById';
import { BlankEditor, TemplateEditor } from '&/widgets/Editor';
import { HeaderContext, HeaderContextProps } from '&/app/providers/Header/HeaderProvider';
import { createTemplateCaseDraft } from '&/entities/Template/model/services/createTemplateCaseDraft';
import classNames from 'classnames';
import AsideMenuDraft from '&/widgets/AsideMenuDraft/AsideMenuDraft';
import { Tags } from '&/widgets/Tags';
import { getTemplateCurrentSection } from '&/entities/Template/model/selectors/getTemplateCurrentSection';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import { saveTemplateCaseDraft } from '&/entities/Template/model/services/saveTemplateCaseDraft';
import { useScroll } from 'react-use';
import { useProfile } from '&/entities/Profile/hooks/useProfile';
import cn from './CasesId.module.scss';

const CasesId: FC = () => {
    const templateBlock = useRef(null);
    const {y: scrollTemplateY} = useScroll(templateBlock);
    const { setIsShow } = useContext<HeaderContextProps>(HeaderContext);
    useLayoutEffect(() => {
        setIsShow(false);
    }, [setIsShow]);

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAdmin, isModerator, isSuperAdmin } = useProfile();
    const template = useAppSelector(getTemplate);
    const editedSection = useAppSelector(getTemplateEditedSection);
    const loading = useAppSelector(getTemplateLoading);
    const templateCase = useAppSelector(getTemplate);
    const currentSection = useAppSelector(getTemplateCurrentSection);

    const backBtnHandler = useCallback(() => {
        navigate(`../${AppRoutes.CASES}`);
    }, [navigate]);

    const openPdf = useCallback(
        () => window.open(`${import.meta.env.VITE_BASE_URL}/petitions/cases/${id}/pdf`, '_blank'),
        [id],
    );

    const pdfViewHandler = useCallback(async () => {
        if (editedSection?.is_edited) {
            await dispatch(
                updateTemplateSectionFill({ section: editedSection, callback: openPdf }),
            );
        } else {
            openPdf();
        }
    }, [dispatch, editedSection, openPdf]);

    const editCaseHandler = useCallback(() => {
        dispatch(createTemplateCaseDraft()).then((res: any) => {
            if (res.payload?.id) {
                navigate(`../${AppRoutes.CASES}/${res.payload.id}`, { replace: true });
            }
        });
    }, [dispatch, navigate]);

    const saveSectionHandler = useCallback(() => {
        if (!!template.is_draft) {
            dispatch(updateTemplateSectionById({ section: editedSection }));
        } else {
            dispatch(updateTemplateSectionFill({ section: editedSection }));
        }
    }, [dispatch, editedSection, template]);

    const applyChangesHandler = useCallback(() => {
        dispatch(saveTemplateCaseDraft());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(fetchTemplateCaseById(id));
        }
        dispatch(templatesActions.setTemplateIsBlank(false));
        dispatch(templatesActions.setTemplateIsCase(true));
    }, [dispatch, id]);

    const withPdf = !!id && !!template?.sections?.length;

    const canEditCase = isAdmin || isModerator || isSuperAdmin;

    const isDraft = !!template?.is_draft;

    if (!id) {
        navigate(`../${AppRoutes.CASES}`);
    }

    return (
        <div className={cn.page}>
            <div className={cn.header}>
                <PageTitle title={templateCase.title} onBack={backBtnHandler} />
                <div className={cn.buttons}>
                    {canEditCase && (
                        <>
                            {isDraft ? (
                                <div className={cn.buttons}>
                                    <Button type="primary" onClick={applyChangesHandler}>
                                        Apply changes
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    type="primary"
                                    onClick={editCaseHandler}
                                    disabled={!editedSection?.id}
                                >
                                    Edit
                                </Button>
                            )}
                        </>
                    )}
                    <Button
                        type="primary"
                        onClick={saveSectionHandler}
                        disabled={!editedSection?.id}
                    >
                        Save
                    </Button>

                    <Button onClick={pdfViewHandler} danger ghost disabled={!withPdf}>
                        Generate pdf
                    </Button>
                </div>
            </div>
            <div
                className={classNames(cn.template, {
                    [cn.draft]: isDraft,
                })}
                ref={templateBlock}
            >
                <Card className={cn['aside-left']}>
                    <div
                        className={classNames({
                            [cn.structure]: isDraft,
                        })}
                    >
                        {isDraft && <AsideMenuDraft id={id as string} />}

                        <Structure />
                    </div>
                </Card>

                <div className={cn.content}>{isDraft ? <TemplateEditor fixedHeader={scrollTemplateY > 0} /> : <BlankEditor isClient />}</div>
                {isDraft && (
                    <div className={cn['aside-right']}>
                        <Tags scope="global" title="Global Tags" />
                        {currentSection && <Tags scope="local" title="Local Tags" />}
                    </div>
                )}
            </div>
            {loading && <BlockPage />}
        </div>
    );
};

export default CasesId;
