/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import axios from 'axios';
import { API_BASE_URL } from '../config/env';

/** Cliente Axios único para toda la app. */
export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
