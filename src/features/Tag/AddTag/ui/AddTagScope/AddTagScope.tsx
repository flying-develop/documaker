import { FC, useCallback } from 'react';
import { Segmented } from 'antd';
import { SegmentedValue } from 'rc-segmented';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTag } from '&/entities/Tag/model/selectors/getTag';
import { tagsActions } from '&/entities/Tag/model/slice/tagsSlice';
import { TagScope } from '&/entities/Tag/model/types/Tag';
import cn from './AddTagScope.module.scss';

const AddTagScope: FC = () => {
    const dispatch = useAppDispatch();
    const tag = useAppSelector(getTag);

    const scopeHandler = useCallback(
        (scope: SegmentedValue) => {
            if (scope) {
                dispatch(tagsActions.updateTag({ scope: scope as TagScope }));
            }
        },
        [dispatch],
    );

    return (
        <Segmented
            className={cn.segment}
            options={[
                {
                    label: 'Global',
                    value: 'global',
                },
                {
                    label: 'Local',
                    value: 'local',
                },
            ]}
            onChange={scopeHandler}
            value={tag.scope}
        />
    );
};

export default AddTagScope;
