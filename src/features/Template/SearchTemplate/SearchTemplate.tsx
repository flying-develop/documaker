import { FC, useState } from 'react';
import { Input } from 'antd';
import { useDebounce } from 'react-use';
import { useAppDispatch } from '&/app/providers/Store';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import cn from './SearchTemplate.module.scss';

const SearchTemplate: FC = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState<string>('');

    useDebounce(
        () => {
            if (search) {
                if (search.length > 2) {
                    dispatch(templatesActions.setTemplateFilter({ search }));
                }
            } else {
                dispatch(templatesActions.deleteTemplateFilter('search'));
            }
        },
        300,
        [dispatch, search],
    );

    return (
        <div>
            <Input
                type="search"
                value={search}
                placeholder="Search"
                className={cn.search}
                onInput={({ currentTarget }) => {
                    setSearch(currentTarget.value);
                }}
            />
        </div>
    );
};

export default SearchTemplate;
