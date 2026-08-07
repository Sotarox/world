package io.sotaro.backend.controller;

import org.springframework.boot.info.GitProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class CommitInfoController {

    // Spring Boot automatically populates this bean
    // if the git.properties file is present in the classpath.
    private final GitProperties gitProperties;

    public CommitInfoController(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @GetMapping("/commit")
    public Map<String, String> getCommitInfo() {
        return Map.of(
                "shortCommitId", gitProperties.getShortCommitId(),
                "branch", gitProperties.getBranch(),
                "buildTime", gitProperties.getCommitTime().toString(),
                "shortCommitMessage", gitProperties.get("commit.message.short")
        );
    }
}
