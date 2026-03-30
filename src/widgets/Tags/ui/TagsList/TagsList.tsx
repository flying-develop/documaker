import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import { Tag, TagScope } from '&/entities/Tag/model/types/Tag';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTag } from '&/entities/Tag/model/selectors/getTag';
import { getTagLoadingSection } from '&/entities/Tag/model/selectors/getTagLoadingSection';
import { getTemplateCurrentSection } from '&/entities/Template/model/selectors/getTemplateCurrentSection';
import { getTagInit } from '&/entities/Tag/model/selectors/getTagInit';
import { getTemplateGlobalSection } from '&/entities/Template/model/selectors/getTemplateGlobalSection';
import { tagsActions } from '&/entities/Tag/model/slice/tagsSlice';
import TagListItem from '&/widgets/Tags/ui/TagsList/ui/TagListItem/TagListItem';
import { AddTag } from '&/features/Tag';
import Loading from '&/shared/ui/Loading/Loading';
import { TagType } from '&/shared/types/TagTypes';
import cn from './TagsList.module.scss';

interface TagsListProps {
    scope: TagScope;
}

const TagsList: FC<TagsListProps> = ({ scope }) => {
    const dispatch = useAppDispatch();
    const tag = useAppSelector(getTag);
    const loadingSection = useAppSelector(getTagLoadingSection);
    const tagInit = useAppSelector(getTagInit);
    const currentSection = useAppSelector(getTemplateCurrentSection);
    const globalSection = useAppSelector(getTemplateGlobalSection);

    const [query, setQuery] = useState('');

    const searchHandler = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            const { value } = evt.target;
            setQuery(value);
            dispatch(tagsActions.setTagInit(value ? scope : null));
        },
        [dispatch, scope],
    );

    const list = useMemo(() => {
        const tags: Tag[] =
            scope === 'global' ? globalSection?.tags || [] : currentSection?.tags || [];

        return tags
            .filter((tag) => tag.type !== TagType.FILE)
            .filter((tag) =>
                query
                    ? tag.title?.toLowerCase().includes(query.toLowerCase()) ||
                      tag.name?.toLowerCase().includes(query.toLowerCase())
                    : true,
            );
    }, [currentSection, globalSection, query, scope]);

    const withButton = useMemo(() => {
        return !!query && list.filter((tag) => query === tag.title).length === 0;
    }, [list, query]);

    const loading = useMemo(() => {
        const section = scope === 'global' ? globalSection : currentSection;
        return loadingSection === section?.id;
    }, [currentSection, globalSection, loadingSection, scope]);

    return (
        <div
            className={classNames(cn.container, {
                [cn.withButton]: withButton,
            })}
        >
            <Input value={query} onChange={searchHandler} />
            <div
                className={classNames(cn.list, {
                    [cn.short]: scope === tagInit,
                })}
            >
                {list.map((tag) => {
                    return <TagListItem key={tag.id} tag={tag} />;
                })}
            </div>
            {(tag.title || withButton) && (
                <AddTag scope={scope} query={query} setQuery={setQuery} />
            )}
            {loading && <Loading />}
        </div>
    );
};

export default TagsList;
