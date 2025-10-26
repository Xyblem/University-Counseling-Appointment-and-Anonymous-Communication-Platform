chcp 65001
@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   文件覆盖脚本
echo ========================================

:: 设置路径变量
set "SOURCE_DIR=frontend\build"
set "TARGET_DIR=backend\src\main\resources\static"

echo 源目录: %SOURCE_DIR%
echo 目标目录: %TARGET_DIR%
echo.

:: 检查源目录是否存在
if not exist "%SOURCE_DIR%" (
    echo [错误] 源目录不存在: %SOURCE_DIR%
    pause
    exit /b 1
)

:: 检查目标目录是否存在，如果不存在则创建
if not exist "%TARGET_DIR%" (
    echo [信息] 目标目录不存在，正在创建...
    mkdir "%TARGET_DIR%"
    if !errorlevel! neq 0 (
        echo [错误] 创建目标目录失败
        pause
        exit /b 1
    )
)

:: 确认操作
echo [警告] 此操作将执行以下操作：
echo     1. 删除目录: %TARGET_DIR% 中的所有内容
echo     2. 将目录: %SOURCE_DIR% 中的所有内容复制到目标目录
echo.
set /p confirm="确认继续执行? (y/N): "
if /i not "!confirm!"=="y" (
    echo 操作已取消
    pause
    exit /b 0
)

echo.
echo ========================================
echo   开始执行文件覆盖操作
echo ========================================

:: 第一步：删除目标目录中的所有内容
echo [步骤1] 正在删除目标目录中的所有内容...
if exist "%TARGET_DIR%" (
    :: 使用robocopy来清空目录（更可靠的方法）
    robocopy "%TEMP%" "%TARGET_DIR%" /purge /l /np /nfl /ndl >nul 2>&1
    
    :: 如果robocopy方法失败，使用传统的rd/s/q方法
    if exist "%TARGET_DIR%\*" (
        rd /s /q "%TARGET_DIR%" 2>nul
        mkdir "%TARGET_DIR%" >nul 2>&1
    )
    
    echo [完成] 目标目录已清空
) else (
    mkdir "%TARGET_DIR%"
)

:: 第二步：复制源目录内容到目标目录
echo [步骤2] 正在复制文件...
robocopy "%SOURCE_DIR%" "%TARGET_DIR%" /e /np /nfl /ndl

if !errorlevel! leq 7 (
    echo [完成] 文件复制成功完成！
    echo.
    echo 操作总结:
    echo   - 已删除目标目录中的所有旧文件
    echo   - 已复制所有新文件到目标目录
) else (
    echo [错误] 文件复制过程中出现问题
    pause
    exit /b 1
)

echo.
echo ========================================
echo   操作完成！
echo ========================================

:: 显示一些统计信息
for /f %%A in ('dir "%TARGET_DIR%" /a-d /s ^| find "File(s)"') do set "fileCount=%%A"
echo 复制文件数量: %fileCount%

for /f %%A in ('dir "%TARGET_DIR%" /ad /s ^| find "Dir(s)"') do set "dirCount=%%A"
echo 复制目录数量: %dirCount%

echo.
pause