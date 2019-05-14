const request = require('request');
const http = require('http');

const options ={
    url: 'https://query.ecommerce.api.nordstrom.com/api/queryresults/keywordsearch/?top=3&IncludeFacets=false&Keyword=red%20dresses',
    headers: {
        Authorization: 'apikey 8ea31c48-95c3-4bcf-9db1-d6ada47565f2',
        NordApiVersion: '1'
    }
}

// request.get(options,(err, response, body) => {
//     console.log(body)
// })

const parseParams = (url) => {
    try{
        const params = {}
        const paramsArray = (url.split('?')[1]).split('&')
        paramsArray.forEach((element) => {
            const pair = element.split('=')
            console.log(pair)
            params[pair[0]] = pair[1]
        })
        return params
    }catch(e){
        return null;
    }
}

const pureURL = (url) => {
    try {
        return url.split('?')[0]
    }catch(e) {
        return url
    }
}



server = http.createServer((req, res) => {
    const params = parseParams(req.url)
    const url = pureURL(req.url)
    if(url === '/nordstrom'){
        console.log('hithere')
        // console.log(req.query.top)
        res.setHeader('Content-Type', 'application/json') 
        request.get(options, (error, response, body) => {
            response.on('data', chunk => {
                console.log(chunk)
            })
            response.on('end', () => {
                res.end()
            } )
            res.write(response.body, () => {
                res.end();
            })
            // res.end();

        })
    }
});

server.listen(4000, () => {
    console.log("Connected!!!")
})