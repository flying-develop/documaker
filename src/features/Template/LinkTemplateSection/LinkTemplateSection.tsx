import { FC, useCallback, useState } from 'react';
import { Modal } from 'antd';
import SelectTemplateSection from '../SelectTemplateSection/SelectTemplateSection';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { AiOutlineLink } from 'react-icons/ai';
import cn from './LinkTemplateSection.module.scss';
import { useAppDispatch } from '&/app/providers/Store';
import { linkTemplateSection } from '&/entities/Template/model/services/linkTemplateSection';

interface LinkTemplateSectionProps {
    parent: TemplateSection;
}

const LinkTemplateSection: FC<LinkTemplateSectionProps> = (props) => {
    const { parent } = props;
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const linkSectionHandler = useCallback(
        (section: TemplateSection) => {
            if (parent?.id && section?.id) {
                dispatch(
                    linkTemplateSection({ sectionId: parent.id, linkedSectionId: section.id }),
                );
                setOpen(false);
            }
        },
        [dispatch],
    );
    return (
        <>
            <div onClick={() => setOpen(true)} className={cn.row}>
                <AiOutlineLink />
                <span>Link section</span>
            </div>
            <Modal title="Link section" open={open} onCancel={() => setOpen(false)} footer={null}>
                <div className={cn.modalContent}>
                    <SelectTemplateSection
                        onSelect={linkSectionHandler}
                        type={parent.is_multiple ? 'multiple' : 'single'}
                        sectionId={parent.id as number}
                        fullTree
                    />
                </div>
            </Modal>
        </>
    );
};

export default LinkTemplateSection;
