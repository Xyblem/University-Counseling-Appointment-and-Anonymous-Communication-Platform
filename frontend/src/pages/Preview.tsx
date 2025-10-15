import React, { useState } from 'react';
import './Preview.css';

// 首页组件
export const Preview: React.FC = () => {
    const [activeTab, setActiveTab] = useState('features');

    return (
        <div className="counseling-platform">
            {/* 导航栏 */}
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <h1>心灵港湾</h1>
                        <span>高校心理咨询平台</span>
                    </div>
                    <nav className="nav">
                        <ul>
                            <li><a href="#features">功能特色</a></li>
                            <li><a href="#services">服务内容</a></li>
                            <li><a href="#about">关于我们</a></li>
                            <li className="login-btn"><a href="auth/login">登录/注册</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* 主横幅 */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h2>你的心理健康，我们用心守护</h2>
                        <p>匿名倾诉 • 专业咨询 • 同伴互助 • 隐私保障</p>
                        <div className="cta-buttons">
                            <button className="btn primary">立即预约咨询</button>
                            <button className="btn secondary">进入匿名倾诉区</button>
                        </div>
                        <div className="privacy-notice">
                            <span className="privacy-icon">🔒</span>
                            <span>我们承诺严格保护您的隐私，所有倾诉内容均匿名处理</span>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="illustration">
                            {/* 心理咨询相关插图占位 */}
                            <div className="illustration-placeholder"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 功能介绍 */}
            <section id="features" className="features">
                <div className="container">
                    <h2>平台特色功能</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">👥</div>
                            <h3>匿名倾诉</h3>
                            <p>无需担心身份暴露，自由表达内心困惑，获得同伴支持</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📅</div>
                            <h3>便捷预约</h3>
                            <p>线上快速预约专业心理咨询师，简化传统繁琐流程</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🤝</div>
                            <h3>同伴互助</h3>
                            <p>有经验的同学匿名分享应对方法，互相支持成长</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>智能推荐</h3>
                            <p>基于问题标签，智能推荐相关心理资源和解决方案</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 服务内容 */}
            <section id="services" className="services">
                <div className="container">
                    <h2>我们的服务</h2>
                    <div className="services-tabs">
                        <div className="tab-headers">
                            <button
                                className={`tab-header ${activeTab === 'online' ? 'active' : ''}`}
                                onClick={() => setActiveTab('online')}
                            >
                                在线咨询
                            </button>
                            <button
                                className={`tab-header ${activeTab === 'offline' ? 'active' : ''}`}
                                onClick={() => setActiveTab('offline')}
                            >
                                线下咨询
                            </button>
                            <button
                                className={`tab-header ${activeTab === 'community' ? 'active' : ''}`}
                                onClick={() => setActiveTab('community')}
                            >
                                互助社区
                            </button>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'online' && (
                                <div className="tab-panel">
                                    <h3>专业在线心理咨询</h3>
                                    <p>与认证心理咨询师进行一对一在线交流，随时随地获得专业帮助</p>
                                    <ul>
                                        <li>文字、语音、视频多种沟通方式</li>
                                        <li>严格保护隐私，咨询内容完全保密</li>
                                        <li>灵活预约时间，适应你的日程安排</li>
                                    </ul>
                                </div>
                            )}
                            {activeTab === 'offline' && (
                                <div className="tab-panel">
                                    <h3>面对面心理咨询</h3>
                                    <p>在校内心理咨询中心与专业咨询师进行面对面深入交流</p>
                                    <ul>
                                        <li>专业的咨询环境，舒适私密</li>
                                        <li>个性化咨询方案，针对性解决问题</li>
                                        <li>持续跟进，确保咨询效果</li>
                                    </ul>
                                </div>
                            )}
                            {activeTab === 'community' && (
                                <div className="tab-panel">
                                    <h3>匿名互助社区</h3>
                                    <p>与经历相似的同学匿名交流，分享经验，互相支持</p>
                                    <ul>
                                        <li>完全匿名，保护个人隐私</li>
                                        <li>按主题分类，快速找到相关讨论</li>
                                        <li>积分激励机制，鼓励积极互助</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 统计数据 */}
            <section className="stats">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">5000+</div>
                            <div className="stat-label">已服务学生</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">98%</div>
                            <div className="stat-label">用户满意度</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">专业咨询师</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">匿名倾诉区开放</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 行动号召 */}
            <section className="cta-section">
                <div className="container">
                    <h2>迈出第一步，遇见更好的自己</h2>
                    <p>寻求帮助是勇敢的表现，我们在这里支持你</p>
                    <div className="cta-buttons">
                        <button className="btn primary large">立即预约咨询</button>
                        <button className="btn secondary large">探索匿名社区</button>
                    </div>
                </div>
            </section>

            {/* 页脚 */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>心灵港湾</h3>
                            <p>高校心理咨询预约与匿名交流平台</p>
                            <p>降低心理求助门槛，提升心理服务可达性</p>
                        </div>
                        <div className="footer-section">
                            <h4>快速链接</h4>
                            <ul>
                                <li><a href="#features">平台功能</a></li>
                                <li><a href="#services">服务内容</a></li>
                                <li><a href="/faq">常见问题</a></li>
                                <li><a href="/contact">联系我们</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>紧急帮助</h4>
                            <p>如有紧急情况，请立即联系：</p>
                            <p>校园心理危机热线: 123-456-7890</p>
                            <p>全国心理援助热线: 400-161-9995</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2023 心灵港湾 - 高校心理咨询平台 | 隐私政策 | 使用条款</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
