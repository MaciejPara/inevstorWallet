//https://www.bankier.pl/gielda/notowania/akcje
//https://www.bankier.pl/inwestowanie/profile/quote.html?symbol=06MAGNA
const cheerio = require("cheerio");
const fetch = require("node-fetch");

(async () => {
    const res = await fetch("https://www.bankier.pl/gielda/notowania/akcje");
    const result = await res.text();

    const $ = cheerio.load(result);

    const getCompanies = () => {
        const array = [];

        for(const item of $("tr td.colWalor a")){
            const symbol = $(item).html().split("<")[0].trim();
            if(symbol) {
                array.push({
                    symbol,
                });
            }
        }

        return array;
    };

    const getCompany = async ({ symbol, ...rest }) => {
        // const resSingle = await fetch(`https://www.bankier.pl/inwestowanie/profile/quote.html?symbol=${symbol}`);
        // const resultSingle = await resSingle.text();
        //
        // const $ = cheerio.load(resultSingle);
        // const priceNode = $(".profilLast").html();
        // const changeNode = $($("#boxProfilHeader .change .value")[1]).html();
        //
        // const price = priceNode.split(" ")[0].replace(",", ".").trim();
        // const change = changeNode.split(" ")[0].replace(",", ".").trim();
        //
        // return {
        //     ...rest,
        //     symbol,
        //     price: parseFloat(price),
        //     change: parseFloat(change),
        // };
    };

    const companies = getCompanies();
    const company = await getCompany(companies[0]);

    console.log(company);
})();
