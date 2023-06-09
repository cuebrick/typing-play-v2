import {useContext} from 'react';
import {CommonContext} from 'store/CommonContext';
import {observer} from 'mobx-react-lite';

function Modeless(): JSX.Element {
  const commonStore = useContext(CommonContext);

  return (
    <div className="modeless">
      {commonStore.modeless.map((item) => (
        <div key={item.id} className="modeless-item">
          <span>{item.text}</span>
          <button onClick={() => commonStore.removeModeless(item.id)} className="btn-close">
            ×
          </button>
        </div>
      ))}
      {/*       <button
        onClick={() => {
          commonStore.addModeless(`hello ${Math.random()}`);
          console.log('in page >>', commonStore.modeless);
        }}
        className="add-modeless"
      >
        add
      </button> */}
    </div>
  );
}

export default observer(Modeless);
