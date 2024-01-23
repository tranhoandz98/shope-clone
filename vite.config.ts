import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const cherryPickedKeys = ['REACT_APP_BASE_API_URL']

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const processEnv = {}
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]))

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true
    },
    css: {
      devSourcemap: true
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    },
    build: {
      outDir: 'build'
    },
    define: {
      'process.env': processEnv
    },
    base:'/shope-clone/'
  }
})
