import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Carousel, Modal } from 'antd';
import classNames from 'classnames';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { CarouselRef } from 'antd/es/carousel';
import { TagScope } from '&/entities/Tag/model/types/Tag';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateCurrentSection } from '&/entities/Template/model/selectors/getTemplateCurrentSection';
import { getTemplateGlobalSection } from '&/entities/Template/model/selectors/getTemplateGlobalSection';
import { getTag } from '&/entities/Tag/model/selectors/getTag';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import { getTagInit } from '&/entities/Tag/model/selectors/getTagInit';
import { tagsActions } from '&/entities/Tag/model/slice/tagsSlice';
import { getTagName } from '&/shared/utils';
import { createTag } from '&/entities/Tag/model/services/createTag';
import { TagType } from '&/shared/types/TagTypes';
import AddTagTitle from '&/features/Tag/AddTag/ui/AddTagTitle/AddTagTitle';
import AddTagRequired from '&/features/Tag/AddTag/ui/AddTagRequired/AddTagRequired';
import AddTagChoice from '&/features/Tag/AddTag/ui/AddTagChoice/AddTagChoice';
import AddTagType from '&/features/Tag/AddTag/ui/AddTagType/AddTagType';
import cn from './AddTag.module.scss';

interface AddTagProps {
    scope: TagScope;
    query: string;
    setQuery: (query: string) => void;
}

const AddTag: FC<AddTagProps> = (props) => {
    const { scope, query, setQuery } = props;
    const ref = useRef<CarouselRef>(null);
    const currentSection = useAppSelector(getTemplateCurrentSection);
    const globalSection = useAppSelector(getTemplateGlobalSection);
    const tag = useAppSelector(getTag);
    const template = useAppSelector(getTemplate);
    const tagInit = useAppSelector(getTagInit);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [slide, setSlide] = useState(0);

    const prevHandler = () => {
        ref?.current?.prev();
    };
    const nextHandler = () => {
        ref?.current?.next();
    };

    const addTagHandler = useCallback(() => {
        setOpen(true);
        const section = scope === 'global' ? globalSection : currentSection;
        dispatch(
            tagsActions.addTag({
                title: query,
                node: template.id,
                name: getTagName(query),
                section_id: section.id,
                section: section.id,
            }),
        );
    }, [currentSection, dispatch, globalSection, query, scope, template]);

    const cancelHandler = useCallback(() => {
        setSlide(0);
        setOpen(false);
        setQuery('');
        dispatch(tagsActions.deleteTag());
        dispatch(tagsActions.setTagInit(null));
    }, [dispatch, setQuery]);

    const createTagHandler = useCallback(() => {
        setSlide(0);
        setQuery('');
        setOpen(false);
        dispatch(createTag());
        dispatch(tagsActions.setTagInit(null));
    }, [dispatch, setQuery]);

    const addOptionHandler = useCallback(() => {
        dispatch(tagsActions.addTagOption());
    }, [dispatch]);

    useEffect(() => {
        if (tagInit) {
            if (tagInit !== scope) {
                setQuery('');
            }
        }
    }, [scope, setQuery, tagInit]);

    const isChoice = tag?.type === TagType.CHOICE || tag?.type === TagType.CHOICES;
    const filledOptions = tag?.options?.filter((option) => !!option.title);
    const canApplyTag = isChoice ? filledOptions && filledOptions.length > 1 : !!tag?.type;

    return (
        <>
            <Button onClick={addTagHandler}>Create tag</Button>
            <Modal
                title="New tag"
                open={open}
                onCancel={cancelHandler}
                footer={
                    <div className={cn.footer}>
                        {slide === 1 && <Button onClick={addOptionHandler}>Add Option</Button>}
                        {!!canApplyTag && (
                            <Button type="primary" onClick={createTagHandler}>
                                Apply
                            </Button>
                        )}
                    </div>
                }
            >
                <div className={cn.content}>
                    <div className={cn.arrows}>
                        {slide === 0 ? (
                            <div />
                        ) : (
                            <div onClick={prevHandler} className={cn.arrow}>
                                <AiOutlineArrowLeft />
                                <span>Select type</span>
                            </div>
                        )}
                        {slide === 0 && isChoice && (
                            <div onClick={nextHandler} className={classNames(cn.arrow)}>
                                <span>Options</span>
                                <AiOutlineArrowRight />
                            </div>
                        )}
                    </div>
                    <Carousel
                        ref={ref}
                        slidesToShow={1}
                        slidesToScroll={1}
                        dots={false}
                        autoplay={false}
                        adaptiveHeight
                        effect="fade"
                        // @ts-ignore
                        beforeChange={(current, next) => setSlide(next)}
                    >
                        <div className={classNames(cn.slide)}>
                            <AddTagTitle />
                            <AddTagRequired />
                            <AddTagType />
                        </div>

                        <div className={classNames(cn.slide)}>
                            <AddTagChoice />
                        </div>
                    </Carousel>
                </div>
            </Modal>
        </>
    );
};

export default AddTag;
