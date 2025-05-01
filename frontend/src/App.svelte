<script lang="ts">
import { onMount } from 'svelte';
//Article interface
interface NYTArticle {
  web_url: string;
  snippet: string;
  headline: {
    main: string;
  };
  multimedia: Multimedia; 
}

//Image interface
interface Image {
  url: string;
  height: number;
  width: number;
}

//Multimedia interface
interface Multimedia {
  caption: string;
  credit: string;
  default?: Image;
  thumbnail?: Image;
}

let articles: NYTArticle[] = [];
let loading: boolean = true;
let error: string | null = null;
  
let apiKey: string = '';
let url: string = '';

//Function to get image URL from article
const getImageUrl = (article: NYTArticle): string | null => {
  const mediaUrl = article?.multimedia?.default?.url;
  if (!mediaUrl) return null;

  if (mediaUrl.startsWith('http')) {
    return mediaUrl;
  } else {
    return `https://static01.nyt.com/${mediaUrl}`;
  }
};

//Fetches the API key from the backend and then fetches the articles
  onMount(async () => {
  try {
    const keyResponse = await fetch('http://localhost:8000/api/key');
    const keyData = await keyResponse.json();
    apiKey = keyData.apiKey;

    const query = '"Davis", "California", "Sacramento"';
    const filterQuery = 'timesTag.organization.contains:"University of California, Davis" OR timesTag.location.contains:Sacramento';
    url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&fq=${encodeURIComponent(filterQuery)}&sort=newest&api-key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.response && data.response.docs) {
      articles = data.response.docs;
    } else {
      throw new Error('Failed to fetch articles');
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'An unknown error occurred';
    console.error('Error fetching news:', error);
  } finally {
    loading = false;
  }
});
</script>

<main>
   <!--Header refers to the top with the New York Times logo and the real time date/time-->
   <div class = "header">
    <!--header-left refers to the the far left items such as "today's paper" and the date-->
    <div class="header-left">
        <div class="lefthead" id="item-1">Wednesday, April 16, 2025</div>
        <div class="lefthead" id="item-2">Today's Paper</div>
    </div>
    
    <div class="Center-Title" id="centertitle">
        <img src="static/assets/NYT.svg" 
        width="500"
        id="TopIMG"
        alt="The-New-York-Times-Logo">
    </div>
    
    <div class="spacer"></div>
    
</div>

<!--Wrap for grid formatting-->
<div class="wrap">    

<div class="line4"> <!--Refers to the black line at the bottom of the page-->
    <hr id="linebottom">
</div>

<!--"article" refers to each item within the grid (the article) and the id identifies each one-->
<div class="article" id="simrace">
    {#if articles[0]}
      <h1>
        {articles[0].headline.main}
      </h1>
      <p>{articles[0].snippet}</p>
    {/if}
  </div>

<div class="divider"></div> <!--This is one of the vertical lines in between each of the columns-->

<div class="article" id="lastart">
    {#if articles[1]}
      <h1>
        {articles[1].headline.main}
      </h1>
      <p>{articles[1].snippet}</p>
    {/if}
</div>

<div class="divider"></div> <!--This is one of the vertical lines in between each of the columns-->

<div class="article" id="upmiddle">
    {#if articles[2]}
    <img 
    src={getImageUrl(articles[2])} 
    id="MiddleTopIMG" 
    alt={articles[2]?.headline.main}
    >
    {/if}
    {#if articles[2]}
      <h1>
        {articles[2].headline.main}
      </h1>
      <p>{articles[2].snippet}</p>
    {/if}
</div>

<div class="divider"></div> <!--This is one of the vertical lines in between each of the columns-->

<div class="article" id="downmiddle">
    {#if articles[3]}
    <img 
    src={getImageUrl(articles[3])} 
    id="MiddleIMG" 
    alt={articles[3]?.headline.main}
    >
    {/if}
    {#if articles[3]}
      <h1>
        {articles[3].headline.main}
      </h1>
      <p>{articles[3].snippet}</p>
    {/if}
</div>

<div class="divider"></div>

<div class="article" id="upright">
    {#if articles[4]}
      <h1>
        {articles[4].headline.main}
      </h1>
      <p>{articles[4].snippet}</p>
    {/if}
</div>

<div class="article" id="downright">
    {#if articles[5]}
    <img 
    src={getImageUrl(articles[5])} 
    id="DownRightIMG" 
    alt={articles[5]?.headline.main}
    >
    {/if}
    {#if articles[5]}
      <h1>
        {articles[5].headline.main}
      </h1>
      <p>{articles[5].snippet}</p>
    {/if}
</div>
</div>
<hr>

</main>