import runtime from 'serviceworker-webpack-plugin/lib/runtime';
class ServiceWorkerService {
  async register() {
    try {
      if ('serviceWorker' in navigator) {
        if (this.swInstance) {
          return this.swInstance;
        }
        this.swInstance = await runtime.register();
        return this.swInstance;
      }
    } catch (e) {}

    return Promise.reject();
  }
}

export default new ServiceWorkerService();
