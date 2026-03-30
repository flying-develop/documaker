import { FC, PropsWithChildren } from 'react';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { Card } from 'antd';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import cn from './EditorSectionUnit.module.scss';

interface FileUnitProps {
    unit: TemplateUnit;
}

const EditorSectionUnit: FC<PropsWithChildren<FileUnitProps>> = (props) => {
    const { unit, children } = props;
    return (
        <Card
            classNames={{ body: cn.container }}
            hoverable
            style={{ marginTop: 0, marginBottom: 5 }}
        >
            <div className={cn.controls}>
                {children}
                <AiOutlineFolderOpen size={20} />
            </div>
            <span>{unit.title}</span>
        </Card>
    );
};

export default EditorSectionUnit;
