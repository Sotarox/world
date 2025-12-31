package io.sotaro.backend;

import io.sotaro.backend.config.TestMailConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
@Import(TestMailConfig.class)
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
