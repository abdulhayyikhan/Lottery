import { ethers } from "ethers";
import React, { useState, useEffect, createContext } from "react";

import { lotteryAbi, contractAddress } from "./utils/constants";

export const LotteryContext = createContext();

const { ethereum } = window;

export const getLotteryContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const LotteryContract = new ethers.Contract(contractAddress, lotteryAbi, signer);
    return LotteryContract;

}

export const LotteryProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState();
    const [lotteryPot, setLotteryPot] = useState();
    const [lotteryPlayers, setLotteryPlayers] = useState([]);
    const [lotteryHistory, setLotteryHistory] = useState([]);
    const [lotteryId,setLotteryId] = useState();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        checkWalletIsConnected();
        updateState();
    }, [])

    ethereum.on("accountsChanged", async(account) => {
        setCurrentAccount(account[0]);
    })


    const updateState = () => {
        if (getLotteryContract()) getPot();
        if (getLotteryContract()) getPlayers();
        if (getLotteryContract()) getLotteryId();
    }


    const checkWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);

            } else {
                console.log("No account found")
            }
      
        } catch (err) {
            setError(err.message);
            throw new Error("No ethereum object.")
        }
    }


    const connectWallet = async () => {
        setError("")
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } 
        
        catch (err) {
            setError(err.message);
            throw new Error("No ethereum object.")
        }
    }


    const getPot = async () => {
        const pot = await getLotteryContract().getBalance()
        setLotteryPot(ethers.utils.formatEther(pot));
        
    }

    const getPlayers = async () => {
        const players = await getLotteryContract().getPlayers()
        setLotteryPlayers(players);
    }

    const enterLottery = async () => {
        setError("")
        try {
          
            await getLotteryContract().enter({
                from: currentAccount,
                value: '11000000000000000',
                gasLimit: 3000000,
                gasPrice: null

        })
          setTimeout(reload, 10000);
        } catch (err) {
            setError(err.message);
        }

    }

    const reload = () => {
        window.location.reload()
    }

    const pickWinner =  async() => {
       setError('')
       setSuccess('')
        try{
            await getLotteryContract().pickWinner({
                from: currentAccount,
                gasLimit: 3000000,
                gasPrice: null
            })
        }catch(err){
            setError(err.message);
        }
    }
    
    const getLotteryId = async() => {
        const id = await getLotteryContract().lotteryId()
        setLotteryId(parseInt(id));
        await getLotteryHistory(parseInt(id))
       
    }


    const getLotteryHistory = async(id) => {

        for(let i = id ; i > 0 ; i--){
        const winnerAddress = await getLotteryContract().lotteryHistory(i);
        const historyObj = {};
        historyObj.id = i;
        historyObj.address = winnerAddress;  
        setLotteryHistory(lotteryHistory => [...lotteryHistory,historyObj]);
    }
}





    return (
        <LotteryContext.Provider value={{ connectWallet, currentAccount, lotteryPot, lotteryPlayers, enterLottery,error,success,pickWinner,lotteryHistory,lotteryId }}>
            {children}
        </LotteryContext.Provider>
    )
}


