import * as migration_20260729_224412 from './20260729_224412';
import * as migration_20260730_070706 from './20260730_070706';

export const migrations = [
  {
    up: migration_20260729_224412.up,
    down: migration_20260729_224412.down,
    name: '20260729_224412',
  },
  {
    up: migration_20260730_070706.up,
    down: migration_20260730_070706.down,
    name: '20260730_070706'
  },
];
