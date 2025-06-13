// src/utils/http.js
import axios from 'axios';
import router from '../router/router-static';
import storage from '@/utils/storage';

const http = axios.create({
  baseURL: '/xiaoyuanshitangdingcan',
  timeout: 1000 * 86400,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

// 请求拦截器
http.interceptors.request.use(
  config => {
    const token = storage.get('Token');
    if (token) {
      config.headers['Token'] = token; // 与后端保持完全一致
    }
    return config;
  },
  error => {
    return Promise.reject({
      code: -1,
      msg: '请求配置错误',
      data: null
    });
  }
);

// 响应拦截器
http.interceptors.response.use(
  response => {
    try {
      const data = response.data || {};
      
      // 处理业务级错误（如401）
      if (data.code === 401) {
        handleUnauthorized();
        return Promise.reject(formatError(data));
      }

      // 标准化成功响应
      return {
        code: 200,
        msg: data.msg || '操作成功',
        data: data.data ?? data  // 使用空值合并运算符
      };
    } catch (e) {
      return Promise.reject(formatError(e));
    }
  },
  error => {
    // 处理HTTP错误（非2xx状态码）
    if (error.response) {
      const { status, data } = error.response;
      
      // 特殊处理401
      if (status === 401) {
        handleUnauthorized();
      }

      return Promise.reject(
        formatError({
          code: status,
          msg: data?.msg || `HTTP错误: ${status}`,
          data: null
        })
      );
    }
    
    // 处理无响应的网络错误
    return Promise.reject(
      formatError({
        code: -1,
        msg: error.message || '网络连接异常',
        data: null
      })
    );
  }
);

// 统一错误格式化
const formatError = (error) => ({
  code: error.code || 500,
  msg: error.msg || error.message || '未知错误',
  data: error.data ?? null,
  _original: error  // 保留原始错误对象
});

// 处理未授权
const handleUnauthorized = () => {
  storage.remove('Token');
  router.push({
    name: 'login',
    query: { 
      redirect: router.currentRoute.fullPath,
      reason: 'SESSION_EXPIRED'  // 明确传递原因
    }
  });
};

export default http;