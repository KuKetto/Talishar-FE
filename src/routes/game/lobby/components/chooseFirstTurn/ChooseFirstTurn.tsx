import React, { ReactEventHandler } from 'react';
import { useAppSelector } from 'app/Hooks';
import { RootState } from 'app/Store';
import { useChooseFirstPlayerMutation } from 'features/api/apiSlice';
import { toast } from 'react-hot-toast';
import styles from './ChooseFirstTurn.module.css';
import { shallowEqual } from 'react-redux';

const ChooseFirstTurn = () => {
  const [chooseFirstPlayer, chooseFirstPlayerData] =
    useChooseFirstPlayerMutation();
  const gameInfo = useAppSelector((state: RootState) => state.game.gameInfo);
  const gameLobby = useAppSelector(
    (state: RootState) => state.game.gameLobby,
    shallowEqual
  );

  const chooseFirst = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await chooseFirstPlayer({
        gameName: gameInfo.gameID,
        playerID: gameInfo.playerID,
        authKey: gameInfo.authKey,
        action: 'Go First'
      });
    } catch (err) {
      console.warn(err);
      toast.error('There has been an error!');
    }
  };

  const chooseSecond = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await chooseFirstPlayer({
        gameName: gameInfo.gameID,
        playerID: gameInfo.playerID,
        authKey: gameInfo.authKey,
        action: 'Go Second'
      });
    } catch (err) {
      console.warn(err);
      toast.error('There has been an error!');
    }
  };

  return (
    <dialog open>
      <article className={styles.container}>
        <hgroup style={{ width: '100%' }}>
          <h3>You won the die roll!</h3>
          <h5>Your opponent is {gameLobby?.theirName}</h5>
          <h5>Their hero is {gameLobby?.theirHeroName}</h5>
          <h5>Would you like to go first or second?</h5>
        </hgroup>
        <div className={styles.buttons}>
          <button onClick={chooseFirst}>First</button>
          <button onClick={chooseSecond}>Second</button>
        </div>
      </article>
    </dialog>
  );
};

export default ChooseFirstTurn;
