import { FC, useMemo } from 'react';
import Chip from '&/shared/ui/Chip/Chip';
import { Dropdown, MenuProps } from 'antd';
import cn from '&/widgets/Tags/ui/TagsList/ui/TagListItem/TagListItem.module.scss';
import { HiDotsVertical } from 'react-icons/hi';
import { TemplateKeyWord } from '&/entities/Template/model/types/TemplateKeyWord';
import { DeleteTemplateKeyWord } from '&/features/Template';

interface Props {
    keyWord: TemplateKeyWord;
}

const KeyWordItem: FC<Props> = (props) => {
    const { keyWord } = props;

    const items: MenuProps['items'] = useMemo(() => {
        return [
            {
                key: '1',
                label: <DeleteTemplateKeyWord keyWord={keyWord} />,
            },
        ];
    }, [keyWord]);

    return (
        <Chip
            key={keyWord.id}
            title={keyWord.code}
            // copy={`{{${keyWord.code}}}`}
            control={
                <Dropdown
                    className={cn.dropdown}
                    menu={{ items }}
                    placement="bottomLeft"
                    trigger={['click']}
                >
                    <span className={cn.menu}>
                        <HiDotsVertical />
                    </span>
                </Dropdown>
            }
        />
    );
};

export default KeyWordItem;
