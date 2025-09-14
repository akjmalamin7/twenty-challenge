import List from "./List";
import { updateEffectData } from "./update-without-effect-data";

const UpdateWithoutEffect = () => {

  return (
    <div>

      <List items={updateEffectData} />

    </div>
  );
};
export default UpdateWithoutEffect;