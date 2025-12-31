package io.sotaro.backend;

import io.sotaro.backend.config.TestMailConfig;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

// Base class for IntegrationTest
// This reads TestMailConfig which mocks JavaMailSender, which doesn't exist in Test environment
@SpringBootTest
@Import(TestMailConfig.class)
public abstract class AbstractIntegrationTest {
}