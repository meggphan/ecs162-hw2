import { test, describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import App from './App.svelte';

describe('get apikey', () => {
  it('should return an object with apiKey property', async () => {
    const response = await fetch('http://localhost:8000/api/key');
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('apiKey');
    expect(data.apiKey.length).toBeGreaterThan(0);
  });
});
