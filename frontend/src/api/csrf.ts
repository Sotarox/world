let csrfInitialized = false;
let csrfPromise: Promise<void> | null = null;

export function initCsrf(): Promise<void> {
  if (csrfInitialized) {
    return Promise.resolve();
  }

  if (csrfPromise) {
    return csrfPromise;
  }

  const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';
  csrfPromise = fetch(`${baseURL}/csrf`, {
    credentials: 'include',
  }).then(() => {
    csrfInitialized = true;
  });

  return csrfPromise;
}
