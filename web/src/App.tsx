import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { useEffect, useState } from 'react';
import { CreateAdModal } from './components/CreateAdModal';
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdBanner } from './components/CreateAdBanner';
import axios from 'axios';

interface GamesProps{
  id: string;
  title:string;
  bannerURL:string;
  ads: number;
  
  
}

function App() {

  const [ games, setGames] = useState<GamesProps[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
    .then(res => setGames(res.data))
    console.log(games);
  },[])
  
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20 " >
        <img src={logoImg} alt="" />

          <h1 className="text-6xl text-white font-black mt-20 " >
              Seu 
            <span className="text-transparent bg-nlw-gradient bg-clip-text "> 
            duo
            </span> esta aqui
          </h1>
          <button>Clique Aqui</button>

          <div className="grid grid-cols-6 gap-6 mt-16 " >

          { games.map((game) => {
              return(
                <GameBanner key={game.id} adsCount={game.ads} bannerUrl={game.bannerURL}  title={game.title }  />
              )
          })
         }
          </div>
          <Dialog.Root>
              <CreateAdBanner/>
         <CreateAdModal/>
         </Dialog.Root>
    </div>
  )
}

export default App
