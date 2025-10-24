import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useRef,
    useEffect,
    CSSProperties,
    ReactNode
} from 'react';
import './Dialog.css';

// 对话框类型定义
export type DialogType = 'fixed' | 'modal';

// 对话框位置定义
export interface DialogPosition {
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
}

// 对话框属性接口
export interface DialogProps {
    children: ReactNode;
    type?: DialogType;
    title?: string;
    width?: number | string;
    height?: number | string;
    position?: DialogPosition;
    className?: string;
    style?: CSSProperties;
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    backdropClassName?: string;
    draggable?: boolean;
    resizable?: boolean;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    autoOpen?:boolean;
}

// 对话框引用接口
export interface DialogRef {
    open: () => void;
    close: () => void;
    isOpen: boolean;
}

// 对话框组件实现
export const Dialog = forwardRef<DialogRef, DialogProps>((props, ref) => {
    const {
        children,
        type = 'modal',
        title,
        width = 500,
        height = 'auto',
        position = {},
        className = '',
        style = {},
        showCloseButton = true,
        closeOnBackdropClick = true,
        closeOnEscape = true,
        onClose,
        onOpen,
        backdropClassName = '',
        draggable = false,
        resizable = false,
        minWidth = 200,
        minHeight = 150,
        maxWidth = 1200,
        maxHeight = 800,
        autoOpen= false,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dialogPosition, setDialogPosition] = useState<DialogPosition>(position);
    const [dialogSize, setDialogSize] = useState({ width, height });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const dialogRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true);
            onOpen?.();
        },
        close: () => {
            setIsOpen(false);
            onClose?.();
        },
        isOpen
    }));


    useEffect(() => {
        if(autoOpen){
            setIsOpen(true);
        }
    }, []);


    // 处理ESC键关闭
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && closeOnEscape && isOpen) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // 防止背景滚动
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, closeOnEscape]);

    // 处理拖拽
    useEffect(() => {
        if (!draggable || !isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || type !== 'fixed') return;

            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            setDialogPosition({
                left: newX,
                top: newY
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset, draggable, type]);

    // 处理拖拽开始
    const handleDragStart = (e: React.MouseEvent) => {
        if (!draggable || type !== 'fixed') return;

        const dialogRect = dialogRef.current?.getBoundingClientRect();
        if (!dialogRect) return;

        setIsDragging(true);
        setDragOffset({
            x: e.clientX - dialogRect.left,
            y: e.clientY - dialogRect.top
        });
    };

    // 处理关闭
    const handleClose = () => {
        setIsOpen(false);
        onClose?.();
    };

    // 处理背景点击
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && closeOnBackdropClick) {
            handleClose();
        }
    };

    // 处理调整大小
    const handleResize = (e: React.MouseEvent, direction: string) => {
        if (!resizable) return;

        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = typeof dialogSize.width === 'number' ? dialogSize.width : parseInt(dialogSize.width as string);
        const startHeight = typeof dialogSize.height === 'number' ? dialogSize.height : parseInt(dialogSize.height as string);

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;

            if (direction.includes('e')) newWidth = Math.min(Math.max(startWidth + deltaX, minWidth), maxWidth);
            if (direction.includes('s')) newHeight = Math.min(Math.max(startHeight + deltaY, minHeight), maxHeight);
            if (direction.includes('w')) newWidth = Math.min(Math.max(startWidth - deltaX, minWidth), maxWidth);
            if (direction.includes('n')) newHeight = Math.min(Math.max(startHeight - deltaY, minHeight), maxHeight);

            setDialogSize({
                width: newWidth,
                height: newHeight
            });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    if (!isOpen) return null;

    const dialogStyle: CSSProperties = {
        width: dialogSize.width,
        height: dialogSize.height,
        ...style
    };

    // 如果是固定对话框，添加位置样式
    if (type === 'fixed') {
        Object.assign(dialogStyle, dialogPosition);
    }

    return (
        <div
            className={`dialog-backdrop ${type} ${backdropClassName}`}
            onClick={handleBackdropClick}
        >
            <div
                ref={dialogRef}
                className={`dialog ${type} ${className} ${isDragging ? 'dragging' : ''}`}
                style={dialogStyle}
            >
                {/* 标题栏 */}
                {(title || showCloseButton) && (
                    <div
                        ref={headerRef}
                        className="dialog-header"
                        onMouseDown={handleDragStart}
                    >
                        {title && <div className="dialog-title">{title}</div>}
                        {showCloseButton && (
                            <button
                                className="dialog-close-button"
                                onClick={handleClose}
                                aria-label="关闭对话框"
                            >
                                ×
                            </button>
                        )}
                    </div>
                )}

                {/* 内容区域 */}
                <div className="dialog-content">
                    {children}
                </div>

                {/* 调整大小控制点 */}
                {resizable && (
                    <>
                        <div className="resize-handle resize-n" onMouseDown={(e) => handleResize(e, 'n')}></div>
                        <div className="resize-handle resize-e" onMouseDown={(e) => handleResize(e, 'e')}></div>
                        <div className="resize-handle resize-s" onMouseDown={(e) => handleResize(e, 's')}></div>
                        <div className="resize-handle resize-w" onMouseDown={(e) => handleResize(e, 'w')}></div>
                        <div className="resize-handle resize-ne" onMouseDown={(e) => handleResize(e, 'ne')}></div>
                        <div className="resize-handle resize-se" onMouseDown={(e) => handleResize(e, 'se')}></div>
                        <div className="resize-handle resize-sw" onMouseDown={(e) => handleResize(e, 'sw')}></div>
                        <div className="resize-handle resize-nw" onMouseDown={(e) => handleResize(e, 'nw')}></div>
                    </>
                )}
            </div>
        </div>
    );
});

Dialog.displayName = 'Dialog';