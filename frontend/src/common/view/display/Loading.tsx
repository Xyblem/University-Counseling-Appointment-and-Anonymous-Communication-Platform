import React, { CSSProperties, useEffect, useState } from 'react';
import './Loading.css';

// 定义组件支持的加载类型
export type LoadingType = 'spinner' | 'dots' | 'pulse' | 'skeleton' | 'progress';

// 组件属性接口
export interface LoadingProps {
    /** 加载类型 */
    type?: LoadingType;
    /** 加载文本 */
    text?: string;
    /** 自定义颜色 */
    color?: string;
    /** 尺寸 */
    size?: 'small' | 'medium' | 'large' | number;
    /** 是否全屏显示 */
    fullScreen?: boolean;
    /** 进度百分比(0-100)，仅对progress类型有效 */
    progress?: number;
    /** 自定义样式 */
    style?: CSSProperties;
    /** 自定义类名 */
    className?: string;
    /** 加载速度 */
    speed?: 'slow' | 'normal' | 'fast';
}

export const Loading: React.FC<LoadingProps> = ({
                                                    type = 'spinner',
                                                    text,
                                                    color = '#3f51b5',
                                                    size = 'medium',
                                                    fullScreen = false,
                                                    progress = 0,
                                                    style,
                                                    className = '',
                                                    speed = 'normal'
                                                }) => {
    // 获取尺寸数值
    const getSizeValue = (): number => {
        if (typeof size === 'number') return size;

        const sizeMap = {
            small: 24,
            medium: 40,
            large: 56
        };

        return sizeMap[size];
    };

    // 获取动画速度
    const getSpeedValue = (): string => {
        const speedMap = {
            slow: '1.5s',
            normal: '1s',
            fast: '0.5s'
        };

        return speedMap[speed];
    };

    // 渲染不同类型的加载动画
    const renderLoader = () => {
        const sizeValue = getSizeValue();
        const speedValue = getSpeedValue();

        switch (type) {
            case 'spinner':
                return (
                    <div
                        className="loading-spinner"
                        style={{
                            width: sizeValue,
                            height: sizeValue,
                            borderColor: color,
                            borderTopColor: 'transparent',
                            animationDuration: speedValue
                        }}
                    />
                );

            case 'dots':
                return (
                    <div
                        className="loading-dots"
                        style={{
                            width: sizeValue,
                            height: sizeValue,
                            animationDuration: speedValue
                        }}
                    >
                        {[0, 1, 2].map(i => (
                            <div
                                key={i}
                                className="loading-dot"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                );

            case 'pulse':
                return (
                    <div
                        className="loading-pulse"
                        style={{
                            width: sizeValue,
                            height: sizeValue,
                            backgroundColor: color,
                            animationDuration: speedValue
                        }}
                    />
                );

            case 'skeleton':
                return (
                    <div className="loading-skeleton" style={{ width: '100%' }}>
                        <div
                            className="skeleton-line"
                            style={{
                                height: Math.max(16, sizeValue / 3),
                                backgroundColor: color,
                                animationDuration: speedValue
                            }}
                        />
                        <div
                            className="skeleton-line"
                            style={{
                                height: Math.max(16, sizeValue / 3),
                                width: '80%',
                                backgroundColor: color,
                                animationDuration: speedValue
                            }}
                        />
                        <div
                            className="skeleton-line"
                            style={{
                                height: Math.max(16, sizeValue / 3),
                                width: '60%',
                                backgroundColor: color,
                                animationDuration: speedValue
                            }}
                        />
                    </div>
                );

            case 'progress':
                return (
                    <div className="loading-progress" style={{ width: '100%' }}>
                        <div
                            className="progress-bar"
                            style={{
                                height: Math.max(8, sizeValue / 5),
                                backgroundColor: `${color}20`
                            }}
                        >
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${Math.min(100, Math.max(0, progress))}%`,
                                    backgroundColor: color,
                                    transition: 'width 0.3s ease'
                                }}
                            />
                        </div>
                        {text && (
                            <div className="progress-text" style={{ color }}>
                                {text} {progress > 0 && `${Math.round(progress)}%`}
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    // 主组件渲染
    const content = (
        <div
            className={`loading-container ${className}`}
            style={style}
        >
            <div className="loading-content">
                {type !== 'progress' && renderLoader()}
                {type === 'progress' ? (
                    renderLoader()
                ) : (
                    text && (
                        <div
                            className="loading-text"
                            style={{ color, fontSize: Math.max(14, getSizeValue() / 3) }}
                        >
                            {text}
                        </div>
                    )
                )}
            </div>
        </div>
    );

    // 如果是全屏模式，添加遮罩层
    if (fullScreen) {
        return (
            <div className="loading-overlay">
                {content}
            </div>
        );
    }

    return content;
};


Loading.displayName="Loading";