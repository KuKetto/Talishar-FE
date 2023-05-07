import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/Hooks';
import { RootState } from 'app/Store';
import Displayrow from 'interface/Displayrow';
import CardDisplay from '../../elements/cardDisplay/CardDisplay';
import styles from './DeckZone.module.css';
import useSetting from 'hooks/useSetting';
import { MANUAL_MODE } from 'features/options/constants';
import { PROCESS_INPUT } from 'appConstants';
import { submitButton } from 'features/game/GameSlice';

export const DeckZone = React.memo((prop: Displayrow) => {
  const { isPlayer } = prop;
  const isManualMode = useSetting({ settingName: MANUAL_MODE })?.value === '1';

  const showCount = true;

  const deckCards = useAppSelector((state: RootState) =>
    isPlayer ? state.game.playerOne.DeckSize : state.game.playerTwo.DeckSize
  );
  const deckBack = useAppSelector((state: RootState) =>
    isPlayer ? state.game.playerOne.DeckBack : state.game.playerTwo.DeckBack
  );

  if (deckCards === undefined || deckCards === 0) {
    return <div className={styles.deckZone}>Deck</div>;
  }

  return (
    <div className={styles.deckZone}>
      <CardDisplay
        card={deckBack}
        num={showCount ? deckCards : undefined}
        preventUseOnClick
      />
      {isManualMode && <ManualMode isPlayer={isPlayer} />}
    </div>
  );
});

const ManualMode = ({ isPlayer }: { isPlayer: Boolean }) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(
      submitButton({
        button: {
          mode: isPlayer
            ? PROCESS_INPUT.DRAW_CARD_SELF
            : PROCESS_INPUT.DRAW_CARD_OPPONENT
        }
      })
    );
  };
  return (
    <div className={styles.manualMode}>
      <button className={styles.drawButton} onClick={onClick}>
        Draw
      </button>
    </div>
  );
};

export default DeckZone;
