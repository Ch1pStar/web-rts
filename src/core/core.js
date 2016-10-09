import ECS from '@fae/ecs';
import Signal from 'mini-signals';
import { uid, removeElements } from '../util/index';

const defaultSystems = [];

export default class Core extends ECS{

  constructor(options){
    super();

    this.uid = uid();

    this.onBeforeUpdate = new Signal();
    this.onAfterUpdate = new Signal();

    for (let i = 0; i < defaultSystems.length; ++i){
        const system = new defaultSystems[i](this);

        this.addSystem(system);
    }
  }

  static addDefaultSystem(System){
      defaultSystems.push(System);
  }

  static removeDefaultSystem(System){
    const idx = defaultSystems.indexOf(System);

    if (idx !== -1){
      removeElements(defaultSystems, idx, 1);
    }
  }

  addSystem(system, skipSort = false){
      super.addSystem(system);

      if (!skipSort) this.sortSystems();
  }

  sortSystems(){
    this.systems.sort(compareSystemsPriority);
  }

  addEntity(entity, skipSort){
    super.addEntity(entity);

    if (!skipSort) this.sortEntities();
  }

  sortEntities(){
    this.entities.sort(compareUpdatePriority);
  }

  destroy(){

    this.onBeforeUpdate.detachAll();
    this.onBeforeUpdate = null;

    this.onAfterUpdate.detachAll();
    this.onAfterUpdate = null;
  }

}

// lower is placed first
function compareSystemsPriority(a, b){
    return a.priority - b.priority;
}

// lower is placed first, and within updatePriority they are grouped
// by the updateGroupHint
function compareUpdatePriority(a, b){
    if (a.updatePriority === b.updatePriority){
        return a.updateGroupHint === b.updateGroupHint ? 0 : 1;
    }

    return a.updatePriority - b.updatePriority;
}