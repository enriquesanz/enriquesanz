const fs = require('fs').promises
const Parser = require('rss-parser');
const parser = new Parser();

const LATEST_EPISODE_PLACEHOLDER = '%{{latest_episode}}%';

(async () => {
 
    const markdownTemplate = await fs.readFile('./README.md.tpl', { encoding: 'utf-8' });
    const {items} = await parser.parseURL('https://cuonda.com/planeta-cunao/feed?noredirect=1');
    const [latestArticle] = items;

    // console.log(lastestArticle);
    // console.log(latestArticle.title);
    // console.log(latestArticle.itunes.image);
    // console.log(latestArticle.enclosure.url);

    const latestEpisodeMarkdown = `## [${latestArticle.title}](${latestArticle.enclosure.url})<br/><img src="${latestArticle.itunes.image}" width=50%>`;
    const newMarkDown = markdownTemplate.replace(LATEST_EPISODE_PLACEHOLDER, latestEpisodeMarkdown);

    await fs.writeFile('./README.md', newMarkDown);
   
})();