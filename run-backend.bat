chcp 65001
@echo off
setlocal enabledelayedexpansion

:: 设置所需的最低Java版本
set MIN_JAVA_VERSION=17
set JAVA_PATH=java

:: 检查Java版本是否符合要求
echo Checking Java version...
for /f "tokens=3" %%g in ('java -version 2^>^&1 ^| findstr /i "version"') do (
    set JAVA_VERSION=%%g
    goto :check_version
)

:check_version
if "%JAVA_VERSION%"=="" (
    echo Java not found in system PATH.
    goto :get_java_path
)

:: 清理版本字符串，移除引号
set JAVA_VERSION=%JAVA_VERSION:"=%

:: 提取主版本号
for /f "tokens=1,2 delims=." %%a in ("%JAVA_VERSION%") do (
    if "%%a"=="1" (
        set MAJOR_VERSION=%%b
    ) else (
        set MAJOR_VERSION=%%a
    )
)

echo Detected Java version: %MAJOR_VERSION%

:: 检查版本是否满足要求
if %MAJOR_VERSION% LSS %MIN_JAVA_VERSION% (
    echo Java version is too old. Minimum required: %MIN_JAVA_VERSION%
    goto :get_java_path
) else (
    goto :get_db_credentials
)

:get_java_path
echo.
echo Please provide the path to java.exe
echo Example: C:\Program Files\Java\jdk-17\bin\java.exe
set /p JAVA_PATH="Enter java.exe path: "

:: 验证用户输入的路径
if "%JAVA_PATH%"=="" (
    echo No path provided. Exiting.
    pause
    exit /b 1
)

if not exist "%JAVA_PATH%" (
    echo The specified path does not exist: %JAVA_PATH%
    pause
    exit /b 1
)

:get_db_credentials
echo.
echo Please provide database credentials
set /p DB_USERNAME="Enter database username: "
set /p DB_PASSWORD="Enter database password: "

:: 验证数据库凭据
if "%DB_USERNAME%"=="" (
    echo No username provided. Exiting.
    pause
    exit /b 1
)

if "%DB_PASSWORD%"=="" (
    echo No password provided. Exiting.
    pause
    exit /b 1
)

:: 打开浏览器
start "" "http://localhost:8080"

:: 使用Java运行JAR文件并传递数据库凭据
echo Starting application...

"%JAVA_PATH%" -jar backend/target/backend-0.0.1-SNAPSHOT.jar --spring.datasource.username=%DB_USERNAME% --spring.datasource.password=%DB_PASSWORD%

pause