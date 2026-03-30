import { FC, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip } from 'antd';
import cn from './Chip.module.scss';

interface ChipClassNames {
    chip?: string;
    chipActive?: string;
}

interface TagProps {
    title?: ReactNode | string;
    control?: ReactNode | null;
    badge?: ReactNode | string;
    className?: string;
    classes?: ChipClassNames;
    level?: number;
    active?: boolean;
    setActive?: () => void;
    onClick?: () => void;
    copy?: string;
    tooltip?: string;
    filled?: boolean;
    exhibit?: boolean;
}

const Chip: FC<TagProps> = (props) => {
    const {
        title,
        control,
        badge,
        className,
        classes,
        active,
        setActive,
        onClick,
        copy,
        tooltip,
        filled,
        level = 1,
        exhibit = false,
    } = props;
    const [copied, setCopied] = useState(false);
    const setActiveHandler = () => {
        if (setActive) {
            setActive();
        }
    };

    useEffect(() => {
        let timeout: any;
        if (copied) {
            timeout = setTimeout(() => {
                setCopied(false);
            }, 1000);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [copied]);

    const chipClasses = {
        [cn.active]: active,
        [cn.bc]: badge && control,
        [cn.b]: badge && !control,
        [cn.c]: !badge && control,
        [cn.filled]: filled,
        [cn.exhibit]: exhibit,
        [cn.exhibitActive]: exhibit && active,
        [cn.activeFilled]: active && filled,
    };

    if (classes?.chipActive) {
        chipClasses[classes?.chipActive] = active;
    }

    return (
        <div className={classNames(cn.container, className)} onClick={onClick}>
            <div
                className={classNames(cn.chip, classes?.chip, [cn[`depth_${level}`]], chipClasses)}
            >
                <Tooltip title={tooltip} color="#475E70">
                    {!!copy ? (
                        <CopyToClipboard text={copy} onCopy={() => setCopied(true)}>
                            <Tooltip title="Copied!" open={copied} color="#475E70">
                                <div className={cn.title}>{title}</div>
                            </Tooltip>
                        </CopyToClipboard>
                    ) : (
                        <div onClick={setActiveHandler} className={cn.title}>
                            {title}
                        </div>
                    )}
                </Tooltip>

                {badge && (
                    <div className={cn.badgeContainer}>
                        <div className={cn.badge}>{badge}</div>
                    </div>
                )}
                {control && <div className={cn.control}>{control}</div>}
            </div>
        </div>
    );
};

export default Chip;
