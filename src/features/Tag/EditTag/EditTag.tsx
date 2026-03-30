import { FC, useCallback, useRef, useState } from 'react';
import { AiFillEdit, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { Button, Carousel, Modal } from 'antd';
import classNames from 'classnames';
import { CarouselRef } from 'antd/es/carousel';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { Tag } from '&/entities/Tag/model/types/Tag';
import { getTag } from '&/entities/Tag/model/selectors/getTag';
import { getTemplate } from '&/entities/Template/model/selectors/getTemplate';
import { tagsActions } from '&/entities/Tag/model/slice/tagsSlice';
import { updateTag } from '&/entities/Tag/model/services/updateTag';
import { TagType } from '&/shared/types/TagTypes';
import AddTagTitle from '&/features/Tag/AddTag/ui/AddTagTitle/AddTagTitle';
import AddTagRequired from '&/features/Tag/AddTag/ui/AddTagRequired/AddTagRequired';
import AddTagChoice from '&/features/Tag/AddTag/ui/AddTagChoice/AddTagChoice';
import AddTagType from '&/features/Tag/AddTag/ui/AddTagType/AddTagType';
import cn from './EditTag.module.scss';

interface DeleteTagProps {
    tag?: Tag;
}

const EditTag: FC<DeleteTagProps> = (props) => {
    const { tag: tagInitial } = props;
    const ref = useRef<CarouselRef>(null);
    const dispatch = useAppDispatch();
    const tag = useAppSelector(getTag);
    const template = useAppSelector(getTemplate);

    const [open, setOpen] = useState(false);
    const [slide, setSlide] = useState(0);

    const openTagHandler = useCallback(() => {
        if (tagInitial) {
            setOpen(true);
            dispatch(tagsActions.setTag({ ...tagInitial, node: template.id }));
        }
    }, [dispatch, tagInitial, template.id]);

    const cancelHandler = useCallback(() => {
        setSlide(0);
        setOpen(false);
    }, []);

    const updateTagHandler = useCallback(() => {
        setSlide(0);
        setOpen(false);
        dispatch(updateTag());
    }, [dispatch]);

    const addOptionHandler = useCallback(() => {
        dispatch(tagsActions.addTagOption());
    }, [dispatch]);

    const prevHandler = () => {
        ref?.current?.prev();
    };
    const nextHandler = () => {
        ref?.current?.next();
    };

    const isChoice = tag?.type === TagType.CHOICE || tag?.type === TagType.CHOICES;
    const canApplyTag =
        (tag?.type && tag.type !== TagType.CHOICE) ||
        (isChoice && tag?.options?.length && tag.options.length > 1);

    return (
        <>
            <div onClick={openTagHandler} className={cn.row}>
                <AiFillEdit />
                <span>Edit</span>
            </div>
            <Modal
                title="Edit tag"
                open={open}
                onCancel={cancelHandler}
                footer={
                    <div className={cn.footer}>
                        {slide === 1 && <Button onClick={addOptionHandler}>Add Option</Button>}
                        {!!canApplyTag && (
                            <Button type="primary" onClick={updateTagHandler}>
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
                                <span>Options of choice</span>
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

export default EditTag;
