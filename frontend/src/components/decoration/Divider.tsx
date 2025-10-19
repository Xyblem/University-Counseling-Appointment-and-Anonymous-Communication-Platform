import React from 'react';
import './Divider.css';

// 定义分界线类型
export type DividerType =
    | 'solid'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'gradient'
    | 'shadow'
    | 'zigzag'
    | 'wave';

// 定义方向类型
export type DividerOrientation = 'horizontal' | 'vertical';

// 定义文字位置类型
export type TextPosition = 'left' | 'center' | 'right';

// 组件属性接口
export interface DividerProps {
    /** 分界线类型 */
    type?: DividerType;
    /** 方向 */
    orientation?: DividerOrientation;
    /** 线条粗细 */
    thickness?: number;
    /** 线条颜色 */
    color?: string;
    /** 渐变起始颜色（仅当type为'gradient'时使用） */
    gradientFrom?: string;
    /** 渐变结束颜色（仅当type为'gradient'时使用） */
    gradientTo?: string;
    /** 分界线长度 */
    length?: string;
    /** 上下/左右间距 */
    spacing?: string;
    /** 是否显示文字 */
    text?: string;
    /** 文字位置 */
    textPosition?: TextPosition;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({
                                             type = 'solid',
                                             orientation = 'horizontal',
                                             thickness = 1,
                                             color = '#e0e0e0',
                                             gradientFrom = '#667eea',
                                             gradientTo = '#764ba2',
                                             length,
                                             spacing = '16px',
                                             text,
                                             textPosition = 'center',
                                             className = '',
                                             style,
                                         }) => {
    // 生成分界线样式
    const getDividerStyle = (): React.CSSProperties => {
        const baseStyle: React.CSSProperties = {
            backgroundColor: color,
            ...style,
        };

        // 设置方向相关样式
        if (orientation === 'horizontal') {
            baseStyle.width = length;
            baseStyle.height = `${thickness}px`;
            baseStyle.margin = `${spacing} 0`;
        } else {
            baseStyle.width = `${thickness}px`;
            baseStyle.height = length;
            baseStyle.margin = `0 ${spacing}`;
        }

        // 根据类型设置特殊样式
        switch (type) {
            case 'dashed':
                baseStyle.border = 'none';
                baseStyle.backgroundImage = `repeating-linear-gradient(${
                    orientation === 'horizontal' ? 'to right' : 'to bottom'
                }, ${color}, ${color} 5px, transparent 5px, transparent 10px)`;
                baseStyle.backgroundColor = 'transparent';
                break;

            case 'dotted':
                baseStyle.border = 'none';
                baseStyle.backgroundImage = `repeating-linear-gradient(${
                    orientation === 'horizontal' ? 'to right' : 'to bottom'
                }, ${color}, ${color} 2px, transparent 2px, transparent 6px)`;
                baseStyle.backgroundColor = 'transparent';
                break;

            case 'double':
                if (orientation === 'horizontal') {
                    baseStyle.height = `${thickness * 3}px`;
                    baseStyle.background = `linear-gradient(to bottom, 
            ${color} 0%, ${color} ${thickness}px, 
            transparent ${thickness}px, transparent ${thickness * 2}px, 
            ${color} ${thickness * 2}px, ${color} ${thickness * 3}px)`;
                } else {
                    baseStyle.width = `${thickness * 3}px`;
                    baseStyle.background = `linear-gradient(to right, 
            ${color} 0%, ${color} ${thickness}px, 
            transparent ${thickness}px, transparent ${thickness * 2}px, 
            ${color} ${thickness * 2}px, ${color} ${thickness * 3}px)`;
                }
                break;

            case 'gradient':
                baseStyle.background = orientation === 'horizontal'
                    ? `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`
                    : `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`;
                break;

            case 'shadow':
                baseStyle.boxShadow = `0 ${thickness}px ${thickness * 2}px rgba(0,0,0,0.1)`;
                baseStyle.backgroundColor = 'transparent';
                break;

            case 'zigzag':
                baseStyle.background = `linear-gradient(135deg, ${color} 25%, transparent 25%) -${thickness * 5}px 0/ ${thickness * 10}px ${thickness * 10}px, 
                               linear-gradient(225deg, ${color} 25%, transparent 25%) -${thickness * 5}px 0/ ${thickness * 10}px ${thickness * 10}px`;
                baseStyle.backgroundColor = 'transparent';
                break;

            case 'wave':
                baseStyle.background = `radial-gradient(circle at ${thickness * 5}px ${thickness * 5}px, ${color} ${thickness * 2}px, transparent 0),
                               radial-gradient(circle at 0 0, ${color} ${thickness * 2}px, transparent 0)`;
                baseStyle.backgroundSize = `${thickness * 10}px ${thickness * 10}px`;
                baseStyle.backgroundColor = 'transparent';
                break;

            default:
                // solid 类型使用默认样式
                break;
        }

        return baseStyle;
    };

    // 带文字的分界线
    if (text && orientation === 'horizontal') {
        return (
            <div
                className={`divider-with-text ${className}`}
                style={{ margin: `${spacing} 0` }}
            >
                <div
                    className="divider-line"
                    style={{
                        ...getDividerStyle(),
                        flexGrow: textPosition === 'left' ? 0 : 1,
                        margin: 0,
                    }}
                />
                <span
                    className="divider-text"
                    style={{
                        margin: `0 ${parseInt(spacing) / 2}px`,
                        order: textPosition === 'left' ? -1 : textPosition === 'right' ? 1 : 0,
                    }}
                >
          {text}
        </span>
                <div
                    className="divider-line"
                    style={{
                        ...getDividerStyle(),
                        flexGrow: textPosition === 'right' ? 0 : 1,
                        margin: 0,
                    }}
                />
            </div>
        );
    }

    // 普通分界线
    return (
        <div
            className={`divider ${className}`}
            style={getDividerStyle()}
        />
    );
};