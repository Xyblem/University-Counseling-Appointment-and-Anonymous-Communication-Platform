import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

// 按钮类型定义
type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link';
//按钮尺寸定义
type ButtonSize = 'small' | 'medium' | 'large';
//按钮形状定义
type ButtonShape = 'default' | 'circle' | 'round';

// 组件Props接口
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement|HTMLAnchorElement>, 'type'> {
    /** 按钮类型 */
    type?: ButtonType;
    /** 按钮尺寸 */
    size?: ButtonSize;
    /** 按钮形状 */
    shape?: ButtonShape;
    /** 是否禁用 */
    disabled?: boolean;
    /** 加载状态 */
    loading?: boolean;
    /** 危险按钮（红色警告） */
    danger?: boolean;
    /** 幽灵按钮（透明背景） */
    ghost?: boolean;
    /** 块级按钮（宽度100%） */
    block?: boolean;
    /** 左侧图标 */
    icon?: ReactNode;
    /** 右侧图标 */
    iconRight?: ReactNode;
    /** 仅图标按钮（不显示文字） */
    iconOnly?: boolean;
    /** 点击事件 */
    onClick?: React.MouseEventHandler<HTMLElement>;
    /** 子元素 */
    children?: ReactNode;
    /** 自定义类名 */
    className?: string;
    /** 链接按钮的href（仅当type='link'时有效） */
    href?: string;
    /** 链接按钮的target属性 */
    target?: string;
    /** 是否为表单提交按钮*/
    summit?:boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
    const {
        type = 'default',
        size = 'medium',
        shape = 'default',
        disabled = false,
        loading = false,
        danger = false,
        ghost = false,
        block = false,
        icon,
        iconRight,
        iconOnly = false,
        onClick,
        children,
        className = '',
        href,
        target,
        summit,
        ...restProps
    } = props;

    // 处理点击事件
    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (loading || disabled) {
            e.preventDefault();
            return;
        }
        (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
    };

    // 构建CSS类名
    const classes = [
        'button',
        `button-${type}`,
        `button-${size}`,
        shape !== 'default' && `button-${shape}`,
        disabled && 'button-disabled',
        loading && 'button-loading',
        danger && 'button-danger',
        ghost && 'button-ghost',
        block && 'button-block',
        iconOnly && 'button-icon-only',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    // 渲染加载图标
    const renderLoadingIcon = () => (
        <span className="button-loading-icon">
      <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
            opacity="0.4"
        />
        <path
            d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8V2z"
        >
          <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="1s"
              repeatCount="indefinite"
          />
        </path>
      </svg>
    </span>
    );

    // 渲染图标
    const renderIcon = (iconNode: ReactNode, position: 'left' | 'right') => (
        <span className={`button-icon button-icon-${position}`}>
      {iconNode}
    </span>
    );

    // 渲染内容
    const renderContent = () => (
        <>
            {loading && renderLoadingIcon()}
            {icon && !loading && renderIcon(icon, 'left')}
            {!iconOnly && children && <span className="button-text">{children}</span>}
            {iconRight && renderIcon(iconRight, 'right')}
        </>
    );

    // 链接按钮
    if (type === 'link' && href) {
        return (
            <a
                className={classes}
                href={disabled ? undefined : href}
                target={target}
                onClick={handleClick}
                {...restProps}
            >
                {renderContent()}
            </a>
        );
    }

    // 普通按钮
    return (
        <button
            type={summit?"submit":"button"}
            className={classes}
            disabled={disabled || loading}
            onClick={handleClick}
            {...restProps}
        >
            {renderContent()}
        </button>
    );
};

Button.displayName='Button';
