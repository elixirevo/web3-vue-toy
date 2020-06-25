console.log('window.web3', window.web3)
console.log('window.ethereum', window.ethereum)
if (window.web3) {
  console.log('1번입니다')
  console.log(window.web3)
  web3.web3Provider = window.ethereum
  // try {
  //   window.ethereum.enable()
  // } catch (error) {
  //   console.error("User denied~~~")
  // }
} else {
  console.log('2번입니다')
  window.web3 = new Web3('http://localhost:8545')
  web3.web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}
web3 = new Web3(web3.web3Provider)
console.log('web3 log', web3)

web3.eth.getChainId().then((data) => {
  console.log('chain ID: ', data)
})

new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data() {
    return {
      hello: '안녕하세요',
      myAccounts: [],
      myBalance: null,
      receiveAccount: '',
      balance: '',
      receipt: null,
      recbool: false,
      selectedAccount: null,
      sendEth: '',
    }
  },
  async created() {
    await web3.eth.getAccounts().then((data) => {
      this.myAccounts = data
      this.selectedAccount = data[0]
    })
  },
  methods: {
    async getAccounts() {
      await web3.eth.getAccounts().then((data) => {
        this.myAccounts = data
      })
    },
    async getBalance() {
      const weibalance = await web3.eth.getBalance(this.selectedAccount)
      const getEth = await web3.utils.fromWei(weibalance)
      this.myBalance = getEth
    },
    async sendBalance() {
      const toWeiEth = await web3.utils.toWei(this.sendEth)
      await web3.eth
        .sendTransaction({
          from: this.selectedAccount,
          to: this.receiveAccount,
          value: toWeiEth,
        })
        .then((receipt) => {
          this.receipt = receipt
        })
      this.recbool = true
      this.getBalance()
    },
  },
})
