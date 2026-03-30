import { FC, useCallback, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { createTemplateSectionUnit } from '&/entities/Template/model/services/createTemplateSectionUnit';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { FilePlugin } from '&/widgets/Editor/plugins/custom';
import cn from './EditorUnitDivider.module.scss';

interface UnitDividerProps {
    unit?: TemplateUnit;
}

const EditorUnitDivider: FC<UnitDividerProps> = (props) => {
    const { unit } = props;
    const dispatch = useAppDispatch();
    const section = useAppSelector(getTemplateEditedSection);
    const [show, setShow] = useState(false);
    const [isFile, setIsFile] = useState(false);

    const addUnitHandler = useCallback(() => {
        dispatch(createTemplateSectionUnit({ unit }));
    }, [dispatch, unit]);

    const addFileHandler = useCallback(() => {
        setIsFile((prev) => !prev);
    }, []);

    return (
        <div
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            className={cn.container}
        >
            <div className={cn.divider} />
            {show && section && (
                <div className={cn.buttons}>
                    <Button
                        className={cn.button}
                        shape="circle"
                        onClick={addUnitHandler}
                        icon={<GoPlus size={20} />}
                    />

                    <Button
                        className={cn.button}
                        shape="circle"
                        onClick={addFileHandler}
                        icon={<AiOutlineFileAdd />}
                    />
                </div>
            )}
            {isFile && <FilePlugin onCancel={addFileHandler} unit={unit} />}
        </div>
    );
};

export default EditorUnitDivider;
