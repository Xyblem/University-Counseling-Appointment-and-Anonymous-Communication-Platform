package com.ucaacp.backend.utils.package_scan;

import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.type.classreading.CachingMetadataReaderFactory;
import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.util.ClassUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PackageScanner {

    private final ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
    private final CachingMetadataReaderFactory metadataReaderFactory = new CachingMetadataReaderFactory();

    /**
     * 获取指定包下的所有类名
     * @param packageName 包名（如：com.example.service）
     * @return 类名全限定名列表
     */
    public List<String> scanPackage(String packageName) throws IOException {
        // 转换为类路径格式（替换.为/）
        String packageSearchPath = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX
                + ClassUtils.convertClassNameToResourcePath(packageName)
                + "/**/*.class";

        List<String> classNames = new ArrayList<>();
        Resource[] resources = resolver.getResources(packageSearchPath);

        for (Resource resource : resources) {
            if (resource.isReadable()) {
                MetadataReader metadataReader = metadataReaderFactory.getMetadataReader(resource);
                String className = metadataReader.getClassMetadata().getClassName();
                classNames.add(className);
            }
        }
        return classNames;
    }
}