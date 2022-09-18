import * as Dialog from "@radix-ui/react-dialog"
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from'@radix-ui/react-toggle-group'
//import * as Select from '@radix-ui/react-select'
import { Check, GameController } from "phosphor-react"
import { Input } from "./Form/Input"
import { useEffect, useState } from "react";
import {FormEvent} from 'react'
import axios from "axios"

interface GamesProps{
  id: string;
  title:string;
}

export function CreateAdModal(){
  const [ games, setGames] = useState<GamesProps[]>([]);
  const [ weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
   axios('http://localhost:3333/games')
    .then(res => { 
      setGames(res.data)})
  },[]) 

  async function handleCreateAd(event:FormEvent){
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData);
    console.log(data)
    
    if(!data.name){
      return;
    }
   try{
    await axios.post(`http://localhost:3333/games/${data.game}/ads`,{            
      name: data.name ,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      useVoiceChannel: useVoiceChannel,
  })
    alert('anuncio criado o sucesso')
  } catch(err){
      //console.log(err)
      alert('Erro ao criar o anuncio')
  }

  }

   return(
<Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

<Dialog.Content className="fixed bg-[#2a2634] 
py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg 
w-[480px] shadow-lg shadow-black/25" >
      <Dialog.Title className="text-3xl font-black" >Publique um anuncio</Dialog.Title>

      
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4" >
          
          <div className="flex flex-col gap-2" >
            <label className="font-semibold" htmlFor="game">Qual o game?</label>
            
              <select id="game" name="game"
                  defaultValue="" 
                  className="bg-zinc-900 py-3 px-4 rounded text-sm placeholde:text-zinc-500 appearance-none"
                  placeholder="Selecione o game que deseja jogar">
                    <option disabled value="">Selecione o game que deseja jogar</option>
                    {games.map((game) =>{
                      return(
                        <option key={game.id} value={game.id}>{game.title}</option>
                      )  
                    })}
              </select>
          </div>
         
          <div className="flex flex-col gap-2" >
            <label htmlFor="name">Seu nome ou (nickname)</label>
            <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
          </div>
          
          <div className="grid grid-cols-2 gap-6" >
              <div className="flex flex-col gap-2" >
                <label htmlFor="yearsPlaying">Joga há quanto tempo?</label>
                <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="tudo bem ser noob" />
              </div>
              
              <div className="flex flex-col gap-2" >
                <label htmlFor="discord">Qual seu discord?</label>
                <Input name="discord" id="discord" type="text" placeholder="Usuario#0000" />
              </div>
          </div>
          <div className="flex gap-6" >
              <div className="flex flex-col gap-2" >
                <label htmlFor="weekDays">Quando costuma jogar?</label>
              
              
              <ToggleGroup.Root 
                  type="multiple" 
                  className="grid grid-cols-4 gap-2"
                  value={weekDays}
                  onValueChange={setWeekDays}
                  >
                <ToggleGroup.Item 
                      value="0" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-500' : "" }`} 
                      title="Domingo">D
                </ToggleGroup.Item>
                <ToggleGroup.Item value="1" className={`w-8 h-8 rounded  ${weekDays.includes('1') ? 'bg-violet-500' : "bg-zinc-900" }`} title="Segunda">S</ToggleGroup.Item>
                <ToggleGroup.Item value="2" className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500' : "bg-zinc-900" }`} title="Terça">T</ToggleGroup.Item>
                <ToggleGroup.Item value="3" className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500' : "bg-zinc-900" }`} title="Quarta">Q</ToggleGroup.Item>
                <ToggleGroup.Item value="4" className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500' : "bg-zinc-900" }`} title="Quinta">Q</ToggleGroup.Item>
                <ToggleGroup.Item value="5" className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : "bg-zinc-900" }`} title="Sexta">S</ToggleGroup.Item>
                <ToggleGroup.Item value="6" className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : "bg-zinc-900" }`} title="Sabado">S</ToggleGroup.Item>
              </ToggleGroup.Root>
              
              
              
              </div>
                

              <div className="flex flex-col gap-2 flex-1" >
                <label htmlFor="hourStart">Qual horario do dia</label>
                
                <div className="grid grid-cols-2 gap-2" >
                  <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                  <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                </div>
              </div>
          </div>  
            <label className="mt-2 flex gap-2 text-sm items-center" >
             <Checkbox.Root 
                    className="w-6 h-6 p-1 rounded bg-zinc-900"
                    checked={useVoiceChannel} 
                    onCheckedChange={(checked) =>{
                        if(checked === true){
                          setUseVoiceChannel(true)
                        } else{
                          setUseVoiceChannel(false);
                        }
                    }}
                    >
                <Checkbox.Indicator>
                  <Check className="text-emerald-400 w-4 h-4 "  />
                </Checkbox.Indicator>
             </Checkbox.Root>
              Costumo me conectar ao chate de voz
            </label>

            <footer className=" flex mt-4 justify-end gap-4" >
              <Dialog.Close 
                type="button" 
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold
              hover:bg-zinc-600" >
                Cancelar
                </Dialog.Close>
              
              <button
                className="flex items-center gap-3 
                bg-violet-500 px-5 h-12 rounded-md font-semibold
                hover:bg-violet-600"
                type="submit">
                <GameController className="w-6 h-6"/>
                Encontrar duo 
              </button>
            </footer>
        </form>
        
      
        
        </Dialog.Content>
    </Dialog.Portal>

    )
}







