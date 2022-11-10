// Automatically generated with Reach 0.1.12 (96568703)
/* eslint-disable */
export const _version = '0.1.12';
export const _versionHash = '0.1.12 (96568703)';
export const _backendVersion = 25;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  
  return {
    infos: {
      },
    views: {
      1: [ctc0, ctc1, ctc2],
      2: [ctc0, ctc1, ctc2]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Buyer(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Buyer expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Buyer expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Token;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Null;
  const ctc3 = stdlib.T_Address;
  
  
  const txn1 = await (ctc.recv({
    didSend: false,
    evt_cnt: 2,
    funcNum: 0,
    out_tys: [ctc0, ctc1],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [v93, v94], secs: v96, time: v95, didSend: v32, from: v92 } = txn1;
  ;
  ;
  const txn2 = await (ctc.recv({
    didSend: false,
    evt_cnt: 0,
    funcNum: 1,
    out_tys: [],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [], secs: v103, time: v102, didSend: v39, from: v101 } = txn2;
  ;
  ;
  const v110 = stdlib.addressEq(v92, v101);
  stdlib.assert(v110, {
    at: './index.rsh:21:11:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Buyer'
    });
  const v112 = {
    nftId: v93,
    price: v94
    };
  stdlib.protect(ctc2, await interact.seeParams(v112), {
    at: './index.rsh:24:27:application',
    fs: ['at ./index.rsh:24:27:application call to [unknown function] (defined at: ./index.rsh:24:27:function exp)', 'at ./index.rsh:24:27:application call to "liftedInteract" (defined at: ./index.rsh:24:27:application)'],
    msg: 'seeParams',
    who: 'Buyer'
    });
  
  const txn3 = await (ctc.sendrecv({
    args: [v92, v93, v94],
    evt_cnt: 0,
    funcNum: 2,
    lct: v102,
    onlyIf: true,
    out_tys: [],
    pay: [v94, []],
    sim_p: (async (txn3) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [], secs: v115, time: v114, didSend: v50, from: v113 } = txn3;
      
      sim_r.txns.push({
        amt: v94,
        kind: 'to',
        tok: undefined /* Nothing */
        });
      sim_r.txns.push({
        kind: 'from',
        to: v92,
        tok: undefined /* Nothing */
        });
      sim_r.txns.push({
        kind: 'from',
        to: v113,
        tok: v93
        });
      sim_r.txns.push({
        kind: 'halt',
        tok: v93
        })
      sim_r.txns.push({
        kind: 'halt',
        tok: undefined /* Nothing */
        })
      sim_r.isHalt = true;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc3, ctc0, ctc1],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v115, time: v114, didSend: v50, from: v113 } = txn3;
  ;
  ;
  ;
  return;
  
  
  
  
  
  
  };
export async function Creator(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Creator expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Creator expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Token;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Object({
    nftId: ctc0,
    price: ctc1
    });
  const ctc3 = stdlib.T_Address;
  
  
  const v87 = stdlib.protect(ctc2, await interact.getSale(), {
    at: './index.rsh:16:57:application',
    fs: ['at ./index.rsh:15:15:application call to [unknown function] (defined at: ./index.rsh:15:19:function exp)'],
    msg: 'getSale',
    who: 'Creator'
    });
  const v88 = v87.nftId;
  const v89 = v87.price;
  
  const txn1 = await (ctc.sendrecv({
    args: [v88, v89],
    evt_cnt: 2,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:18:11:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc0, ctc1],
    pay: [stdlib.checkedBigNumberify('./index.rsh:18:11:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v93, v94], secs: v96, time: v95, didSend: v32, from: v92 } = txn1;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        kind: 'init',
        tok: v93
        });
      ;
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc1],
    waitIfNotPresent: false
    }));
  const {data: [v93, v94], secs: v96, time: v95, didSend: v32, from: v92 } = txn1;
  ;
  ;
  const txn2 = await (ctc.sendrecv({
    args: [v92, v93, v94],
    evt_cnt: 0,
    funcNum: 1,
    lct: v95,
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./index.rsh:21:11:dot', stdlib.UInt_max, '0'), [[stdlib.checkedBigNumberify('./index.rsh:4:13:decimal', stdlib.UInt_max, '1'), v93]]],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [], secs: v103, time: v102, didSend: v39, from: v101 } = txn2;
      
      ;
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./index.rsh:4:13:decimal', stdlib.UInt_max, '1'),
        kind: 'to',
        tok: v93
        });
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc3, ctc0, ctc1],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v103, time: v102, didSend: v39, from: v101 } = txn2;
  ;
  ;
  const v110 = stdlib.addressEq(v92, v101);
  stdlib.assert(v110, {
    at: './index.rsh:21:11:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Creator'
    });
  const txn3 = await (ctc.recv({
    didSend: false,
    evt_cnt: 0,
    funcNum: 2,
    out_tys: [],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [], secs: v115, time: v114, didSend: v50, from: v113 } = txn3;
  ;
  ;
  ;
  return;
  
  
  
  
  
  
  };
const _ALGO = {
  ABI: {
    impure: [],
    pure: [],
    sigs: []
    },
  appApproval: `ByAIAAECBAggKKCNBiYCAQAAIjUAMRhBAa8pZEkiWzUBIQRbNQI2GgAXSUEAByI1BCM1BgA2GgIXNQQ2GgM2GgEXSSMMQADLSSQMQABvJBJEJDQBEkQ0BEkiEkw0AhIRRChkSTUDSSEFWzX/IQZbNf6ABEGxQE2wNP6IAWmxIrIBNP6yCCOyEDQDVwAgsgezsSKyASOyEiWyEDEAshQ0/7IRs7EisgEishIlshAyCbIVMgqyFDT/shGzQgC8SCM0ARJENARJIhJMNAISEUQoZEk1A0lJVwAgNf8hBVs1/iEGWzX9gASai5F0sCM0/ogBDTT/MQASRDT/NP4WUDT9FlAoSwFXADBnSCQ1ATIGNQJCAIJIIQeIAM0iNAESRDQESSISTDQCEhFESTUFSSJbNf8hBFs1/oAErNEfwzT/FlA0/hZQsCEHiACcsSKyASKyEiWyEDIKshQ0/7IRszEANP8WUDT+FlAoSwFXADBnSCM1ATIGNQJCABwxGYEFEkSxIrIBIrIII7IQMgmyCTIKsgezQgAFMRkiEkQpNAEWNAIWUGc0BkEACoAEFR98dTQHULA0AEkjCDIEEkQxFhJEI0MxGSISREL/3yIxNBJEJDE1EkQiMTYSRCIxNxJEIjUBIjUCQv+vNABJSiMINQA4BzIKEkQ4ECMSRDgIEkSJNABJSkkjCDUAOBQyChJEOBAlEkQ4EU8CEkQ4EhJEiQ==`,
  appClear: `Bw==`,
  companionInfo: null,
  extraPages: 0,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 1,
  stateSize: 48,
  unsupported: [],
  version: 11,
  warnings: []
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v93",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v94",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v93",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v94",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T4",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T4",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e2",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T4",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m1",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T4",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m2",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x608060405260405162000cb638038062000cb6833981016040819052620000269162000228565b60008055436003556040805133815282516020808301919091528084015180516001600160a01b0316838501520151606082015290517fcf195cf82603ce4a4e34c55fad8b41a7c2cc7f7728b1ba77a8eec293c0fa52d59181900360800190a1620000943415600762000121565b604080516060808201835260006020808401828152848601838152338087528884018051516001600160a01b039081168552905185015183526001958690554390955587519384015290519092169481019490945251908301529060800160405160208183030381529060405260029080519060200190620001189291906200014b565b505050620002dd565b81620001475760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b8280546200015990620002a0565b90600052602060002090601f0160209004810192826200017d5760008555620001c8565b82601f106200019857805160ff1916838001178555620001c8565b82800160010185558215620001c8579182015b82811115620001c8578251825591602001919060010190620001ab565b50620001d6929150620001da565b5090565b5b80821115620001d65760008155600101620001db565b604080519081016001600160401b03811182821017156200022257634e487b7160e01b600052604160045260246000fd5b60405290565b600081830360608112156200023c57600080fd5b62000246620001f1565b835181526040601f19830112156200025d57600080fd5b62000267620001f1565b60208501519092506001600160a01b03811681146200028557600080fd5b82526040939093015160208083019190915283015250919050565b600181811c90821680620002b557607f821691505b60208210811415620002d757634e487b7160e01b600052602260045260246000fd5b50919050565b6109c980620002ed6000396000f3fe60806040526004361061004b5760003560e01c80631e93b0f1146100545780632c10a159146100785780637eea518c1461008b578063832307571461009e578063ab53f2c6146100b357005b3661005257005b005b34801561006057600080fd5b506003545b6040519081526020015b60405180910390f35b6100526100863660046107cf565b6100d6565b6100526100993660046107cf565b61029e565b3480156100aa57600080fd5b50600154610065565b3480156100bf57600080fd5b506100c861041f565b60405161006f929190610813565b6100e6600160005414600b6104bc565b610100813515806100f957506001548235145b600c6104bc565b6000808055600280546101129061084d565b80601f016020809104026020016040519081016040528092919081815260200182805461013e9061084d565b801561018b5780601f106101605761010080835404028352916020019161018b565b820191906000526020600020905b81548152906001019060200180831161016e57829003601f168201915b50505050508060200190518101906101a3919061089e565b90507f400d21ea4e4a5e28b4ae5f0f476c201fc8036473fcf7c8cd252f38698020b4f133836040516101d6929190610922565b60405180910390a16101ea341560086104bc565b6102046101fd33836020015160016104e2565b60096104bc565b805161021c906001600160a01b03163314600a6104bc565b60408051606080820183526000808352602080840182815284860183815287516001600160a01b03908116808852898501518216845289890151835260029586905543600155885180860191909152925116828801525181850152855180820390940184526080019094528151929361029893919201906106f9565b50505050565b6102ae600260005414600e6104bc565b6102c8813515806102c157506001548235145b600f6104bc565b6000808055600280546102da9061084d565b80601f01602080910402602001604051908101604052809291908181526020018280546103069061084d565b80156103535780601f1061032857610100808354040283529160200191610353565b820191906000526020600020905b81548152906001019060200180831161033657829003601f168201915b505050505080602001905181019061036b919061089e565b90507f919263be6d51bec670ce110fb6a7df03fe323e3de4dade5355bccc6a4b06d950338360405161039e929190610922565b60405180910390a16103b781604001513414600d6104bc565b805160408083015190516001600160a01b039092169181156108fc0291906000818181858888f193505050501580156103f4573d6000803e3d6000fd5b5061040581602001513360016104fa565b6000808055600181905561041b9060029061077d565b5050565b6000606060005460028080546104349061084d565b80601f01602080910402602001604051908101604052809291908181526020018280546104609061084d565b80156104ad5780601f10610482576101008083540402835291602001916104ad565b820191906000526020600020905b81548152906001019060200180831161049057829003601f168201915b50505050509050915091509091565b8161041b5760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b60006104f083853085610513565b90505b9392505050565b6105058383836105ed565b61050e57600080fd5b505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17905291516000928392839291891691839161057a9161095a565b60006040518083038185875af1925050503d80600081146105b7576040519150601f19603f3d011682016040523d82523d6000602084013e6105bc565b606091505b50915091506105cd828260016106be565b50808060200190518101906105e29190610976565b979650505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b17905291516000928392839291881691839161064c9161095a565b60006040518083038185875af1925050503d8060008114610689576040519150601f19603f3d011682016040523d82523d6000602084013e61068e565b606091505b509150915061069f828260026106be565b50808060200190518101906106b49190610976565b9695505050505050565b606083156106cd5750816104f3565b8251156106dd5782518084602001fd5b60405163100960cb60e01b8152600481018390526024016104d9565b8280546107059061084d565b90600052602060002090601f016020900481019282610727576000855561076d565b82601f1061074057805160ff191683800117855561076d565b8280016001018555821561076d579182015b8281111561076d578251825591602001919060010190610752565b506107799291506107ba565b5090565b5080546107899061084d565b6000825580601f10610799575050565b601f0160209004906000526020600020908101906107b791906107ba565b50565b5b8082111561077957600081556001016107bb565b6000604082840312156107e157600080fd5b50919050565b60005b838110156108025781810151838201526020016107ea565b838111156102985750506000910152565b82815260406020820152600082518060408401526108388160608501602087016107e7565b601f01601f1916919091016060019392505050565b600181811c9082168061086157607f821691505b602082108114156107e157634e487b7160e01b600052602260045260246000fd5b80516001600160a01b038116811461089957600080fd5b919050565b6000606082840312156108b057600080fd5b6040516060810181811067ffffffffffffffff821117156108e157634e487b7160e01b600052604160045260246000fd5b6040526108ed83610882565b81526108fb60208401610882565b6020820152604083015160408201528091505092915050565b80151581146107b757600080fd5b6001600160a01b03831681528135602080830191909152606082019083013561094a81610914565b8015156040840152509392505050565b6000825161096c8184602087016107e7565b9190910192915050565b60006020828403121561098857600080fd5b81516104f38161091456fea2646970667358221220723343a1694bcbc1e07b5b6a555cb6084fd197eecde2f1147e52ff9e5ab0242464736f6c634300080c0033`,
  BytecodeLen: 3254,
  Which: `oD`,
  version: 8,
  views: {
    }
  };
export const _stateSourceMap = {
  1: {
    at: './index.rsh:19:11:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  2: {
    at: './index.rsh:22:11:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './index.rsh:28:11:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Buyer": Buyer,
  "Creator": Creator
  };
export const _APIs = {
  };
