import './App.css';
import "bulma/css/bulma.css";
import { useContext } from 'react';
import {LotteryContext} from './context/LotteryContext';
function App() {
  const {connectWallet,lotteryPot,lotteryPlayers,enterLottery,error,success,pickWinner,currentAccount,lotteryHistory,lotteryId} = useContext(LotteryContext);

  return (
    <div className="App">
    
     <div className='main'>
       <nav className='navbar mt-4 mb-4'>
         <div className='container'>
           <div className='navbar-brand'>
             <h1>Ether Lottery</h1>
           </div>
            
           <div className='navbar-end'>
        <button className='button is-link' onClick={connectWallet}>Connect Wallet</button>
           </div>
         </div>
       </nav>
       <div className='container'>
         <section className='mt-5'>
           <div className='columns'>

           <div className='column is-two-third'>
          <section className='mt-5'>
            <p>Enter in the Lottery by sending 0.011 Ether</p>
            <button className='button is-link is-large is-light mt-3' onClick={enterLottery}>Play now</button>
          </section>
          {currentAccount == "0xfdb039899f5bfeac8bc3cd898a0e807d31849fde"
            ?
            <section className='mt-6'>
            <p><b>Admin only:</b> Pick winner</p>
            <button className='button is-primary is-large is-light mt-3' onClick={pickWinner} disabled={lotteryPlayers.length == 0}>Pick Winner</button>
          </section>
          :
          ""
          }
         
          <section>
                  <div className="container has-text-danger mt-6">
                    <p>{error}</p>
                  </div>
                </section>
                <section>
                  <div className="container has-text-success mt-6">
                    {lotteryHistory.slice(0,2).map((item,index)=>{
                      if(item.address != "0x0000000000000000000000000000000000000000") {
                        return (
                         <p>The latest lottery winner is {`${item.address.slice(0,5)}....${item.address.slice(item.address.length - 4)}`}</p> 
                        )
                      }
                    })}
                  </div>
                </section>
           </div>
           <div className='column is-one-third'>
            <section className='mt-5'>
              <div className='card'>
                <div className='card-content'>
                  <div className='content'>
                    <h2>Lottery History</h2>
                    {(lotteryHistory && lotteryHistory.length > 0) && lotteryHistory.slice(0,4).map((item,index) => {
                      if(lotteryId != item.id){
                        return (
                        <div className='history-entry mt-3' key={index}>
                        <div>Lottery #{item.id} winner:</div>
                        <div>
                          <a href={`https://etherscan.io/address/${item.address}`} target="_blank">{item.address}</a>
                        </div>
                      </div>
                        )
                      }
                       
                    })

                        }
                  </div>
                </div>
              </div>
            </section>
            <section className='mt-5'>
              <div className='card'>
                <div className='card-content'>
                  <div className='content'>
                    <h2>Players ({lotteryPlayers.length})</h2>
                      <ul className='ml-0'>
                        {(lotteryPlayers && lotteryPlayers.length > 0) && lotteryPlayers.map((player,index)=>(
                         <li key={index}>
                         <a href={`https://etherscan.io/address/${player}`} target="_blank">{player}</a> 
                         </li>
                        ))

                        }
                      </ul>
                  </div>
                </div>
              </div>
            </section>
            <section className='mt-5'>
              <div className='card'>
                <div className='card-content'>
                  <div className='content'>
                    <h2>Pot</h2>
                  <p>{lotteryPot > 0 ? lotteryPot : 0} Ether</p>
                  </div>
                </div>
              </div>
            </section>
           </div>
            </div>
         </section>
       </div>
     </div>
     <footer className='footer'>
    <p>&copy; 2022 Raur Enterprice</p>
     </footer>
    </div>
  );
}

export default App;