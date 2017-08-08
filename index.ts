import api from "./lib/bittrex-api-generator";
import opts from "./options";

//1. get deposit address (loop)
//2. RPC - send coin to adress
//3. get deposit history (loop until confirmed)
//4. get balance for coin
//5. sell at params

let interval;
let i = 0;

//Step 1
interval = setInterval(() => {
  getDepositAddress(opts.coin);
}, opts.refreshInterval * 1000);

//Todo: finish function
async function getDepositAddress(ticker) {
  let response = await api.account.getDepositAddress({ currency: ticker });

  //Sometimes success response is issued but address hasn't been generated yet
  if (response.success && response.result) {
    clearInterval(interval);
    if (response.result.Address !== "") {
      //Address wasn't generated in time - no response request again
      setTimeout(getDepositAddress, 5000, ticker);
    } else {
      //Address is received
    }
  } else if (response.message === "ADDRESS_GENERATING") {
    //Shorten interval period as next request will likely have an address
    setTimeout(getDepositAddress, 5000, ticker);
  }

  //console.log(JSON.stringify(response, undefined, 2));
}
