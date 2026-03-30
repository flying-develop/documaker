import { filesize } from 'filesize';
import classNames from 'classnames';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GrDocumentDownload, GrDocumentUpload } from 'react-icons/gr';
// import { AcceptedFiles } from '&/shared/config/AcceptedFiles';
import { UploadFile } from '&/shared/types/UploadFile';
import { Button } from 'antd';
import { AiOutlineClose } from 'react-icons/ai';
import cn from './Dropzone.module.scss';

/**

 const onDrop = useCallback((files: File[]) => {
 console.log(files)
 }, [])

 */

interface DropzoneProps {
    onDrop?: (files: File[]) => void;
    className?: string;
    disabled?: boolean;
    accept?: Record<string, string[]>;
    maxSize?: number; // bytes
    file?: UploadFile;
    onDelete?: () => void;
}

const Dropzone: FC<DropzoneProps> = (props) => {
    const {
        onDrop,
        className = '',
        disabled = false,
        // accept = { ...AcceptedFiles.XLSX, ...AcceptedFiles.CSV, ...AcceptedFiles.JSON },
        maxSize = 1000 * 1000 * 50,
        file,
        onDelete,
    } = props;
    const [error, setError] = useState(false);

    const fz = filesize(maxSize);

    const onDropAccepted = useCallback(() => {
        if (error) {
            setError(false);
        }
    }, [error]);

    const { getRootProps, getInputProps, isDragReject, isDragAccept, fileRejections } = useDropzone(
        { onDrop, onDropAccepted, disabled, maxSize },
    );

    // const extensions = useMemo(() => {
    //     return Object.values(accept)
    //         .map((value) => value)
    //         .flat()
    //         .join(' ');
    // }, [accept]);

    const hint = useMemo(() => {
        return error ? 'Please upload correct file' : 'Upload file';
    }, [error]);

    useEffect(() => {
        setError((!!fileRejections.length || isDragReject) && !isDragAccept);
        fileRejections.length = 0;
    }, [fileRejections, isDragReject, isDragAccept]);

    if (file) {
        return (
            <div className={classNames(cn.file, className)}>
                <GrDocumentDownload size={20} />
                <span className={cn.title}>
                    <span>{file.name}</span>
                    <span>({filesize(file.size)})</span>
                </span>
                <Button onClick={onDelete} className={cn.close} icon={<AiOutlineClose />} />
            </div>
        );
    }

    return (
        <div
            {...getRootProps({
                className: classNames(cn.Dropzone, className, {
                    [cn.error]: isDragReject || error,
                    [cn.focus]: isDragAccept,
                }),
            })}
        >
            <input {...getInputProps()} />
            <GrDocumentUpload size={20} />
            <span className={cn.title}>
                <span>{hint}</span>
                <span>max size {fz}</span>
            </span>
        </div>
    );
};

export default Dropzone;
