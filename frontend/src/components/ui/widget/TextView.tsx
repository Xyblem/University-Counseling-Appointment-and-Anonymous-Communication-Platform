import React, { useState, useRef, useEffect } from 'react';
import './TextDisplay.css';

// 组件属性类型定义
interface TextDisplayProps {
    /** 要显示的文本内容 */
    text: string;
    /** 最大显示行数，默认为1（单行） */
    maxLines?: number;
    /** 是否显示复制按钮 */
    copyable?: boolean;
    /** 复制成功后的回调函数 */
    onCopy?: (text: string) => void;
    /** 自定义CSS类名 */
    className?: string;
    /** 自定义内联样式 */
    style?: React.CSSProperties;
    /** 是否允许文本选择 */
    selectable?: boolean;
    /** 文本对齐方式 */
    align?: 'left' | 'center' | 'right' | 'justify';
    /** 文本溢出时是否显示提示框 */
    showTooltip?: boolean;
    /** 自定义提示框内容 */
    tooltipContent?: string;
}

const TextView: React.FC<TextDisplayProps> = ({
                                                     text,
                                                     maxLines = 1,
                                                     copyable = false,
                                                     onCopy,
                                                     className = '',
                                                     style,
                                                     selectable = false,
                                                     align = 'left',
                                                     showTooltip = true,
                                                     tooltipContent,
                                                 }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [showFullText, setShowFullText] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    // 检查文本是否溢出
    useEffect(() => {
        const checkOverflow = () => {
            if (textRef.current) {
                const element = textRef.current;
                const isOverflowing =
                    element.scrollHeight > element.clientHeight ||
                    element.scrollWidth > element.clientWidth;
                setIsOverflowed(isOverflowing);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, [text, maxLines]);

    // 复制文本到剪贴板
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            onCopy?.(text);

            // 2秒后重置复制状态
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('复制失败:', err);
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setIsCopied(true);
            onCopy?.(text);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    // 计算样式类名
    const getTextClassName = () => {
        const classes = ['text-display'];

        if (className) classes.push(className);
        if (!selectable) classes.push('text-not-selectable');
        if (maxLines > 1) classes.push(`text-multiline-${maxLines}`);

        return classes.join(' ');
    };

    // 获取对齐样式
    const getAlignStyle = () => {
        return { textAlign: align };
    };

    // 处理点击显示完整文本
    const handleTextClick = () => {
        if (isOverflowed && showTooltip) {
            setShowFullText(!showFullText);
        }
    };

    return (
        <div className="text-display-container">
            <div className="text-content-wrapper">
                <p
                    ref={textRef}
                    className={getTextClassName()}
                    style={{ ...style, ...getAlignStyle() }}
                    onClick={handleTextClick}
                    title={showTooltip && isOverflowed ? (tooltipContent || text) : undefined}
                >
                    {text}
                </p>

                {copyable && (
                    <button
                        className={`copy-button ${isCopied ? 'copied' : ''}`}
                        onClick={handleCopy}
                        aria-label={isCopied ? '已复制' : '复制文本'}
                    >
                        {isCopied ? '✓' : '📋'}
                    </button>
                )}
            </div>

            {/* 完整文本弹出层 */}
            {showFullText && isOverflowed && (
                <div className="full-text-overlay" onClick={() => setShowFullText(false)}>
                    <div className="full-text-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="close-button"
                            onClick={() => setShowFullText(false)}
                            aria-label="关闭"
                        >
                            ×
                        </button>
                        <pre>{text}</pre>
                        {copyable && (
                            <button className="copy-button-full" onClick={handleCopy}>
                                {isCopied ? '已复制' : '复制全文'}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TextView;