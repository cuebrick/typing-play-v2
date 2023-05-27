import {useContext} from 'react';
import {CommonContext} from 'store/CommonContext';

function Modeless(): JSX.Element {
  const commonStore = useContext(CommonContext);
  return (
    <div className="modeless">
      {commonStore.modeless.map((item) => (
        <div key={item.id} className="modeless-item">
          {item.text}
        </div>
      ))}
    </div>
  );
}

export default Modeless;
