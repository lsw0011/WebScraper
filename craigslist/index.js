const request = require('request-promise');
const cheerio = require('cheerio');
// const requestretry = require('')

const url = 'https://newyork.craigslist.org/d/software-qa-dba-etc/search/sof'

const scrapeResult = [];

// {
//     title: '',
//     description: '', 
//     date: Date.now(),
//     url: '', 
//     hood: '', 
//     address: '',
//     compensation: ''
// }

const scrapeCraigslistItem = (entry) =>  {
    request.get(entry.url, (err, response, body) => {
        const $ = cheerio.load(body)
        entry.description = $('#postingbody').text()
        scrapeResult.push(entry);
    })
}


async function scrapeCraigslistInitial(){
    try{
        const htmlResult = await request.get(url);
        const $ = await cheerio.load(htmlResult);
        $(".result-info").each(async (index, element) => {
           const title = $(element).children(".result-title").text()
           const url = $(element).children(".result-title").attr('href')
           console.log(index)
           await scrapeCraigslistItem({title: title, url: url})
        })
        console.log(scrapeResult);
        
    } catch (error) {
        console.log(error);
    }

}

scrapeCraigslistInitial()

setTimeout(() => {
    console.log(scrapeResult, "fuck");
}, 10000)