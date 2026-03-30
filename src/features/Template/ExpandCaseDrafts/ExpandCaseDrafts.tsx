import dayjs from 'dayjs';
import { Template } from '&/entities/Template/model/types/Template';
import { Link } from 'react-router-dom';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import calendar from 'dayjs/plugin/calendar';

import cn from './ExpandCaseDrafts.module.scss';

const ExpandCaseDrafts = ({ row }: { row: { original: Template } }) => {
    dayjs.extend(calendar);
    const { drafts } = row.original;

    if (drafts && drafts.length > 0) {
        return (
            <>
                <ul className={cn.list}>
                    {drafts.map(({ id, title, updated_at, created_at }) => {
                        const updatedAt = dayjs(updated_at);
                        const createdAt = dayjs(created_at);

                        return (
                            <li key={id} className={cn.item}>
                                <div className={cn.title}>
                                    <Link to={`../${AppRoutes.CASES}/${id}`}>{title}</Link>
                                </div>
                                <div className={cn.updated_at}>
                                    {updated_at && dayjs().calendar(updatedAt)}
                                </div>
                                <div className={cn.created_at}>
                                    {created_at && dayjs().calendar(createdAt)}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }

    return <>Drafts not found</>;
};

export default ExpandCaseDrafts;
