import React, { useEffect, useRef, useState } from 'react'

export default function Screen({enemy,character}) {

  const [enemyHp, setEnemyHp] = useState(enemy.hp);
  const maxEnemyHp = enemy.hp;
  const enemyHpPercent = (enemyHp / maxEnemyHp) * 100;

  const actionList = ["Basic Attack" , "Skill Attack" , "Guard Attack"];

  const [charHp, setCharHp] = useState(character.hp);
  const maxCharHp = character.hp;
  const charHpPercent = (charHp / maxCharHp) * 100;

  const hpBar = {height : "100%" , transition: 'width 0.3s ease-in-out'};

  const [battleLog , setBattleLog] = useState('');

  const [action , setAction] = useState(0);
  const [turn , setTurn] = useState(1);
  
  const startBattle = async () => {
    if(action == 0 || action > 3){
      await renderLog("Chose Action!"); 
      return
    } 
    if(await checkDead()){
      return;
    }
    const rolledAction = await rollEnemyAction();
    await characterTurn(rolledAction);
    if(await checkDead()){
      return;
    }
    await enemyTurn(rolledAction);
    if(await checkDead()){
      return;
    }
    await renderLog(`Turn ${turn} End`)
    setTurn(prev => prev + 1);

  }

  const checkDead = async () => {
    if(enemyHp <= 0){
      await renderLog('Enemy Already Dead! Character Victory')
      return true;
    }
    if(charHp <= 0){
      await renderLog('Character Already Dead! Enemy Victory')
      return true;
    }
    return false;
  }

  const characterTurn = async (rolledAction) => {
      await renderLog(`${character.name} turn!`)
      await renderLog(`${character.name} using ${actionList[action-1]}!`)
      switch (action) {
        case 1:
          await basicAttack(rolledAction)
          break;
        case 2:
          await skillAttack(rolledAction)
          break;
        case 3:
          
          break;
        default:
          await renderLog("Chose Action!")
          break;
      }

  }

  const enemyTurn = async(rolledAction) => {
    await renderLog(`${enemy.name} turn!`)
    await renderLog(`${enemy.name} using ${actionList[rolledAction-1]}!`)

    switch (rolledAction) {
      case 1:
        await enemyAttack()
        break;
      case 2:
        await enemySkill()
        break;
      case 3:
        
        break;
      default:
        await renderLog("Chose Action!")
        break;
    }
  }

  const enemyAttack = async () => {
    const dealt = (action != 3) ? enemy.basicDmg :enemy.basicDmg - 10;
    await renderLog(enemy.name + " dealt "+dealt+" basic damage to " + character.name)
    setTimeout(() => {
      setCharHp(prev => Math.max(prev - dealt, 0));
    }, 500);
  }

  const enemySkill = async () => {
    const dealt = (action != 3) ? enemy.basicDmg :enemy.basicDmg - 10;
    await renderLog(enemy.name + " dealt "+dealt+" skill damage to " + character.name)
    setTimeout(() => {
      setCharHp(prev => Math.max(prev - dealt, 0));
    }, 500);
  }

  const rollEnemyAction = async () => {
    const min = 1;
    const max = 3;
    const randomAction = Math.floor(Math.random() * (max - min + 1)) + min;
    
    await renderLog(`${enemy.name} rolled to use ${actionList[randomAction-1]} after character turn!`);
    
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });

    return randomAction

  }

  const basicAttack = async (enemyAction) => {
    const dealt = (enemyAction != 3) ? character.basicDmg :character.basicDmg - 10;
    await renderLog(character.name + " dealt "+dealt+" basic damage to " + enemy.name)
    setTimeout(() => {
      setEnemyHp(prev => Math.max(prev - dealt, 0));
    }, 500);
  }

  const skillAttack = async (enemyAction) => {
    const dealt = (enemyAction != 3) ? character.basicDmg :character.basicDmg - 10;
    await renderLog(character.name + " dealt "+dealt+" skill damage to " + enemy.name)
    setTimeout(() => {
      setEnemyHp(prev => Math.max(prev - dealt, 0));
    }, 500);
  }

  const renderLog = async (toRender) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    setBattleLog(prev => prev + "\n" + toRender);
  }

  const logRef = useRef(null);
  const scrollToBottom = () => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [battleLog]);

  return (
    <div>
      <div className='container border border-dark p-3 mt-3' style={{width : '100vh', height : "95vh" , overflowY : "scroll"}}>
        <div className="container text-center border p-1">
          <h4>Title</h4>
        </div>
        <div className="container">
          <div className="row gap-1 justify-content-between pt-2 pb-2">
            <div className="col-4 border">
              Health
            </div>
            <div className="col-2 border">
              Exp
            </div>
            <div className="col-4 border">
              Mana
            </div>
          </div>
        </div>
        <div className="container border">
          <div className="row p-2">
            <div className="col border">
                <div className="row" style={{height : "25vh"}}>
                  <div className="col border d-flex justify-content-center align-items-center">
                    <img src="https://cdn-icons-png.freepik.com/512/3819/3819284.png" width={"50%"} alt="" />
                  </div>
                </div>
                <div className="row" style={{}}>
                  <div className="col border">
                    <div className="row">
                      <div className="col border">
                        {character.name}
                      </div>
                    </div>
                    <div className="row gap-2 p-1">
                    <div className="col border p-0 justify-content-start">
                        <div className="bg-success text-center" style={{...hpBar ,  width : `${charHpPercent}%`}}>
                            {charHp}/{maxCharHp}
                        </div>
                      </div>
                      <div className="col border">
                        MP
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col border">
                        <button onClick={() => setAction(1)} className='btn btn-sm' style={{width : "100%"}}>Basic</button>
                      </div>
                      <div className="col border">
                        <button onClick={() => setAction(2)} className='btn btn-sm' style={{width : "100%"}}>Skill</button>
                      </div>
                      <div className="col border">
                        <button onClick={() => setAction(3)} className='btn btn-sm' style={{width : "100%"}}>Guard</button>
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col border justify-content-center d-flex">
                        <button onClick={() => startBattle()} className='btn btn-sm'>Start</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col border">
                <div className="row" style={{height : "25vh"}}>
                  <div className="col border d-flex justify-content-center align-items-center" >
                    <img src="https://static.thenounproject.com/png/1388687-200.png" width={"50%"} alt="" />
                  </div>
                </div>
                <div className="row" style={{height : "20vh"}}>
                  <div className="col border">
                    <div className="row">
                      <div className="col border">
                        {enemy.name}
                      </div>
                    </div>
                    <div className="row gap-2 p-1">
                      <div className="col border p-0 justify-content-start">
                        <div className="bg-success text-center" style={{...hpBar ,  width : `${enemyHpPercent}%`}}>
                            {enemyHp}/{maxEnemyHp}
                        </div>
                      </div>
                      <div className="col border">
                        MP
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col border">
                        <button className='btn btn-sm' style={{width : "100%"}}>Basic</button>
                      </div>
                      <div className="col border">
                        <button className='btn btn-sm' style={{width : "100%"}}>Skill</button>
                      </div>
                      <div className="col border">
                        <button className='btn btn-sm' style={{width : "100%"}}>Guard</button>
                      </div>
                    </div>
                    
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="container-fluid pt-2 pb-2">
          <div className="row">
            <label htmlFor="" className='border p-0'>Battle Log</label>
          </div>
          <div className="row" ref={logRef} style={{height : "20vh" , overflowY : "scroll"}}>
            <div className="col border">
            {battleLog.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
            </div>
          </div>
          <div className="row">
            <div className="col border">
              Footer Menu
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
