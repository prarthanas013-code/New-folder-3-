const API_BASE = '/api';

/**
 * Check backend health status
 */
export async function getHealthStatus() {
  try {
    const response = await fetch(`${API_BASE}/health`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`Health check returned status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to connect to CourseConnect backend:', error);
    return {
      success: false,
      status: 'offline',
      message: 'Backend server is currently offline or unreachable.'
    };
  }
}
