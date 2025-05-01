import { test, describe, it, expect} from 'vitest';
import { render } from '@testing-library/svelte';
import App from './App.svelte';

describe('testing if server returns api key', () => {
  it('should return an object with apiKey property', async () => {
    const response = await fetch('http://localhost:8000/api/key');
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('apiKey');
    expect(data.apiKey.length).toBeGreaterThan(0);
  });
});

describe('NYT API format', () => {
  it('returns data in expected format', async () => {
    const mockNytApiResponse = {
      response: {
        docs: [
          {
            headline: { main: 'Test Headline' },
            web_url: 'https://nytimes.com/test-article',
            multimedia: [
              { url: 'images/test-image' }
            ],
            abstract: 'blahblahblah',
          }
        ]
      }
    };

    const articles = mockNytApiResponse.response.docs.map(doc => ({
      title: doc.headline.main,
      article_url: doc.web_url,
      multimedia: doc.multimedia.map(m => m.url),
      abstract: doc.abstract
    }));

    const article = articles[0];

    expect(article).toHaveProperty('title');
    expect(typeof article.title).toBe('string');

    expect(article).toHaveProperty('article_url');
    expect(article.article_url).toMatch(/^https?:\/\//);

    expect(article).toHaveProperty('multimedia');
    expect(Array.isArray(article.multimedia)).toBe(true);

    expect(article).toHaveProperty('abstract');
    expect(typeof article.abstract).toBe('string');
  });
});
