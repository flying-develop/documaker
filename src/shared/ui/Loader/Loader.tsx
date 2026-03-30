import style from './Loader.module.scss';

interface LoaderProps {
    loading: boolean;
    loadingColor?: string;
    backgroundColor?: string;
}

export const Loader = ({
    loading,
    backgroundColor = 'rgba(236, 240, 241, 0.7)',
    loadingColor = '#e74c3c',
}: LoaderProps) => {
    const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};
    const loadingColorStyle = loadingColor ? { backgroundColor: loadingColor } : {};

    return loading ? (
        <div className={style.background} style={backgroundColorStyle}>
            <div className={style.bar}>
                <div className={style.circle_1} style={loadingColorStyle} />
                <div className={style.circle_2} style={loadingColorStyle} />
            </div>
        </div>
    ) : null;
};
