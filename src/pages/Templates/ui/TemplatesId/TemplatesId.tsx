import { FC, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { getTemplateLoading } from '&/entities/Template/model/selectors/getTemplateLoading';
import { getTemplateCurrentSection } from '&/entities/Template/model/selectors/getTemplateCurrentSection';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import { fetchTemplateById } from '&/entities/Template/model/services/fetchTemplateById';
import { Button, Card, Modal } from 'antd';
import { Tags } from '&/widgets/Tags';
import BlockPage from '&/shared/ui/BlockPage/BlockPage';
import { TemplateEditor } from '&/widgets/Editor';
import AsideMenu from '&/widgets/AsideMenu/AsideMenu';
import { Structure } from '&/widgets/Structure';
import PageTitle from '&/shared/ui/PageTitle/PageTitle';
import { getBaseUrl } from '&/shared/api/utils';
import { HeaderContext, HeaderContextProps } from '&/app/providers/Header/HeaderProvider';
import { useScroll } from 'react-use';

import cn from './TemplatesId.module.scss';
import KeyWords from '&/widgets/KeyWords/KeyWords';

const TemplatesId: FC = () => {
    const templateBlock = useRef(null);
    const { y: scrollTemplateY } = useScroll(templateBlock);
    const { setIsShow } = useContext<HeaderContextProps>(HeaderContext);

    useLayoutEffect(() => {
        setIsShow(false);
    }, [setIsShow]);

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const template = useAppSelector(getTemplate);
    const editedSection = useAppSelector(getTemplateEditedSection);
    const loading = useAppSelector(getTemplateLoading);
    const currentSection = useAppSelector(getTemplateCurrentSection);

    const [open, setOpen] = useState(false);

    const onBack = useCallback(() => {
        navigate(`../${AppRoutes.TEMPLATES}`);
        setOpen(false);
        dispatch(templatesActions.resetTemplateEditedSection());
    }, [dispatch, navigate]);

    const backBtnHandler = useCallback(async () => {
        await dispatch(updateTemplateSectionById({ section: editedSection }));
        onBack();
    }, [dispatch, editedSection, onBack]);

    const saveSectionIfAwayHandler = useCallback(async () => {
        await dispatch(
            updateTemplateSectionById({ section: editedSection, reFetch: false, callback: onBack }),
        );
    }, [dispatch, editedSection, onBack]);

    const saveSectionHandler = useCallback(() => {
        dispatch(updateTemplateSectionById({ section: editedSection }));
    }, [dispatch, editedSection]);

    const cancelHandler = useCallback(() => {
        setOpen(false);
        dispatch(templatesActions.resetTemplateEditedSection());
    }, [dispatch]);

    const openPdf = useCallback(
        () => window.open(`${getBaseUrl()}/petitions/templates/${id}/pdf`, '_blank'),
        [id],
    );
    const pdfViewHandler = useCallback(async () => {
        if (editedSection?.is_edited) {
            await dispatch(
                updateTemplateSectionById({ section: editedSection, callback: openPdf }),
            );
        } else {
            openPdf();
        }
    }, [dispatch, editedSection, openPdf]);

    useEffect(() => {
        return () => {
            dispatch(templatesActions.resetTemplateState());
        };
    }, [dispatch]);

    const withPdf = !!id && !!template?.sections?.length;

    useEffect(() => {
        return () => {
            dispatch(templatesActions.resetTemplateState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(fetchTemplateById(id));
        }
        dispatch(templatesActions.setTemplateIsBlank(false));
    }, [dispatch, id]);

    if (!id) {
        navigate(`../${AppRoutes.TEMPLATES}`);
    }

    return (
        <>
            <div className={cn.page}>
                <div className={cn.header}>
                    <PageTitle title={`Template: ${template?.title}`} onBack={backBtnHandler} />
                    <div className={cn.buttons}>
                        <Button
                            type="primary"
                            onClick={saveSectionHandler}
                            disabled={!editedSection?.id}
                        >
                            Save
                        </Button>
                        <Button onClick={pdfViewHandler} danger ghost disabled={!withPdf}>
                            View pdf
                        </Button>
                    </div>
                </div>
                <div className={cn.template} ref={templateBlock}>
                    <Card className={cn['aside-left']}>
                        <div className={cn.structure}>
                            <AsideMenu id={id as string} />
                            <Structure />
                        </div>
                    </Card>
                    <div className={cn.content}>
                        <TemplateEditor fixedHeader={scrollTemplateY > 0} />
                    </div>
                    <div className={cn['aside-right']}>
                        <Tags scope="global" title="Global Tags" />
                        {currentSection && <Tags scope="local" title="Local Tags" />}
                        <KeyWords />
                    </div>
                </div>
                <Modal
                    title="Save changes?"
                    open={open}
                    onOk={saveSectionIfAwayHandler}
                    onCancel={cancelHandler}
                    okText="ok"
                    cancelText="cancel"
                />
            </div>
            {loading && <BlockPage />}
        </>
    );
};

export default TemplatesId;
