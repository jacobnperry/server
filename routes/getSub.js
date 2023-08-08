const client = require('drip-nodejs')({ token: '0672dc522d3b6827e4065c2866b59022', accountId: 9967522 });
const options = { status: "active"};

export default function GetSub(){


    client.listSubscribers(options)
    .then((response) => {
        console.log(response)
        // Handle `response.body`
    })
    .catch((error) => {
        // Handle errors
    });

}