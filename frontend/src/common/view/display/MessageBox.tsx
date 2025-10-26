import React, {useRef, useState, ReactNode, forwardRef, useImperativeHandle} from 'react';
import { Dialog,DialogRef, DialogProps } from '../container/Dialog';
import './MessageBox.css';
import {createRoot} from "react-dom/client";

// MessageBox类型
export type MessageBoxType = 'alert' | 'confirm' | 'prompt' | 'custom';

// 按钮配置
export interface MessageBoxButton {
    text: string;
    type?: 'primary' | 'default' | 'danger';
    onClick?: (value?: string) => void | boolean | Promise<boolean>;
    autoClose?: boolean;
}

// MessageBox配置
export interface MessageBoxConfig {
    type?: MessageBoxType;
    title?: string;
    message: ReactNode;
    width?: number | string;
    className?: string;
    buttons?: MessageBoxButton[];
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    placeholder?: string;
    defaultValue?: string;
    onClose?: () => void;
    backdropClassName?: string;
}

// MessageBox引用接口
export interface MessageBoxRef {
    alert: (message: ReactNode, title?: string) => Promise<void>;
    confirm: (message: ReactNode, title?: string) => Promise<boolean>;
    prompt: (message: ReactNode, title?: string, defaultValue?: string) => Promise<string | null>;
    show: (config: MessageBoxConfig) => Promise<any>;
    close: () => void;
}

