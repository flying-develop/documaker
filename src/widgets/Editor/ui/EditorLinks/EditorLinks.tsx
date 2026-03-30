import { FC, Key, ReactNode, useMemo, useState } from 'react';
import { GetProp, Menu, MenuProps, Modal } from 'antd';
import { AiOutlineLink, AiOutlinePushpin } from 'react-icons/ai';
import EditorLinksLink from '&/widgets/Editor/ui/EditorLinks/ui/EditorLinksLink/EditorLinksLink';
import { useAppSelector } from '&/app/providers/Store';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import EditorLinksAnchor from './ui/EditorLinksAnchor/EditorLinksAnchor';

interface Props {
    editor: any;
    onCancel: () => void;
    withAnchor?: boolean;
}

type MenuItem = GetProp<MenuProps, 'items'>[number];

function getItem(
    label: ReactNode,
    key?: Key | null,
    icon?: ReactNode,
    disabled?: boolean,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        disabled,
    } as MenuItem;
}

const EditorLinks: FC<Props> = (props) => {
    const { onCancel, editor, withAnchor = true } = props;
    const [key, setKey] = useState('');
    const editedSection = useAppSelector(getTemplateEditedSection);
    const onClick: MenuProps['onClick'] = (evt) => {
        setKey(evt.key);
    };

    const menuItems: MenuItem[] = useMemo(() => {
        const items = [
            getItem(
                'Create link',
                'link',
                <AiOutlineLink />,
                // !editedSection?.children?.length && !editedSection?.anchors?.length,
            ),
        ];
        if (withAnchor) {
            items.push(getItem('Add anchor', 'anchor', <AiOutlinePushpin />));
        }
        return items;
    }, [editedSection, withAnchor]);
    return (
        <Modal title="Insert Link" open onCancel={onCancel} footer={null}>
            {!key && <Menu items={menuItems} onClick={onClick} />}
            {withAnchor && key === 'anchor' && (
                <EditorLinksAnchor editor={editor} onCancel={onCancel} />
            )}
            {key === 'link' && <EditorLinksLink editor={editor} onCancel={onCancel} />}
        </Modal>
    );
};

export default EditorLinks;