// MessageBox组件实现
export const MessageBox = forwardRef<MessageBoxRef>((_, ref) => {
    const dialogRef = useRef<DialogRef>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [config, setConfig] = useState<MessageBoxConfig | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [loadingButton, setLoadingButton] = useState<number | null>(null);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        alert: (message: ReactNode, title?: string) => {
            return new Promise<void>((resolve) => {
                setConfig({
                    type: 'alert',
                    title: title || '提示',
                    message,
                    buttons: [
                        {
                            text: '确定',
                            type: 'primary',
                            onClick: () => resolve(),
                            autoClose: true
                        }
                    ],
                    onClose: () => resolve()
                });
            });
        },

        confirm: (message: ReactNode, title?: string) => {
            return new Promise<boolean>((resolve) => {
                setConfig({
                    type: 'confirm',
                    title: title || '确认',
                    message,
                    buttons: [
                        {
                            text: '取消',
                            type: 'default',
                            onClick: () => resolve(false),
                            autoClose: true
                        },
                        {
                            text: '确定',
                            type: 'primary',
                            onClick: () => resolve(true),
                            autoClose: true
                        }
                    ],
                    onClose: () => resolve(false)
                });
            });
        },

        prompt: (message: ReactNode, title?: string, defaultValue?: string) => {
            return new Promise<string | null>((resolve) => {
                setConfig({
                    type: 'prompt',
                    title: title || '输入',
                    message,
                    placeholder: '请输入内容',
                    defaultValue: defaultValue || '',
                    buttons: [
                        {
                            text: '取消',
                            type: 'default',
                            onClick: () => resolve(null),
                            autoClose: true
                        },
                        {
                            text: '确定',
                            type: 'primary',
                            onClick: () => resolve(inputValue),
                            autoClose: true
                        }
                    ],
                    onClose: () => resolve(null)
                });
                setInputValue(defaultValue || '');
            });
        },

        show: (config: MessageBoxConfig) => {
            return new Promise<any>((resolve) => {
                const enhancedConfig: MessageBoxConfig = {
                    ...config,
                    onClose: () => resolve(undefined)
                };

                // 如果没有自定义按钮，添加默认按钮
                if (!enhancedConfig.buttons || enhancedConfig.buttons.length === 0) {
                    enhancedConfig.buttons = [
                        {
                            text: '确定',
                            type: 'primary',
                            onClick: () => resolve(true),
                            autoClose: true
                        }
                    ];
                }

                setConfig(enhancedConfig);
                setInputValue(config.defaultValue || '');
            });
        },

        close: () => {
            handleClose();
        }
    }));

    // 处理按钮点击
    const handleButtonClick = async (button: MessageBoxButton, index: number) => {
        if (loadingButton !== null) return; // 防止重复点击

        let shouldClose = true;

        if (button.onClick) {
            setLoadingButton(index);
            try {
                const result = await button.onClick(config?.type === 'prompt' ? inputValue : undefined);
                if (result === false) {
                    shouldClose = false;
                }
            } catch (error) {
                console.error('MessageBox button click error:', error);
            } finally {
                setLoadingButton(null);
            }
        }

        if (shouldClose && button.autoClose !== false) {
            handleClose();
        }
    };

    // 处理关闭
    const handleClose = () => {
        dialogRef.current?.close();
        setConfig(null);
        setInputValue('');
        setLoadingButton(null);
        config?.onClose?.();
    };

    // 处理输入框变化
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // 处理输入框按键
    const handleInputKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && config?.buttons) {
            const primaryButton = config.buttons.find(btn => btn.type === 'primary');
            if (primaryButton) {
                const buttonIndex = config.buttons.indexOf(primaryButton);
                handleButtonClick(primaryButton, buttonIndex);
            }
        }
    };

    if (!config) return null;

    return (
        <Dialog
            ref={dialogRef}
            type="modal"
            title={config.title}
            width={config.width || 400}
            className={`messagebox ${config.type} ${config.className || ''}`}
            showCloseButton={config.showCloseButton}
            closeOnBackdropClick={config.closeOnBackdropClick}
            closeOnEscape={config.closeOnEscape}
            onClose={handleClose}
            backdropClassName={config.backdropClassName}
        >
            <div className="messagebox-content">
                <div className="messagebox-message">
                    {config.message}
                </div>

                {config.type === 'prompt' && (
                    <div className="messagebox-input-container">
                        <input
                            ref={inputRef}
                            type="text"
                            className="messagebox-input"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={handleInputKeyPress}
                            placeholder={config.placeholder}
                            autoFocus
                        />
                    </div>
                )}

                <div className="messagebox-buttons">
                    {config.buttons?.map((button, index) => (
                        <button
                            key={index}
                            className={`messagebox-button ${button.type || 'default'} ${
                                loadingButton === index ? 'loading' : ''
                            }`}
                            onClick={() => handleButtonClick(button, index)}
                            disabled={loadingButton !== null}
                        >
                            {loadingButton === index ? (
                                <span className="messagebox-button-loading">
                  <span className="messagebox-button-spinner"></span>
                  处理中...
                </span>
                            ) : (
                                button.text
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </Dialog>
    );
});

MessageBox.displayName = 'MessageBox';

// 全局MessageBox实例管理
export class MessageBoxManager {
    private static instance: MessageBoxRef | null = null;
    private static container: HTMLElement | null = null;
    private static reactRoot: any = null;

    static async init(): Promise<MessageBoxRef> {
        if (this.instance) return this.instance;

        // 动态创建容器
        this.container = document.createElement('div');
        this.container.className = 'messagebox-global-container';
        document.body.appendChild(this.container);

        // 使用React 18的createRoot或React 17的ReactDOM.render
        if (typeof createRoot === 'function') {
            // React 18
            const { createRoot } = await import('react-dom/client');
            const root = createRoot(this.container);
            root.render(<MessageBox ref={(ref) => { this.instance = ref; }} />);
            this.reactRoot = root;
        } else {
            // React 17
            const ReactDOM = await import('react-dom');
            //ReactDOM.render(<MessageBox ref={(ref) => { this.instance = ref; }} />, this.container);
        }

        return new Promise((resolve) => {
            const checkInstance = () => {
                if (this.instance) {
                    resolve(this.instance);
                } else {
                    setTimeout(checkInstance, 10);
                }
            };
            checkInstance();
        });
    }

    static async alert(message: ReactNode, title?: string): Promise<void> {
        const instance = await this.init();
        return instance.alert(message, title);
    }

    static async confirm(message: ReactNode, title?: string): Promise<boolean> {
        const instance = await this.init();
        return instance.confirm(message, title);
    }

    static async prompt(message: ReactNode, title?: string, defaultValue?: string): Promise<string | null> {
        const instance = await this.init();
        return instance.prompt(message, title, defaultValue);
    }

    static async show(config: MessageBoxConfig): Promise<any> {
        const instance = await this.init();
        return instance.show(config);
    }

    static close(): void {
        if (this.instance) {
            this.instance.close();
        }
    }

    static destroy(): void {
        this.close();
        if (this.container && document.body.contains(this.container)) {
            if (this.reactRoot && typeof this.reactRoot.unmount === 'function') {
                this.reactRoot.unmount();
            } else {
                const ReactDOM = require('react-dom');
                ReactDOM.unmountComponentAtNode(this.container);
            }
            document.body.removeChild(this.container);
        }
        this.instance = null;
        this.container = null;
        this.reactRoot = null;
    }
}